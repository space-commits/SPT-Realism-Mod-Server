"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotGenHelper = exports.CheckRequired = exports.BotWepGen = exports.GenBotLvl = void 0;
const BotWeaponGenerator_1 = require("C:/snapshot/project/obj/generators/BotWeaponGenerator");
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const helper_1 = require("./helper");
const BotEquipmentModGenerator_1 = require("C:/snapshot/project/obj/generators/BotEquipmentModGenerator");
const BotGeneratorHelper_1 = require("C:/snapshot/project/obj/helpers/BotGeneratorHelper");
const BotLevelGenerator_1 = require("C:/snapshot/project/obj/generators/BotLevelGenerator");
const InventoryMagGen_1 = require("C:/snapshot/project/obj/generators/weapongen/InventoryMagGen");
const enums_1 = require("./enums");
const modConfig = require("../config/config.json");
class GenBotLvl extends BotLevelGenerator_1.BotLevelGenerator {
    genBotLvl(levelDetails, botGenerationDetails, bot) {
        const expTable = this.databaseServer.getTables().globals.config.exp.level.exp_table;
        const highestLevel = this.getHighestRelativeBotLevel(botGenerationDetails.playerLevel, botGenerationDetails.botRelativeLevelDeltaMax, levelDetails, expTable);
        // Get random level based on the exp table.
        let exp = 0;
        let level = 1;
        if (bot.Info.Settings.Role === "sptBear" || bot.Info.Settings.Role === "sptUsec") {
            level = this.randomUtil.getInt(levelDetails.min, levelDetails.max);
        }
        else {
            level = this.randomUtil.getInt(1, highestLevel);
        }
        for (let i = 0; i < level; i++) {
            exp += expTable[i].exp;
        }
        // Sprinkle in some random exp within the level, unless we are at max level.
        if (level < expTable.length - 1) {
            exp += this.randomUtil.getInt(0, expTable[level].exp - 1);
        }
        return { level, exp };
    }
}
exports.GenBotLvl = GenBotLvl;
class BotWepGen extends BotWeaponGenerator_1.BotWeaponGenerator {
    magGen(generatedWeaponResult, magCounts, inventory, botRole) {
        const weaponMods = generatedWeaponResult.weapon;
        const weaponTemplate = generatedWeaponResult.weaponTemplate;
        const ammoTpl = generatedWeaponResult.chosenAmmoTpl;
        const magazineTpl = this.getMagazineTplFromWeaponTemplate(weaponMods, weaponTemplate, botRole);
        if (weaponTemplate._props.weapClass === enums_1.ParentClasses.PISTOL) {
            magCounts.min = Math.max(1, Math.round(magCounts.min * 0.5));
            magCounts.max = Math.max(2, Math.round(magCounts.max * 0.5));
        }
        const magTemplate = this.itemHelper.getItem(magazineTpl)[1];
        if (!magTemplate) {
            this.logger.error(this.localisationService.getText("bot-unable_to_find_magazine_item", magazineTpl));
            return;
        }
        const ammoTemplate = this.itemHelper.getItem(ammoTpl)[1];
        if (!ammoTemplate) {
            this.logger.error(this.localisationService.getText("bot-unable_to_find_ammo_item", ammoTpl));
            return;
        }
        const inventoryMagGenModel = new InventoryMagGen_1.InventoryMagGen(magCounts, magTemplate, weaponTemplate, ammoTemplate, inventory);
        this.inventoryMagGenComponents.find(v => v.canHandleInventoryMagGen(inventoryMagGenModel)).process(inventoryMagGenModel);
        // Add x stacks of bullets to SecuredContainer (bots use a magic mag packing skill to reload instantly)
        this.addAmmoToSecureContainer(this.botConfig.secureContainerAmmoStackCount, ammoTpl, ammoTemplate._props.StackMaxSize, inventory);
    }
    botWepGen(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel) {
        const probabilityHelper = tsyringe_1.container.resolve("ProbabilityHelper");
        const profileHelper = tsyringe_1.container.resolve("ProfileHelper");
        const botEquipmentFilterService = tsyringe_1.container.resolve("BotEquipmentFilterService");
        const itemFilterService = tsyringe_1.container.resolve("ItemFilterService");
        const botHelper = tsyringe_1.container.resolve("BotHelper");
        const botEquipmentModPoolService = tsyringe_1.container.resolve("BotEquipmentModPoolService");
        const _botModGen = new BotGenHelper(this.logger, this.jsonUtil, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseServer, this.itemHelper, botEquipmentFilterService, itemFilterService, profileHelper, this.botWeaponModLimitService, botHelper, this.botGeneratorHelper, this.botWeaponGeneratorHelper, this.localisationService, botEquipmentModPoolService, this.configServer);
        const modPool = botTemplateInventory.mods;
        const weaponItemTemplate = this.itemHelper.getItem(weaponTpl)[1];
        if (!weaponItemTemplate) {
            this.logger.error(this.localisationService.getText("bot-missing_item_template", weaponTpl));
            this.logger.error(`WeaponSlot -> ${equipmentSlot}`);
            return;
        }
        // Find ammo to use when filling magazines/chamber
        if (!botTemplateInventory.Ammo) {
            this.logger.error(this.localisationService.getText("bot-no_ammo_found_in_bot_json", botRole));
            throw new Error(this.localisationService.getText("bot-generation_failed"));
        }
        const ammoTpl = this.getWeightedCompatibleAmmo(botTemplateInventory.Ammo, weaponItemTemplate);
        // Create with just base weapon item
        let weaponWithModsArray = this.constructWeaponBaseArray(weaponTpl, weaponParentId, equipmentSlot, weaponItemTemplate, botRole);
        // Add mods to weapon base
        if (Object.keys(modPool).includes(weaponTpl)) {
            const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(botRole);
            const modLimits = this.botWeaponModLimitService.getWeaponModLimits(botEquipmentRole);
            weaponWithModsArray = _botModGen.botModGen(sessionId, weaponWithModsArray, modPool, weaponWithModsArray[0]._id, weaponItemTemplate, modChances, ammoTpl, botRole, botLevel, modLimits, botEquipmentRole);
        }
        // Use weapon preset from globals.json if weapon isnt valid
        if (!this.myIsWeaponValid(weaponWithModsArray)) {
            // Weapon is bad, fall back to weapons preset
            weaponWithModsArray = this.getPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, weaponItemTemplate, botRole);
        }
        // Fill existing magazines to full and sync ammo type
        for (const magazine of weaponWithModsArray.filter(x => x.slotId === this.modMagazineSlotId)) {
            this.fillExistingMagazines(weaponWithModsArray, magazine, ammoTpl);
        }
        // Fill UBGL if found
        const ubglMod = weaponWithModsArray.find(x => x.slotId === "mod_launcher");
        let ubglAmmoTpl = undefined;
        if (ubglMod) {
            const ubglTemplate = this.itemHelper.getItem(ubglMod._tpl)[1];
            ubglAmmoTpl = this.getWeightedCompatibleAmmo(botTemplateInventory.Ammo, ubglTemplate);
            this.fillUbgl(weaponWithModsArray, ubglMod, ubglAmmoTpl);
        }
        return {
            weapon: weaponWithModsArray,
            chosenAmmoTpl: ammoTpl,
            chosenUbglAmmoTpl: ubglAmmoTpl,
            weaponMods: modPool,
            weaponTemplate: weaponItemTemplate
        };
    }
    myIsWeaponValid(weaponItemArray) {
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
                    this.logger.info(this.localisationService.getText("bot-weapons_required_slot_missing_item", { modSlot: modSlot._name, modName: modDbTemplate._name, slotId: mod.slotId }));
                    return false;
                }
                if (!allowedTpls.includes(weaponSlotItem._tpl)) {
                    this.logger.warning(this.localisationService.getText("bot-weapon_contains_invalid_item", { modSlot: modSlot._name, modName: modDbTemplate._name, weaponTpl: weaponSlotItem._tpl }));
                    return false;
                }
            }
        }
        return true;
    }
    getPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole) {
        const tierChecker = new helper_1.BotTierTracker();
        const tier = tierChecker.getTier(botRole);
        if (modConfig.logEverything == true) {
            this.logger.warning(`//////////////////////////////${botRole}///////////////////////////////////`);
            this.logger.warning(`//////////////////////////////${tier}///////////////////////////////////`);
            this.logger.info(`Realism Mod: Fetching Custom Preset For ${botRole} At Tier ${tier}`);
        }
        var weaponMods = [];
        var weaponPresets = [];
        try {
            let preset;
            let presetFile = require(`../db/bots/loadouts/weaponPresets/${botRole}Presets.json`);
            for (let presetObj in presetFile) {
                if (presetFile[presetObj]._items[0]._tpl === weaponTpl) {
                    let presetTier = presetFile[presetObj]._name.slice(0, 1);
                    let pTierNum = Number(presetTier);
                    if (pTierNum <= tier) {
                        weaponPresets.push(presetFile[presetObj]);
                        if (modConfig.logEverything == true) {
                            this.logger.warning(`Found A Preset Within Tier`);
                        }
                    }
                }
            }
            if (weaponPresets.length == 0) {
                for (let presetObj in presetFile) {
                    if (presetFile[presetObj]._items[0]._tpl === weaponTpl) {
                        weaponPresets.push(presetFile[presetObj]);
                        if (modConfig.logEverything == true) {
                            this.logger.warning(`Found a preset outside of tier`);
                        }
                    }
                }
            }
            if (modConfig.logEverything == true) {
                this.logger.warning("Choices:");
            }
            for (let i in weaponPresets) {
                if (modConfig.logEverything == true) {
                    this.logger.warning(weaponPresets[i]._name);
                }
            }
            let randomPreset = weaponPresets[Math.floor(Math.random() * weaponPresets.length)];
            if (modConfig.logEverything == true) {
                this.logger.warning("Chose:");
                this.logger.warning(randomPreset._name);
            }
            preset = this.jsonUtil.clone(randomPreset);
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
            this.logger.info(`Realism Mod: Preset was Fetched. Working as intended, do not report as issue.`);
        }
        catch {
            this.logger.warning(`Realism Mod: Failed To Find Custom Preset For Bot ${botRole} At Tier ${tier}`);
            this.logger.warning(this.localisationService.getText("bot-weapon_generated_incorrect_using_default", weaponTpl));
            let preset;
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
class BotGenHelper extends BotEquipmentModGenerator_1.BotEquipmentModGenerator {
    myShouldModBeSpawned(itemSlot, modSlot, modSpawnChances, checkRequired) {
        const modSpawnChance = checkRequired.checkRequired(itemSlot) || this.getAmmoContainers().includes(modSlot)
            ? 100
            : modSpawnChances[modSlot];
        if (modSpawnChance === 100) {
            return true;
        }
        return this.probabilityHelper.rollChance(modSpawnChance);
    }
    myIsModValidForSlot(modToAdd, itemSlot, modSlot, parentTemplate, checkRequired) {
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
    mychooseModToPutIntoSlot(modSlot, isRandomisableSlot, botWeaponSightWhitelist, botEquipBlacklist, itemModPool, weapon, ammoTpl, parentTemplate) {
        let modTpl;
        let found = false;
        const parentSlot = parentTemplate._props.Slots.find(i => i._name === modSlot);
        // It's ammo, use predefined ammo parameter
        if (this.getAmmoContainers().includes(modSlot) && modSlot !== "mod_magazine") {
            modTpl = ammoTpl;
        }
        else {
            if (isRandomisableSlot) {
                itemModPool[modSlot] = this.getDynamicModPool(parentTemplate._id, modSlot, botEquipBlacklist);
            }
            if (!itemModPool[modSlot] && !parentSlot._required) {
                this.logger.debug(`Mod pool for slot: ${modSlot} on item: ${parentTemplate._name} was empty, skipping mod`);
                return null;
            }
            // Filter out non-whitelisted scopes
            if (modSlot.includes("mod_scope") && botWeaponSightWhitelist) {
                // scope pool has more than one scope
                if (itemModPool[modSlot].length > 1) {
                    itemModPool[modSlot] = this.filterSightsByWeaponType(weapon[0], itemModPool[modSlot], botWeaponSightWhitelist);
                }
            }
            // Pick random mod and check it's compatible
            const exhaustableModPool = new BotGeneratorHelper_1.ExhaustableArray(itemModPool[modSlot], this.randomUtil, this.jsonUtil);
            let modCompatibilityResult = { incompatible: false, reason: "" };
            while (exhaustableModPool.hasValues()) {
                modTpl = exhaustableModPool.getRandomValue();
                modCompatibilityResult = this.botGeneratorHelper.isItemIncompatibleWithCurrentItems(weapon, modTpl, modSlot);
                if (!modCompatibilityResult.incompatible) {
                    found = true;
                    break;
                }
            }
            if (modCompatibilityResult.incompatible && parentSlot._required) {
                this.logger.warning(modCompatibilityResult.reason);
            }
        }
        // Get random mod to attach from items db for required slots if none found above
        if (!found && parentSlot !== undefined && parentSlot._required) {
            modTpl = this.getModTplFromItemDb(modTpl, parentSlot, modSlot, weapon);
            found = !!modTpl;
        }
        // Compatible item not found + not required
        if (!found && parentSlot !== undefined && !parentSlot._required) {
            return null;
        }
        if (!found && parentSlot !== undefined) {
            if (parentSlot._required) {
                this.logger.warning(`Required slot unable to be filled, ${modSlot} on ${parentTemplate._name} ${parentTemplate._id} for weapon ${weapon[0]._tpl}`);
            }
            return null;
        }
        return this.itemHelper.getItem(modTpl);
    }
    botModGen(sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole, botLevel, modLimits, botEquipmentRole) {
        const checkRequired = new CheckRequired();
        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);
        // Get pool of mods that fit weapon
        const compatibleModsPool = modPool[parentTemplate._id];
        // Null guard against bad input weapon
        if (!parentTemplate._props.Slots.length
            && !parentTemplate._props.Cartridges.length
            && !parentTemplate._props.Chambers.length) {
            this.logger.error(this.localisationService.getText("bot-unable_to_add_mods_to_weapon_missing_ammo_slot", { weaponName: parentTemplate._name, weaponId: parentTemplate._id }));
            return weapon;
        }
        const botEquipConfig = this.botConfig.equipment[botEquipmentRole];
        const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(botEquipmentRole, pmcProfile.Info.Level);
        const botWeaponSightWhitelist = this.botEquipmentFilterService.getBotWeaponSightWhitelist(botEquipmentRole);
        const randomisationSettings = this.botHelper.getBotRandomizationDetails(botLevel, botEquipConfig);
        const sortedModKeys = this.sortModKeys(Object.keys(compatibleModsPool));
        // Iterate over mod pool and choose mods to add to item
        for (const modSlot of sortedModKeys) {
            // Check weapon has slot for mod to fit in
            const modsParentSlot = this.getModItemSlot(modSlot, parentTemplate);
            if (!modsParentSlot) {
                this.logger.warning(this.localisationService.getText("bot-weapon_missing_mod_slot", { modSlot: modSlot, weaponId: parentTemplate._id, weaponName: parentTemplate._name }));
                continue;
            }
            // Check spawn chance of mod
            if (!this.myShouldModBeSpawned(modsParentSlot, modSlot, modSpawnChances, checkRequired)) {
                continue;
            }
            const isRandomisableSlot = randomisationSettings && randomisationSettings.randomisedWeaponModSlots?.includes(modSlot);
            const modToAdd = this.mychooseModToPutIntoSlot(modSlot, isRandomisableSlot, botWeaponSightWhitelist, botEquipBlacklist, compatibleModsPool, weapon, ammoTpl, parentTemplate);
            // Compatible mod not found
            if (!modToAdd || typeof (modToAdd) === "undefined") {
                continue;
            }
            const modToAddTemplate = modToAdd[1];
            if (!this.myIsModValidForSlot(modToAdd, modsParentSlot, modSlot, parentTemplate, checkRequired)) {
                continue;
            }
            // Skip added mod to weapon if limit type reached
            if (this.botWeaponModLimitService.weaponModHasReachedLimit(botEquipmentRole, modToAddTemplate, modLimits, parentTemplate, weapon)) {
                continue;
            }
            // If item is a mount for scopes, set scope chance to 100%, this helps fix empty mounts appearing on weapons
            if (this.modSlotCanHoldScope(modSlot, modToAddTemplate._parent)) {
                // mod_mount was picked to be added to weapon, force scope chance to ensure its filled
                this.setScopeSpawnChancesToFull(modSpawnChances);
                // Hydrate pool of mods that fit into mount as its a randomisable slot
                if (isRandomisableSlot) {
                    // Add scope mods to modPool dictionary to ensure the mount has a scope in the pool to pick
                    this.addCompatibleModsForProvidedMod("mod_scope", modToAddTemplate, modPool, botEquipBlacklist);
                }
            }
            // If front/rear sight are to be added, set opposite to 100% chance
            if (this.modIsFrontOrRearSight(modSlot)) {
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
                // We don't have child mods, we need to create the camoras for the magazines instead
                this.fillCamora(weapon, modPool, modId, modToAddTemplate);
            }
            else {
                let containsModInPool = Object.keys(modPool).includes(modToAddTemplate._id);
                // Sometimes randomised slots are missing sub-mods, if so, get values from mod pool service
                // Check for a randomisable slot + without data in modPool + item being added as additional slots
                if (isRandomisableSlot && !containsModInPool && modToAddTemplate._props.Slots.length > 0) {
                    const modFromService = this.botEquipmentModPoolService.getModsForWeaponSlot(modToAddTemplate._id);
                    if (Object.keys(modFromService ?? {}).length > 0) {
                        modPool[modToAddTemplate._id] = modFromService;
                        containsModInPool = true;
                    }
                }
                if (containsModInPool) {
                    // Call self recursivly to add mods to this mod
                    this.botModGen(sessionId, weapon, modPool, modId, modToAddTemplate, modSpawnChances, ammoTpl, botRole, botLevel, modLimits, botEquipmentRole);
                }
            }
        }
        return weapon;
    }
}
exports.BotGenHelper = BotGenHelper;
