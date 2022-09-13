"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModGen = exports.CheckRequired = exports.BotWepGen = void 0;
const BotWeaponGenerator_1 = require("../../../../Aki_data/Server/lib/generators/BotWeaponGenerator");
const BotGeneratorHelper_1 = require("../../../../Aki_data/Server/lib/helpers/BotGeneratorHelper");
const tsyringe_1 = require("../../../../node_modules/tsyringe");
const BaseClasses = require("../../../../Aki_data/Server/lib/models/enums/BaseClasses");
class BotWepGen extends BotWeaponGenerator_1.BotWeaponGenerator {
    botWepGen(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc) {
        const jsonUtil = tsyringe_1.container.resolve("JsonUtil");
        const probabilityHelper = tsyringe_1.container.resolve("ProbabilityHelper");
        const inventoryHelper = tsyringe_1.container.resolve("InventoryHelper");
        const containerHelper = tsyringe_1.container.resolve("ContainerHelper");
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const configServer = tsyringe_1.container.resolve("ConfigServer");
        const botEquipFilterServ = tsyringe_1.container.resolve("BotEquipmentFilterService");
        const itemFilterServ = tsyringe_1.container.resolve("ItemFilterService");
        const profileHelper = tsyringe_1.container.resolve("ProfileHelper");
        const botWeaponGeneratorHelper = tsyringe_1.container.resolve("BotWeaponGeneratorHelper");
        const _botModGen = new BotModGen(this.logger, jsonUtil, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseServer, durabilityLimitsHelper, this.itemHelper, inventoryHelper, containerHelper, botEquipFilterServ, itemFilterServ, profileHelper, botWeaponGeneratorHelper, configServer);
        const modPool = botTemplateInventory.mods;
        const weaponItemTemplate = this.itemHelper.getItem(weaponTpl)[1];
        if (!weaponItemTemplate) {
            this.logger.error(`Could not find item template with tpl ${weaponTpl}`);
            this.logger.error(`WeaponSlot -> ${equipmentSlot}`);
            return;
        }
        // Find ammo to use when filling magazines
        if (!botTemplateInventory.Ammo) {
            this.logger.error(`No ammo found for bot type ${botRole}`);
            throw new Error("bot generation failed");
        }
        const ammoTpl = this.getWeightedCompatibleAmmo(botTemplateInventory.Ammo, weaponItemTemplate);
        let weaponArray = this.constructWeaponBaseArray(weaponTpl, weaponParentId, equipmentSlot, weaponItemTemplate, botRole);
        // Add mods to weapon base
        if (Object.keys(modPool).includes(weaponTpl)) {
            weaponArray = _botModGen.botModGen(sessionId, weaponArray, modPool, weaponArray[0]._id, weaponItemTemplate, modChances, ammoTpl, botRole); ///////////////////////////////////////////////
        }
        if (!this.isWepValid(weaponArray)) {
            // Something goofed, fallback to the weapons preset
            weaponArray = this.getPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, weaponItemTemplate, botRole); //////////////////////////////////////////////////
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
    isWepValid(weaponItemArray) {
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
exports.BotWepGen = BotWepGen;
class CheckRequired {
    checkRequired(slot) {
        if (slot?._botRequired != undefined) {
            if (slot._botRequired == true)
                return true;
        }
        else if (slot._required == true)
            return true;
        return false;
    }
}
exports.CheckRequired = CheckRequired;
class BotModGen extends BotGeneratorHelper_1.BotGeneratorHelper {
    myShouldModBeSpawned(itemSlot, modSlot, modSpawnChances) {
        const _checkRequired = new CheckRequired();
        const modSpawnChance = _checkRequired.checkRequired(itemSlot) || this.getAmmoContainers().includes(modSlot) ? 100 : modSpawnChances[modSlot];
        if (modSpawnChance === 100) {
            return true;
        }
        return this.probabilityHelper.rollChance(modSpawnChance);
    }
    myIsModValidForSlot(modToAdd, itemSlot, modSlot, parentTemplate) {
        const _checkRequired = new CheckRequired();
        if (!modToAdd[0]) {
            if (_checkRequired.checkRequired(itemSlot)) {
                this.logger.error(`Could not locate any compatible mods to fill slot: '${modSlot}' for item: ${parentTemplate._name}`);
            }
            return false;
        }
        if (!itemSlot._props.filters[0].Filter.includes(modToAdd[1]._id)) {
            this.logger.error(`Mod ${modToAdd[1]._id} is not compatible with slot: '${modSlot}' for item: ${parentTemplate._name}`);
            return false;
        }
        if (!modToAdd[1]) {
            {
                this.logger.error(`Could not find mod item template with tpl ${modToAdd[1]._id}`);
                this.logger.info(`Item -> ${parentTemplate._id}; Slot -> ${modSlot}`);
                return false;
            }
        }
        return true;
    }
    botModGen(sessionId, weapon, modPool, weaponParentId, parentWeaponTemplate, modSpawnChances, ammoTpl, botRole) {
        BotModGen.container = tsyringe_1.container;
        const _checkRequired = new CheckRequired();
        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);
        const botEquipmentRole = (["usec", "bear"].includes(botRole)) ? "pmc" : botRole;
        const modLimits = this.initModLimits(botEquipmentRole);
        const compatibleModsPool = modPool[parentWeaponTemplate._id];
        const botEquipConfig = this.botConfig.equipment[botEquipmentRole];
        const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(botEquipmentRole, pmcProfile.Info.Level);
        if (!parentWeaponTemplate._props.Slots.length
            && !parentWeaponTemplate._props.Cartridges.length
            && !parentWeaponTemplate._props.Chambers.length) {
            this.logger.error(`Unable to add mods to weapon ${parentWeaponTemplate._name} ${parentWeaponTemplate._id} but lacks slots/cartridges/chambers`);
            return weapon;
        }
        // Iterate over mod pool and choose mods to add to item
        for (const modSlot in compatibleModsPool) {
            const modsParent = this.getModItemSlot(modSlot, parentWeaponTemplate);
            if (!modsParent) {
                this.logger.error(`'${modSlot}' does not exist for weapon ${parentWeaponTemplate._id} ${parentWeaponTemplate._name}`);
                continue;
            }
            if (!this.myShouldModBeSpawned(modsParent, modSlot, modSpawnChances)) {
                continue;
            }
            const isRandomisableSlot = botEquipConfig.randomisedWeaponModSlots && botEquipConfig.randomisedWeaponModSlots.includes(modSlot);
            const modToAdd = this.chooseModToPutIntoSlot(modSlot, isRandomisableSlot, modsParent, botEquipBlacklist, compatibleModsPool, weapon, ammoTpl, parentWeaponTemplate);
            const modToAddTemplate = modToAdd[1];
            if (!this.isModValidForSlot(modToAdd, modsParent, modSlot, parentWeaponTemplate)) {
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
            weapon.push(this.createModItem(modId, modToAddTemplate._id, weaponParentId, modSlot, modToAddTemplate));
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
}
exports.BotModGen = BotModGen;
