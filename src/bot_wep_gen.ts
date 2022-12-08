
import { BotWeaponGenerator } from "@spt-aki/generators/BotWeaponGenerator";
import { BotGeneratorHelper } from "@spt-aki/helpers/BotGeneratorHelper";
import { container, DependencyContainer } from "tsyringe";
import { ITemplateItem, Slot } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Inventory, Mods, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { Item, Upd } from "@spt-aki/models/eft/common/tables/IItem";
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
import { BotWeaponGeneratorHelper } from "@spt-aki/helpers/BotWeaponGeneratorHelper";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { Preset } from "@spt-aki/models/eft/common/IGlobals";
import { BotTierTracker, RaidInfoTracker } from "./helper";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LocalisationService } from "@spt-aki/services/LocalisationService";



export class BotWepGen extends BotWeaponGenerator {


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
        const botWeaponGeneratorHelper = container.resolve<BotWeaponGeneratorHelper>("BotWeaponGeneratorHelper");
        const localisationService = container.resolve<LocalisationService>("LocalisationService");

        const _botModGen = new BotModGen(this.logger, jsonUtil, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseServer, durabilityLimitsHelper, this.itemHelper, inventoryHelper, containerHelper, botEquipFilterServ, itemFilterServ, profileHelper, botWeaponGeneratorHelper, localisationService, configServer);

        const modPool = botTemplateInventory.mods;
        const weaponItemTemplate = this.itemHelper.getItem(weaponTpl)[1];

        if (!weaponItemTemplate) {
            this.logger.error(this.localisationService.getText("bot-missing_item_template", weaponTpl));
            this.logger.error(`WeaponSlot -> ${equipmentSlot}`);
            return;
        }
        // Find ammo to use when filling magazines
        if (!botTemplateInventory.Ammo) {
            this.logger.error(this.localisationService.getText("bot-no_ammo_found_in_bot_json", botRole));
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

    private isWepValid(weaponItemArray: Item[]): boolean {
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
                    this.logger.info(`Required slot '${modSlot._name}' on ${modDbTemplate._name} ${mod.slotId} was empty`);
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

    public override getPresetWeaponMods(weaponTpl: string, equipmentSlot: string, weaponParentId: string, itemTemplate: ITemplateItem, botRole: string): Item[] {

        //right now it will just pick the first preset that matches, need to find a way to randomize it.
        const tierChecker = new BotTierTracker();
        const tier = tierChecker.getTier(botRole);

        // this.logger.warning(`//////////////////////////////${botRole}///////////////////////////////////`);
        // this.logger.warning(`//////////////////////////////${tier}///////////////////////////////////`);
        this.logger.info(`Realism Mod: Fetching Custom Preset For Bot, All Working As Intended.`);
        const weaponMods = [];
        const weaponPresets = [];
        try {
            let preset;
            //I need to put all preset files in the same folder
            let presetFile = require(`../db/bots/loadouts/weaponPresets/${botRole}Presets.json`);
            for (let presetObj in presetFile) {
                if (presetFile[presetObj]._items[0]._tpl === weaponTpl) {
                    let presetTier = presetFile[presetObj]._name.slice(0, 1);
                    let pTierNum = Number(presetTier);
                    if (pTierNum <= tier) {
                        weaponPresets.push(presetFile[presetObj]);
                        // this.logger.warning(`Found A Preset Within Tier`);
                    }

                }
            }
            if (weaponPresets.length == 0) {
                for (let presetObj in presetFile) {
                    if (presetFile[presetObj]._items[0]._tpl === weaponTpl) {
                        weaponPresets.push(presetFile[presetObj]);
                        // this.logger.warning(`Found a preset outside of tier`);
                    }
                }
            }
            // this.logger.warning("Choices:");
            // for (let i in weaponPresets) {
            //     this.logger.warning(weaponPresets[i]._name);
            // }

            let randomPreset = weaponPresets[Math.floor(Math.random() * weaponPresets.length)]
            // this.logger.warning("Chose:");
            // this.logger.warning(randomPreset._name);
            preset = this.jsonUtil.clone(randomPreset);

            //find a way to check for specific slots and then change the itemID, getting it from an array of possible items for that slot. Base weapon preset would need
            //whatever rail adapters it needs, etc. Could be very error prone due to BSG's inconsistent slot naming.
            if (preset) {
                const parentItem = preset._items[0];
                preset._items[0] = {
                    ...parentItem, ...{
                        "parentId": weaponParentId,
                        "slotId": equipmentSlot,
                        ...this.botGeneratorHelper.generateExtraPropertiesForItem(itemTemplate, botRole)
                    }
                };
                weaponMods.push(...preset._items);
            }
        }
        catch {
            this.logger.warning(`Realism Mod: Failed To Find Custom Preset For Bot ${botRole} At Tier ${tier}`);
            this.logger.warning(this.localisationService.getText("bot-weapon_generated_incorrect_using_default", weaponTpl));
            let preset: Preset;
            for (const presetObj of Object.values(this.databaseServer.getTables().globals.ItemPresets)) {
                if (presetObj._items[0]._tpl === weaponTpl) {
                    preset = this.jsonUtil.clone(presetObj);
                    break;
                }
            }
            if (preset) {
                const parentItem = preset._items[0];
                preset._items[0] = {
                    ...parentItem, ...{
                        "parentId": weaponParentId,
                        "slotId": equipmentSlot,
                        ...this.botGeneratorHelper.generateExtraPropertiesForItem(itemTemplate, botRole)
                    }
                };
                weaponMods.push(...preset._items);
            }
            else {
                throw new Error(this.localisationService.getText("bot-missing_weapon_preset", weaponTpl));
            }
        }
        return weaponMods;
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



    private myShouldModBeSpawned(itemSlot: Slot, modSlot: string, modSpawnChances: ModsChances, checkRequired: CheckRequired): boolean {

        const modSpawnChance = checkRequired.checkRequired(itemSlot) || this.getAmmoContainers().includes(modSlot) ? 100 : modSpawnChances[modSlot];

        if (modSpawnChance === 100) {
            return true;
        }

        return this.probabilityHelper.rollChance(modSpawnChance)
    }

    private myIsModValidForSlot(modToAdd: [boolean, ITemplateItem], itemSlot: Slot, modSlot: string, parentTemplate: ITemplateItem, checkRequired: CheckRequired): boolean {
   
        if (!modToAdd[1]) {
            {
                this.logger.error(this.localisationService.getText("bot-no_item_template_found_when_adding_mod", { modId: modToAdd[1]._id, modSlot: modSlot }));
                this.logger.debug(`Item -> ${parentTemplate._id}; Slot -> ${modSlot}`);

                return false;
            }
        }

        if (!modToAdd[0]) {
            if (checkRequired.checkRequired(itemSlot)) {
                this.logger.error(this.localisationService.getText("bot-unable_to_add_mod_item_invalid", { itemName: modToAdd[1]._name, modSlot: modSlot, parentItemName: parentTemplate._name }));
            }

            return false;
        }

        if (!itemSlot._props.filters[0].Filter.includes(modToAdd[1]._id)) {
            this.logger.error(this.localisationService.getText("bot-mod_not_in_slot_filter_list", { modId: modToAdd[1]._id, modSlot: modSlot, parentName: parentTemplate._name }));

            return false;
        }


        return true;
    }

    public botModGen(sessionId: string, weapon: Item[], modPool: Mods, weaponParentId: string, parentWeaponTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string): Item[] {
     
        const checkRequired = new CheckRequired();

        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);
        const botEquipmentRole = this.getBotEquipmentRole(botRole);
        const modLimits = this.initModLimits(botEquipmentRole);

        const compatibleModsPool = modPool[parentWeaponTemplate._id];

        const botEquipConfig = this.botConfig.equipment[botEquipmentRole];
        const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(botEquipmentRole, pmcProfile.Info.Level);

        if (!parentWeaponTemplate._props.Slots.length
            && !parentWeaponTemplate._props.Cartridges.length
            && !parentWeaponTemplate._props.Chambers.length) {
            this.logger.error(this.localisationService.getText("bot-unable_to_add_mods_to_weapon_missing_ammo_slot", { weaponName: parentWeaponTemplate._name, weaponId: parentWeaponTemplate._id }));

            return weapon;
        }

        // Iterate over mod pool and choose mods to add to item
        for (const modSlot in compatibleModsPool) {
            const modsParent = this.getModItemSlot(modSlot, parentWeaponTemplate);

            if (!modsParent) {
                this.logger.error(this.localisationService.getText("bot-weapon_missing_mod_slot", { modSlot: modSlot, weaponId: parentWeaponTemplate._id, weaponName: parentWeaponTemplate._name }));
                continue;
            }

            if (!this.myShouldModBeSpawned(modsParent, modSlot, modSpawnChances, checkRequired)) {
                continue;
            }

            const isRandomisableSlot = botEquipConfig.randomisedWeaponModSlots && botEquipConfig.randomisedWeaponModSlots.includes(modSlot);
            const modToAdd = this.chooseModToPutIntoSlot(modSlot, isRandomisableSlot, modsParent, botEquipBlacklist, compatibleModsPool, weapon, ammoTpl, parentWeaponTemplate);

            // Compatible mod not found
            if (!modToAdd) {
                continue;
            }

            const modToAddTemplate = modToAdd[1];

            if (!this.myIsModValidForSlot(modToAdd, modsParent, modSlot, parentWeaponTemplate, checkRequired)) {
                continue;
            }

            if (this.modHasReachedItemLimit(botEquipmentRole, modToAddTemplate, modLimits)) {
                continue;
            }

            // if mod_scope/mod_mount is randomly generated, check and add any sub mod_scope objects into the pool of mods
            // This helps fix empty mounts appearing on weapons
            if (isRandomisableSlot && ["mod_scope", "mod_mount"].includes(modSlot.toLowerCase())) {
                // mod_mount was picked to be added to weapon, force scope chance to ensure its filled
                if (modToAddTemplate._parent == BaseClasses.MOUNT) {
                    modSpawnChances.mod_scope = 100;
                    modSpawnChances["mod_scope_000"] = 100;
                    modSpawnChances["mod_scope_001"] = 100;
                    modSpawnChances["mod_scope_002"] = 100;
                }

                this.addCompatibleModsForProvidedMod("mod_scope", modToAddTemplate, modPool, botEquipBlacklist);
            }

            // If front/rear sight are to be added, set opposite to 100% chance
            if (["mod_sight_front", "mod_sight_rear"].includes(modSlot)) {
                modSpawnChances.mod_sight_front = 100;
                modSpawnChances.mod_sight_rear = 100;
            }

            const modId = this.hashUtil.generate();
            weapon.push(this.createModItem(modId, modToAddTemplate._id, weaponParentId, modSlot, modToAddTemplate, botRole));

            // I first thought we could use the recursive generateModsForItems as previously for cylinder magazines.
            // However, the recurse doesnt go over the slots of the parent mod but over the modPool which is given by the bot config
            // where we decided to keep cartridges instead of camoras. And since a CylinderMagazine only has one cartridge entry and
            // this entry is not to be filled, we need a special handling for the CylinderMagazine
            const modParentItem = this.databaseServer.getTables().templates.items[modToAddTemplate._parent];
            if (this.botWeaponGeneratorHelper.magazineIsCylinderRelated(modParentItem._name)) {
                // we don't have child mods, we need to create the camoras for the magazines instead
                this.fillCamora(weapon, modPool, modId, modToAddTemplate);
            }
            else {
                if (Object.keys(modPool).includes(modToAddTemplate._id)) {
                    // Call self recursivly
                    this.botModGen(sessionId, weapon, modPool, modId, modToAddTemplate, modSpawnChances, ammoTpl, botRole);
                }
            }
        }
        return weapon;
    }

    public genExtraItemProps(itemTemplate: ITemplateItem, botRole = null): { upd?: Upd } {
        const properties: Upd = {};

        if (itemTemplate._props.MaxDurability) {
            if (itemTemplate._props.weapClass) // Is weapon
            {
                properties.Repairable = this.generateWeaponRepairableProperties(itemTemplate, botRole);
            }
            else if (itemTemplate._props.armorClass) // Is armor
            {
                properties.Repairable = this.generateArmorRepairableProperties(itemTemplate, botRole)
            }
        }

        if (itemTemplate._props.HasHinge) {
            properties.Togglable = { "On": true };
        }

        if (itemTemplate._props.Foldable) {
            properties.Foldable = { "Folded": false };
        }

        if (itemTemplate._props.weapFireType && itemTemplate._props.weapFireType.length) {
            properties.FireMode = { "FireMode": this.randomUtil.getArrayValue(itemTemplate._props.weapFireType) };
        }

        if (itemTemplate._props.MaxHpResource) {
            properties.MedKit = { "HpResource": itemTemplate._props.MaxHpResource };
        }

        if (itemTemplate._props.MaxResource && itemTemplate._props.foodUseTime) {
            properties.FoodDrink = { "HpPercent": itemTemplate._props.MaxResource };
        }

        if ([BaseClasses.FLASHLIGHT, BaseClasses.LIGHT_LASER].includes(<BaseClasses>itemTemplate._parent)) {
            properties.Light = { "IsActive": this.randomUtil.getBool(), "SelectedMode": 0 }
        }


        if ([BaseClasses.FLASHLIGHT, BaseClasses.LIGHT_LASER].includes(<BaseClasses>itemTemplate._parent)) {
            // Get chance from botconfig for bot type, use 50% if no value found
            const lightLaserActiveChance = (this.botConfig.equipment[this.getBotEquipmentRole(botRole)]?.lightLaserIsActiveChancePercent != undefined)
                ? this.botConfig.equipment[this.getBotEquipmentRole(botRole)].lightLaserIsActiveChancePercent
                : 50;
            properties.Light = { "IsActive": (this.randomUtil.getInt(1, 100) < lightLaserActiveChance), "SelectedMode": 0 }
        }

        if (itemTemplate._parent === BaseClasses.NIGHTVISION) {
            if (RaidInfoTracker.TOD == "night") {
                properties.Togglable = { "On": true }
            } else {
                properties.Togglable = { "On": false }
            }
        }
        // Togglable face shield
        if (itemTemplate._props.HasHinge && itemTemplate._props.FaceShieldComponent) {
            // Get chance from botconfig for bot type, use 75% if no value found
            const faceShieldActiveChance = (this.botConfig.equipment[this.getBotEquipmentRole(botRole)]?.faceShieldIsActiveChancePercent != undefined)
                ? this.botConfig.equipment[this.getBotEquipmentRole(botRole)].faceShieldIsActiveChancePercent
                : 100;
            if (faceShieldActiveChance === 100) {
                properties.Togglable = { "On": true }
            }
            else {
                properties.Togglable = { "On": (this.randomUtil.getInt(1, 100) < faceShieldActiveChance) }
            }

        }

        return Object.keys(properties).length
            ? { upd: properties }
            : {};
    }
}


