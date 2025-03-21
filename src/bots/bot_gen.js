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
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const arrays_1 = require("../utils/arrays");
const bots_1 = require("./bots");
const EquipmentSlots_1 = require("C:/snapshot/project/obj/models/enums/EquipmentSlots");
const ModSpawn_1 = require("C:/snapshot/project/obj/models/enums/ModSpawn");
const ExhaustableArray_1 = require("C:/snapshot/project/obj/models/spt/server/ExhaustableArray");
const IFilterPlateModsForSlotByLevelResult_1 = require("C:/snapshot/project/obj/models/spt/bots/IFilterPlateModsForSlotByLevelResult");
const bot_loot_serv_1 = require("./bot_loot_serv");
const GameEditions_1 = require("C:/snapshot/project/obj/models/enums/GameEditions");
const ItemTpl_1 = require("C:/snapshot/project/obj/models/enums/ItemTpl");
const MemberCategory_1 = require("C:/snapshot/project/obj/models/enums/MemberCategory");
const seasonalevents_1 = require("../misc/seasonalevents");
const InventoryMagGen_1 = require("C:/snapshot/project/obj/generators/weapongen/InventoryMagGen");
const ItemAddedResult_1 = require("C:/snapshot/project/obj/models/enums/ItemAddedResult");
const armorPlateWeights = require("../../db/bots/loadouts/templates/armorPlateWeights.json");
const modConfig = require("../../config/config.json");
class GenBotLvl extends BotLevelGenerator_1.BotLevelGenerator {
    genBotLvl(levelDetails, botGenerationDetails, bot) {
        const expTable = this.databaseService.getGlobals().config.exp.level.exp_table;
        const botLevelRange = this.getRelativeBotLevelRange(botGenerationDetails, levelDetails, expTable.length);
        // Get random level based on the exp table.
        let exp = 0;
        let level = 1;
        if (bot.Info.Settings.Role === "bear" || bot.Info.Settings.Role === "usec") {
            if (utils_1.RaidInfoTracker.mapName === "sandbox" && utils_1.ProfileTracker.averagePlayerLevel <= 20) {
                level = this.randomUtil.getInt(1, 15);
            }
            else if (utils_1.RaidInfoTracker.mapName === "sandbox_high" && utils_1.ProfileTracker.averagePlayerLevel > 20) {
                level = this.randomUtil.getInt(20, levelDetails.max);
            }
            else {
                level = this.randomUtil.getInt(levelDetails.min, levelDetails.max);
            }
        }
        else {
            level = this.chooseBotLevel(botLevelRange.min, botLevelRange.max, 1, 1.15);
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
    placeHolderBotCache = [];
    isBotUSEC(botRole) {
        return (botRole.toLocaleLowerCase().includes("usec"));
    }
    //get pmc's tier "randomly"
    getPMCTier(utils) {
        const playerLevel = utils_1.ProfileTracker.averagePlayerLevel;
        let tier = 1;
        let tierArray = [1, 2, 3, 4, 5];
        const gzTiers = [89, 10, 1, 0, 0];
        if (utils_1.RaidInfoTracker.mapName === "sandbox" && playerLevel <= 20) {
            tier = utils.probabilityWeighter(tierArray, gzTiers);
        }
        else if (playerLevel <= 5) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds1);
        }
        else if (playerLevel <= 10) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds2);
        }
        else if (playerLevel <= 15) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds3);
        }
        else if (playerLevel <= 20) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds4);
        }
        else if (playerLevel <= 25) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds5);
        }
        else if (playerLevel <= 30) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds6);
        }
        else if (playerLevel <= 35) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds7);
        }
        else if (playerLevel <= 40) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds8);
        }
        else if (playerLevel > 40) {
            tier = utils.probabilityWeighter(tierArray, modConfig.botTierOdds9);
        }
        return tier;
    }
    //skew the tiering of PMCs based on map
    botTierMapFactor(tier, utils) {
        const highTier = ["rezervbase", "reservebase", "tarkovstreets"];
        const midTier = ["factory4_night"];
        const lowTier = ["bigmap", "customs", "interchange", "lighthouse"];
        const ratTier = ["woods", "shoreline"];
        let rndNum = utils.pickRandNumInRange(0, 101);
        if (utils_1.RaidInfoTracker.mapName === "sandbox") { //me being superstitious 
            return tier;
        }
        if (utils_1.RaidInfoTracker.mapName === "laboratory") {
            tier = Math.min(tier + 2, 5);
        }
        else if (rndNum <= 30 && highTier.includes(utils_1.RaidInfoTracker.mapName)) {
            tier = Math.min(tier + 1, 5);
        }
        else if (rndNum <= 15 && (midTier.includes(utils_1.RaidInfoTracker.mapName) || utils_1.RaidInfoTracker.isNight)) {
            tier = Math.min(tier + 1, 5);
        }
        else if (rndNum <= 5 && lowTier.includes(utils_1.RaidInfoTracker.mapName)) {
            tier = Math.min(tier + 1, 5);
        }
        else if (rndNum <= 20 && ratTier.includes(utils_1.RaidInfoTracker.mapName)) {
            tier = Math.max(tier - 1, 1);
        }
        return tier;
    }
    //for events where bots will need gas masks at all times
    addGasMasksToBots(equipment, chances, botRole, isPmc, pmcTier) {
        let gasMaskTier = 0;
        if (isPmc) {
            gasMaskTier = pmcTier <= 2 ? 1 : pmcTier == 3 ? 2 : 3;
        }
        else {
            let isHighTier = botRole.includes("boss") || botRole.includes("pmc") || botRole.includes("exusec") || botRole.includes("priest");
            let isMidTier = botRole.includes("follower") || botRole.includes("warrior");
            gasMaskTier = isHighTier ? 3 : isMidTier ? 2 : 1;
        }
        equipment.FaceCover = gasMaskTier == 3 ? arrays_1.StaticArrays.gasEventMasksHigh : gasMaskTier == 2 ? arrays_1.StaticArrays.gasEventMasksMed : arrays_1.StaticArrays.gasEventMasksLow;
        if (utils_1.ModTracker.tgcPresent && ((isPmc && gasMaskTier == 3) || botRole.includes("pmcbot") || botRole.includes("exusec") || botRole.includes("knight") || botRole.includes("pipe") || botRole.includes("bird"))) {
            equipment.FaceCover["672e2e756803734b60f5ac1e"] = 2;
            equipment.FaceCover["672e2e7517018293d11bbdc1"] = 2;
            equipment.FaceCover["672e2e7504b1f1d5b0e4209c"] = 1;
            equipment.FaceCover["67a13809c3bc1e2fa47e6eec"] = 1;
        }
        chances.equipment.Eyewear = 0;
        chances.equipment.FaceCover = 100;
        chances.equipmentMods.mod_equipment = 0;
        chances.equipmentMods.mod_equipment_000 = 0;
        chances.equipmentMods.mod_equipment_001 = 0;
        chances.equipmentMods.mod_equipment_002 = 0;
    }
    myGeneratePlayerScav(sessionId, role, difficulty, botTemplate) {
        let bot = this.getCloneOfBotBase();
        bot.Info.Settings.BotDifficulty = difficulty;
        bot.Info.Settings.Role = role;
        bot.Info.Side = "Savage";
        const botGenDetails = {
            isPmc: false,
            side: "Savage",
            role: role,
            botRelativeLevelDeltaMax: 0,
            botRelativeLevelDeltaMin: 0,
            botCountToGenerate: 1,
            botDifficulty: difficulty,
            isPlayerScav: true,
        };
        return this.myGenerateBot(sessionId, bot, botTemplate, botGenDetails, 1);
        ;
    }
    assignPMCtier(utils, botRole, botLoader, preparedBotBase, botJsonTemplateClone) {
        const baseTier = (this.getPMCTier(utils));
        const isUSEC = this.isBotUSEC(botRole);
        const changeDiffi = modConfig.pmc_difficulty == true;
        let pmcTier = utils_1.ProfileTracker.averagePlayerLevel <= 10 ? baseTier : this.botTierMapFactor(baseTier, utils);
        if (modConfig.bot_testing == true) {
            pmcTier = modConfig.bot_test_tier;
        }
        if (pmcTier === 1) {
            if (isUSEC)
                botLoader.usecLoad1(botJsonTemplateClone);
            else
                botLoader.bearLoad1(botJsonTemplateClone);
            if (changeDiffi == true)
                preparedBotBase.Info.Settings.BotDifficulty = "normal";
        }
        else if (pmcTier === 2) {
            if (isUSEC)
                botLoader.usecLoad2(botJsonTemplateClone);
            else
                botLoader.bearLoad2(botJsonTemplateClone);
            if (changeDiffi == true)
                preparedBotBase.Info.Settings.BotDifficulty = "normal";
        }
        else if (pmcTier === 3) {
            if (isUSEC)
                botLoader.usecLoad3(botJsonTemplateClone);
            else
                botLoader.bearLoad3(botJsonTemplateClone);
            if (changeDiffi == true)
                preparedBotBase.Info.Settings.BotDifficulty = "hard";
        }
        else if (pmcTier === 4) {
            if (isUSEC)
                botLoader.usecLoad4(botJsonTemplateClone);
            else
                botLoader.bearLoad4(botJsonTemplateClone);
            if (changeDiffi == true)
                preparedBotBase.Info.Settings.BotDifficulty = "hard";
        }
        else if (pmcTier === 5) {
            if (isUSEC)
                botLoader.usecLoad5(botJsonTemplateClone);
            else
                botLoader.bearLoad5(botJsonTemplateClone);
            if (changeDiffi == true)
                preparedBotBase.Info.Settings.BotDifficulty = "impossible";
        }
        if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == false) {
            botJsonTemplateClone.inventory.equipment.FirstPrimaryWeapon = {};
            botJsonTemplateClone.inventory.equipment.SecondPrimaryWeapon = {};
            botJsonTemplateClone.inventory.equipment.Holster = {};
        }
        return pmcTier;
    }
    checkIfShouldReturnCahcedBot(cache) {
        const bot = cache[0];
        bot._id = this.hashUtil.generate();
        bot.aid = this.hashUtil.generateAccountId();
        bot.Info.Nickname = this.hashUtil.generate();
        bot.Info.MainProfileNickname = this.hashUtil.generate();
        bot.Info.LowerNickname = this.hashUtil.generate();
        return bot;
    }
    myPrepareAndGenerateBot(sessionId, botGenerationDetails) {
        //since spawn changes, bots just keep being generated at regular intervals. Causes stutter. Skip bot gen and return a cached bot.
        if (utils_1.RaidInfoTracker.generatedBotsCount == 0)
            this.placeHolderBotCache = [];
        utils_1.RaidInfoTracker.generatedBotsCount += 1;
        if (modConfig.spawn_waves == true && !utils_1.ModTracker.qtbSpawnsActive && !utils_1.ModTracker.swagPresent) {
            if (utils_1.RaidInfoTracker.generatedBotsCount > 600 && this.placeHolderBotCache.length !== 0) {
                return this.checkIfShouldReturnCahcedBot(this.placeHolderBotCache);
            }
        }
        const utils = utils_1.Utils.getInstance();
        const botLoader = bots_1.BotLoader.getInstance();
        const preparedBotBase = this.getPreparedBotBase(botGenerationDetails.eventRole ?? botGenerationDetails.role, // Use eventRole if provided,
        botGenerationDetails.side, botGenerationDetails.botDifficulty);
        // Get raw json data for bot (Cloned)
        const botRole = botGenerationDetails.isPmc
            ? preparedBotBase.Info.Side // Use side to get usec.json or bear.json when bot will be PMC
            : botGenerationDetails.role;
        const botJsonTemplateClone = this.cloner.clone(this.botHelper.getBotTemplate(botRole));
        const isPMC = this.botHelper.isBotPmc(botRole);
        let pmcTier = 1;
        if (isPMC) {
            pmcTier = this.assignPMCtier(utils, botRole, botLoader, preparedBotBase, botJsonTemplateClone);
        }
        if (botRole.includes("sectant")) {
            const isPriest = botRole.includes("riest");
            if (utils_1.BotTierTracker.cultTier == 1)
                botLoader.cultistsLoad1(botJsonTemplateClone, isPriest);
            else if (utils_1.BotTierTracker.cultTier == 2)
                botLoader.cultistsLoad2(botJsonTemplateClone, isPriest);
            else if (utils_1.BotTierTracker.cultTier == 3)
                botLoader.cultistsLoad3(botJsonTemplateClone, isPriest);
        }
        if (modConfig.logEverything == true) {
            this.logger.warning("bot " + botRole);
            this.logger.warning("tier " + pmcTier);
        }
        //instead of manually editing all my bot loadout json with the new armor plates/inserts, I programatically generated a file with all the json
        //and then I combine the armor json with the bot's mods json
        //this is highly ineffecient as I am doing it per bot generated, not ideal but for now it works until I figure out a better way
        if (seasonalevents_1.EventTracker.doGasEvent || (seasonalevents_1.EventTracker.hasExploded && !seasonalevents_1.EventTracker.endExplosionEvent) || (seasonalevents_1.EventTracker.isPreExplosion && botRole.toLowerCase() == "pmcbot"))
            this.addGasMasksToBots(botJsonTemplateClone.inventory.equipment, botJsonTemplateClone.chances, botRole.toLocaleLowerCase(), isPMC, pmcTier);
        const bot = this.myGenerateBot(sessionId, preparedBotBase, botJsonTemplateClone, botGenerationDetails, pmcTier);
        if (this.placeHolderBotCache.length === 0)
            this.placeHolderBotCache.push(bot);
        return bot;
    }
    setBotMemberAndGameEdition(botInfo, pmcTier) {
        // Special case
        if (botInfo.Nickname.toLowerCase() === "nikita") {
            botInfo.GameVersion = GameEditions_1.GameEditions.UNHEARD;
            botInfo.MemberCategory = MemberCategory_1.MemberCategory.DEVELOPER;
            return botInfo.GameVersion;
        }
        switch (pmcTier) {
            case 1:
                botInfo.GameVersion = GameEditions_1.GameEditions.STANDARD;
                botInfo.MemberCategory = MemberCategory_1.MemberCategory.DEFAULT;
                break;
            case 2:
                botInfo.GameVersion = GameEditions_1.GameEditions.LEFT_BEHIND;
                botInfo.MemberCategory = MemberCategory_1.MemberCategory.DEFAULT;
                break;
            case 3:
                botInfo.GameVersion = GameEditions_1.GameEditions.PREPARE_FOR_ESCAPE;
                botInfo.MemberCategory = MemberCategory_1.MemberCategory.DEFAULT;
                break;
            case 4:
            case 5:
                botInfo.GameVersion = GameEditions_1.GameEditions.EDGE_OF_DARKNESS;
                botInfo.MemberCategory = MemberCategory_1.MemberCategory.UNIQUE_ID;
                break;
            default:
                botInfo.MemberCategory = Number.parseInt(this.weightedRandomHelper.getWeightedValue(this.pmcConfig.accountTypeWeight), 10);
        }
        // Ensure selected category matches
        botInfo.SelectedMemberCategory = botInfo.MemberCategory;
        return botInfo.GameVersion;
    }
    myGenerateBot(sessionId, bot, botJsonTemplate, botGenerationDetails, pmcTier) {
        const botWeaponGenerator = tsyringe_1.container.resolve("BotWeaponGenerator");
        const botLootGenerator = tsyringe_1.container.resolve("BotLootGenerator");
        const botGeneratorHelper = tsyringe_1.container.resolve("BotGeneratorHelper");
        const localisationService = tsyringe_1.container.resolve("LocalisationService");
        const botEquipmentModPoolService = tsyringe_1.container.resolve("BotEquipmentModPoolService");
        const botEquipmentModGenerator = tsyringe_1.container.resolve("BotEquipmentModGenerator");
        const applicationContext = tsyringe_1.container.resolve("ApplicationContext");
        const weatherHelper = tsyringe_1.container.resolve("WeatherHelper");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const mathUtil = tsyringe_1.container.resolve("MathUtil");
        // const seasonalEvents = new SeasonalEventsHandler();
        const genBotLvl = new GenBotLvl(this.logger, this.randomUtil, this.databaseService, mathUtil);
        const botInvGen = new BotInvGen(this.logger, this.hashUtil, this.randomUtil, this.databaseService, applicationContext, botWeaponGenerator, botLootGenerator, botGeneratorHelper, this.profileHelper, this.botHelper, this.weightedRandomHelper, itemHelper, weatherHelper, localisationService, this.botEquipmentFilterService, botEquipmentModPoolService, botEquipmentModGenerator, this.configServer);
        const botRole = botGenerationDetails.role.toLowerCase();
        const botLevel = genBotLvl.genBotLvl(botJsonTemplate.experience.level, botGenerationDetails, bot);
        // Only filter bot equipment, never players
        if (!botGenerationDetails.isPlayerScav) { // && this.shouldSimulatePlayerScav(botRole)
            this.botEquipmentFilterService.filterBotEquipment(sessionId, botJsonTemplate, botLevel.level, botGenerationDetails);
        }
        bot.Info.Nickname = this.botNameService.generateUniqueBotNickname(botJsonTemplate, botGenerationDetails, botRole, this.botConfig.botRolesThatMustHaveUniqueName);
        // Only run when generating a 'fake' playerscav, not actual player scav
        if (!botGenerationDetails.isPlayerScav && this.shouldSimulatePlayerScav(botRole)) {
            this.botNameService.addRandomPmcNameToBotMainProfileNicknameProperty(bot);
            this.setRandomisedGameVersionAndCategory(bot.Info);
        }
        //SPT has christmas and halloween stuff in bot inventories by default then removes it if not halloween or christams
        //so until I modify all bot loadouts I have to keep this, and then add christmas items manually to bots.
        if (!this.seasonalEventService.christmasEventEnabled()) {
            // Process all bots EXCEPT gifter, he needs christmas items
            if (botGenerationDetails.role !== "gifter") {
                this.seasonalEventService.removeChristmasItemsFromBotInventory(botJsonTemplate.inventory, botGenerationDetails.role);
            }
        }
        this.removeBlacklistedLootFromBotTemplate(botJsonTemplate.inventory);
        //broken because SPT changed loot from array to record
        // if (EventTracker.isChristmas == true) {
        //     seasonalEvents.giveBotsChristmasPresents(botJsonTemplate);
        // }
        // if (EventTracker.isHalloween == true) {
        //     seasonalEvents.giveBotsHalloweenTreats(botJsonTemplate);
        // }
        // Remove hideout data if bot is not a PMC or pscav
        if (!(botGenerationDetails.isPmc || botGenerationDetails.isPlayerScav)) {
            bot.Hideout = undefined;
        }
        bot.Info.Experience = botLevel.exp;
        bot.Info.Level = botLevel.level;
        bot.Info.Settings.Experience = this.getExperienceRewardForKillByDifficulty(botJsonTemplate.experience.reward, botGenerationDetails.botDifficulty, botGenerationDetails.role);
        bot.Info.Settings.StandingForKill = this.getStandingChangeForKillByDifficulty(botJsonTemplate.experience.standingForKill, botGenerationDetails.botDifficulty, botGenerationDetails.role);
        bot.Info.Settings.AggressorBonus = this.getAgressorBonusByDifficulty(botJsonTemplate.experience.aggressorBonus, botGenerationDetails.botDifficulty, botGenerationDetails.role);
        bot.Info.Settings.UseSimpleAnimator = botJsonTemplate.experience.useSimpleAnimator ?? false;
        bot.Info.Voice = this.weightedRandomHelper.getWeightedValue(botJsonTemplate.appearance.voice);
        bot.Health = this.generateHealth(botJsonTemplate.health, botGenerationDetails.isPlayerScav);
        bot.Skills = this.generateSkills(botJsonTemplate.skills); // TODO: fix bad type, bot jsons store skills in dict, output needs to be array
        if (botGenerationDetails.isPmc) {
            bot.Info.IsStreamerModeAvailable = true; // Set to true so client patches can pick it up later - client sometimes alters botrole to assaultGroup
            this.setBotMemberAndGameEdition(bot.Info, pmcTier);
            if (bot.Info.GameVersion === GameEditions_1.GameEditions.UNHEARD) {
                this.addAdditionalPocketLootWeightsForUnheardBot(botJsonTemplate);
            }
        }
        this.setBotAppearance(bot, botJsonTemplate.appearance, botGenerationDetails);
        bot.Inventory = botInvGen.myGenerateInventory(sessionId, botJsonTemplate, botRole, botGenerationDetails.isPmc, botLevel.level, pmcTier, bot.Info.GameVersion);
        if (this.botConfig.botRolesWithDogTags.includes(botRole)) {
            this.addDogtagToBot(bot);
        }
        // generate new bot ID
        this.addIdsToBot(bot);
        // generate new inventory ID
        this.generateInventoryId(bot);
        // Set role back to originally requested now its been generated
        if (botGenerationDetails.eventRole) {
            bot.Info.Settings.Role = botGenerationDetails.eventRole;
        }
        return bot;
    }
}
exports.BotGen = BotGen;
class BotInvGen extends BotInventoryGenerator_1.BotInventoryGenerator {
    tryGetPMCSecondary(botInventory, itemDb, templateInventory, equipmentChances, sessionId, botRole, isPmc, pmcTier, botLevel, itemGenerationLimitsMinMax) {
        try {
            let shouldGetSecondary = false;
            if (botInventory.items != null) {
                for (let inventoryItem of botInventory.items) {
                    let item = itemDb[inventoryItem._tpl];
                    if (item != null && item?._parent != null && item?._parent === BaseClasses_1.BaseClasses.SNIPER_RIFLE) {
                        shouldGetSecondary = true;
                    }
                }
            }
            if (shouldGetSecondary) {
                this.myGenerateAndAddWeaponsToBot(templateInventory, equipmentChances, sessionId, botInventory, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier, true);
            }
        }
        catch (error) {
            this.logger.warning(`Realism Mod: Failed To Fetch Secondary Weapon For Bot ${botRole} at level ${pmcTier}, error code: ${error}`);
        }
    }
    myGenerateInventory(sessionId, botJsonTemplate, botRole, isPmc, botLevel, pmcTier, chosenGameVersion) {
        const botLootCacheService = tsyringe_1.container.resolve("BotLootCacheService");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const handbookHelper = tsyringe_1.container.resolve("HandbookHelper");
        const inventoryHelper = tsyringe_1.container.resolve("InventoryHelper");
        const cloner = tsyringe_1.container.resolve("PrimaryCloner");
        const tables = this.databaseService.getTables();
        const itemDb = tables.templates.items;
        const botLootGen = new bot_loot_serv_1.BotLootGen(this.logger, this.hashUtil, this.randomUtil, itemHelper, inventoryHelper, this.databaseService, handbookHelper, this.botGeneratorHelper, this.botWeaponGenerator, this.weightedRandomHelper, this.botHelper, botLootCacheService, this.localisationService, this.configServer, cloner);
        const templateInventory = botJsonTemplate.inventory;
        const equipmentChances = botJsonTemplate.chances;
        const itemGenerationLimitsMinMax = botJsonTemplate.generation;
        // Generate base inventory with no items
        const botInventory = this.generateInventoryBase();
        this.myGenerateAndAddEquipmentToBot(sessionId, templateInventory, equipmentChances, botRole, botInventory, botLevel, pmcTier, chosenGameVersion);
        ;
        // Roll weapon spawns and generate a weapon for each roll that passed
        this.myGenerateAndAddWeaponsToBot(templateInventory, equipmentChances, sessionId, botInventory, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier, false);
        //if PMC has a bolt action rifle, ensure they get a proper secondary
        if (isPmc && pmcTier >= 2) {
            this.tryGetPMCSecondary(botInventory, itemDb, templateInventory, equipmentChances, sessionId, botRole, isPmc, pmcTier, botLevel, itemGenerationLimitsMinMax);
        }
        if (modConfig.bot_loot_changes === true) {
            botLootGen.genLoot(sessionId, botJsonTemplate, isPmc, botRole, botInventory, pmcTier);
        }
        else {
            this.botLootGenerator.generateLoot(sessionId, botJsonTemplate, isPmc, botRole, botInventory, botLevel);
        }
        return botInventory;
    }
    myGenerateAndAddWeaponsToBot(templateInventory, equipmentChances, sessionId, botInventory, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier, getSecondary = false) {
        if (getSecondary) {
            let secondarySlot = {
                slot: EquipmentSlots_1.EquipmentSlots.SECOND_PRIMARY_WEAPON,
                shouldSpawn: true
            };
            this.myAddWeaponAndMagazinesToInventory(sessionId, secondarySlot, templateInventory, botInventory, equipmentChances, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier, true);
        }
        else {
            const weaponSlotsToFill = this.getDesiredWeaponsForBot(equipmentChances);
            for (const weaponSlot of weaponSlotsToFill) {
                // Add weapon to bot if true and bot json has something to put into the slot
                if (weaponSlot.shouldSpawn && Object.keys(templateInventory.equipment[weaponSlot.slot]).length) {
                    this.myAddWeaponAndMagazinesToInventory(sessionId, weaponSlot, templateInventory, botInventory, equipmentChances, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier);
                }
            }
        }
    }
    myAddWeaponAndMagazinesToInventory(sessionId, weaponSlot, templateInventory, botInventory, equipmentChances, botRole, isPmc, itemGenerationWeights, botLevel, pmcTier, getSecondary = false) {
        const cloner = tsyringe_1.container.resolve("PrimaryCloner");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const botWeaponGeneratorHelper = tsyringe_1.container.resolve("BotWeaponGeneratorHelper");
        const inventoryMagGenComponents = tsyringe_1.container.resolveAll("InventoryMagGen");
        const botWeaponModLimitService = tsyringe_1.container.resolve("BotWeaponModLimitService");
        const repairService = tsyringe_1.container.resolve("RepairService");
        const botWepGen = new BotWepGen(this.logger, this.hashUtil, this.databaseService, itemHelper, this.weightedRandomHelper, this.botGeneratorHelper, this.randomUtil, this.configServer, botWeaponGeneratorHelper, botWeaponModLimitService, this.botEquipmentModGenerator, this.localisationService, repairService, inventoryMagGenComponents, cloner);
        const generatedWeapon = botWepGen.myGenerateRandomWeapon(sessionId, weaponSlot.slot, templateInventory, botInventory.equipment, equipmentChances.weaponMods, botRole, isPmc, botLevel, pmcTier, getSecondary);
        botInventory.items.push(...generatedWeapon.weapon);
        botWepGen.myAddExtraMagazinesToInventory(generatedWeapon, itemGenerationWeights.items.magazines, botInventory, botRole, templateInventory);
    }
    myGenerateAndAddEquipmentToBot(sessionId, templateInventory, equipmentChances, botRole, botInventory, botLevel, pmcTier, chosenGameVersion) {
        // These will be handled later
        const excludedSlots = [
            EquipmentSlots_1.EquipmentSlots.POCKETS,
            EquipmentSlots_1.EquipmentSlots.FIRST_PRIMARY_WEAPON,
            EquipmentSlots_1.EquipmentSlots.SECOND_PRIMARY_WEAPON,
            EquipmentSlots_1.EquipmentSlots.HOLSTER,
            EquipmentSlots_1.EquipmentSlots.ARMOR_VEST,
            EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST,
            EquipmentSlots_1.EquipmentSlots.HEADWEAR,
            EquipmentSlots_1.EquipmentSlots.FACE_COVER,
            EquipmentSlots_1.EquipmentSlots.EARPIECE
        ];
        const botEquipConfig = this.botConfig.equipment[this.botGeneratorHelper.getBotEquipmentRole(botRole)];
        const randomistionDetails = this.botHelper.getBotRandomizationDetails(botLevel, botEquipConfig);
        const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(botRole);
        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);
        for (const equipmentSlot in templateInventory.equipment) {
            // Weapons have special generation and will be generated seperately; ArmorVest should be generated after TactivalVest
            if (excludedSlots.includes(equipmentSlot)) {
                continue;
            }
            this.myGenerateEquipment({
                rootEquipmentSlot: equipmentSlot,
                rootEquipmentPool: templateInventory.equipment[equipmentSlot],
                modPool: templateInventory.mods,
                spawnChances: equipmentChances,
                botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
                inventory: botInventory,
                botEquipmentConfig: botEquipConfig,
                randomisationDetails: randomistionDetails,
                generatingPlayerLevel: pmcProfile.Info.Level
            }, pmcTier);
        }
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots_1.EquipmentSlots.POCKETS,
            rootEquipmentPool: chosenGameVersion === GameEditions_1.GameEditions.UNHEARD
                ? { [ItemTpl_1.ItemTpl.POCKETS_1X4_TUE]: 1 }
                : templateInventory.equipment.Pockets,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generateModsBlacklist: [ItemTpl_1.ItemTpl.POCKETS_1X4_TUE],
            generatingPlayerLevel: pmcProfile.Info.Level
        }, pmcTier);
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots_1.EquipmentSlots.FACE_COVER,
            rootEquipmentPool: templateInventory.equipment.FaceCover,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        }, pmcTier);
        // Generate below in specific order
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots_1.EquipmentSlots.HEADWEAR,
            rootEquipmentPool: templateInventory.equipment.Headwear,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        }, pmcTier);
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots_1.EquipmentSlots.EARPIECE,
            rootEquipmentPool: templateInventory.equipment.Earpiece,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        }, pmcTier);
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST,
            rootEquipmentPool: templateInventory.equipment.TacticalVest,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        }, pmcTier);
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots_1.EquipmentSlots.ARMOR_VEST,
            rootEquipmentPool: templateInventory.equipment.ArmorVest,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        }, pmcTier);
    }
    myGenerateEquipment(settings, pmcTier) {
        const botWeaponGeneratorHelper = tsyringe_1.container.resolve("BotWeaponGeneratorHelper");
        const profileHelper = tsyringe_1.container.resolve("ProfileHelper");
        const botWeaponModLimitService = tsyringe_1.container.resolve("BotWeaponModLimitService");
        const itemFilterService = tsyringe_1.container.resolve("ItemFilterService");
        const presetHelper = tsyringe_1.container.resolve("PresetHelper");
        const botEquipmentFilterService = tsyringe_1.container.resolve("BotEquipmentFilterService");
        const probabilityHelper = tsyringe_1.container.resolve("ProbabilityHelper");
        const jsonUtil = tsyringe_1.container.resolve("JsonUtil");
        const logger = tsyringe_1.container.resolve("WinstonLogger");
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const appContext = tsyringe_1.container.resolve("ApplicationContext");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const inventoryHelper = tsyringe_1.container.resolve("InventoryHelper");
        const containerHelper = tsyringe_1.container.resolve("ContainerHelper");
        const cloner = tsyringe_1.container.resolve("PrimaryCloner");
        const myBotGenHelper = new BotGenHelper(logger, this.randomUtil, this.databaseService, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, appContext, this.localisationService, this.configServer);
        const botModGen = new BotEquipGenHelper(this.logger, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseService, this.itemHelper, botEquipmentFilterService, itemFilterService, profileHelper, botWeaponModLimitService, this.botHelper, this.botGeneratorHelper, botWeaponGeneratorHelper, this.weightedRandomHelper, presetHelper, this.localisationService, this.botEquipmentModPoolService, this.configServer, cloner);
        const spawnChance = [EquipmentSlots_1.EquipmentSlots.POCKETS, EquipmentSlots_1.EquipmentSlots.SECURED_CONTAINER].includes(settings.rootEquipmentSlot)
            ? 100
            : settings.spawnChances.equipment[settings.rootEquipmentSlot];
        if (typeof spawnChance === "undefined") {
            this.logger.warning(this.localisationService.getText("bot-no_spawn_chance_defined_for_equipment_slot", settings.rootEquipmentSlot));
            return;
        }
        const shouldSpawn = this.randomUtil.getChance100(spawnChance);
        if (shouldSpawn && Object.keys(settings.rootEquipmentPool).length) {
            const equipmentItemTpl = this.weightedRandomHelper.getWeightedValue(settings.rootEquipmentPool);
            const itemTemplate = this.itemHelper.getItem(equipmentItemTpl);
            if (!itemTemplate[0]) {
                this.logger.error(this.localisationService.getText("bot-missing_item_template", equipmentItemTpl));
                this.logger.info(`EquipmentSlot -> ${settings.rootEquipmentSlot}`);
                return;
            }
            if (this.botGeneratorHelper.isItemIncompatibleWithCurrentItems(settings.inventory.items, equipmentItemTpl, settings.rootEquipmentSlot).incompatible) {
                // Bad luck - randomly picked item was not compatible with current gear
                return;
            }
            const id = this.hashUtil.generate();
            const item = {
                "_id": id,
                "_tpl": equipmentItemTpl,
                "parentId": settings.inventory.equipment,
                "slotId": settings.rootEquipmentSlot,
                ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate[1], settings.botData.role, itemTemplate[1]._parent)
            };
            const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(settings.botData.equipmentRole, settings.generatingPlayerLevel);
            // use dynamic mod pool if enabled in config
            const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(settings.botData.role);
            if (this.botConfig.equipment[botEquipmentRole] && settings.randomisationDetails?.randomisedArmorSlots?.includes(settings.rootEquipmentSlot)) {
                settings.modPool[equipmentItemTpl] = this.getFilteredDynamicModsForItem(equipmentItemTpl, botEquipBlacklist.equipment);
            }
            // Does item have slots for sub-mods to be inserted into
            if (itemTemplate[1]._props.Slots?.length > 0 && !settings.generateModsBlacklist?.includes(itemTemplate[1]._id)) {
                const childItemsToAdd = botModGen.myGenerateModsForEquipment([item], id, itemTemplate[1], settings, false, settings.botData.role, pmcTier, myBotGenHelper);
                settings.inventory.items.push(...childItemsToAdd);
            }
            else {
                settings.inventory.items.push(item);
            }
        }
    }
}
exports.BotInvGen = BotInvGen;
class BotWepGen extends BotWeaponGenerator_1.BotWeaponGenerator {
    myAddExtraMagazinesToInventory(generatedWeaponResult, magWeights, inventory, botRole, botTemplateInventory) {
        const weaponAndMods = generatedWeaponResult.weapon;
        const weaponTemplate = generatedWeaponResult.weaponTemplate;
        const magazineTpl = this.getMagazineTplFromWeaponTemplate(weaponAndMods, weaponTemplate, botRole);
        const magTemplate = this.itemHelper.getItem(magazineTpl)[1];
        if (!magTemplate) {
            this.logger.error(this.localisationService.getText("bot-unable_to_find_magazine_item", magazineTpl));
            return;
        }
        const ammoTemplate = this.itemHelper.getItem(generatedWeaponResult.chosenAmmoTpl)[1];
        if (!ammoTemplate) {
            this.logger.error(this.localisationService.getText("bot-unable_to_find_ammo_item", generatedWeaponResult.chosenAmmoTpl));
            return;
        }
        // Has an UBGL
        if (generatedWeaponResult.chosenUbglAmmoTpl) {
            this.addUbglGrenadesToBotInventory(weaponAndMods, generatedWeaponResult, inventory);
        }
        const inventoryMagGenModel = new InventoryMagGen_1.InventoryMagGen(magWeights, magTemplate, weaponTemplate, ammoTemplate, inventory);
        const isExternalMag = weaponTemplate._parent != BaseClasses_1.BaseClasses.UBGL &&
            weaponTemplate._props.ReloadMode !== "OnlyBarrel" &&
            magTemplate._props.ReloadMagType !== "InternalMagazine";
        if (isExternalMag) {
            this.myProcess(inventoryMagGenModel, botTemplateInventory);
        }
        else {
            this.inventoryMagGenComponents
                .find((v) => v.canHandleInventoryMagGen(inventoryMagGenModel))
                .process(inventoryMagGenModel);
        }
        // Add x stacks of bullets to SecuredContainer (bots use a magic mag packing skill to reload instantly)
        this.addAmmoToSecureContainer(this.botConfig.secureContainerAmmoStackCount, generatedWeaponResult.chosenAmmoTpl, ammoTemplate._props.StackMaxSize, inventory);
    }
    myProcess(inventoryMagGen, botTemplateInventory) {
        // Cout of attempts to fit a magazine into bot inventory
        let fitAttempts = 0;
        let magCount = 0;
        let ammoCount = 0;
        // Magazine Db template
        let magTemplate = inventoryMagGen.getMagazineTemplate();
        let magazineTpl = magTemplate._id;
        const weapon = inventoryMagGen.getWeaponTemplate();
        const attemptedMagBlacklist = [];
        let defaultMagazineTpl = this.botWeaponGeneratorHelper.getWeaponsDefaultMagazineTpl(weapon);
        const randomizedMagazineCount = Number(this.botWeaponGeneratorHelper.getRandomizedMagazineCount(inventoryMagGen.getMagCount()));
        //If G36 is using STANAG adapter + mags that can't be fit inside rig, then this makes sure it uses STANAG mag as default instad of G36 mag
        const isG36 = weapon._id == "623063e994fc3f7b302a9696";
        if (isG36) {
            const isUsingAdapter = magazineTpl != "62307b7b10d2321fa8741921";
            if (isUsingAdapter)
                defaultMagazineTpl = "5c6d450c2e221600114c997d"; //HK PM gen 2
        }
        const isPistol = weapon?._props?.weapClass == "pistol";
        const isSMG = weapon?._props?.weapClass == "smg";
        const isShotgun = weapon?._props?.weapClass == "shotgun";
        const magRoundCount = magTemplate?._props?.Cartridges[0]._max_count;
        const roundLimit = isPistol ? 25 : isSMG ? 45 : isShotgun ? 8 : 45;
        const hiCapMagLimit = isPistol ? 1 : isSMG ? 2 : isShotgun ? 2 : 1;
        const isUsingHiCapMag = magRoundCount > roundLimit;
        const isUltraHiCapMag = magRoundCount > 70;
        const ammoLimit = isPistol ? 30 : isSMG ? 150 : isShotgun ? 50 : 140;
        let ammo = inventoryMagGen.getAmmoTemplate()._id;
        let hasReplacedHighCap = false;
        for (let i = 0; i < randomizedMagazineCount; i++) {
            const rndNum = utils_1.Utils.getInstance().pickRandNumInRange(0, 100);
            if (rndNum >= 65)
                ammo = this.getWeightedCompatibleAmmo(botTemplateInventory.Ammo, inventoryMagGen.getWeaponTemplate());
            //reduce the number of 60 rounders on bots
            if (!hasReplacedHighCap && (isUltraHiCapMag || (isUsingHiCapMag && magCount >= hiCapMagLimit))) {
                magazineTpl = defaultMagazineTpl;
                magTemplate = this.itemHelper.getItem(magazineTpl)[1];
                ammo = this.getWeightedCompatibleAmmo(botTemplateInventory.Ammo, inventoryMagGen.getWeaponTemplate());
                hasReplacedHighCap = true;
            }
            const magazineWithAmmo = this.botWeaponGeneratorHelper.createMagazineWithAmmo(magazineTpl, ammo, magTemplate);
            const fitsIntoInventory = this.botGeneratorHelper.addItemWithChildrenToEquipmentSlot([EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST, EquipmentSlots_1.EquipmentSlots.POCKETS], magazineWithAmmo[0]._id, magazineTpl, magazineWithAmmo, inventoryMagGen.getPmcInventory());
            if (fitsIntoInventory === ItemAddedResult_1.ItemAddedResult.NO_CONTAINERS) {
                // No containers to fit magazines, stop trying
                break;
            }
            // No space for magazine and we haven't reached desired magazine count
            if (fitsIntoInventory === ItemAddedResult_1.ItemAddedResult.NO_SPACE && i < randomizedMagazineCount) {
                // Prevent infinite loop by only allowing 5 attempts at fitting a magazine into inventory
                if (fitAttempts > 5) {
                    this.logger.debug(`Failed ${fitAttempts} times to add magazine ${magazineTpl} to bot inventory, stopping`);
                    break;
                }
                /* We were unable to fit at least the minimum amount of magazines,
                 * so we fallback to default magazine and try again.
                 * Temporary workaround to Killa spawning with no extra mags if he spawns with a drum mag */
                if (magazineTpl === defaultMagazineTpl) {
                    // We were already on default - stop here to prevent infinite looping
                    break;
                }
                // Add failed magazine tpl to blacklist
                attemptedMagBlacklist.push(magazineTpl);
                // Set chosen magazine tpl to the weapons default magazine tpl and try to fit into inventory next loop
                magazineTpl = defaultMagazineTpl;
                magTemplate = this.itemHelper.getItem(magazineTpl)[1];
                if (!magTemplate) {
                    this.logger.error(this.localisationService.getText("bot-unable_to_find_default_magazine_item", magazineTpl));
                    break;
                }
                // Edge case - some weapons (SKS) have an internal magazine as default, choose random non-internal magazine to add to bot instead
                if (magTemplate._props.ReloadMagType === "InternalMagazine") {
                    const result = this.getRandomExternalMagazineForInternalMagazineGun(inventoryMagGen.getWeaponTemplate()._id, attemptedMagBlacklist);
                    if (!result?._id) {
                        this.logger.debug(`Unable to add additional magazine into bot inventory for weapon: ${weapon._name}, attempted: ${fitAttempts} times`);
                        break;
                    }
                    magazineTpl = result._id;
                    magTemplate = result;
                    fitAttempts++;
                }
                // Reduce loop counter by 1 to ensure we get full cout of desired magazines
                i--;
            }
            if (fitsIntoInventory === ItemAddedResult_1.ItemAddedResult.SUCCESS) {
                // Reset fit counter now it succeeded
                fitAttempts = 0;
                magCount++;
                ammoCount += this.itemHelper.getItem(magazineTpl)[1]?._props?.Cartridges[0]._max_count;
                if (ammoCount >= ammoLimit) {
                    break;
                }
            }
        }
    }
    getRandomExternalMagazineForInternalMagazineGun(weaponTpl, magazineBlacklist) {
        // The mag Slot data for the weapon
        const magSlot = this.itemHelper.getItem(weaponTpl)[1]._props.Slots.find((x) => x._name === "mod_magazine");
        if (!magSlot) {
            return undefined;
        }
        // All possible mags that fit into the weapon excluding blacklisted
        const magazinePool = magSlot._props.filters[0].Filter.filter((x) => !magazineBlacklist.includes(x)).map((x) => this.itemHelper.getItem(x)[1]);
        if (!magazinePool) {
            return undefined;
        }
        // Non-internal magazines that fit into the weapon
        const externalMagazineOnlyPool = magazinePool.filter((x) => x._props.ReloadMagType !== "InternalMagazine");
        if (!externalMagazineOnlyPool || externalMagazineOnlyPool?.length === 0) {
            return undefined;
        }
        // Randomly chosen external magazine
        return this.randomUtil.getArrayValue(externalMagazineOnlyPool);
    }
    myGenerateRandomWeapon(sessionId, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier, getSecondary = false) {
        let weaponTpl = "";
        if (getSecondary) {
            weaponTpl = this.weightedRandomHelper.getWeightedValue(botTemplateInventory.equipment["SecondPrimaryWeapon"]);
        }
        else {
            weaponTpl = this.pickWeightedWeaponTplFromPool(equipmentSlot, botTemplateInventory);
        }
        1;
        if (weaponTpl === "") {
            this.logger.error("Realism Mod: Failed To Generate Weapon Tpl");
            return;
        }
        return this.myGenerateWeaponByTpl(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier);
    }
    myGenerateWeaponByTpl(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier) {
        const probabilityHelper = tsyringe_1.container.resolve("ProbabilityHelper");
        const profileHelper = tsyringe_1.container.resolve("ProfileHelper");
        const botEquipmentFilterService = tsyringe_1.container.resolve("BotEquipmentFilterService");
        const itemFilterService = tsyringe_1.container.resolve("ItemFilterService");
        const botHelper = tsyringe_1.container.resolve("BotHelper");
        const botEquipmentModPoolService = tsyringe_1.container.resolve("BotEquipmentModPoolService");
        const presetHelper = tsyringe_1.container.resolve("PresetHelper");
        const botModGen = new BotEquipGenHelper(this.logger, this.hashUtil, this.randomUtil, probabilityHelper, this.databaseService, this.itemHelper, botEquipmentFilterService, itemFilterService, profileHelper, this.botWeaponModLimitService, botHelper, this.botGeneratorHelper, this.botWeaponGeneratorHelper, this.weightedRandomHelper, presetHelper, this.localisationService, botEquipmentModPoolService, this.configServer, this.cloner);
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
        // Chance to add randomised weapon enhancement
        if (isPmc && this.randomUtil.getChance100(this.pmcConfig.weaponHasEnhancementChancePercent)) {
            const weaponConfig = this.repairConfig.repairKit.weapon;
            this.repairService.addBuff(weaponConfig, weaponWithModsArray[0]);
        }
        // Add mods to weapon base
        if (Object.keys(modPool).includes(weaponTpl)) {
            const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(botRole);
            const modLimits = this.botWeaponModLimitService.getWeaponModLimits(botEquipmentRole);
            const generateWeaponModsRequest = {
                weapon: weaponWithModsArray, // Will become hydrated array of weapon + mods
                modPool: modPool,
                weaponId: weaponWithModsArray[0]._id, // Weapon root id
                parentTemplate: weaponItemTemplate,
                modSpawnChances: modChances,
                ammoTpl: ammoTpl,
                botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
                modLimits: modLimits,
                weaponStats: {},
                conflictingItemTpls: new Set(),
            };
            weaponWithModsArray = botModGen.botModGen(sessionId, generateWeaponModsRequest, equipmentSlot);
        }
        // Use weapon preset from globals.json if weapon isnt valid
        if (!this.myisWeaponValid(weaponWithModsArray)) {
            // Weapon is bad, fall back to weapons preset
            weaponWithModsArray = this.myGetPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, weaponItemTemplate, botRole, pmcTier);
        }
        // Fill existing magazines to full and sync ammo type
        for (const magazine of weaponWithModsArray.filter((item) => item.slotId === this.modMagazineSlotId)) {
            this.fillExistingMagazines(weaponWithModsArray, magazine, ammoTpl);
        }
        // Add cartridge(s) to gun chamber(s)
        if (weaponItemTemplate._props.Chambers?.length > 0 && weaponItemTemplate._props.Chambers[0]?._props?.filters[0]?.Filter?.includes(ammoTpl)) {
            // Guns have variety of possible Chamber ids, patron_in_weapon/patron_in_weapon_000/patron_in_weapon_001
            const chamberSlotNames = weaponItemTemplate._props.Chambers.map(x => x._name);
            this.addCartridgeToChamber(weaponWithModsArray, ammoTpl, chamberSlotNames);
        }
        // Fill UBGL if found
        const ubglMod = weaponWithModsArray.find((x) => x.slotId === "mod_launcher");
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
            weaponTemplate: weaponItemTemplate,
        };
    }
    myisWeaponValid(weaponItemArray) {
        const checkRequired = new CheckRequired();
        for (const mod of weaponItemArray) {
            const modTemplate = this.itemHelper.getItem(mod._tpl)[1];
            if (!modTemplate._props.Slots || !modTemplate._props.Slots.length) {
                continue;
            }
            // Iterate over slots in db item, if required, check tpl in that slot matches the filter list
            for (const modSlot of modTemplate._props.Slots) {
                // ignore optional mods
                if (!checkRequired.isRequired(modSlot)) {
                    continue;
                }
                const allowedTpls = modSlot._props.filters[0].Filter;
                const slotName = modSlot._name;
                const weaponSlotItem = weaponItemArray.find((weaponItem) => weaponItem.parentId === mod._id && weaponItem.slotId === slotName);
                if (!weaponSlotItem) {
                    if (modConfig.logEverything == true) {
                        this.logger.warning(this.localisationService.getText("bot-weapons_required_slot_missing_item", { modSlot: modSlot._name, modName: modTemplate._name, slotId: mod.slotId }));
                    }
                    return false;
                }
                if (!allowedTpls.includes(weaponSlotItem._tpl)) {
                    if (modConfig.logEverything == true) {
                        this.logger.warning(this.localisationService.getText("bot-weapon_contains_invalid_item", { modSlot: modSlot._name, modName: modTemplate._name, weaponTpl: weaponSlotItem._tpl }));
                    }
                    return false;
                }
            }
        }
        return true;
    }
    //if the weapon is a holstered and it has a light, set it to off. This prevents cases of holstered weapons giving away bots
    genExtraPropsForPreset(equipmentSlot, weaponTpl, preset, botRole, tables, myBotGenHelper) {
        const isHolsteredWeapon = (equipmentSlot.toLowerCase() === "holster" && tables.templates.items[weaponTpl]._parent === BaseClasses_1.BaseClasses.PISTOL) || equipmentSlot.toLowerCase() === "secondprimaryweapon";
        const lightLaserActiveChance = myBotGenHelper.getLightOnChance(botRole);
        const isActive = isHolsteredWeapon ? false : (this.randomUtil.getChance100(lightLaserActiveChance));
        for (let presetItem of preset._items) {
            let itemTemplate = tables.templates.items[presetItem._tpl];
            if (itemTemplate._parent === BaseClasses_1.BaseClasses.FLASHLIGHT || itemTemplate._parent === BaseClasses_1.BaseClasses.TACTICAL_COMBO || itemTemplate._parent === BaseClasses_1.BaseClasses.LIGHT_LASER_DESIGNATOR) {
                if (presetItem.upd?.Light?.IsActive != null) {
                    presetItem.upd.Light.IsActive = isActive;
                }
                else {
                    presetItem.upd = {
                        "Light": {
                            "IsActive": isActive,
                            "SelectedMode": 0
                        }
                    };
                }
            }
        }
    }
    getCultistPresets(botrole) {
        const isPriest = botrole.includes("riest");
        const baseJson = isPriest ? utils_1.BotTierTracker.priestBaseJson : utils_1.BotTierTracker.cultistBaseJson;
        if (baseJson == 0)
            return "pmcusec";
        else if (baseJson == 1)
            return "pmcbear";
        if (isPriest && baseJson == 2)
            return "exusec";
        else if (isPriest)
            return "pmcbot";
        if (baseJson == 2)
            return "pmcusec";
        else
            return "pmcbear";
    }
    //preset format has changed serveral times and I'm tired of updating them.
    reformatPreset(preset) {
        if (preset.hasOwnProperty("root") || preset.hasOwnProperty("Root")) {
            const isUpperCase = preset.Root != null ? true : false;
            const parent = isUpperCase ? preset.Root : preset.root;
            const id = isUpperCase ? preset.Id : preset.id;
            const items = isUpperCase ? preset.Items : preset.items;
            const name = isUpperCase ? preset.Name : preset.name;
            return {
                "_id": id,
                "_type": "Preset",
                "_changeWeaponName": false,
                "_name": name,
                "_parent": parent,
                "_items": items
            };
        }
        return preset;
    }
    getCustomPresetHelper(presetFile, weaponTpl, tier, isUserPreset = false) {
        const iterable = isUserPreset ? presetFile.userPresets : presetFile;
        let weaponPresets = [];
        if (iterable == null) {
            this.logger.warning(`Realism Mod: no presets found in file ${presetFile}`);
            return weaponPresets;
        }
        weaponPresets = this.processPresets(iterable, weaponTpl, tier, false);
        //failed to get a preset within the same tier as PMC, so we loop again and ignore the tier requirement.
        if (weaponPresets.length == 0) {
            weaponPresets = this.processPresets(iterable, weaponTpl, tier, true);
        }
        return weaponPresets;
    }
    processPresets(iterable, weaponTpl, tier, ignoreTier = false) {
        let weaponPresets = [];
        //user prests are in the form of an array, with non-nested obejcts. Other presets are nested objects with no array.
        if (Array.isArray(iterable)) {
            for (const preset of iterable) {
                const returnedPreset = this.presetProcessHelper(preset, weaponTpl, tier, ignoreTier);
                if (returnedPreset != null) {
                    const reformatedPreset = { [returnedPreset._name]: returnedPreset }; //server requires nested object
                    weaponPresets.push(returnedPreset);
                }
            }
        }
        else {
            for (const key in iterable) {
                const returnedPreset = this.presetProcessHelper(iterable[key], weaponTpl, tier, ignoreTier);
                if (returnedPreset != null)
                    weaponPresets.push(returnedPreset);
            }
        }
        return weaponPresets;
    }
    presetProcessHelper(preset, weaponTpl, tier, ignoreTier = false) {
        preset = this.reformatPreset(preset);
        if (preset._items[0]._tpl === weaponTpl) {
            if (ignoreTier) {
                if (modConfig.logEverything === true)
                    this.logger.warning(`Found a preset outside of tier`);
                return preset;
            }
            else {
                let presetTier = preset._name ? preset._name.slice(0, 1) : "0";
                let pTierNum = Number(presetTier);
                if (pTierNum > tier - 2) {
                    if (modConfig.logEverything === true)
                        this.logger.warning("Found A Preset Within Tier");
                    return preset;
                }
            }
        }
        return null;
    }
    getCustomWeaponPreset(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole, tier, myBotGenHelper, tables) {
        const botName = tier === 5 ? "tier5pmc" : botRole.includes("sectant") ? this.getCultistPresets(botRole) : botRole;
        let presetFile = require(`../../db/bots/loadouts/weaponPresets/${botName}Presets.json`);
        let weaponPresets = this.getCustomPresetHelper(presetFile, weaponTpl, tier, false);
        //if we've still failed to find a preset, it might be a user preset
        if (weaponPresets.length == 0) {
            if (modConfig.logEverything == true)
                this.logger.warning("Failed to find regular preset. Looking for user preset");
            let presetFile = require(`../../db/bots/user_bot_templates/presets/${botName}_User_Presets.json`);
            weaponPresets = this.getCustomPresetHelper(presetFile, weaponTpl, tier, true);
        }
        if (modConfig.logEverything == true) {
            this.logger.warning("Choices:");
            for (let i in weaponPresets) {
                this.logger.warning(weaponPresets[i]._name);
            }
        }
        const randomPreset = weaponPresets[Math.floor(Math.random() * weaponPresets.length)];
        if (modConfig.logEverything == true) {
            this.logger.warning("Chose:");
            this.logger.warning(randomPreset._name);
        }
        const preset = this.cloner.clone(randomPreset);
        if (!preset)
            return [];
        preset._items[0] = {
            ...preset._items[0],
            parentId: weaponParentId,
            slotId: equipmentSlot,
            ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole)
        };
        this.genExtraPropsForPreset(equipmentSlot, weaponTpl, preset, botRole, tables, myBotGenHelper);
        if (modConfig.logEverything == true) {
            this.logger.info(`Realism Mod: Preset was Fetched. Working as intended, do not report as issue.`);
        }
        return preset._items;
    }
    getDefaultWeaponPreset(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole, myBotGenHelper, tables) {
        this.logger.warning(`Realism Mod: Failed To Find Custom Preset For Bot ${botRole}. Using default.`);
        this.logger.warning(this.localisationService.getText("bot-weapon_generated_incorrect_using_default", weaponTpl));
        let preset;
        for (const presetObj of Object.values(tables.globals.ItemPresets)) {
            if (presetObj._items[0]._tpl === weaponTpl) {
                preset = this.cloner.clone(presetObj);
                break;
            }
        }
        if (!preset) {
            throw new Error(this.localisationService.getText("bot-missing_weapon_preset", weaponTpl));
        }
        preset._items[0] = {
            ...preset._items[0],
            parentId: weaponParentId,
            slotId: equipmentSlot,
            ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole, tables.templates.items[weaponTpl]._parent)
        };
        return preset._items;
    }
    myGetPresetWeaponMods(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole, pmcTier) {
        const logger = tsyringe_1.container.resolve("WinstonLogger");
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const appContext = tsyringe_1.container.resolve("ApplicationContext");
        const inventoryHelper = tsyringe_1.container.resolve("InventoryHelper");
        const containerHelper = tsyringe_1.container.resolve("ContainerHelper");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const myBotGenHelper = new BotGenHelper(logger, this.randomUtil, this.databaseService, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, appContext, this.localisationService, this.configServer);
        const tracker = new utils_1.BotTierTracker();
        const tables = this.databaseService.getTables();
        const role = botRole.toLowerCase();
        let tier = role.includes("bear") || role.includes("usec") ? pmcTier : tracker.getTier(botRole);
        if (modConfig.logEverything == true) {
            this.logger.warning(`//////////////////////////////${botRole}///////////////////////////////////`);
            this.logger.warning(`//////////////////////////////${tier}///////////////////////////////////`);
            this.logger.info(`Realism Mod: Fetching Custom Preset For ${botRole} At Tier ${tier}`);
            this.logger.info(`Weapon ID: ${weaponTpl}, ${tables.templates.items[weaponTpl]._name}`);
        }
        let weaponMods = [];
        try {
            weaponMods = this.getCustomWeaponPreset(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole, tier, myBotGenHelper, tables);
        }
        catch {
            weaponMods = this.getDefaultWeaponPreset(weaponTpl, equipmentSlot, weaponParentId, itemTemplate, botRole, myBotGenHelper, tables);
        }
        return weaponMods;
    }
}
exports.BotWepGen = BotWepGen;
class CheckRequired {
    isRequired(slot) {
        if (slot?._botRequired && slot._botRequired == true) {
            return true;
        }
        else if (slot._required == true) {
            return true;
        }
        return false;
    }
}
exports.CheckRequired = CheckRequired;
class BotGenHelper extends BotGeneratorHelper_1.BotGeneratorHelper {
    getLightOnChance(botRole) {
        return this.getBotEquipmentSettingFromConfig(botRole, "lightIsActiveDayChancePercent", 25);
    }
    myGenerateExtraPropertiesForItem(itemTemplate, botRole = null, parentWeaponClass, equipmentSlot) {
        // Get raid settings, if no raid, default to day
        // const raidSettings = this.applicationContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION)?.getValue<IGetRaidConfigurationRequestData>();
        // const raidIsNight = raidSettings?.timeVariant === "PAST";
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
            const medRandomization = this.botConfig.lootItemResourceRandomization[botRole]?.meds;
            const resource = Math.max(1, this.getRandomizedResourceValue(itemTemplate._props.MaxResource, medRandomization));
            itemProperties.MedKit = { HpResource: resource };
        }
        if (itemTemplate._props.MaxResource && itemTemplate._props.foodUseTime) {
            const foodRandomization = this.botConfig.lootItemResourceRandomization[botRole]?.food;
            const resource = Math.max(1, this.getRandomizedResourceValue(itemTemplate._props.MaxResource, foodRandomization));
            itemProperties.FoodDrink = { HpPercent: resource };
        }
        if (modConfig.enable_hazard_zones && itemTemplate._props.MaxResource && itemTemplate._id === "590c595c86f7747884343ad7") {
            itemProperties.Resource = { Value: Math.floor(Math.random() * 61) + 35, UnitsConsumed: 0 };
        }
        if (itemTemplate._parent === BaseClasses_1.BaseClasses.FLASHLIGHT || itemTemplate._parent === BaseClasses_1.BaseClasses.TACTICAL_COMBO) {
            if ((parentWeaponClass === BaseClasses_1.BaseClasses.PISTOL && equipmentSlot.toLowerCase() === "holster") || equipmentSlot.toLowerCase() === "secondprimaryweapon") {
                // stops pistols in holster having lights on
                itemProperties.Light = { IsActive: false, SelectedMode: 0 };
            }
            else {
                // Get chance from botconfig for bot type
                const lightLaserActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "lightIsActiveDayChancePercent", 0);
                itemProperties.Light = { IsActive: (this.randomUtil.getChance100(lightLaserActiveChance)), SelectedMode: 0 };
            }
        }
        else if (itemTemplate._parent === BaseClasses_1.BaseClasses.LIGHT_LASER_DESIGNATOR) {
            // Get chance from botconfig for bot type, use 50% if no value found
            const lightLaserActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "laserIsActiveChancePercent", 0);
            itemProperties.Light = { IsActive: (this.randomUtil.getChance100(lightLaserActiveChance)), SelectedMode: 0 };
        }
        if (itemTemplate._parent === BaseClasses_1.BaseClasses.NIGHTVISION) {
            // Get chance from botconfig for bot type
            const nvgActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "nvgIsActiveChanceDayPercent", 0);
            itemProperties.Togglable = { On: (this.randomUtil.getChance100(nvgActiveChance)) };
        }
        // Togglable face shield
        if (itemTemplate._props.HasHinge && itemTemplate._props.FaceShieldComponent) {
            // Get chance from botconfig for bot type, use 75% if no value found
            const faceShieldActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "faceShieldIsActiveChancePercent", 75);
            itemProperties.Togglable = { On: (this.randomUtil.getChance100(faceShieldActiveChance)) };
        }
        return Object.keys(itemProperties).length ? { upd: itemProperties } : {};
    }
}
exports.BotGenHelper = BotGenHelper;
class BotEquipGenHelper extends BotEquipmentModGenerator_1.BotEquipmentModGenerator {
    myFilterPlateModsForSlotByLevel(settings, modSlot, existingPlateTplPool, armorItem, botRole, pmcTier) {
        const result = { result: IFilterPlateModsForSlotByLevelResult_1.Result.UNKNOWN_FAILURE, plateModTpls: null };
        // not a plate slot, return original mod pool array
        if (!this.itemHelper.isRemovablePlateSlot(modSlot)) {
            result.result = IFilterPlateModsForSlotByLevelResult_1.Result.NOT_PLATE_HOLDING_SLOT;
            result.plateModTpls = existingPlateTplPool;
            return result;
        }
        const tierChecker = new utils_1.BotTierTracker();
        let armorPlates = modConfig.realistic_ballistics == true ? armorPlateWeights.pmcWeights : armorPlateWeights.standardWeights;
        let tier = 1;
        const role = botRole.toLowerCase();
        if (role === "pmcbear" || role === "pmcusec") {
            tier = pmcTier;
        }
        else {
            tier = tierChecker.getTier(botRole);
            if (modConfig.realistic_ballistics) {
                if (role.includes("follower") || role == "exusec" || role == "pmcbot" || role.includes("sectantwarrior")) {
                    armorPlates = armorPlateWeights.followerWeights;
                }
                else if (role.includes("boss") || role.includes("priest")) {
                    armorPlates = armorPlateWeights.bossWeights;
                }
                else {
                    armorPlates = armorPlateWeights.scavWeights;
                }
            }
        }
        // Get the front/back/side weights based on bots level
        const plateSlotWeights = armorPlates.find((x) => tier >= x.levelRange.min && tier <= x.levelRange.max);
        if (!plateSlotWeights) {
            // No weights, return original array of plate tpls
            result.result = IFilterPlateModsForSlotByLevelResult_1.Result.LACKS_PLATE_WEIGHTS;
            result.plateModTpls = existingPlateTplPool;
            return result;
        }
        // Get the specific plate slot weights (front/back/side)
        const plateWeights = plateSlotWeights[modSlot];
        if (!plateWeights) {
            // No weights, return original array of plate tpls
            result.result = IFilterPlateModsForSlotByLevelResult_1.Result.LACKS_PLATE_WEIGHTS;
            result.plateModTpls = existingPlateTplPool;
            return result;
        }
        // Choose a plate level based on weighting
        const chosenArmorPlateLevel = this.weightedRandomHelper.getWeightedValue(plateWeights);
        // Convert the array of ids into database items
        const platesFromDb = existingPlateTplPool.map((plateTpl) => this.itemHelper.getItem(plateTpl)[1]);
        // Filter plates to the chosen level based on its armorClass property
        const filteredPlates = platesFromDb.filter((item) => item._props.armorClass == chosenArmorPlateLevel);
        //try again with a higher level
        if (filteredPlates.length === 0) {
            this.logger.debug(`Plate filter was too restrictive for armor: ${armorItem._id}, unable to find plates of level: ${chosenArmorPlateLevel}. Using mod items default plate`);
            const relatedItemDbModSlot = armorItem._props.Slots.find((slot) => slot._name.toLowerCase() === modSlot);
            const defaultPlate = relatedItemDbModSlot._props.filters[0].Plate;
            if (!defaultPlate) {
                // No relevant plate found after filtering AND no default plate
                // Last attempt, get default preset and see if it has a plate default
                const defaultPreset = this.presetHelper.getDefaultPreset(armorItem._id);
                if (defaultPreset) {
                    const relatedPresetSlot = defaultPreset._items.find((item) => item.slotId?.toLowerCase() === modSlot);
                    if (relatedPresetSlot) {
                        result.result = IFilterPlateModsForSlotByLevelResult_1.Result.SUCCESS;
                        result.plateModTpls = [relatedPresetSlot._tpl];
                        return result;
                    }
                }
                result.result = IFilterPlateModsForSlotByLevelResult_1.Result.NO_DEFAULT_FILTER;
                return result;
            }
            result.result = IFilterPlateModsForSlotByLevelResult_1.Result.SUCCESS;
            result.plateModTpls = [defaultPlate];
            return result;
        }
        // Only return the items ids
        result.result = IFilterPlateModsForSlotByLevelResult_1.Result.SUCCESS;
        result.plateModTpls = filteredPlates.map((item) => item._id);
        return result;
    }
    myGenerateModsForEquipment(equipment, parentId, parentTemplate, settings, shouldForceSpawn = false, botRole, pmcTier, botGenHelper) {
        let forceSpawn = shouldForceSpawn;
        const compatibleModsPool = settings.modPool[parentTemplate._id];
        if (!compatibleModsPool) {
            this.logger.warning(`bot: ${settings.botData.role} lacks a mod slot pool for item: ${parentTemplate._id} ${parentTemplate._name}`);
        }
        // Iterate over mod pool and choose mods to add to item
        for (const modSlotName in compatibleModsPool) {
            const itemSlotTemplate = this.getModItemSlotFromDb(modSlotName, parentTemplate);
            if (!itemSlotTemplate) {
                this.logger.error(this.localisationService.getText("bot-mod_slot_missing_from_item", {
                    modSlot: modSlotName,
                    parentId: parentTemplate._id,
                    parentName: parentTemplate._name,
                    botRole: settings.botData.role,
                }));
                continue;
            }
            const modSpawnResult = this.shouldModBeSpawned(itemSlotTemplate, modSlotName.toLowerCase(), settings.spawnChances.equipmentMods, settings.botEquipmentConfig);
            //if the gear takes a gas mask filter, it's a gas mask, force spawn
            if (modConfig.enable_hazard_zones && compatibleModsPool[modSlotName].includes("590c595c86f7747884343ad7")) {
                forceSpawn = true;
            }
            if (modSpawnResult === ModSpawn_1.ModSpawn.SKIP && !forceSpawn) {
                continue;
            }
            // Ensure submods for nvgs all spawn together
            if (modSlotName === "mod_nvg") {
                forceSpawn = true;
            }
            // Slot can hold armor plates + we are filtering possible items by bot level, handle
            let modPoolToChooseFrom = compatibleModsPool[modSlotName];
            if (settings.botEquipmentConfig.filterPlatesByLevel && this.itemHelper.isRemovablePlateSlot(modSlotName.toLowerCase())) {
                const plateSlotFilteringOutcome = this.myFilterPlateModsForSlotByLevel(settings, modSlotName.toLowerCase(), compatibleModsPool[modSlotName], parentTemplate, botRole, pmcTier);
                if ([IFilterPlateModsForSlotByLevelResult_1.Result.UNKNOWN_FAILURE, IFilterPlateModsForSlotByLevelResult_1.Result.NO_DEFAULT_FILTER].includes(plateSlotFilteringOutcome.result)) {
                    this.logger.debug(`Plate slot: ${modSlotName} selection for armor: ${parentTemplate._id} failed: ${IFilterPlateModsForSlotByLevelResult_1.Result[plateSlotFilteringOutcome.result]}, skipping`);
                    continue;
                }
                if ([IFilterPlateModsForSlotByLevelResult_1.Result.LACKS_PLATE_WEIGHTS].includes(plateSlotFilteringOutcome.result)) {
                    this.logger.warning(`Plate slot: ${modSlotName} lacks weights for armor: ${parentTemplate._id}, unable to adjust plate choice, using existing data`);
                }
                modPoolToChooseFrom = plateSlotFilteringOutcome.plateModTpls;
            }
            // Find random mod and check its compatible
            let modTpl;
            let found = false;
            const exhaustableModPool = new ExhaustableArray_1.ExhaustableArray(modPoolToChooseFrom, this.randomUtil, this.cloner);
            while (exhaustableModPool.hasValues()) {
                modTpl = exhaustableModPool.getRandomValue();
                if (!this.botGeneratorHelper.isItemIncompatibleWithCurrentItems(equipment, modTpl, modSlotName)
                    .incompatible) {
                    found = true;
                    break;
                }
            }
            // Compatible item not found but slot REQUIRES item, get random item from db
            if (!found && itemSlotTemplate._required) {
                modTpl = this.getRandomModTplFromItemDb(modTpl, itemSlotTemplate, modSlotName, equipment);
                found = !!modTpl;
            }
            // Compatible item not found + not required
            if (!(found || itemSlotTemplate._required)) {
                // Don't add item
                continue;
            }
            const modTemplate = this.itemHelper.getItem(modTpl);
            if (!this.isModValidForSlot(modTemplate, itemSlotTemplate, modSlotName, parentTemplate, settings.botData.role)) {
                continue;
            }
            // Generate new id to ensure all items are unique on bot
            const modId = this.hashUtil.generate();
            let newItem = {
                _id: modId,
                _tpl: modTpl,
                parentId: parentId,
                slotId: modSlotName,
                ...botGenHelper.myGenerateExtraPropertiesForItem(modTemplate[1], settings.botData.role), //need to call my version of genExtraProps
            };
            equipment.push(newItem);
            // Does the item being added have possible child mods?
            if (Object.keys(settings.modPool).includes(modTpl)) {
                // Call self recursively with item being checkced item we just added to bot
                this.myGenerateModsForEquipment(equipment, modId, modTemplate[1], settings, forceSpawn, botRole, pmcTier, botGenHelper);
            }
        }
        return equipment;
    }
    myShouldModBeSpawned(itemSlot, modSlot, modSpawnChances, checkRequired, botEquipConfig) {
        const slotRequired = itemSlot._required;
        if (this.getAmmoContainers().includes(modSlot) || checkRequired.isRequired(itemSlot)) {
            return ModSpawn_1.ModSpawn.SPAWN;
        }
        const spawnMod = this.probabilityHelper.rollChance(modSpawnChances[modSlot]);
        if (!spawnMod && (slotRequired || botEquipConfig.weaponSlotIdsToMakeRequired?.includes(modSlot))) {
            // Mod is required but spawn chance roll failed, choose default mod spawn for slot
            return ModSpawn_1.ModSpawn.DEFAULT_MOD;
        }
        return spawnMod ? ModSpawn_1.ModSpawn.SPAWN : ModSpawn_1.ModSpawn.SKIP;
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
            if (checkRequired.isRequired(itemSlot)) {
                this.logger.error(this.localisationService.getText("bot-unable_to_add_mod_item_invalid", { itemName: modToAdd[1]._name, modSlot: modSlot, parentItemName: parentTemplate._name }));
            }
            return false;
        }
        if (!(itemSlot._props.filters[0].Filter.includes(modToAdd[1]._id) || this.itemHelper.isOfBaseclasses(modToAdd[1]._id, itemSlot._props.filters[0].Filter))) {
            this.logger.error(this.localisationService.getText("bot-mod_not_in_slot_filter_list", { modId: modToAdd[1]._id, modSlot: modSlot, parentName: parentTemplate._name }));
            return false;
        }
        return true;
    }
    myCreateModItem(modId, modTpl, parentId, modSlot, modTemplate, botRole, parentWeaponTpl, equipmentSlot) {
        const durabilityLimitsHelper = tsyringe_1.container.resolve("DurabilityLimitsHelper");
        const appContext = tsyringe_1.container.resolve("ApplicationContext");
        const itemHelper = tsyringe_1.container.resolve("ItemHelper");
        const inventoryHelper = tsyringe_1.container.resolve("InventoryHelper");
        const containerHelper = tsyringe_1.container.resolve("ContainerHelper");
        const myBotGenHelper = new BotGenHelper(this.logger, this.randomUtil, this.databaseService, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, appContext, this.localisationService, this.configServer);
        return {
            "_id": modId,
            "_tpl": modTpl,
            "parentId": parentId,
            "slotId": modSlot,
            ...myBotGenHelper.myGenerateExtraPropertiesForItem(modTemplate, botRole, parentWeaponTpl, equipmentSlot)
        };
    }
    botModGen(sessionId, request, equipmentSlot) {
        const checkRequired = new CheckRequired();
        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);
        // Get pool of mods that fit weapon
        const compatibleModsPool = request.modPool[request.parentTemplate._id];
        if (!((request.parentTemplate._props.Slots.length || request.parentTemplate._props.Cartridges?.length)
            || request.parentTemplate._props.Chambers?.length)) {
            this.logger.error(this.localisationService.getText("bot-unable_to_add_mods_to_weapon_missing_ammo_slot", {
                weaponName: request.parentTemplate._name,
                weaponId: request.parentTemplate._id,
                botRole: request.botData.role
            }));
            return request.weapon;
        }
        const botEquipConfig = this.botConfig.equipment[request.botData.equipmentRole];
        const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(request.botData.equipmentRole, pmcProfile.Info.Level);
        const botWeaponSightWhitelist = this.botEquipmentFilterService.getBotWeaponSightWhitelist(request.botData.equipmentRole);
        const randomisationSettings = this.botHelper.getBotRandomizationDetails(request.botData.level, botEquipConfig);
        // Iterate over mod pool and choose mods to attach
        const sortedModKeys = this.sortModKeys(Object.keys(compatibleModsPool), request.parentTemplate._id);
        for (const modSlot of sortedModKeys) {
            // Check weapon has slot for mod to fit in
            const modsParentSlot = this.getModItemSlotFromDb(modSlot, request.parentTemplate);
            if (!modsParentSlot) {
                this.logger.error(this.localisationService.getText("bot-weapon_missing_mod_slot", {
                    modSlot: modSlot,
                    weaponId: request.parentTemplate._id,
                    weaponName: request.parentTemplate._name,
                    botRole: request.botData.role,
                }));
                continue;
            }
            const modSpawnResult = this.myShouldModBeSpawned(modsParentSlot, modSlot, request.modSpawnChances, checkRequired, botEquipConfig);
            if (modSpawnResult === ModSpawn_1.ModSpawn.SKIP) {
                continue;
            }
            //yikes dude
            const isRandomisableSlot = randomisationSettings?.randomisedWeaponModSlots?.includes(modSlot) ?? false;
            const modToSpawnRequest = {
                modSlot: modSlot,
                isRandomisableSlot: isRandomisableSlot,
                randomisationSettings: randomisationSettings,
                botWeaponSightWhitelist: botWeaponSightWhitelist,
                botEquipBlacklist: botEquipBlacklist,
                itemModPool: compatibleModsPool,
                weapon: request.weapon,
                ammoTpl: request.ammoTpl,
                parentTemplate: request.parentTemplate,
                modSpawnResult: modSpawnResult,
                weaponStats: request.weaponStats,
                conflictingItemTpls: request.conflictingItemTpls,
                botData: request.botData,
            };
            const modToAdd = this.chooseModToPutIntoSlot(modToSpawnRequest);
            // Compatible mod not found
            if (!modToAdd || typeof modToAdd === "undefined") {
                continue;
            }
            if (!this.myIsModValidForSlot(modToAdd, modsParentSlot, modSlot, request.parentTemplate, checkRequired)) {
                continue;
            }
            const modToAddTemplate = modToAdd[1];
            // Skip adding mod to weapon if type limit reached
            if (this.botWeaponModLimitService.weaponModHasReachedLimit(request.botData.equipmentRole, modToAddTemplate, request.modLimits, request.parentTemplate, request.weapon)) {
                continue;
            }
            // If item is a mount for scopes, set scope chance to 100%, this helps fix empty mounts appearing on weapons
            if (this.modSlotCanHoldScope(modSlot, modToAddTemplate._parent)) {
                // mod_mount was picked to be added to weapon, force scope chance to ensure its filled
                const scopeSlots = ["mod_scope", "mod_scope_000", "mod_scope_001", "mod_scope_002", "mod_scope_003"];
                this.adjustSlotSpawnChances(request.modSpawnChances, scopeSlots, 100);
                // Hydrate pool of mods that fit into mount as its a randomisable slot
                if (isRandomisableSlot) {
                    // Add scope mods to modPool dictionary to ensure the mount has a scope in the pool to pick
                    this.addCompatibleModsForProvidedMod("mod_scope", modToAddTemplate, request.modPool, botEquipBlacklist);
                }
            }
            // If picked item is muzzle adapter that can hold a child, adjust spawn chance
            if (this.modSlotCanHoldMuzzleDevices(modSlot, modToAddTemplate._parent)) {
                const muzzleSlots = ["mod_muzzle", "mod_muzzle_000", "mod_muzzle_001"];
                // Make chance of muzzle devices 95%, nearly certain but not guaranteed
                this.adjustSlotSpawnChances(request.modSpawnChances, muzzleSlots, 95);
            }
            // If front/rear sight are to be added, set opposite to 100% chance
            if (this.modIsFrontOrRearSight(modSlot, modToAddTemplate._id)) {
                request.modSpawnChances.mod_sight_front = 100;
                request.modSpawnChances.mod_sight_rear = 100;
            }
            // Handguard mod can take a sub handguard mod + weapon has no UBGL (takes same slot)
            // Force spawn chance to be 100% to ensure it gets added
            if (modSlot === "mod_handguard" && modToAddTemplate._props.Slots.find((x) => x._name === "mod_handguard")
                && !request.weapon.find((x) => x.slotId === "mod_launcher")) {
                // Needed for handguards with lower
                request.modSpawnChances.mod_handguard = 100;
            }
            // If stock mod can take a sub stock mod, force spawn chance to be 100% to ensure sub-stock gets added
            // Or if mod_stock is configured to be forced on
            if (modSlot === "mod_stock" && (modToAddTemplate._props.Slots.find((x) => x._name.includes("mod_stock") || botEquipConfig.forceStock))) {
                // Stock mod can take additional stocks, could be a locking device, force 100% chance
                const stockSlots = ["mod_stock", "mod_stock_000", "mod_stock_akms"];
                this.adjustSlotSpawnChances(request.modSpawnChances, stockSlots, 100);
            }
            // Update conflicting item list now item has been chosen
            for (const conflictingItem of modToAddTemplate._props.ConflictingItems) {
                request.conflictingItemTpls.add(conflictingItem);
            }
            const modId = this.hashUtil.generate();
            request.weapon.push(this.myCreateModItem(modId, modToAddTemplate._id, request.weaponId, modSlot, modToAddTemplate, request.botData.role, request.parentTemplate._parent, equipmentSlot));
            // I first thought we could use the recursive generateModsForItems as previously for cylinder magazines.
            // However, the recursion doesn't go over the slots of the parent mod but over the modPool which is given by the bot config
            // where we decided to keep cartridges instead of camoras. And since a CylinderMagazine only has one cartridge entry and
            // this entry is not to be filled, we need a special handling for the CylinderMagazine
            const modParentItem = this.databaseService.getTables().templates.items[modToAddTemplate._parent];
            if (this.botWeaponGeneratorHelper.magazineIsCylinderRelated(modParentItem._name)) {
                // We don't have child mods, we need to create the camoras for the magazines instead
                this.fillCamora(request.weapon, request.modPool, modId, modToAddTemplate);
            }
            else {
                let containsModInPool = Object.keys(request.modPool).includes(modToAddTemplate._id);
                // Sometimes randomised slots are missing sub-mods, if so, get values from mod pool service
                // Check for a randomisable slot + without data in modPool + item being added as additional slots
                if (isRandomisableSlot && !containsModInPool && modToAddTemplate._props.Slots.length > 0) {
                    const modFromService = this.botEquipmentModPoolService.getModsForWeaponSlot(modToAddTemplate._id);
                    if (Object.keys(modFromService ?? {}).length > 0) {
                        request.modPool[modToAddTemplate._id] = modFromService;
                        containsModInPool = true;
                    }
                }
                if (containsModInPool) {
                    // Call self recursively to add mods to this mod
                    const recursiveRequestData = {
                        weapon: request.weapon,
                        modPool: request.modPool,
                        weaponId: modId,
                        parentTemplate: modToAddTemplate,
                        modSpawnChances: request.modSpawnChances,
                        ammoTpl: request.ammoTpl,
                        botData: {
                            role: request.botData.role,
                            level: request.botData.level,
                            equipmentRole: request.botData.equipmentRole
                        },
                        modLimits: request.modLimits,
                        weaponStats: request.weaponStats,
                        conflictingItemTpls: request.conflictingItemTpls
                    };
                    this.botModGen(sessionId, recursiveRequestData, equipmentSlot);
                }
            }
        }
        return request.weapon;
    }
}
exports.BotEquipGenHelper = BotEquipGenHelper;
//# sourceMappingURL=bot_gen.js.map