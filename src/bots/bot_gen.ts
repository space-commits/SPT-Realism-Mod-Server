
import { BotWeaponGenerator } from "@spt/generators/BotWeaponGenerator";
import { container } from "tsyringe";
import { ITemplateItem, ISlot } from "@spt/models/eft/common/tables/ITemplateItem";
import { IChances, IEquipment, IGeneration, IBotType, IInventory, IMods, IModsChances } from "@spt/models/eft/common/tables/IBotType";
import { IItem, IUpd } from "@spt/models/eft/common/tables/IItem";
import { ProbabilityHelper } from "@spt/helpers/ProbabilityHelper";
import { IGenerateWeaponResult } from "@spt/models/spt/bots/IGenerateWeaponResult";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { BotEquipmentFilterService } from "@spt/services/BotEquipmentFilterService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { IPreset } from "@spt/models/eft/common/IGlobals";
import { BotTierTracker, Utils, ProfileTracker, ModTracker, RaidInfoTracker } from "../utils/utils";
import { BotEquipmentModGenerator } from "@spt/generators/BotEquipmentModGenerator";
import { BotModLimits, BotWeaponModLimitService } from "@spt/services/BotWeaponModLimitService";
import { __String } from "typescript";
import { BotHelper } from "@spt/helpers/BotHelper";
import { BotEquipmentModPoolService } from "@spt/services/BotEquipmentModPoolService";
import { EquipmentFilters, IArmorPlateWeights, IRandomisedResourceValues } from "@spt/models/spt/config/IBotConfig";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotGenerator } from "@spt/generators/BotGenerator";
import { BotLevelGenerator } from "@spt/generators/BotLevelGenerator";
import { BotInventoryGenerator } from "@spt/generators/BotInventoryGenerator";
import { MinMax } from "@spt/models/common/MinMax";
import { IRandomisedBotLevelResult } from "@spt/models/eft/bot/IRandomisedBotLevelResult";
import { IBotBase, IInfo, IInventory as PmcInventory } from "@spt/models/eft/common/tables/IBotBase";
import { IBotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { DurabilityLimitsHelper } from "@spt/helpers/DurabilityLimitsHelper";
import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { BotArrays, StaticArrays } from "../utils/arrays";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { BotLoader } from "./bots";
import { BotLootGenerator } from "@spt/generators/BotLootGenerator";
import { LocalisationService } from "@spt/services/LocalisationService";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";
import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { EquipmentSlots } from "@spt/models/enums/EquipmentSlots";
import { IInventoryMagGen } from "@spt/generators/weapongen/IInventoryMagGen";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { RepairService } from "@spt/services/RepairService";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ContainerHelper } from "@spt/helpers/ContainerHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ModSpawn } from "@spt/models/enums/ModSpawn";
import { ExhaustableArray } from "@spt/models/spt/server/ExhaustableArray";
import { IFilterPlateModsForSlotByLevelResult, Result } from "@spt/models/spt/bots/IFilterPlateModsForSlotByLevelResult";
import { BotLootGen } from "./bot_loot_serv";
import { GameEditions } from "@spt/models/enums/GameEditions";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { ItemTpl } from "@spt/models/enums/ItemTpl";
import { IGenerateEquipmentProperties } from "@spt/models/spt/bots/IGenerateEquipmentProperties";
import { IModToSpawnRequest } from "@spt/models/spt/bots/IModToSpawnRequest";
import { IGenerateWeaponRequest } from "@spt/models/spt/bots/IGenerateWeaponRequest";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
import { EventTracker } from "../misc/seasonalevents";
import { MathUtil } from "@spt/utils/MathUtil";
import { WeatherHelper } from "@spt/helpers/WeatherHelper";

const armorPlateWeights = require("../../db/bots/loadouts/templates/armorPlateWeights.json");
const modConfig = require("../../config/config.json");

export class GenBotLvl extends BotLevelGenerator {

    public genBotLvl(levelDetails: MinMax, botGenerationDetails: IBotGenerationDetails, bot: IBotBase): IRandomisedBotLevelResult {

        const expTable = this.databaseService.getGlobals().config.exp.level.exp_table;
        const botLevelRange = this.getRelativeBotLevelRange(botGenerationDetails, levelDetails, expTable.length);

        // Get random level based on the exp table.
        let exp = 0;
        let level = 1;

        if (bot.Info.Settings.Role === "bear" || bot.Info.Settings.Role === "usec") {
            if (RaidInfoTracker.mapName === "sandbox" && ProfileTracker.averagePlayerLevel <= 20) {
                level = this.randomUtil.getInt(1, 15);
            }
            else if (RaidInfoTracker.mapName === "sandbox_high" && ProfileTracker.averagePlayerLevel > 20) {
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

export class BotGen extends BotGenerator {

    private placeHolderBotCache: IBotBase[] = [];

    private isBotUSEC(botRole: string): boolean {
        return (botRole.toLocaleLowerCase().includes("usec"));
    }

    //get pmc's tier "randomly"
    private getPMCTier(utils: Utils): number {
        const playerLevel = ProfileTracker.averagePlayerLevel;
        let tier = 1;
        let tierArray = [1, 2, 3, 4, 5];
        const gzTiers = [89, 10, 1, 0, 0];
        if (RaidInfoTracker.mapName === "sandbox" && playerLevel <= 20) {
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
    private botTierMapFactor(tier: number, utils: Utils): number {
        const highTier: string[] = ["rezervbase", "reservebase", "tarkovstreets"];
        const midTier: string[] = ["factory4_night"];
        const lowTier: string[] = ["bigmap", "customs", "interchange", "lighthouse"];
        const ratTier: string[] = ["woods", "shoreline"];

        let rndNum = utils.pickRandNumInRange(0, 101);
        if (RaidInfoTracker.mapName === "sandbox") { //me being superstitious 
            return tier;
        }
        if (RaidInfoTracker.mapName === "laboratory") {
            tier = Math.min(tier + 2, 5);
        }
        else if (rndNum <= 30 && highTier.includes(RaidInfoTracker.mapName)) {
            tier = Math.min(tier + 1, 5);
        }
        else if (rndNum <= 15 && (midTier.includes(RaidInfoTracker.mapName) || RaidInfoTracker.isNight)) {
            tier = Math.min(tier + 1, 5);
        }
        else if (rndNum <= 5 && lowTier.includes(RaidInfoTracker.mapName)) {
            tier = Math.min(tier + 1, 5);
        }
        else if (rndNum <= 20 && ratTier.includes(RaidInfoTracker.mapName)) {
            tier = Math.max(tier - 1, 1);
        }
        return tier;
    }

    //for events where bots will need gas masks at all times
    private addGasMasksToBots(equipment: IEquipment, chances: IChances, botRole: string, isPmc: boolean, pmcTier: number) {
        let gasMaskTier = 0;

        if (isPmc) {
            gasMaskTier = pmcTier <= 2 ? 1 : pmcTier == 3 ? 2 : 3;
        }
        else {
            let isHighTier = botRole.includes("boss") || botRole.includes("pmc") || botRole.includes("exusec") || botRole.includes("priest");
            let isMidTier = botRole.includes("follower") || botRole.includes("warrior");
            gasMaskTier = isHighTier ? 3 : isMidTier ? 2 : 1;
        }

        equipment.FaceCover = gasMaskTier == 3 ? StaticArrays.gasEventMasksHigh : gasMaskTier == 2 ? StaticArrays.gasEventMasksMed : StaticArrays.gasEventMasksLow;

        if (ModTracker.tgcPresent && ((isPmc && gasMaskTier == 3) || botRole.includes("pmcbot") || botRole.includes("exusec") || botRole.includes("knight") || botRole.includes("pipe") || botRole.includes("bird"))) {
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

    public myGeneratePlayerScav(sessionId: string, role: string, difficulty: string, botTemplate: IBotType): IBotBase {
        let bot = this.getCloneOfBotBase();
        bot.Info.Settings.BotDifficulty = difficulty;
        bot.Info.Settings.Role = role;
        bot.Info.Side = "Savage";

        const botGenDetails: IBotGenerationDetails = {
            isPmc: false,
            side: "Savage",
            role: role,
            botRelativeLevelDeltaMax: 0,
            botRelativeLevelDeltaMin: 0,
            botCountToGenerate: 1,
            botDifficulty: difficulty,
            isPlayerScav: true,
        };
        return this.myGenerateBot(sessionId, bot, botTemplate, botGenDetails, 1);;
    }

    private assignPMCtier(utils: Utils, botRole: string, botLoader: BotLoader, preparedBotBase: IBotBase, botJsonTemplateClone: IBotType): number {
        const baseTier = (this.getPMCTier(utils));
        const isUSEC = this.isBotUSEC(botRole);
        const changeDiffi = modConfig.pmc_difficulty == true;
        let pmcTier = ProfileTracker.averagePlayerLevel <= 10 ? baseTier : this.botTierMapFactor(baseTier, utils);

        if (modConfig.bot_testing == true) {
            pmcTier = modConfig.bot_test_tier;
        }

        if (pmcTier === 1) {
            if (isUSEC) botLoader.usecLoad1(botJsonTemplateClone);
            else botLoader.bearLoad1(botJsonTemplateClone);

            if (changeDiffi == true) preparedBotBase.Info.Settings.BotDifficulty = "normal";
        }
        else if (pmcTier === 2) {
            if (isUSEC) botLoader.usecLoad2(botJsonTemplateClone);
            else botLoader.bearLoad2(botJsonTemplateClone);

            if (changeDiffi == true) preparedBotBase.Info.Settings.BotDifficulty = "normal";
        }
        else if (pmcTier === 3) {
            if (isUSEC) botLoader.usecLoad3(botJsonTemplateClone);
            else botLoader.bearLoad3(botJsonTemplateClone);

            if (changeDiffi == true) preparedBotBase.Info.Settings.BotDifficulty = "hard";
        }
        else if (pmcTier === 4) {
            if (isUSEC) botLoader.usecLoad4(botJsonTemplateClone);
            else botLoader.bearLoad4(botJsonTemplateClone);

            if (changeDiffi == true) preparedBotBase.Info.Settings.BotDifficulty = "hard";
        }
        else if (pmcTier === 5) {
            if (isUSEC) botLoader.usecLoad5(botJsonTemplateClone);
            else botLoader.bearLoad5(botJsonTemplateClone);

            if (changeDiffi == true) preparedBotBase.Info.Settings.BotDifficulty = "impossible";
        }

        if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == false) {
            botJsonTemplateClone.inventory.equipment.FirstPrimaryWeapon = {};
            botJsonTemplateClone.inventory.equipment.SecondPrimaryWeapon = {};
            botJsonTemplateClone.inventory.equipment.Holster = {};
        }

        return pmcTier;
    }

    public checkIfShouldReturnCahcedBot(cache: IBotBase[]): IBotBase {
        const bot = cache[0];
        bot._id = this.hashUtil.generate();
        bot.aid = this.hashUtil.generateAccountId();
        bot.Info.Nickname = this.hashUtil.generate();
        bot.Info.MainProfileNickname = this.hashUtil.generate();
        bot.Info.LowerNickname = this.hashUtil.generate();
        return bot;
    }

    public myPrepareAndGenerateBot(sessionId: string, botGenerationDetails: IBotGenerationDetails): IBotBase {
        //since spawn changes, bots just keep being generated at regular intervals. Causes stutter. Skip bot gen and return a cached bot.
        if (RaidInfoTracker.generatedBotsCount == 0) this.placeHolderBotCache = [];
        RaidInfoTracker.generatedBotsCount += 1;
        if (modConfig.spawn_waves == true && !ModTracker.qtbSpawnsActive && !ModTracker.swagPresent) {
            if (RaidInfoTracker.generatedBotsCount > 600 && this.placeHolderBotCache.length !== 0) {
                return this.checkIfShouldReturnCahcedBot(this.placeHolderBotCache);
            }
        }

        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = postLoadDBServer.getTables();
        const arrays = new BotArrays(tables);
        const utils = new Utils(tables);
        const botLoader = new BotLoader(this.logger, tables, this.configServer, modConfig, arrays, utils);

        const preparedBotBase = this.getPreparedBotBase(
            botGenerationDetails.eventRole ?? botGenerationDetails.role, // Use eventRole if provided,
            botGenerationDetails.side,
            botGenerationDetails.botDifficulty);

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
            if (BotTierTracker.cultTier == 1) botLoader.cultistsLoad1(botJsonTemplateClone, isPriest);
            else if (BotTierTracker.cultTier == 2) botLoader.cultistsLoad2(botJsonTemplateClone, isPriest);
            else if (BotTierTracker.cultTier == 3) botLoader.cultistsLoad3(botJsonTemplateClone, isPriest);
        }

        if (modConfig.logEverything == true) {
            this.logger.warning("bot " + botRole);
            this.logger.warning("tier " + pmcTier);
        }

        //instead of manually editing all my bot loadout json with the new armor plates/inserts, I programatically generated a file with all the json
        //and then I combine the armor json with the bot's mods json
        //this is highly ineffecient as I am doing it per bot generated, not ideal but for now it works until I figure out a better way

        if (EventTracker.doGasEvent || (EventTracker.hasExploded && !EventTracker.endExplosionEvent) || (EventTracker.isPreExplosion && botRole.toLowerCase() == "pmcbot")) this.addGasMasksToBots(botJsonTemplateClone.inventory.equipment, botJsonTemplateClone.chances, botRole.toLocaleLowerCase(), isPMC, pmcTier);

        const bot = this.myGenerateBot(sessionId, preparedBotBase, botJsonTemplateClone, botGenerationDetails, pmcTier);
        if (this.placeHolderBotCache.length === 0) this.placeHolderBotCache.push(bot);
        return bot;
    }

    private setBotMemberAndGameEdition(botInfo: IInfo, pmcTier: number): string {
        // Special case
        if (botInfo.Nickname.toLowerCase() === "nikita") {
            botInfo.GameVersion = GameEditions.UNHEARD;
            botInfo.MemberCategory = MemberCategory.DEVELOPER;
            return botInfo.GameVersion;
        }

        switch (pmcTier) {
            case 1:
                botInfo.GameVersion = GameEditions.STANDARD;
                botInfo.MemberCategory = MemberCategory.DEFAULT;
                break;
            case 2:
                botInfo.GameVersion = GameEditions.LEFT_BEHIND;
                botInfo.MemberCategory = MemberCategory.DEFAULT;
                break;
            case 3:
                botInfo.GameVersion = GameEditions.PREPARE_FOR_ESCAPE;
                botInfo.MemberCategory = MemberCategory.DEFAULT;
                break;
            case 4:
            case 5:
                botInfo.GameVersion = GameEditions.EDGE_OF_DARKNESS;
                botInfo.MemberCategory = MemberCategory.UNIQUE_ID;
                break;
            default:
                botInfo.MemberCategory = Number.parseInt(
                    this.weightedRandomHelper.getWeightedValue(this.pmcConfig.accountTypeWeight),
                    10,
                );
        }

        // Ensure selected category matches
        botInfo.SelectedMemberCategory = botInfo.MemberCategory;

        return botInfo.GameVersion;
    }

    private myGenerateBot(sessionId: string, bot: IBotBase, botJsonTemplate: IBotType, botGenerationDetails: IBotGenerationDetails, pmcTier: number): IBotBase {
        const botWeaponGenerator = container.resolve<BotWeaponGenerator>("BotWeaponGenerator");
        const botLootGenerator = container.resolve<BotLootGenerator>("BotLootGenerator");
        const botGeneratorHelper = container.resolve<BotGeneratorHelper>("BotGeneratorHelper");
        const localisationService = container.resolve<LocalisationService>("LocalisationService");
        const botEquipmentModPoolService = container.resolve<BotEquipmentModPoolService>("BotEquipmentModPoolService");
        const botEquipmentModGenerator = container.resolve<BotEquipmentModGenerator>("BotEquipmentModGenerator");
        const applicationContext = container.resolve<ApplicationContext>("ApplicationContext");
        const weatherHelper = container.resolve<WeatherHelper>("WeatherHelper");
        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const mathUtil = container.resolve<MathUtil>("MathUtil");
        // const seasonalEvents = new SeasonalEventsHandler();

        const genBotLvl = new GenBotLvl(this.logger, this.randomUtil, this.databaseService, mathUtil);
        const botInvGen = new BotInvGen(this.logger, this.hashUtil, this.randomUtil, this.databaseService, applicationContext,
            botWeaponGenerator, botLootGenerator, botGeneratorHelper, this.profileHelper, this.botHelper,
            this.weightedRandomHelper, itemHelper, weatherHelper, localisationService, this.botEquipmentFilterService,
            botEquipmentModPoolService, botEquipmentModGenerator, this.configServer);

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
                this.seasonalEventService.removeChristmasItemsFromBotInventory(
                    botJsonTemplate.inventory,
                    botGenerationDetails.role,
                );
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
        bot.Info.Voice = this.weightedRandomHelper.getWeightedValue<string>(botJsonTemplate.appearance.voice);
        bot.Health = this.generateHealth(botJsonTemplate.health, botGenerationDetails.isPlayerScav);
        bot.Skills = this.generateSkills(<any>botJsonTemplate.skills); // TODO: fix bad type, bot jsons store skills in dict, output needs to be array

        if (botGenerationDetails.isPmc) {
            bot.Info.IsStreamerModeAvailable = true; // Set to true so client patches can pick it up later - client sometimes alters botrole to assaultGroup
            this.setBotMemberAndGameEdition(bot.Info, pmcTier);
            if (bot.Info.GameVersion === GameEditions.UNHEARD) {
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

export class BotInvGen extends BotInventoryGenerator {

    private tryGetPMCSecondary(botInventory: PmcInventory, itemDb: Record<string, ITemplateItem>, templateInventory: IInventory, equipmentChances: IChances, sessionId: string, botRole: string, isPmc: boolean, pmcTier: number, botLevel: number, itemGenerationLimitsMinMax: IGeneration) {
        try {

            let shouldGetSecondary = false;
            if (botInventory.items != null) {
                for (let i in botInventory.items) {
                    let item = itemDb[botInventory.items[i]._tpl];
                    if (item != null && item?._parent != null && item?._parent === BaseClasses.SNIPER_RIFLE) {
                        shouldGetSecondary = true;
                    }
                }
            }
            if (shouldGetSecondary) {
                this.myGenerateAndAddWeaponsToBot(templateInventory, equipmentChances, sessionId, botInventory, botRole, isPmc, itemGenerationLimitsMinMax, botLevel, pmcTier, true);
            }
        } catch (error) {
            this.logger.warning(`Realism Mod: Failed To Fetch Secondary Weapon For Bot ${botRole} at level ${pmcTier}, error code: ${error}`);
        }
    }


    public myGenerateInventory(sessionId: string, botJsonTemplate: IBotType, botRole: string, isPmc: boolean, botLevel: number, pmcTier: number, chosenGameVersion: string): PmcInventory {

        const botLootCacheService = container.resolve<BotLootCacheService>("BotLootCacheService");
        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const handbookHelper = container.resolve<HandbookHelper>("HandbookHelper");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const cloner = container.resolve<ICloner>("PrimaryCloner");
        const tables = this.databaseService.getTables();
        const itemDb = tables.templates.items;
        const botLootGen = new BotLootGen(
            this.logger, this.hashUtil, this.randomUtil, itemHelper, inventoryHelper, this.databaseService,
            handbookHelper, this.botGeneratorHelper, this.botWeaponGenerator, this.weightedRandomHelper, this.botHelper,
            botLootCacheService, this.localisationService, this.configServer, cloner);

        const templateInventory = botJsonTemplate.inventory;
        const equipmentChances = botJsonTemplate.chances;
        const itemGenerationLimitsMinMax = botJsonTemplate.generation;

        // Generate base inventory with no items
        const botInventory = this.generateInventoryBase();

        this.myGenerateAndAddEquipmentToBot(sessionId, templateInventory, equipmentChances, botRole, botInventory, botLevel, pmcTier, chosenGameVersion);

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

    private myGenerateAndAddWeaponsToBot(templateInventory: IInventory, equipmentChances: IChances, sessionId: string, botInventory: PmcInventory, botRole: string, isPmc: boolean, itemGenerationLimitsMinMax: IGeneration, botLevel: number, pmcTier: number, getSecondary: boolean = false): void {

        if (getSecondary) {
            let secondarySlot = {
                slot: EquipmentSlots.SECOND_PRIMARY_WEAPON,
                shouldSpawn: true
            }
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

    private myAddWeaponAndMagazinesToInventory(sessionId: string, weaponSlot: { slot: EquipmentSlots; shouldSpawn: boolean; }, templateInventory: IInventory, botInventory: PmcInventory, equipmentChances: IChances, botRole: string, isPmc: boolean, itemGenerationWeights: IGeneration, botLevel: number, pmcTier: number, getSecondary: boolean = false): void {
        const cloner = container.resolve<ICloner>("PrimaryCloner");
        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const botWeaponGeneratorHelper = container.resolve<BotWeaponGeneratorHelper>("BotWeaponGeneratorHelper");
        const inventoryMagGenComponents = container.resolveAll<IInventoryMagGen>("InventoryMagGen");
        const botWeaponModLimitService = container.resolve<BotWeaponModLimitService>("BotWeaponModLimitService");
        const repairService = container.resolve<RepairService>("RepairService");

        const botWepGen = new BotWepGen(this.logger, this.hashUtil, this.databaseService, itemHelper, this.weightedRandomHelper, this.botGeneratorHelper, this.randomUtil, this.configServer, botWeaponGeneratorHelper, botWeaponModLimitService, this.botEquipmentModGenerator, this.localisationService, repairService, inventoryMagGenComponents, cloner);

        const generatedWeapon = botWepGen.myGenerateRandomWeapon(sessionId, weaponSlot.slot, templateInventory, botInventory.equipment, equipmentChances.weaponMods, botRole, isPmc, botLevel, pmcTier, getSecondary);

        botInventory.items.push(...generatedWeapon.weapon);

        this.botWeaponGenerator.addExtraMagazinesToInventory(generatedWeapon, itemGenerationWeights.items.magazines, botInventory, botRole);
    }

    private myGenerateAndAddEquipmentToBot(sessionId: string, templateInventory: IInventory, equipmentChances: IChances, botRole: string, botInventory: PmcInventory, botLevel: number, pmcTier: number, chosenGameVersion: string,): void {
        // These will be handled later
        const excludedSlots: string[] = [
            EquipmentSlots.POCKETS,
            EquipmentSlots.FIRST_PRIMARY_WEAPON,
            EquipmentSlots.SECOND_PRIMARY_WEAPON,
            EquipmentSlots.HOLSTER,
            EquipmentSlots.ARMOR_VEST,
            EquipmentSlots.TACTICAL_VEST,
            EquipmentSlots.HEADWEAR,
            EquipmentSlots.FACE_COVER,
            EquipmentSlots.EARPIECE
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
            },
                pmcTier);
        }

        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots.POCKETS,
            rootEquipmentPool: chosenGameVersion === GameEditions.UNHEARD
                ? { [ItemTpl.POCKETS_1X4_TUE]: 1 }
                : templateInventory.equipment.Pockets,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generateModsBlacklist: [ItemTpl.POCKETS_1X4_TUE],
            generatingPlayerLevel: pmcProfile.Info.Level
        },
            pmcTier);

        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots.FACE_COVER,
            rootEquipmentPool: templateInventory.equipment.FaceCover,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        },
            pmcTier);

        // Generate below in specific order
        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots.HEADWEAR,
            rootEquipmentPool: templateInventory.equipment.Headwear,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        },
            pmcTier);

        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots.EARPIECE,
            rootEquipmentPool: templateInventory.equipment.Earpiece,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        },
            pmcTier);

        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots.TACTICAL_VEST,
            rootEquipmentPool: templateInventory.equipment.TacticalVest,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        },
            pmcTier);

        this.myGenerateEquipment({
            rootEquipmentSlot: EquipmentSlots.ARMOR_VEST,
            rootEquipmentPool: templateInventory.equipment.ArmorVest,
            modPool: templateInventory.mods,
            spawnChances: equipmentChances,
            botData: { role: botRole, level: botLevel, equipmentRole: botEquipmentRole },
            inventory: botInventory,
            botEquipmentConfig: botEquipConfig,
            randomisationDetails: randomistionDetails,
            generatingPlayerLevel: pmcProfile.Info.Level
        },
            pmcTier);
    }

    private myGenerateEquipment(settings: IGenerateEquipmentProperties, pmcTier: number): boolean {

        const botWeaponGeneratorHelper = container.resolve<BotWeaponGeneratorHelper>("BotWeaponGeneratorHelper");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const botWeaponModLimitService = container.resolve<BotWeaponModLimitService>("BotWeaponModLimitService");
        const itemFilterService = container.resolve<ItemFilterService>("ItemFilterService");
        const presetHelper = container.resolve<PresetHelper>("PresetHelper");
        const botEquipmentFilterService = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
        const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const logger = container.resolve<ILogger>("WinstonLogger");
        const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
        const appContext = container.resolve<ApplicationContext>("ApplicationContext");
        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
        const cloner = container.resolve<ICloner>("PrimaryCloner");
        const myBotGenHelper = new BotGenHelper(logger, this.randomUtil, this.databaseService, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, appContext, this.localisationService, this.configServer);

        const botModGen = new BotEquipGenHelper(
            this.logger, this.hashUtil, this.randomUtil, probabilityHelper,
            this.databaseService, this.itemHelper, botEquipmentFilterService,
            itemFilterService, profileHelper, botWeaponModLimitService,
            this.botHelper, this.botGeneratorHelper, botWeaponGeneratorHelper,
            this.weightedRandomHelper, presetHelper, this.localisationService,
            this.botEquipmentModPoolService, this.configServer, cloner);

        const spawnChance = ([EquipmentSlots.POCKETS, EquipmentSlots.SECURED_CONTAINER] as string[]).includes(settings.rootEquipmentSlot)
            ? 100
            : settings.spawnChances.equipment[settings.rootEquipmentSlot];


        if (typeof spawnChance === "undefined") {
            this.logger.warning(
                this.localisationService.getText("bot-no_spawn_chance_defined_for_equipment_slot", settings.rootEquipmentSlot),
            );
            return;
        }

        const shouldSpawn = this.randomUtil.getChance100(spawnChance);
        if (shouldSpawn && Object.keys(settings.rootEquipmentPool).length) {

            const equipmentItemTpl = this.weightedRandomHelper.getWeightedValue<string>(settings.rootEquipmentPool);
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

            const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(
                settings.botData.equipmentRole,
                settings.generatingPlayerLevel,
            );

            // use dynamic mod pool if enabled in config
            const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(settings.botData.role);
            if (this.botConfig.equipment[botEquipmentRole] && settings.randomisationDetails?.randomisedArmorSlots?.includes(settings.rootEquipmentSlot)) {
                settings.modPool[equipmentItemTpl] = this.getFilteredDynamicModsForItem(
                    equipmentItemTpl,
                    botEquipBlacklist.equipment
                );
            }

            // Does item have slots for sub-mods to be inserted into
            if (itemTemplate[1]._props.Slots?.length > 0 && !settings.generateModsBlacklist?.includes(itemTemplate[1]._id)) {
                const childItemsToAdd = botModGen.myGenerateModsForEquipment(
                    [item],
                    id,
                    itemTemplate[1],
                    settings,
                    false,
                    settings.botData.role,
                    pmcTier,
                    myBotGenHelper
                );
                settings.inventory.items.push(...childItemsToAdd);
            }
            else {

                settings.inventory.items.push(item);
            }
        }
    }
}

export class BotWepGen extends BotWeaponGenerator {

    public myGenerateRandomWeapon(sessionId: string, equipmentSlot: string, botTemplateInventory: IInventory, weaponParentId: string, modChances: IModsChances, botRole: string, isPmc: boolean, botLevel: number, pmcTier: number, getSecondary: boolean = false): IGenerateWeaponResult {
        let weaponTpl = "";
        if (getSecondary) {
            weaponTpl = this.weightedRandomHelper.getWeightedValue<string>(botTemplateInventory.equipment["SecondPrimaryWeapon"]);
        }
        else {
            weaponTpl = this.pickWeightedWeaponTplFromPool(equipmentSlot, botTemplateInventory);
        }

        if (weaponTpl === "") {
            this.logger.error("Realism Mod: Failed To Generate Weapon Tpl");
            return;
        }

        return this.myGenerateWeaponByTpl(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel, pmcTier);
    }

    public myGenerateWeaponByTpl(sessionId: string, weaponTpl: string, equipmentSlot: string, botTemplateInventory: IInventory, weaponParentId: string, modChances: IModsChances, botRole: string, isPmc: boolean, botLevel: number, pmcTier: number): IGenerateWeaponResult {

        const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const botEquipmentFilterService = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
        const itemFilterService = container.resolve<ItemFilterService>("ItemFilterService");
        const botHelper = container.resolve<BotHelper>("BotHelper");
        const botEquipmentModPoolService = container.resolve<BotEquipmentModPoolService>("BotEquipmentModPoolService");
        const presetHelper = container.resolve<PresetHelper>("PresetHelper");
        const botModGen = new BotEquipGenHelper(
            this.logger, this.hashUtil, this.randomUtil,
            probabilityHelper, this.databaseService,
            this.itemHelper, botEquipmentFilterService,
            itemFilterService, profileHelper,
            this.botWeaponModLimitService, botHelper,
            this.botGeneratorHelper, this.botWeaponGeneratorHelper,
            this.weightedRandomHelper, presetHelper,
            this.localisationService, botEquipmentModPoolService,
            this.configServer, this.cloner);

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
        let weaponWithModsArray = this.constructWeaponBaseArray(
            weaponTpl,
            weaponParentId,
            equipmentSlot,
            weaponItemTemplate,
            botRole,
        );

        // Chance to add randomised weapon enhancement
        if (isPmc && this.randomUtil.getChance100(this.pmcConfig.weaponHasEnhancementChancePercent)) {
            const weaponConfig = this.repairConfig.repairKit.weapon;
            this.repairService.addBuff(weaponConfig, weaponWithModsArray[0]);
        }

        // Add mods to weapon base
        if (Object.keys(modPool).includes(weaponTpl)) {
            const botEquipmentRole = this.botGeneratorHelper.getBotEquipmentRole(botRole);
            const modLimits = this.botWeaponModLimitService.getWeaponModLimits(botEquipmentRole);
            const generateWeaponModsRequest: IGenerateWeaponRequest = {
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
            weaponWithModsArray = botModGen.botModGen(
                sessionId,
                generateWeaponModsRequest,
                equipmentSlot
            );
        }

        // Use weapon preset from globals.json if weapon isnt valid
        if (!this.myisWeaponValid(weaponWithModsArray)) {
            // Weapon is bad, fall back to weapons preset
            weaponWithModsArray = this.myGetPresetWeaponMods(
                weaponTpl,
                equipmentSlot,
                weaponParentId,
                weaponItemTemplate,
                botRole,
                pmcTier
            );
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
        let ubglAmmoTpl: string = undefined;
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

    public myisWeaponValid(weaponItemArray: IItem[]): boolean {
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

    //preset format has changed serveral times and I'm tired of updating them.
    private reformatPreset(presetFile, presetObj) {
        if (presetFile[presetObj].hasOwnProperty("root") || presetFile[presetObj].hasOwnProperty("Root")) {
            const isUpperCase = presetFile[presetObj].Root != null ? true : false;
            const parent = isUpperCase ? presetFile[presetObj].Root : presetFile[presetObj].root
            const id = isUpperCase ? presetFile[presetObj].Id : presetFile[presetObj].id
            const items = isUpperCase ? presetFile[presetObj].Items : presetFile[presetObj].items
            const name = isUpperCase ? presetFile[presetObj].Name : presetFile[presetObj].name

            presetFile[presetObj] =
            {
                "_id": id,
                "_type": "Preset",
                "_changeWeaponName": false,
                "_name": name,
                "_parent": parent,
                "_items": items
            }
        }
    }

    //if the weapon is a holstered and it has a light, set it to off. This prevents cases of holstered weapons giving away bots
    private genExtraPropsForPreset(equipmentSlot: string, weaponTpl: string, preset: IPreset, botRole: string, tables: IDatabaseTables, myBotGenHelper: BotGenHelper) {
        const isHolsteredWeapon: boolean = (equipmentSlot.toLowerCase() === "holster" && tables.templates.items[weaponTpl]._parent === BaseClasses.PISTOL) || equipmentSlot.toLowerCase() === "secondprimaryweapon";
        const lightLaserActiveChance = myBotGenHelper.getLightOnChance(botRole);
        const isActive: boolean = isHolsteredWeapon ? false : (this.randomUtil.getChance100(lightLaserActiveChance));

        for (let item in preset._items) {
            let itemTemplate = tables.templates.items[preset._items[item]._tpl];
            if (itemTemplate._parent === BaseClasses.FLASHLIGHT || itemTemplate._parent === BaseClasses.TACTICAL_COMBO || itemTemplate._parent === BaseClasses.LIGHT_LASER_DESIGNATOR) {
                if (preset._items[item].upd?.Light?.IsActive != null) {
                    preset._items[item].upd.Light.IsActive = isActive;
                }
                else {
                    preset._items[item].upd = {
                        "Light": {
                            "IsActive": isActive,
                            "SelectedMode": 0
                        }
                    }
                }
            }
        }
    }

    private getCultistPresets(botrole: string): string {
        const isPriest = botrole.includes("riest");
        const baseJson = isPriest ? BotTierTracker.priestBaseJson : BotTierTracker.cultistBaseJson;

        if (baseJson == 0) return "pmcusec";
        else if (baseJson == 1) return "pmcbear";

        if (isPriest && baseJson == 2) return "exusec";
        else if (isPriest) return "pmcbot";

        if (baseJson == 2) return "pmcusec";
        else return "pmcbear";
    }

    private myGetPresetWeaponMods(weaponTpl: string, equipmentSlot: string, weaponParentId: string, itemTemplate: ITemplateItem, botRole: string, pmcTier: number): IItem[] {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
        const appContext = container.resolve<ApplicationContext>("ApplicationContext");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const myBotGenHelper = new BotGenHelper(logger, this.randomUtil, this.databaseService, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, appContext, this.localisationService, this.configServer);
        const tracker = new BotTierTracker();

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
        let weaponPresets = [];
        try {
            let preset: IPreset;
            let botName = tier === 5 ? "tier5pmc" : botRole.includes("sectant") ? this.getCultistPresets(botRole) : botRole;
            let presetFile = require(`../../db/bots/loadouts/weaponPresets/${botName}Presets.json`);

            for (let presetObj in presetFile) {

                this.reformatPreset(presetFile, presetObj);

                if (presetFile[presetObj]._items[0]._tpl === weaponTpl) {
                    let presetTier = presetFile[presetObj]._name.slice(0, 1);
                    let pTierNum = Number(presetTier);
                    if (pTierNum > tier - 2) {
                        weaponPresets.push(presetFile[presetObj]);
                        if (modConfig.logEverything == true) {
                            this.logger.warning(`Found A Preset Within Tier`);
                        }
                    }
                }
            }

            //failed to get a preset within the same tier as PMC, so we loop again and ignore the tier requirement.
            if (weaponPresets.length == 0) {
                for (let presetObj in presetFile) {

                    this.reformatPreset(presetFile, presetObj);

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
                for (let i in weaponPresets) {
                    this.logger.warning(weaponPresets[i]._name);
                }
            }

            let randomPreset = weaponPresets[Math.floor(Math.random() * weaponPresets.length)];

            if (modConfig.logEverything == true) {
                this.logger.warning("Chose:");
                this.logger.warning(randomPreset._name);
            }

            preset = this.cloner.clone(randomPreset);
            if (preset) {
                const parentItem: IItem = preset._items[0];
                preset._items[0] = {
                    ...parentItem, ...{
                        "parentId": weaponParentId,
                        "slotId": equipmentSlot,
                        ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole)
                    }
                };

                //presets aren't subject to config's % chance for light/laser to be off or on
                this.genExtraPropsForPreset(equipmentSlot, weaponTpl, preset, botRole, tables, myBotGenHelper);

                weaponMods.push(...preset._items);
            }
            if (modConfig.logEverything == true) {
                this.logger.info(`Realism Mod: Preset was Fetched. Working as intended, do not report as issue.`);
            }
        }
        catch {
            if (modConfig.logEverything == true) {
                this.logger.warning(`Realism Mod: Failed To Find Custom Preset For Bot ${botRole} At Tier ${tier}. Do not panic, read the warning, do not report this.`);
                this.logger.warning(this.localisationService.getText("bot-weapon_generated_incorrect_using_default", weaponTpl))
            };

            let preset: IPreset;
            for (const presetObj of Object.values(tables.globals.ItemPresets)) {
                if (presetObj._items[0]._tpl === weaponTpl) {
                    preset = this.cloner.clone(presetObj);
                    break;
                }
            }
            if (preset) {
                const parentItem: IItem = preset._items[0];
                preset._items[0] = {
                    ...parentItem,
                    ...{
                        "parentId": weaponParentId,
                        "slotId": equipmentSlot,
                        ...myBotGenHelper.myGenerateExtraPropertiesForItem(itemTemplate, botRole, this.databaseService.getTables().templates.items[weaponTpl]._parent)
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

    public isRequired(slot) {
        if (slot?._botRequired && slot._botRequired == true) {
            return true
        }
        else if (slot._required == true) {
            return true
        }
        return false
    }
}

export class BotGenHelper extends BotGeneratorHelper {

    public getLightOnChance(botRole: string): number {
        return this.getBotEquipmentSettingFromConfig(botRole, "lightIsActiveDayChancePercent", 25);
    }

    public myGenerateExtraPropertiesForItem(itemTemplate: ITemplateItem, botRole: string = null, parentWeaponClass?: string, equipmentSlot?: string): { upd?: IUpd } {
        // Get raid settings, if no raid, default to day
        // const raidSettings = this.applicationContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION)?.getValue<IGetRaidConfigurationRequestData>();
        // const raidIsNight = raidSettings?.timeVariant === "PAST";

        const itemProperties: IUpd = {};

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
            const medRandomization: IRandomisedResourceValues = { "resourcePercent": 30, "chanceMaxResourcePercent": 20 };
            const resource = Math.max(1, this.getRandomizedResourceValue(itemTemplate._props.MaxResource, medRandomization));
            itemProperties.MedKit = { HpResource: resource };
        }

        if (itemTemplate._props.MaxResource && itemTemplate._props.foodUseTime) {
            //this.botConfig.lootItemResourceRandomization[botRole]?.food
            const foodRandomization: IRandomisedResourceValues = { "resourcePercent": 40, "chanceMaxResourcePercent": 30 };
            const resource = Math.max(1, this.getRandomizedResourceValue(itemTemplate._props.MaxResource, foodRandomization));
            itemProperties.FoodDrink = { HpPercent: resource };
        }

        if (modConfig.enable_hazard_zones && itemTemplate._props.MaxResource && itemTemplate._id === "590c595c86f7747884343ad7") {
            itemProperties.Resource = { Value: Math.floor(Math.random() * 61) + 35, UnitsConsumed: 0 };
        }

        if (itemTemplate._parent === BaseClasses.FLASHLIGHT || itemTemplate._parent === BaseClasses.TACTICAL_COMBO) {
            if ((parentWeaponClass === BaseClasses.PISTOL && equipmentSlot.toLowerCase() === "holster") || equipmentSlot.toLowerCase() === "secondprimaryweapon") {
                // stops pistols in holster having lights on
                itemProperties.Light = { IsActive: false, SelectedMode: 0 };
            }
            else {
                // Get chance from botconfig for bot type
                const lightLaserActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "lightIsActiveDayChancePercent", 0);
                itemProperties.Light = { IsActive: (this.randomUtil.getChance100(lightLaserActiveChance)), SelectedMode: 0 };
            }

        }
        else if (itemTemplate._parent === BaseClasses.LIGHT_LASER_DESIGNATOR) {
            // Get chance from botconfig for bot type, use 50% if no value found
            const lightLaserActiveChance = this.getBotEquipmentSettingFromConfig(botRole, "laserIsActiveChancePercent", 0);
            itemProperties.Light = { IsActive: (this.randomUtil.getChance100(lightLaserActiveChance)), SelectedMode: 0 };
        }

        if (itemTemplate._parent === BaseClasses.NIGHTVISION) {
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


export class BotEquipGenHelper extends BotEquipmentModGenerator {

    private myFilterPlateModsForSlotByLevel(settings: IGenerateEquipmentProperties, modSlot: string, existingPlateTplPool: string[], armorItem: ITemplateItem, botRole: string, pmcTier: number): IFilterPlateModsForSlotByLevelResult {

        const result: IFilterPlateModsForSlotByLevelResult = { result: Result.UNKNOWN_FAILURE, plateModTpls: null };

        // not a plate slot, return original mod pool array
        if (!this.itemHelper.isRemovablePlateSlot(modSlot)) {
            result.result = Result.NOT_PLATE_HOLDING_SLOT;
            result.plateModTpls = existingPlateTplPool;
            return result;
        }

        const tierChecker = new BotTierTracker();

        let armorPlates: IArmorPlateWeights[] = modConfig.realistic_ballistics == true ? armorPlateWeights.pmcWeights : armorPlateWeights.standardWeights;
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
        const plateSlotWeights = armorPlates.find((x) =>
            tier >= x.levelRange.min && tier <= x.levelRange.max
        );

        if (!plateSlotWeights) {
            // No weights, return original array of plate tpls
            result.result = Result.LACKS_PLATE_WEIGHTS;
            result.plateModTpls = existingPlateTplPool;
            return result;
        }

        // Get the specific plate slot weights (front/back/side)
        const plateWeights: Record<string, number> = plateSlotWeights[modSlot];
        if (!plateWeights) {
            // No weights, return original array of plate tpls
            result.result = Result.LACKS_PLATE_WEIGHTS;
            result.plateModTpls = existingPlateTplPool;
            return result;
        }

        // Choose a plate level based on weighting
        const chosenArmorPlateLevel = this.weightedRandomHelper.getWeightedValue<string>(plateWeights);

        // Convert the array of ids into database items
        const platesFromDb = existingPlateTplPool.map((plateTpl) => this.itemHelper.getItem(plateTpl)[1]);

        // Filter plates to the chosen level based on its armorClass property
        const filteredPlates = platesFromDb.filter((item) => item._props.armorClass == chosenArmorPlateLevel);

        //try again with a higher level
        if (filteredPlates.length === 0) {
            this.logger.debug(
                `Plate filter was too restrictive for armor: ${armorItem._id}, unable to find plates of level: ${chosenArmorPlateLevel}. Using mod items default plate`,
            );

            const relatedItemDbModSlot = armorItem._props.Slots.find((slot) => slot._name.toLowerCase() === modSlot);
            const defaultPlate = relatedItemDbModSlot._props.filters[0].Plate;
            if (!defaultPlate) {
                // No relevant plate found after filtering AND no default plate

                // Last attempt, get default preset and see if it has a plate default
                const defaultPreset = this.presetHelper.getDefaultPreset(armorItem._id);
                if (defaultPreset) {
                    const relatedPresetSlot = defaultPreset._items.find((item) =>
                        item.slotId?.toLowerCase() === modSlot
                    );
                    if (relatedPresetSlot) {
                        result.result = Result.SUCCESS;
                        result.plateModTpls = [relatedPresetSlot._tpl];

                        return result;
                    }
                }

                result.result = Result.NO_DEFAULT_FILTER;

                return result;
            }

            result.result = Result.SUCCESS;
            result.plateModTpls = [defaultPlate];

            return result;
        }

        // Only return the items ids
        result.result = Result.SUCCESS;
        result.plateModTpls = filteredPlates.map((item) => item._id);

        return result;
    }

    public myGenerateModsForEquipment(equipment: IItem[], parentId: string, parentTemplate: ITemplateItem, settings: IGenerateEquipmentProperties, shouldForceSpawn = false, botRole: string, pmcTier: number, botGenHelper: BotGenHelper): IItem[] {
        let forceSpawn = shouldForceSpawn;

        const compatibleModsPool = settings.modPool[parentTemplate._id];
        if (!compatibleModsPool) {
            this.logger.warning(
                `bot: ${settings.botData.role} lacks a mod slot pool for item: ${parentTemplate._id} ${parentTemplate._name}`,
            );
        }

        // Iterate over mod pool and choose mods to add to item
        for (const modSlotName in compatibleModsPool) {
            const itemSlotTemplate = this.getModItemSlotFromDb(modSlotName, parentTemplate);
            if (!itemSlotTemplate) {
                this.logger.error(
                    this.localisationService.getText("bot-mod_slot_missing_from_item", {
                        modSlot: modSlotName,
                        parentId: parentTemplate._id,
                        parentName: parentTemplate._name,
                        botRole: settings.botData.role,
                    }),
                );
                continue;
            }
            const modSpawnResult = this.shouldModBeSpawned(
                itemSlotTemplate,
                modSlotName.toLowerCase(),
                settings.spawnChances.equipmentMods,
                settings.botEquipmentConfig,
            );

            //if the gear takes a gas mask filter, it's a gas mask, force spawn
            if (modConfig.enable_hazard_zones && compatibleModsPool[modSlotName].includes("590c595c86f7747884343ad7")) {
                forceSpawn = true;
            }

            if (modSpawnResult === ModSpawn.SKIP && !forceSpawn) {
                continue;
            }

            // Ensure submods for nvgs all spawn together
            if (modSlotName === "mod_nvg") {
                forceSpawn = true;
            }

            // Slot can hold armor plates + we are filtering possible items by bot level, handle
            let modPoolToChooseFrom = compatibleModsPool[modSlotName];
            if (settings.botEquipmentConfig.filterPlatesByLevel && this.itemHelper.isRemovablePlateSlot(modSlotName.toLowerCase())) {
                const plateSlotFilteringOutcome = this.myFilterPlateModsForSlotByLevel(
                    settings,
                    modSlotName.toLowerCase(),
                    compatibleModsPool[modSlotName],
                    parentTemplate,
                    botRole,
                    pmcTier
                );

                if ([Result.UNKNOWN_FAILURE, Result.NO_DEFAULT_FILTER].includes(plateSlotFilteringOutcome.result)) {
                    this.logger.debug(
                        `Plate slot: ${modSlotName} selection for armor: ${parentTemplate._id} failed: ${Result[plateSlotFilteringOutcome.result]
                        }, skipping`,
                    );

                    continue;
                }

                if ([Result.LACKS_PLATE_WEIGHTS].includes(plateSlotFilteringOutcome.result)) {
                    this.logger.warning(
                        `Plate slot: ${modSlotName} lacks weights for armor: ${parentTemplate._id}, unable to adjust plate choice, using existing data`,
                    );
                }

                modPoolToChooseFrom = plateSlotFilteringOutcome.plateModTpls;
            }

            // Find random mod and check its compatible
            let modTpl: string;
            let found = false;
            const exhaustableModPool = new ExhaustableArray(modPoolToChooseFrom, this.randomUtil, this.cloner);
            while (exhaustableModPool.hasValues()) {
                modTpl = exhaustableModPool.getRandomValue();
                if (
                    !this.botGeneratorHelper.isItemIncompatibleWithCurrentItems(equipment, modTpl, modSlotName)
                        .incompatible
                ) {
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

    private myShouldModBeSpawned(itemSlot: ISlot, modSlot: string, modSpawnChances: IModsChances, checkRequired: CheckRequired, botEquipConfig: EquipmentFilters): ModSpawn {

        const slotRequired = itemSlot._required;
        if (this.getAmmoContainers().includes(modSlot) || checkRequired.isRequired(itemSlot)) {
            return ModSpawn.SPAWN;
        }

        const spawnMod = this.probabilityHelper.rollChance(modSpawnChances[modSlot]);
        if (!spawnMod && (slotRequired || botEquipConfig.weaponSlotIdsToMakeRequired?.includes(modSlot))) {
            // Mod is required but spawn chance roll failed, choose default mod spawn for slot
            return ModSpawn.DEFAULT_MOD;
        }
        return spawnMod ? ModSpawn.SPAWN : ModSpawn.SKIP;
    }

    private myIsModValidForSlot(modToAdd: [boolean, ITemplateItem], itemSlot: ISlot, modSlot: string, parentTemplate: ITemplateItem, checkRequired: CheckRequired): boolean {

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

    private myCreateModItem(modId: string, modTpl: string, parentId: string, modSlot: string, modTemplate: ITemplateItem, botRole: string, parentWeaponTpl: string, equipmentSlot: string): IItem {

        const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
        const appContext = container.resolve<ApplicationContext>("ApplicationContext");
        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
        const myBotGenHelper = new BotGenHelper(this.logger, this.randomUtil, this.databaseService, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, appContext, this.localisationService, this.configServer);

        return {
            "_id": modId,
            "_tpl": modTpl,
            "parentId": parentId,
            "slotId": modSlot,
            ...myBotGenHelper.myGenerateExtraPropertiesForItem(modTemplate, botRole, parentWeaponTpl, equipmentSlot)
        };
    }

    public botModGen(sessionId: string, request: IGenerateWeaponRequest, equipmentSlot: string): IItem[] {
        const checkRequired = new CheckRequired();
        const pmcProfile = this.profileHelper.getPmcProfile(sessionId);

        // Get pool of mods that fit weapon
        const compatibleModsPool = request.modPool[request.parentTemplate._id];

        if (
            !((request.parentTemplate._props.Slots.length || request.parentTemplate._props.Cartridges?.length)
                || request.parentTemplate._props.Chambers?.length)
        ) {
            this.logger.error(
                this.localisationService.getText("bot-unable_to_add_mods_to_weapon_missing_ammo_slot", {
                    weaponName: request.parentTemplate._name,
                    weaponId: request.parentTemplate._id,
                    botRole: request.botData.role
                }),
            );

            return request.weapon;
        }

        const botEquipConfig = this.botConfig.equipment[request.botData.equipmentRole];
        const botEquipBlacklist = this.botEquipmentFilterService.getBotEquipmentBlacklist(
            request.botData.equipmentRole,
            pmcProfile.Info.Level,
        );
        const botWeaponSightWhitelist = this.botEquipmentFilterService.getBotWeaponSightWhitelist(request.botData.equipmentRole);
        const randomisationSettings = this.botHelper.getBotRandomizationDetails(request.botData.level, botEquipConfig);

        // Iterate over mod pool and choose mods to attach
        const sortedModKeys = this.sortModKeys(Object.keys(compatibleModsPool), request.parentTemplate._id);
        for (const modSlot of sortedModKeys) {
            // Check weapon has slot for mod to fit in
            const modsParentSlot = this.getModItemSlotFromDb(modSlot, request.parentTemplate);
            if (!modsParentSlot) {
                this.logger.error(
                    this.localisationService.getText("bot-weapon_missing_mod_slot", {
                        modSlot: modSlot,
                        weaponId: request.parentTemplate._id,
                        weaponName: request.parentTemplate._name,
                        botRole: request.botData.role,
                    }),
                );

                continue;
            }

            const modSpawnResult = this.myShouldModBeSpawned(modsParentSlot, modSlot, request.modSpawnChances, checkRequired, botEquipConfig);
            if (modSpawnResult === ModSpawn.SKIP) {
                continue;
            }

            //yikes dude
            const isRandomisableSlot = randomisationSettings?.randomisedWeaponModSlots?.includes(modSlot) ?? false;
            const modToSpawnRequest: IModToSpawnRequest = {
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
            if (
                this.botWeaponModLimitService.weaponModHasReachedLimit(
                    request.botData.equipmentRole,
                    modToAddTemplate,
                    request.modLimits,
                    request.parentTemplate,
                    request.weapon,
                )
            ) {
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
            if (
                modSlot === "mod_handguard" && modToAddTemplate._props.Slots.find((x) => x._name === "mod_handguard")
                && !request.weapon.find((x) => x.slotId === "mod_launcher")
            ) {
                // Needed for handguards with lower
                request.modSpawnChances.mod_handguard = 100;
            }

            // If stock mod can take a sub stock mod, force spawn chance to be 100% to ensure sub-stock gets added
            // Or if mod_stock is configured to be forced on
            if (
                modSlot === "mod_stock" && (modToAddTemplate._props.Slots.find((x) =>
                    x._name.includes("mod_stock") || botEquipConfig.forceStock
                ))
            ) {
                // Stock mod can take additional stocks, could be a locking device, force 100% chance
                const stockSlots = ["mod_stock", "mod_stock_000", "mod_stock_akms"];
                this.adjustSlotSpawnChances(request.modSpawnChances, stockSlots, 100);
            }

            // Update conflicting item list now item has been chosen
            for (const conflictingItem of modToAddTemplate._props.ConflictingItems) {
                request.conflictingItemTpls.add(conflictingItem);
            }

            const modId = this.hashUtil.generate();
            request.weapon.push(
                this.myCreateModItem(modId, modToAddTemplate._id, request.weaponId, modSlot, modToAddTemplate, request.botData.role, request.parentTemplate._parent, equipmentSlot), //tables[weapon[0]._tpl]._parent
            );

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
                    const recursiveRequestData: IGenerateWeaponRequest = {
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
                    this.botModGen(
                        sessionId,
                        recursiveRequestData,
                        equipmentSlot
                    );
                }
            }
        }

        return request.weapon;
    }
}


