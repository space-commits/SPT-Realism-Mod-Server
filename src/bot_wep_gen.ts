
import { BotWeaponGenerator } from "@spt-aki/generators/BotWeaponGenerator";
import { BotGeneratorHelper, ExhaustableArray } from "@spt-aki/helpers/BotGeneratorHelper";
import { container, DependencyContainer } from "tsyringe";
import { ITemplateItem, Slot } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Inventory, Mods, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { ProbabilityHelper } from "@spt-aki/helpers/ProbabilityHelper";
import { ContainerHelper } from "@spt-aki/helpers/ContainerHelper";
import { DurabilityLimitsHelper } from "@spt-aki/helpers/DurabilityLimitsHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { GenerateWeaponResult } from "@spt-aki/models/spt/bots/GenerateWeaponResult";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { BotEquipmentFilterService } from "@spt-aki/services/BotEquipmentFilterService";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";

const BaseClasses = require("@spt-aki/models/enums/BaseClasses");

export class BotWepGen extends BotWeaponGenerator {

    private static container: DependencyContainer;

    public botWepGen(sessionId: string, weaponTpl: string, equipmentSlot: string, botTemplateInventory: Inventory, weaponParentId: string, modChances: ModsChances, botRole: string, isPmc: boolean): GenerateWeaponResult {

        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
        const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const botEquipFilterServ = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
        const itemFilterServ = container.resolve<ItemFilterService>("ItemFilterService");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const _botModGen = new BotModGen(this.logger, jsonUtil, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseServer, durabilityLimitsHelper, this.itemHelper, inventoryHelper, containerHelper, botEquipFilterServ, itemFilterServ, profileHelper, configServer);

        const modPool = botTemplateInventory.mods;

        const weaponItemTemplate = this.itemHelper.getItem(weaponTpl)[1];

        if (!weaponItemTemplate) {
            this.logger.error(`Could not find item template with tpl ${weaponTpl}`);
            this.logger.error(`WeaponSlot -> ${equipmentSlot}`);
            return;
        }
        // Find ammo to use when filling magazines
        if (!botTemplateInventory.Ammo) {
            this.logger.error(`No ammo found for bot type ${botRole}`)
            throw new Error("bot generation failed");
        }

        const ammoTpl = this.getWeightedCompatibleAmmo(botTemplateInventory.Ammo, weaponItemTemplate);
        let weaponArray = this.constructWeaponBaseArray(weaponTpl, weaponParentId, equipmentSlot, weaponItemTemplate, botRole);

        // Add mods to weapon base
        if (Object.keys(modPool).includes(weaponTpl)) {
            weaponArray = _botModGen.botModGen(sessionId, weaponArray, modPool, weaponArray[0]._id, weaponItemTemplate, modChances, ammoTpl, botRole);
        }

        if (!this.isWepValid(weaponArray)) {
            // Something goofed, fallback to the weapons preset
            weaponArray = this.getPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, weaponItemTemplate, botRole);
        }

        // Fill existing magazines to full and sync ammo type
        for (const magazine of weaponArray.filter(x => x.slotId === this.modMagazineSlotId)) {
            this.fillExistingMagazines(weaponArray, magazine, ammoTpl);
        }

        return {
            weapon: weaponArray,
            chosenAmmo: ammoTpl,
            weaponMods: modPool,
            weaponTemplate: weaponItemTemplate
        };
    }

    public isWepValid(weaponItemArray: Item[]): boolean {
        const _checkRequired = new CheckRequired();
        for (const mod of weaponItemArray) {
            const modDbTemplate = this.itemHelper.getItem(mod._tpl)[1];
            if (!modDbTemplate._props.Slots || !modDbTemplate._props.Slots.length) {
                continue;
            }
            // Iterate over slots in db item, if required, check tpl in that slot matches the filter list
            for (const modSlot of modDbTemplate._props.Slots) {
                // ignore optional mods
                if (!_checkRequired.checkRequired(modSlot)) {
                    continue;
                }
                const allowedTpls = modSlot._props.filters[0].Filter;
                const slotName = modSlot._name;
                const weaponSlotItem = weaponItemArray.find(x => x.parentId === mod._id && x.slotId === slotName);
                if (!weaponSlotItem) {
                    this.logger.error(`Required slot '${modSlot._name}' on ${modDbTemplate._name} ${mod.slotId} was empty`);
                    return false;
                }
                if (!allowedTpls.includes(weaponSlotItem._tpl)) {
                    this.logger.error(`Required slot '${modSlot._name}' on ${modDbTemplate._name} has an invalid item: ${weaponSlotItem._tpl}`);
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

    public myShouldModBeSpawned(itemSlot: Slot, modSlot: string, modSpawnChances: ModsChances): boolean {
        const _checkRequired = new CheckRequired();
        const modSpawnChance = _checkRequired.checkRequired(itemSlot) || this.getAmmoContainers().includes(modSlot) ? 100 : modSpawnChances[modSlot];

        return this.probabilityHelper.rollChance(modSpawnChance)
    }

    myIsModValidForSlot(modTpl, found, itemSlot, modTemplate, modSlot, parentTemplate) {
        const _checkRequired = new CheckRequired();
        if (!found || !modTpl) {
            if (_checkRequired.checkRequired(itemSlot)) {
                this.logger.error(`Could not locate any compatible items to fill '${modSlot}' for ${parentTemplate._id}`);
            }
            return false;
        }
        if (!itemSlot._props.filters[0].Filter.includes(modTpl)) {
            this.logger.error(`Mod ${modTpl} is not compatible with slot '${modSlot}' for item ${parentTemplate._id}`);
            return false;
        }
        if (!modTemplate) {
            {
                this.logger.error(`Could not find mod item template with tpl ${modTpl}`);
                this.logger.info(`Item -> ${parentTemplate._id}; Slot -> ${modSlot}`);
                return false;
            }
        }
        return true;
    }

    public botModGen3(sessionId: string, items: Item[], modPool: Mods, parentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string): Item[] 
    {
            BotModGen.container = container;
            const randUtil = container.resolve<RandomUtil>("RandomUtil");
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
                        this.botModGen3(sessionId, items, modPool, modId, modTemplate, modSpawnChances, ammoTpl, botRole);
                    }
                }
            }
            return items;

    }


    public botModGen(sessionId: string, weapon: Item[], modPool: Mods, weaponParentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string): Item[] {
        BotModGen.container = container;
        const _checkRequired = new CheckRequired();

        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);
        const botEquipmentRole = (["usec", "bear"].includes(botRole)) ? "pmc" : botRole;

        const modLimits = {
            scope: { count: 0 },
            scopeMax: this.botConfig.equipment[botEquipmentRole]?.weaponModLimits?.scopeLimit,
            scopeBaseTypes: [BaseClasses.OPTIC_SCOPE, BaseClasses.BaseClasses.ASSAULT_SCOPE, BaseClasses.BaseClasses.COLLIMATOR, BaseClasses.BaseClasses.COMPACT_COLLIMATOR],
            flashlightLaser: { count: 0 },
            flashlightLaserMax: this.botConfig.equipment[botEquipmentRole]?.weaponModLimits?.lightLaserLimit,
            flashlgihtLaserBaseTypes: [BaseClasses.BaseClasses.TACTICAL_COMBO, BaseClasses.BaseClasses.FLASHLIGHT]
        };

        //const const modLimits = this.getWeaponModLimits
        const itemModPool = modPool[parentTemplate._id];
        const botEquipConfig = this.botConfig.equipment[botEquipmentRole];
        const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(botEquipmentRole, pmcProfile.Info.Level);
        if (!parentTemplate._props.Slots.length
            && !parentTemplate._props.Cartridges.length
            && !parentTemplate._props.Chambers.length) {
            this.logger.error(`Item ${parentTemplate._id} had mods defined, but no slots to support them`);
            return weapon;
        }

        // Iterate over mod pool and choose mods to add to item
        for (const modSlot in itemModPool) {
            const itemSlot = this.getModItemSlot(modSlot, parentTemplate);
            if (!itemSlot) {
                this.logger.error(`Slot '${modSlot}' does not exist for item ${parentTemplate._id} ${parentTemplate._name}`);
                continue;
            }

            if (!this.myShouldModBeSpawned(itemSlot, modSlot, modSpawnChances)) {
                continue;
            }

            let modTpl;
            let found = false;
            // It's ammo, use predefined ammo parameter
            if (this.getAmmoContainers().includes(modSlot) && modSlot !== "mod_magazine") {
                modTpl = ammoTpl;
            }
            else {
                if (botEquipConfig.randomisedWeaponModSlots && botEquipConfig.randomisedWeaponModSlots.includes(modSlot)) {
                    this.generateDynamicModPool(itemSlot._props.filters[0].Filter, botEquipBlacklist, modSlot, itemModPool);
                }
                // Find random mod and check its compatible
                const exhaustableModPool = new ExhaustableArray(itemModPool[modSlot], this.randomUtil, this.jsonUtil);
                while (exhaustableModPool.hasValues()) {
                    modTpl = exhaustableModPool.getRandomValue();
                    if (!this.isItemIncompatibleWithCurrentItems(weapon, modTpl, modSlot)) {
                        found = true;
                        break;
                    }
                }
            }
            // Find a mod to attach from items db for required slots if none found above
            const parentSlot = parentTemplate._props.Slots.find(i => i._name === modSlot);
            if (!found && parentSlot !== undefined && _checkRequired.checkRequired(parentSlot)) {
                modTpl = this.getModTplFromItemDb(modTpl, parentSlot, modSlot, weapon);
                found = !!modTpl;
            }
            const modTemplate = this.databaseServer.getTables().templates.items[modTpl];
            if (!this.myIsModValidForSlot(modTpl, found, itemSlot, modTemplate, modSlot, parentTemplate)) {
                continue;
            }
            // If mod is a scope, check we don't surpass limit
            const modIsScopeType = this.itemHelper.doesItemOrParentsIdMatch(modTpl, modLimits.scopeBaseTypes);
            if (modIsScopeType && this.weaponModLimitReached(modTpl, modLimits.scope, modLimits.scopeBaseTypes, modLimits.scopeMax, botEquipmentRole)) {
                continue;
            }
            // If mod is a light/laser, check we don't surpass limit
            const modIsLightOrLaser = this.itemHelper.doesItemOrParentsIdMatch(modTpl, modLimits.scopeBaseTypes);
            if (modIsLightOrLaser && this.weaponModLimitReached(modTpl, modLimits.flashlightLaser, modLimits.flashlgihtLaserBaseTypes, modLimits.flashlightLaserMax, botEquipmentRole)) {
                continue;
            }
            const modId = this.hashUtil.generate();
            weapon.push(this.createModItem(modId, modTpl, weaponParentId, modSlot, modTemplate));
            // I first thought we could use the recursive generateModsForItems as previously for cylinder magazines.
            // However, the recurse doesnt go over the slots of the parent mod but over the modPool which is given by the bot config
            // where we decided to keep cartridges instead of camoras. And since a CylinderMagazine only has one cartridge entry and
            // this entry is not to be filled, we need a special handling for the CylinderMagazine
            const modParentItem = this.databaseServer.getTables().templates.items[modTemplate._parent];
            if (this.magazineIsCylinderRelated(modParentItem._name)) {
                // we don't have child mods, we need to create the camoras for the magazines instead
                this.fillCamora(weapon, modPool, modId, modTemplate);
            }
            else {
                if (Object.keys(modPool).includes(modTpl)) {
                    // Call self recursivly
                    this.botModGen(sessionId, weapon, modPool, modId, modTemplate, modSpawnChances, ammoTpl, botRole);
                }
            }
        }
        return weapon;
    }

    public botModGen2(sessionId: string, weapon: Item[], modPool: Mods, weaponParentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string,): Item[] {
        BotModGen.container = container;
        const _checkRequired = new CheckRequired();
        const itemModPool = modPool[parentTemplate._id];

        if (!parentTemplate._props.Slots.length
            && !parentTemplate._props.Cartridges.length
            && !parentTemplate._props.Chambers.length) {
            this.logger.error(`Item ${parentTemplate._id} had mods defined, but no slots to support them`);
            return weapon;
        }

        for (const modSlot in itemModPool) {
            const itemSlot = this.getModItemSlot(modSlot, parentTemplate);
            if (!itemSlot) {
                this.logger.error(`Slot '${modSlot}' does not exist for item ${parentTemplate._id} ${parentTemplate._name}`);
                continue;
            }

            if (!this.myShouldModBeSpawned(itemSlot, modSlot, modSpawnChances)) {
                continue;
            }

            const exhaustableModPool = new ExhaustableArray(itemModPool[modSlot], this.randomUtil, this.jsonUtil);

            let modTpl: string;
            let found = false;
            while (exhaustableModPool.hasValues()) {
                modTpl = exhaustableModPool.getRandomValue();
                if (!this.isItemIncompatibleWithCurrentItems(weapon, modTpl, modSlot)) {
                    found = true;
                    break;
                }
            }

            // Find a mod to attach from items db for required slots if none found above
            const parentSlot = parentTemplate._props.Slots.find(i => i._name === modSlot);
            if (!found && parentSlot !== undefined && _checkRequired.checkRequired(parentSlot)) {
                modTpl = this.getModTplFromItemDb(modTpl, parentSlot, modSlot, weapon);
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
            }

            const parentItem = this.databaseServer.getTables().templates.items[modTemplate._parent];

            const modId = this.hashUtil.generate();
            weapon.push({
                "_id": modId,
                "_tpl": modTpl,
                "parentId": weaponParentId,
                "slotId": modSlot,
                ...this.generateExtraPropertiesForItem(modTemplate)
            });

            // I first thought we could use the recursive generateModsForItems as previously for cylinder magazines.
            // However, the recurse doesnt go over the slots of the parent mod but over the modPool which is given by the bot config
            // where we decided to keep cartridges instead of camoras. And since a CylinderMagazine only has one cartridge entry and
            // this entry is not to be filled, we need a special handling for the CylinderMagazine
            if (this.magazineIsCylinderRelated(parentItem._name)) {
                // we don't have child mods, we need to create the camoras for the magazines instead
                this.fillCamora(weapon, modPool, modId, modTemplate);
            }
            else {
                if (Object.keys(modPool).includes(modTpl)) {
                    this.botModGen2(sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole);
                }
            }
        }

        return weapon;
    }

}


