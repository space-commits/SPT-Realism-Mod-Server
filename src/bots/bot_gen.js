"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotEquipGenHelper = exports.BotGenHelper = exports.CheckRequired = exports.BotWepGen = exports.BotInvGen = exports.BotGen = exports.GenBotLvl = void 0;
const BotWeaponGenerator_1 = require("C:/snapshot/project/obj/generators/BotWeaponGenerator");
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const utils_1 = require("../utils/utils");
const BotEquipmentModGenerator_1 = require("C:/snapshot/project/obj/generators/BotEquipmentModGenerator");
const BotGeneratorHelper_1 = require("C:/snapshot/project/obj/helpers/BotGeneratorHelper");
const BotGenerator_1 = require("C:/snapshot/project/obj/generators/BotGenerator");
const BotLevelGenerator_1 = require("C:/snapshot/project/obj/generators/BotLevelGenerator");
const BotInventoryGenerator_1 = require("C:/snapshot/project/obj/generators/BotInventoryGenerator");
const ContextVariableType_1 = require("C:/snapshot/project/obj/context/ContextVariableType");
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const arrays_1 = require("../utils/arrays");
const bots_1 = require("./bots");
const bot_loot_serv_1 = require("./bot_loot_serv");
const EquipmentSlots_1 = require("C:/snapshot/project/obj/models/enums/EquipmentSlots");
const enums_1 = require("../utils/enums");
const modConfig = require("../../config/config.json");
const usecLO = require("../../db/bots/loadouts/PMCs/usecLO.json");
const bearLO = require("../../db/bots/loadouts/PMCs/bearLO.json");
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
class BotGen extends BotGenerator_1.BotGenerator {
    isBotUSEC(botRole) {
        return (["usec", "sptusec"].includes(botRole.toLowerCase()));
    }
    getBotTier(utils) {
        const level = utils_1.ProfileTracker.level;
        var tier = 1;
        var tierArray = [1, 2, 3, 4];
        if (level <= 5) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds1);
        }
        else if (level <= 10) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds2);
        }
        else if (level <= 15) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds3);
        }
        else if (level <= 20) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds4);
        }
        else if (level <= 25) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds5);
        }
        else if (level <= 30) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds6);
        }
        else if (level <= 35) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds7);
        }
        else if (level > 35) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds8);
        }
        return tier;
    }
    botTierMapFactor(tier, utils) {
        let rndNum = utils.pickRandNumOneInTen();
        if (utils_1.RaidInfoTracker.mapName === "Laboratory" || utils_1.RaidInfoTracker.mapName === "laboratory") {
            tier = Math.min(tier + 2, 4);
        }
        else if (rndNum <= 4 && (utils_1.RaidInfoTracker.mapName === "RezervBase" || utils_1.RaidInfoTracker.mapName === "ReserveBase" || utils_1.RaidInfoTracker.mapName === "rezervbase" || utils_1.RaidInfoTracker.mapName === "Streets of Tarkov" || utils_1.RaidInfoTracker.mapName === "factory4_night" || utils_1.RaidInfoTracker.TOD === "night")) {
            tier = Math.min(tier + 1, 4);
        }
        else if (rndNum <= 2 && (utils_1.RaidInfoTracker.mapName === "shoreline" || utils_1.RaidInfoTracker.mapName === "Shoreline" || utils_1.RaidInfoTracker.mapName === "lighthouse" || utils_1.RaidInfoTracker.mapName === "Lighthouse" || utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange")) {
            tier = Math.min(tier + 1, 4);
        }
        else if (rndNum <= 1 && (utils_1.RaidInfoTracker.mapName === "bigmap" || utils_1.RaidInfoTracker.mapName === "Customs")) {
            tier = Math.min(tier + 1, 4);
        }
        return tier;
    }
    myPrepareAndGenerateBots(sessionId, botGenerationDetails) {
        const postLoadDBServer = tsyringe_1.container.resolve("DatabaseServer");
        const tables = postLoadDBServer.getTables();
        const arrays = new arrays_1.Arrays(tables);
        const utils = new utils_1.Utils(tables, arrays);
        const botLoader = new bots_1.BotLoader(this.logger, tables, this.configServer, modConfig, arrays, utils);
        const output = [];
        for (let i = 0; i < botGenerationDetails.botCountToGenerate; i++) {
            let bot = this.getCloneOfBotBase();
            bot.Info.Settings.Role = botGenerationDetails.role;
            bot.Info.Side = botGenerationDetails.side;
            bot.Info.Settings.BotDifficulty = botGenerationDetails.botDifficulty;
            // Get raw json data for bot (Cloned)
            const botJsonTemplate = this.jsonUtil.clone(this.botHelper.getBotTemplate((botGenerationDetails.isPmc)
                ? bot.Info.Side
                : botGenerationDetails.role));
            const botRole = botGenerationDetails.role.toLowerCase();
            const isPMC = this.botHelper.isBotPmc(botRole);
            let pmcTier = 1;
            if (isPMC) {
                pmcTier = this.botTierMapFactor(this.getBotTier(utils), utils);
                const isUSEC = this.isBotUSEC(botRole);
                const changeDiffi = modConfig.pmc_difficulty;
                if (modConfig.bot_testing == true) {
                    pmcTier = modConfig.bot_test_tier;
                }
                if (pmcTier === 1) {
                    if (isUSEC) {
                        botLoader.usecLoad1(botJsonTemplate);
                    }
                    else {
                        botLoader.bearLoad1(botJsonTemplate);
                    }
                    if (changeDiffi == true) {
                        bot.Info.Settings.BotDifficulty = "normal";
                    }
                }
                if (pmcTier === 2) {
                    if (isUSEC) {
                        botLoader.usecLoad2(botJsonTemplate);
                    }
                    else {
                        botLoader.bearLoad2(botJsonTemplate);
                    }
                    if (changeDiffi == true) {
                        bot.Info.Settings.BotDifficulty = "normal";
                    }
                }
                if (pmcTier === 3) {
                    if (isUSEC) {
                        botLoader.usecLoad3(botJsonTemplate);
                    }
                    else {
                        botLoader.bearLoad3(botJsonTemplate);
                    }
                    if (changeDiffi == true) {
                        bot.Info.Settings.BotDifficulty = "hard";
                    }
                }
                if (pmcTier === 4) {
                    if (isUSEC) {
                        botLoader.usecLoad4(botJsonTemplate);
                    }
                    else {
                        botLoader.bearLoad4(botJsonTemplate);
                    }
                    if (changeDiffi == true) {
                        bot.Info.Settings.BotDifficulty = "impossible";
                    }
                }
                if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == false) {
                    botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = {};
                    botJsonTemplate.inventory.equipment.Holster = {};
                }
                if (modConfig.logEverything == true) {
                    this.logger.warning("=================");
                    this.logger.warning("bot " + botRole);
                    this.logger.warning("tier " + pmcTier);
                    this.logger.warning("map " + utils_1.RaidInfoTracker.mapName);
                    this.logger.warning("TOD " + utils_1.RaidInfoTracker.TOD);
                    this.logger.warning("===========");
                }
            }
            bot = this.myGenerateBot(sessionId, bot, botJsonTemplate, botGenerationDetails, pmcTier);
            output.push(bot);
        }
        return output;
    }
    myGenerateBot(sessionId, bot, botJsonTemplate, botGenerationDetails, pmcTier) {
        const botWeaponGenerator = tsyringe_1.container.resolve("BotWeaponGenerator");
        const botLootGenerator = tsyringe_1.container.resolve("BotLootGenerator");
        const botGeneratorHelper = tsyringe_1.container.resolve("BotGeneratorHelper");
        const localisationService = tsyringe_1.container.resolve("LocalisationService");
        const botEquipmentModPoolService = tsyringe_1.container.resolve("BotEquipmentModPoolService");
        const botEquipmentModGenerator = tsyringe_1.container.resolve("BotEquipmentModGenerator");
        const genBotLvl = new GenBotLvl(this.logger, this.randomUtil, this.databaseServer);
        const botInvGen = new BotInvGen(this.logger, this.hashUtil, this.randomUtil, this.databaseServer, botWeaponGenerator, botLootGenerator, botGeneratorHelper, this.botHelper, this.weightedRandomHelper, localisationService, botEquipmentModPoolService, botEquipmentModGenerator, this.configServer);
        const botRole = botGenerationDetails.role.toLowerCase();
        const botLevel = genBotLvl.genBotLvl(botJsonTemplate.experience.level, botGenerationDetails, bot);
        if (!botGenerationDetails.isPlayerScav) {
            this.botEquipmentFilterService.filterBotEquipment(botJsonTemplate, botLevel.level, botGenerationDetails);
        }
        bot.Info.Nickname = this.generateBotNickname(botJsonTemplate, botGenerationDetails.isPlayerScav, botRole, sessionId);
        const skipChristmasItems = !this.seasonalEventService.christmasEventEnabled();
        if (skipChristmasItems) {
            this.seasonalEventService.removeChristmasItemsFromBotInventory(botJsonTemplate.inventory, botGenerationDetails.role);
        }
        bot.Info.Experience = botLevel.exp;
        bot.Info.Level = botLevel.level;
        bot.Info.Settings.Experience = this.randomUtil.getInt(botJsonTemplate.experience.reward.min, botJsonTemplate.experience.reward.max);
        bot.Info.Settings.StandingForKill = botJsonTemplate.experience.standingForKill;
        bot.Info.Voice = this.randomUtil.getArrayValue(botJsonTemplate.appearance.voice);
        bot.Health = this.generateHealth(botJsonTemplate.health, bot.Info.Side === "Savage");
        bot.Skills = this.generateSkills(botJsonTemplate.skills); // TODO: fix bad type, bot jsons store skills in dict, output needs to be array
        bot.Customization.Head = this.randomUtil.getArrayValue(botJsonTemplate.appearance.head);
        bot.Customization.Body = this.weightedRandomHelper.getWeightedInventoryItem(botJsonTemplate.appearance.body);
        bot.Customization.Feet = this.weightedRandomHelper.getWeightedInventoryItem(botJsonTemplate.appearance.feet);
        bot.Customization.Hands = this.randomUtil.getArrayValue(botJsonTemplate.appearance.hands);
        bot.Inventory = botInvGen.myGenerateInventory(sessionId, botJsonTemplate, botRole, botGenerationDetails.isPmc, botLevel.level, pmcTier);
        if (this.botHelper.isBotPmc(botRole)) {
            this.getRandomisedGameVersionAndCategory(bot.Info);
            bot = this.generateDogtag(bot);
        }
        // generate new bot ID
        bot = this.generateId(bot);
        // generate new inventory ID
        bot = this.generateInventoryID(bot);
        return bot;
    }
}
exports.BotGen = BotGen;
class BotInvGen extends BotInventoryGenerator_1.BotInventoryGenerator {
    myGenerateInventory(sessionId, botJsonTemplate, botRole, isPmc, botLevel, pmcTier) {
        const botLootCacheService = tsyringe_1.container.resolve("BotLootCacheService");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const handbookHelper = tsyringe_1.container.resolve("HandbookHelper");
        const botWeaponGeneratorHelper = tsyringe_1.container.resolve("BotWeaponGeneratorHelper");
        const botLootGen = new bot_loot_serv_1.BotLooGen(this.logger, this.hashUtil, this.randomUtil, itemHelper, this.databaseServer, handbookHelper, this.botGeneratorHelper, this.botWeaponGenerator, botWeaponGeneratorHelper, botLootCacheService, this.localisationService, this.configServer);
        const templateInventory = botJsonTemplate.inventory;
        const equipmentChances = botJsonTemplate.chances;
        const itemGenerationLimitsMinMax = botJsonTemplate.generation;
        // Generate base inventory with no items
        const botInventory = this.generateInventoryBase();
        this.myGenerateAndAddEquipmentToBot(templateInventory, equipmentChances, botRole, botInventory, botLevel);
        // Roll weapon spawns and generate a weapon for each roll that passed
        this.myGenerateAndAddWeaponsToBot(templateInventory, equipmentChances, sessionId, botInventory, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier);
        botLootGen.genLoot(sessionId, botJsonTemplate, isPmc, botRole, botInventory, botLevel);
        return botInventory;
    }
    myGenerateAndAddWeaponsToBot(templateInventory, equipmentChances, sessionId, botInventory, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier) {
        const weaponSlotsToFill = this.getDesiredWeaponsForBot(equipmentChances);
        for (const weaponSlot of weaponSlotsToFill) {
            // Add weapon to bot if true and bot json has something to put into the slot
            if (weaponSlot.shouldSpawn && Object.keys(templateInventory.equipment[weaponSlot.slot]).length) {
                this.myAddWeaponAndMagazinesToInventory(sessionId, weaponSlot, templateInventory, botInventory, equipmentChances, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier);
            }
        }
    }
    myAddWeaponAndMagazinesToInventory(sessionId, weaponSlot, templateInventory, botInventory, equipmentChances, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier) {
        const jsonUtil = tsyringe_1.container.resolve("JsonUtil");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const botWeaponGeneratorHelper = tsyringe_1.container.resolve("BotWeaponGeneratorHelper");
        const inventoryMagGenComponents = tsyringe_1.container.resolveAll("InventoryMagGen");
        const botWeaponModLimitService = tsyringe_1.container.resolve("BotWeaponModLimitService");
        const botWepGen = new BotWepGen(jsonUtil, this.logger, this.hashUtil, this.databaseServer, itemHelper, this.weightedRandomHelper, this.botGeneratorHelper, this.randomUtil, this.configServer, botWeaponGeneratorHelper, botWeaponModLimitService, this.botEquipmentModGenerator, this.localisationService, inventoryMagGenComponents);
        const generatedWeapon = botWepGen.myGenerateRandomWeapon(sessionId, weaponSlot.slot, templateInventory, botInventory.equipment, equipmentChances.mods, botRole, isPmc, botLevel, pmcTier);
        botInventory.items.push(...generatedWeapon.weapon);
        this.botWeaponGenerator.addExtraMagazinesToInventory(generatedWeapon, itemGenerationLimitsMinMax.items.magazines, botInventory, botRole);
    }
    myGenerateAndAddEquipmentToBot(templateInventory, equipmentChances, botRole, botInventory, botLevel) {
        // These will be handled later
        const excludedSlots = [
            EquipmentSlots_1.EquipmentSlots.FIRST_PRIMARY_WEAPON,
            EquipmentSlots_1.EquipmentSlots.SECOND_PRIMARY_WEAPON,
            EquipmentSlots_1.EquipmentSlots.HOLSTER,
            EquipmentSlots_1.EquipmentSlots.ARMOR_VEST,
            EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST,
            EquipmentSlots_1.EquipmentSlots.FACE_COVER,
            EquipmentSlots_1.EquipmentSlots.HEADWEAR,
            EquipmentSlots_1.EquipmentSlots.EARPIECE
        ];
        const botEquipConfig = this.botConfig.equipment[this.botGeneratorHelper.getBotEquipmentRole(botRole)];
        const randomistionDetails = this.botHelper.getBotRandomizationDetails(botLevel, botEquipConfig);
        for (const equipmentSlot in templateInventory.equipment) {
            // Weapons have special generation and will be generated seperately; ArmorVest should be generated after TactivalVest
            if (excludedSlots.includes(equipmentSlot)) {
                continue;
            }
            this.myGenerateEquipment(equipmentSlot, templateInventory.equipment[equipmentSlot], templateInventory.mods, equipmentChances, botRole, botInventory, randomistionDetails);
        }
        // Generate below in specific order
        this.myGenerateEquipment(EquipmentSlots_1.EquipmentSlots.FACE_COVER, templateInventory.equipment.FaceCover, templateInventory.mods, equipmentChances, botRole, botInventory, randomistionDetails);
        this.myGenerateEquipment(EquipmentSlots_1.EquipmentSlots.HEADWEAR, templateInventory.equipment.Headwear, templateInventory.mods, equipmentChances, botRole, botInventory, randomistionDetails);
        this.myGenerateEquipment(EquipmentSlots_1.EquipmentSlots.EARPIECE, templateInventory.equipment.Earpiece, templateInventory.mods, equipmentChances, botRole, botInventory, randomistionDetails);
        this.myGenerateEquipment(EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST, templateInventory.equipment.TacticalVest, templateInventory.mods, equipmentChances, botRole, botInventory, randomistionDetails);
        this.myGenerateEquipment(EquipmentSlots_1.EquipmentSlots.ARMOR_VEST, templateInventory.equipment.ArmorVest, templateInventory.mods, equipmentChances, botRole, botInventory, randomistionDetails);
    }
    myGenerateEquipment(equipmentSlot, equipmentPool, modPool, spawnChances, botRole, inventory, randomisationDetails) {
        const logger = tsyringe_1.container.resolve("WinstonLogger");
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const appContext = tsyringe_1.container.resolve("ApplicationContext");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const myBotGenHelper = new BotGenHelper(logger, this.randomUtil, this.databaseServer, durabilityLimitsHelper, itemHelper, appContext, this.localisationService, this.configServer);
        const spawnChance = [EquipmentSlots_1.EquipmentSlots.POCKETS, EquipmentSlots_1.EquipmentSlots.SECURED_CONTAINER].includes(equipmentSlot)
            ? 100
            : spawnChances.equipment[equipmentSlot];
        if (typeof spawnChance === "undefined") {
            this.logger.warning(this.localisationService.getText("bot-no_spawn_chance_defined_for_equipment_slot", equipmentSlot));
            return;
        }
        const shouldSpawn = this.randomUtil.getChance100(spawnChance);
        if (Object.keys(equipmentPool).length && shouldSpawn) {
            const id = this.hashUtil.generate();
            const equipmentItemTpl = this.weightedRandomHelper.getWeightedInventoryItem(equipmentPool);
            const itemTemplate = this.databaseServer.getTables().templates.items[equipmentItemTpl];
            if (!itemTemplate) {
                this.logger.error(this.localisationService.getText("bot-missing_item_template", equipmentItemTpl));
                this.logger.info(`EquipmentSlot -> ${equipmentSlot}`);
                return;
            }
            if (this.botGeneratorHelper.isItemIncompatibleWithCurrentItems(inventory.items, equipmentItemTpl, equipmentSlot).incompatible) {
                // Bad luck - randomly picked item was not compatible with current gear
                return;
            }
            const item = {
                "_id": id,
                "_tpl": equipmentItemTpl,
                "parentId": inventory.equipment,
                "slotId": equipmentSlot,
                ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole)
            };
            // use dynamic mod pool if enabled in config
            const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(botRole);
            if (this.botConfig.equipment[botEquipmentRole] && randomisationDetails?.randomisedArmorSlots?.includes(equipmentSlot)) {
                modPool[equipmentItemTpl] = this.getFilteredDynamicModsForItem(equipmentItemTpl, this.botConfig.equipment[botEquipmentRole].blacklist);
            }
            if (typeof (modPool[equipmentItemTpl]) !== "undefined" || Object.keys(modPool[equipmentItemTpl] || {}).length > 0) {
                const items = this.botEquipmentModGenerator.generateModsForEquipment([item], modPool, id, itemTemplate, spawnChances.mods, botRole);
                inventory.items.push(...items);
            }
            else {
                inventory.items.push(item);
            }
        }
    }
}
exports.BotInvGen = BotInvGen;
class BotWepGen extends BotWeaponGenerator_1.BotWeaponGenerator {
    myGenerateRandomWeapon(sessionId, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier) {
        const weaponTpl = this.pickWeightedWeaponTplFromPool(equipmentSlot, botTemplateInventory);
        return this.myGenerateWeaponByTpl(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier);
    }
    myGenerateWeaponByTpl(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier) {
        const probabilityHelper = tsyringe_1.container.resolve("ProbabilityHelper");
        const profileHelper = tsyringe_1.container.resolve("ProfileHelper");
        const botEquipmentFilterService = tsyringe_1.container.resolve("BotEquipmentFilterService");
        const itemFilterService = tsyringe_1.container.resolve("ItemFilterService");
        const botHelper = tsyringe_1.container.resolve("BotHelper");
        const botEquipmentModPoolService = tsyringe_1.container.resolve("BotEquipmentModPoolService");
        const itemBaseClassService = tsyringe_1.container.resolve("ItemBaseClassService");
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const appContext = tsyringe_1.container.resolve("ApplicationContext");
        const tables = this.databaseServer.getTables();
        const myBotGenHelper = new BotGenHelper(this.logger, this.randomUtil, this.databaseServer, durabilityLimitsHelper, this.itemHelper, appContext, this.localisationService, this.configServer);
        const _botModGen = new BotEquipGenHelper(this.logger, this.jsonUtil, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseServer, this.itemHelper, botEquipmentFilterService, itemBaseClassService, itemFilterService, profileHelper, this.botWeaponModLimitService, botHelper, this.botGeneratorHelper, this.botWeaponGeneratorHelper, this.localisationService, botEquipmentModPoolService, this.configServer);
        const arrays = new arrays_1.Arrays(tables);
        const utils = new utils_1.Utils(tables, arrays);
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
        if (!this.isWeaponValid(weaponWithModsArray)) {
            // Weapon is bad, fall back to weapons preset
            weaponWithModsArray = this.myGetPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, weaponItemTemplate, botRole, pmcTier);
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
        if (utils_1.ModTracker.batteryModPresent == true) {
            let tempWeaponArray = weaponWithModsArray;
            for (let i in tempWeaponArray) {
                let item = tables.templates.items[weaponWithModsArray[i]._tpl];
                if ((item._id != enums_1.ParentClasses.NIGHTVISION && item._id != "5d21f59b6dbe99052b54ef83" &&
                    (item._parent == enums_1.ParentClasses.SPECIAL_SCOPE || item._parent == enums_1.ParentClasses.NIGHTVISION || item._parent == "5d21f59b6dbe99052b54ef83")) ||
                    (item._parent == enums_1.ParentClasses.COLLIMATOR || item._parent == enums_1.ParentClasses.COMPACT_COLLIMATOR)) {
                    for (let slot in item._props.Slots) {
                        if (item._props.Slots[slot]._name === "mod_equipment") {
                            let batteryId = item._props.Slots[slot]._props.filters[0].Filter[0];
                            let batteryItem = {
                                _id: this.hashUtil.generate(),
                                _tpl: batteryId,
                                parentId: weaponWithModsArray[i]._id,
                                slotId: "mod_equipment",
                            };
                            weaponWithModsArray.push(batteryItem);
                        }
                    }
                }
            }
        }
        return {
            weapon: weaponWithModsArray,
            chosenAmmoTpl: ammoTpl,
            chosenUbglAmmoTpl: ubglAmmoTpl,
            weaponMods: modPool,
            weaponTemplate: weaponItemTemplate
        };
    }
    isWeaponValid(weaponItemArray) {
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
                    if (modConfig.logEverything == true) {
                        this.logger.info(this.localisationService.getText("bot-weapons_required_slot_missing_item", { modSlot: modSlot._name, modName: modDbTemplate._name, slotId: mod.slotId }));
                    }
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
    myGetPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole, pmcTier) {
        const logger = tsyringe_1.container.resolve("WinstonLogger");
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const appContext = tsyringe_1.container.resolve("ApplicationContext");
        const myBotGenHelper = new BotGenHelper(logger, this.randomUtil, this.databaseServer, durabilityLimitsHelper, this.itemHelper, appContext, this.localisationService, this.configServer);
        const tierChecker = new utils_1.BotTierTracker();
        let tier = tierChecker.getTier(botRole);
        if (tier === 0) {
            tier = pmcTier;
        }
        if (modConfig.logEverything == true) {
            this.logger.warning(`//////////////////////////////${botRole}///////////////////////////////////`);
            this.logger.warning(`//////////////////////////////${tier}///////////////////////////////////`);
            this.logger.info(`Realism Mod: Fetching Custom Preset For ${botRole} At Tier ${tier}`);
        }
        var weaponMods = [];
        var weaponPresets = [];
        try {
            let preset;
            let presetFile = require(`../../db/bots/loadouts/weaponPresets/${botRole}Presets.json`);
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
                        ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole)
                    }
                };
                weaponMods.push(...preset._items);
            }
            if (modConfig.logEverything == true) {
                this.logger.info(`Realism Mod: Preset was Fetched. Working as intended, do not report as issue.`);
            }
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
                        ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole)
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
class BotGenHelper extends BotGeneratorHelper_1.BotGeneratorHelper {
    myGenerateExtraPropertiesForItem(itemTemplate, botRole = null) {
        // Get raid settings, if no raid, default to day
        const raidSettings = this.applicationContext.getLatestValue(ContextVariableType_1.ContextVariableType.RAID_CONFIGURATION)?.getValue();
        const raidIsNight = raidSettings?.timeVariant === "PAST";
        const itemProperties = {};
        if (itemTemplate._props.MaxDurability) {
            if (itemTemplate._props.weapClass) // Is weapon
             {
                itemProperties.Repairable = this.generateWeaponRepairableProperties(itemTemplate, botRole);
            }
            else if (itemTemplate._props.armorClass) // Is armor
             {
                itemProperties.Repairable = this.generateArmorRepairableProperties(itemTemplate, botRole);
            }
        }
        if (itemTemplate._props.HasHinge) {
            itemProperties.Togglable = { On: true };
        }
        if (itemTemplate._props.Foldable) {
            itemProperties.Foldable = { Folded: false };
        }
        if (itemTemplate._props.weapFireType?.length) {
            if (itemTemplate._props.weapFireType.includes("fullauto")) {
                itemProperties.FireMode = { FireMode: "fullauto" };
            }
            else {
                itemProperties.FireMode = { FireMode: this.randomUtil.getArrayValue(itemTemplate._props.weapFireType) };
            }
        }
        if (itemTemplate._props.MaxHpResource) {
            itemProperties.MedKit = { HpResource: itemTemplate._props.MaxHpResource };
        }
        if (itemTemplate._props.MaxResource && itemTemplate._props.foodUseTime) {
            itemProperties.FoodDrink = { HpPercent: itemTemplate._props.MaxResource };
        }
        if (itemTemplate._parent === BaseClasses_1.BaseClasses.FLASHLIGHT) {
            // Get chance from botconfig for bot type
            const lightLaserActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "lightIsActiveDayChancePercent", 25);
            itemProperties.Light = { IsActive: (this.randomUtil.getChance100(lightLaserActiveChance)), SelectedMode: 0 };
        }
        else if (itemTemplate._parent === BaseClasses_1.BaseClasses.TACTICAL_COMBO) {
            // Get chance from botconfig for bot type, use 50% if no value found
            const lightLaserActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "laserIsActiveChancePercent", 50);
            itemProperties.Light = { IsActive: (this.randomUtil.getChance100(lightLaserActiveChance)), SelectedMode: 0 };
        }
        if (itemTemplate._parent === BaseClasses_1.BaseClasses.NIGHTVISION) {
            // Get chance from botconfig for bot type
            const nvgActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "nvgIsActiveChanceDayPercent", 15);
            itemProperties.Togglable = { On: (this.randomUtil.getChance100(nvgActiveChance)) };
        }
        // Togglable face shield
        if (itemTemplate._props.HasHinge && itemTemplate._props.FaceShieldComponent) {
            // Get chance from botconfig for bot type, use 75% if no value found
            const faceShieldActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "faceShieldIsActiveChancePercent", 75);
            itemProperties.Togglable = { On: (this.randomUtil.getChance100(faceShieldActiveChance)) };
        }
        return Object.keys(itemProperties).length
            ? { upd: itemProperties }
            : {};
    }
}
exports.BotGenHelper = BotGenHelper;
class BotEquipGenHelper extends BotEquipmentModGenerator_1.BotEquipmentModGenerator {
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
        if (!(itemSlot._props.filters[0].Filter.includes(modToAdd[1]._id) || this.itemBaseClassService.itemHasBaseClass(modToAdd[1]._id, itemSlot._props.filters[0].Filter))) {
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
                if (modConfig.logEverything == true) {
                    this.logger.warning(this.localisationService.getText("bot-weapon_missing_mod_slot", { modSlot: modSlot, weaponId: parentTemplate._id, weaponName: parentTemplate._name }));
                }
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
exports.BotEquipGenHelper = BotEquipGenHelper;
