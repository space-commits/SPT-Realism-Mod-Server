
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { BotWeaponGenerator } from "@spt-aki/generators/BotWeaponGenerator";
import { BotGeneratorHelper, ExhaustableArray } from "@spt-aki/helpers/BotGeneratorHelper";
import { container, DependencyContainer } from "tsyringe";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Inventory, Mods, ModsChances} from "@spt-aki/models/eft/common/tables/IBotType";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { ProbabilityHelper } from "@spt-aki/helpers/ProbabilityHelper";
import { ContainerHelper } from "@spt-aki/helpers/ContainerHelper";
import { DurabilityLimitsHelper } from "@spt-aki/helpers/DurabilityLimitsHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { GenerateWeaponResult } from "@spt-aki/models/spt/bots/GenerateWeaponResult";

export class BotWepGen extends BotWeaponGenerator {

    private static container: DependencyContainer;

    public botWepGen(weaponTpl: string, equipmentSlot: string, botTemplateInventory: Inventory, weaponParentId: string, modChances: ModsChances, botRole: string, isPmc: boolean) : GenerateWeaponResult {
      
        const id = this.hashUtil.generate();
        const itemTemplate = this.databaseServer.getTables().templates.items[weaponTpl];
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
        const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const _botModGen = new BotModGen(this.logger, jsonUtil, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseServer, durabilityLimitsHelper, this.itemHelper, inventoryHelper, containerHelper, configServer);         

        const modPool = botTemplateInventory.mods;

        const weaponItemTemplate = this.itemHelper.getItem(weaponTpl)[1];

        if (!weaponItemTemplate)
        {
            this.logger.error(`Could not find item template with tpl ${weaponTpl}`);
            this.logger.error(`WeaponSlot -> ${equipmentSlot}`);
            return;
        }

        let weaponArray = this.constructWeaponBaseArray(weaponTpl, weaponParentId, equipmentSlot, weaponItemTemplate, botRole);

        // Add mods to weapon base
        if (Object.keys(modPool).includes(weaponTpl))
        {
            weaponArray = _botModGen.botModGen(weaponArray, modPool, weaponArray[0]._id, weaponItemTemplate, modChances);
        }

        if (!this.isWepValid(weaponArray))
        {
            // Something goofed, fallback to the weapons preset
            weaponArray = this.getPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, weaponItemTemplate, botRole);
        }

        // Find ammo to use when filling magazines
        if (!botTemplateInventory.Ammo)
        {
            this.logger.error(`No ammo found for bot type ${botRole}`)
            throw new Error("bot generation failed");
        }

        // Fill existing magazines to full and sync ammo type
        const ammoTpl = this.getCompatibleAmmo(botTemplateInventory.Ammo, weaponItemTemplate, isPmc);
        for (const magazine of weaponArray.filter(x => x.slotId === this.modMagazineSlotId))
        {
            this.fillExistingMagazines(weaponArray, magazine, ammoTpl);
        }

        return {
            weapon: weaponArray,
            chosenAmmo: ammoTpl,
            weaponMods: modPool,
            weaponTemplate: weaponItemTemplate
        };
    }

    public isWepValid(itemList: Item[]): boolean {
        const _checkRequired = new CheckRequired();

        for (const item of itemList) {
            const template = this.databaseServer.getTables().templates.items[item._tpl];
            if (!template._props.Slots || !template._props.Slots.length) {
                continue;
            }

            for (const slot of template._props.Slots) {
                if (!_checkRequired.checkRequired(slot)) {
                    continue;
                }

                const slotItem = itemList.find(i => i.parentId === item._id && i.slotId === slot._name);
                if (!slotItem) {
                    this.logger.error(`Required slot '${slot._name}' on ${template._id} was empty`);
                    return false;
                }
            }
        }
        return true;
    }
}

export class CheckRequired {
    public checkRequired(slot) {
        if (slot?._botRequired != undefined) {
            if (slot._botRequired == true)
                return true
        }
        else
            if (slot._required == true)
                return true
        return false
    }
}


export class BotModGen extends BotGeneratorHelper {

    private static container: DependencyContainer;


    public botModGen(items: Item[], modPool: Mods, parentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances): Item[] 
    {
            BotModGen.container = container;
            const randUtil = container.resolve<RandomUtil>("RandomUtil");
            const configServer = container.resolve<ConfigServer>("ConfigServer");
            const botConf = this.configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
            const _checkRequired = new CheckRequired();
            const itemModPool = modPool[parentTemplate._id];

            if (!parentTemplate._props.Slots.length && !parentTemplate._props.Cartridges.length && !parentTemplate._props.Chambers.length) {
                this.logger.error(`Item ${parentTemplate._id} had mods defined, but no slots to support them`);
                return items;
            }
            for (const modSlot in itemModPool) {
                let itemSlot;

                switch (modSlot) {
                    case "patron_in_weapon":
                    case "patron_in_weapon_000":
                    case "patron_in_weapon_001":
                        itemSlot = parentTemplate._props.Chambers.find(c => c._name.includes(modSlot));
                        break;

                    case "cartridges":
                        itemSlot = parentTemplate._props.Cartridges.find(c => c._name === modSlot);
                        break;

                    default:
                        itemSlot = parentTemplate._props.Slots.find(s => s._name === modSlot);
                        break;
                }

                if (!itemSlot) {
                    this.logger.error(`Slot '${modSlot}' does not exist for item ${parentTemplate._id}`);
                    continue;
                }

                const ammoContainers = ["mod_magazine", "patron_in_weapon", "patron_in_weapon_000", "patron_in_weapon_001", "cartridges"];
                const modSpawnChance = _checkRequired.checkRequired(itemSlot) || ammoContainers.includes(modSlot) ? 100 : modSpawnChances[modSlot];

                if (randUtil.getIntEx(100) > modSpawnChance) {
                    continue;
                } 
                
                const exhaustableModPool = new ExhaustableArray(itemModPool[modSlot], this.randomUtil, this.jsonUtil);
                let modTpl;
                let found = false;

                while (exhaustableModPool.hasValues()) {
                    modTpl = exhaustableModPool.getRandomValue();

                    if (!this.isItemIncompatibleWithCurrentItems(items, modTpl, modSlot)) {
                        found = true;
                        break;
                    }
                } 
                
                // Find a mod to attach from items db for required slots if none found above
                const parentSlot = parentTemplate._props.Slots.find(i => i._name === modSlot);
                if (!found && parentSlot !== undefined && _checkRequired.checkRequired(parentSlot)) {
                    modTpl = this.getModTplFromItemDb(modTpl, parentSlot, modSlot, items);
                    found = !!modTpl;
                }

                if (!found || !modTpl) {
                    if (_checkRequired.checkRequired(itemSlot)) {
                        this.logger.error(`Could not locate any compatible items to fill '${modSlot}' for ${parentTemplate._id}`);
                    }

                    continue;
                }

                if (!itemSlot._props.filters[0].Filter.includes(modTpl)) {
                    this.logger.error(`Mod ${modTpl} is not compatible with slot '${modSlot}' for item ${parentTemplate._id}`);
                    continue;
                }

                const modTemplate = this.databaseServer.getTables().templates.items[modTpl];

                if (!modTemplate) {
                    this.logger.error(`Could not find mod item template with tpl ${modTpl}`);
                    this.logger.info(`Item -> ${parentTemplate._id}; Slot -> ${modSlot}`);
                    continue;
                } // TODO: check if weapon already has sight
                // 'sight' 550aa4154bdc2dd8348b456b 2x parents down


                const parentItem = this.databaseServer.getTables().templates.items[modTemplate._parent];

                if (modTemplate._parent === "550aa4154bdc2dd8348b456b" || parentItem._parent === "550aa4154bdc2dd8348b456b") {// todo, check if another sight is already on gun AND isnt a side-mounted sight
                    // if weapon has sight already, skip
                }
                const modId = this.hashUtil.generate();
                items.push({
                    "_id": modId,
                    "_tpl": modTpl,
                    "parentId": parentId,
                    "slotId": modSlot,
                    ...this.generateExtraPropertiesForItem(modTemplate)
                }); // I first thought we could use the recursive generateModsForItems as previously for cylinder magazines.
                // However, the recurse doesnt go over the slots of the parent mod but over the modPool which is given by the bot config
                // where we decided to keep cartridges instead of camoras. And since a CylinderMagazine only has one cartridge entry and
                // this entry is not to be filled, we need a special handling for the CylinderMagazine

                if (parentItem._name === "CylinderMagazine") {
                    // we don't have child mods, we need to create the camoras for the magazines instead
                    this.fillCamora(items, modPool, modId, modTemplate);
                } else {
                    if (Object.keys(modPool).includes(modTpl)) {
                        this.botModGen(items, modPool, modId, modTemplate, modSpawnChances);
                    }
                }
            }
            return items;

    }

}


