import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import type { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { HashUtil } from "@spt/utils/HashUtil";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { RagfairOfferGenerator } from "@spt/generators/RagfairOfferGenerator";
import { BotEquipmentFilterService } from "@spt/services/BotEquipmentFilterService";
import { DynamicRouterModService } from "@spt/services/mod/dynamicRouter/DynamicRouterModService"
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { ApplicationContext } from "@spt/context/ApplicationContext";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { WeatherController } from "@spt/controllers/WeatherController";
import { ContextVariableType } from "@spt/context/ContextVariableType";
import { LocalisationService } from "@spt/services/LocalisationService";
import { IInventoryConfig } from "@spt/models/spt/config/IInventoryConfig";
import { TraderAssortHelper } from "@spt/helpers/TraderAssortHelper";
import { MathUtil } from "@spt/utils/MathUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { AssortHelper } from "@spt/helpers/AssortHelper";
import { RagfairAssortGenerator } from "@spt/generators/RagfairAssortGenerator";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { FenceService } from "@spt/services/FenceService";
import { TraderAssortService } from "@spt/services/TraderAssortService";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { ITrader } from "@spt/models/eft/common/tables/ITrader";
import { TraderPurchasePersisterService } from "@spt/services/TraderPurchasePersisterService";
import { RagfairServer } from "@spt/servers/RagfairServer";;
import { BotHelper } from "@spt/helpers/BotHelper";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { BotLevelGenerator } from "@spt/generators/BotLevelGenerator";
import { IBotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { ISearchRequestData } from "@spt/models/eft/ragfair/ISearchRequestData";
import { RagfairCallbacks } from "@spt/callbacks/RagfairCallbacks";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IGetOffersResult } from "@spt/models/eft/ragfair/IGetOffersResult";
import { RagfairController } from "@spt/controllers/RagfairController";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { BotInventoryGenerator } from "@spt/generators/BotInventoryGenerator";
import { BotDifficultyHelper } from "@spt/helpers/BotDifficultyHelper";
import { BotGenerator } from "@spt/generators/BotGenerator";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { RagfairTaxService } from "@spt/services/RagfairTaxService";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { IItemConfig } from "@spt/models/spt/config/IItemConfig";
import { IBotType } from "@spt/models/eft/common/tables/IBotType";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { InsuranceController } from "@spt/controllers/InsuranceController";
import { PaymentService } from "@spt/services/PaymentService";
import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { MailSendService } from "@spt/services/MailSendService";
import { InsuranceService } from "@spt/services/InsuranceService";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ILocation } from "@spt/models/eft/common/ILocation";
import { ILooseLoot } from "@spt/models/eft/common/ILooseLoot";
import { ILootConfig } from "@spt/models/spt/config/ILootConfig";
import { ILocationConfig, ILootMultiplier } from "@spt/models/spt/config/ILocationConfig";
import { ISeasonalEventConfig } from "@spt/models/spt/config/ISeasonalEventConfig";
import { IConfig, IGlobals } from "@spt/models/eft/common/IGlobals";
//import { ISaveProgressRequestData } from "@spt/models/eft/inRaid/ISaveProgressRequestData";
import { PlayerRaidEndState } from "@spt/models/enums/PlayerRaidEndState";
import { WeatherGenerator } from "@spt/generators/WeatherGenerator";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotNameService } from "@spt/services/BotNameService";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { ExitStatus } from "@spt/models/enums/ExitStatis";

import { AttachmentBase } from "./weapons/attatchment_base";
import { FleaChangesPreDBLoad, TieredFlea, FleaChangesPostDBLoad } from "./traders/fleamarket";
import { ConfigChecker, Utils, ProfileTracker, RaidInfoTracker, ModTracker, MapType } from "./utils/utils"
import { BotArrays, StaticArrays } from "./utils/arrays"
import { Consumables } from "./items/meds";
import { Player } from "./player/player"
import { WeaponsGlobals } from "./weapons/weapons_globals"
import { BotLoader } from "./bots/bots";
import { BotGen, BotGenHelper } from "./bots/bot_gen";
import { ItemsClass } from "./items/items";
import { JsonGen } from "./json/json_gen";
import { Quests } from "./traders/quests";
import { InsuranceOverride } from "./traders/insurance";
import { RagCallback, RandomizeTraderAssort, TraderRefresh, Traders } from "./traders/traders";
import { Spawns } from "./bots/spawns";
import { Gear } from "./items/gear";
import { EventTracker } from "./misc/seasonalevents";
import { ItemCloning } from "./items/item_cloning";
import { DescriptionGen } from "./json/description_gen";
import { ItemStatHandler } from "./json/json-handler";
import { Ammo } from "./ballistics/ammo";
import { Armor } from "./ballistics/armor";

import { info } from "console";

import * as path from 'path';
import * as fs from 'fs';
import { json } from "stream/consumers";
import { ContainerHelper } from "@spt/helpers/ContainerHelper";
import { DurabilityLimitsHelper } from "@spt/helpers/DurabilityLimitsHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { IUpd } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { spawn } from "child_process";
import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { InstanceManager } from "./instance_manager";
import { ExternalInventoryMagGen } from "@spt/generators/weapongen/implementations/ExternalInventoryMagGen";
import { InventoryMagGen } from "@spt/generators/weapongen/InventoryMagGen";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";

const crafts = require("../db/items/hideout_crafts.json");
const medItems = require("../db/items/med_items.json");
const medBuffs = require("../db/items/buffs.json");
const foodItems = require("../db/items/food_items.json");
const foodBuffs = require("../db/items/buffs_food.json");
const stimBuffs = require("../db/items/buffs_stims.json");
const modConfig = require("../config/config.json");
const realismInfo = require("../data/info.json");
const baseMapLoot = require("../db/maps/original_lootModifiers.json");
const playerMapLoot = require("../data/player_lootModifiers.json");

let adjustedTradersOnStart = false;

export class Main implements IPreSptLoadMod, IPostDBLoadMod, IPostSptLoadMod {

    private modLoader: PreSptModLoader;

    public preSptLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const hashUtil = container.resolve<HashUtil>("HashUtil");
        const randomUtil = container.resolve<RandomUtil>("RandomUtil");
        const weightedRandomHelper = container.resolve<WeightedRandomHelper>("WeightedRandomHelper");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        const HttpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const databaseService = container.resolve<DatabaseService>("DatabaseService");
        const localisationService = container.resolve<LocalisationService>("LocalisationService");
        const fleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const cloner = container.resolve<ICloner>("PrimaryCloner");
        const assortHelper = container.resolve<AssortHelper>("AssortHelper");
        const paymentHelper = container.resolve<PaymentHelper>("PaymentHelper");
        const mathUtil = container.resolve<MathUtil>("MathUtil");
        const timeUtil = container.resolve<TimeUtil>("TimeUtil");
        const traderAssortService = container.resolve<TraderAssortService>("TraderAssortService");
        const traderHelper = container.resolve<TraderHelper>("TraderHelper");
        const fenceService = container.resolve<FenceService>("FenceService");
        const traderPurchasePefrsisterService = container.resolve<TraderPurchasePersisterService>("TraderPurchasePersisterService");
        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
        const ragfairAssortGenerator = container.resolve<RagfairAssortGenerator>("RagfairAssortGenerator");
        const dynamicRouter = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        const preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
        const traderRefersh = new TraderRefresh(logger, mathUtil, timeUtil, databaseService, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator,
            traderAssortService, localisationService, traderPurchasePefrsisterService, traderHelper, fenceService, configServer, cloner);
        const flea = new FleaChangesPreDBLoad(logger, fleaConf, modConfig);
        const instanceManager = InstanceManager.getInstance();

        this.checkForMods(preSptModLoader, logger, modConfig);
        flea.loadFleaConfig();

        //way of checking if QB spawn system is active, and disabling certain aspects of Realism's spawn changes to compenstate
        dynamicRouter.registerDynamicRouter(
            `DynamicQuestingBotsSpawnSystemCheck`,
            [
                {
                    url: "/QuestingBots/AdjustPMCConversionChances/",
                    action: async (output: string) => {
                        ModTracker.qtbSpawnsActive = true;
                        return output;
                    }
                }
            ],
            "QuestingBotsSpawnSystemCheck"
        );

        dynamicRouter.registerDynamicRouter(
            "realismGetConfig",
            [
                {
                    url: "/RealismMod/GetConfig",
                    action: async (url, info, sessionID, output) => {
                        try {
                            return jsonUtil.serialize(modConfig);
                        } catch (e) {
                            logger.error("Realism: Failed to read config file" + e);
                        }
                    }
                }
            ],
            "RealismMod"
        );

        dynamicRouter.registerDynamicRouter(
            "realismGetTemplateData",
            [
                {
                    url: "/RealismMod/GetTemplateData",
                    action: async (url, info, sessionID, output) => {
                        try {
                            const statHandler: ItemStatHandler = ItemStatHandler.getInstance();
                            const data: { [key: string]: any } = await statHandler.processTemplateJson(true, path.join(__dirname, '..', 'db', 'templates'))
                            return jsonUtil.serialize(data);
                        } catch (e) {
                            logger.error("Realism: Failed to get server template data" + e);
                        }
                    }
                }
            ],
            "RealismMod"
        );

        dynamicRouter.registerDynamicRouter(
            "realismGetInfo",
            [
                {
                    url: "/RealismMod/GetInfo",
                    action: async (url, info, sessionID, output) => {
                        try {
                            const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                            const postLoadDBServer = container.resolve<DatabaseService>("DatabaseService");
                            const utils = Utils.getInstance();
                            const pmcData = profileHelper.getPmcProfile(sessionID);
                            this.getEventData(pmcData, logger, utils);
                            this.setModInfo(logger);

                            return jsonUtil.serialize(realismInfo);
                        } catch (e) {
                            logger.error("Realism: Failed to read info file"+ e);
                        }
                    }
                }
            ],
            "RealismMod"
        );

        dynamicRouter.registerDynamicRouter(
            "realismGetTOD",
            [
                {
                    url: "/RealismMod/GetTimeOfDay",
                    action: async (url, info, sessionID, output) => {
                        try {
                            this.setModInfo(logger);
                            return jsonUtil.serialize(realismInfo);
                        } catch (e) {
                            logger.error("Failed to read info file" + e);
                        }
                    }
                }
            ],
            "RealismMod"
        );

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            const botLevelGenerator = container.resolve<BotLevelGenerator>("BotLevelGenerator");
            const botInventoryGenerator = container.resolve<BotInventoryGenerator>("BotInventoryGenerator");
            const botHelper = container.resolve<BotHelper>("BotHelper");
            const botEquipmentFilterService = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
            const seasonalEventService = container.resolve<SeasonalEventService>("SeasonalEventService");
            const botGeneratorHelper = container.resolve<BotGeneratorHelper>("BotGeneratorHelper");
            const botNameService = container.resolve<BotNameService>("BotNameService");
            const itemFilterService = container.resolve<ItemFilterService>("ItemFilterService");

            const botGen = new BotGen(
                logger, hashUtil, randomUtil, timeUtil,
                profileHelper, databaseService, botInventoryGenerator,
                botLevelGenerator, botEquipmentFilterService, weightedRandomHelper,
                botHelper, botGeneratorHelper, seasonalEventService,
                itemFilterService, botNameService, configServer, cloner);


            container.afterResolution("BotGenerator", (_t, result: BotGenerator) => {
                result.prepareAndGenerateBot = (sessionId: string, botGenerationDetails: IBotGenerationDetails): IBotBase => {
                    return botGen.myPrepareAndGenerateBot(sessionId, botGenerationDetails);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotGenerator", (_t, result: BotGenerator) => {
                result.generatePlayerScav = (sessionId: string, role: string, difficulty: string, botTemplate: IBotType): IBotBase => {
                    return botGen.myGeneratePlayerScav(sessionId, role, difficulty, botTemplate);
                }
            }, { frequency: "Always" });
        }

        container.afterResolution("TraderAssortHelper", (_t, result: TraderAssortHelper) => {
            result.resetExpiredTrader = (trader: ITrader): void => {
                return traderRefersh.myResetExpiredTrader(trader);
            }
        }, { frequency: "Always" });


        if (modConfig.randomize_trader_stock == true) {
            const httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
            const ragfairController = container.resolve<RagfairController>("RagfairController");
            const ragfairTaxServ = container.resolve<RagfairTaxService>("RagfairTaxService");
            const ragfairServer = container.resolve<RagfairServer>("RagfairServer");
            const ragFairCallback = new RagCallback(httpResponse, ragfairServer, ragfairController, ragfairTaxServ, configServer);
            container.afterResolution("RagfairCallbacks", (_t, result: RagfairCallbacks) => {
                result.search = (url: string, info: ISearchRequestData, sessionID: string): IGetBodyResponseData<IGetOffersResult> => {
                    return ragFairCallback.mySearch(url, info, sessionID);
                }
            }, { frequency: "Always" });
        }

        if (modConfig.insurance_changes == true) {
            const eventOutputHolder = container.resolve<EventOutputHolder>("HttpResponseUtil");
            const saveServer = container.resolve<SaveServer>("SaveServer");
            const itemHelper = container.resolve<ItemHelper>("ItemHelper");
            const InsuranceService = container.resolve<InsuranceService>("InsuranceService");
            const mailSendService = container.resolve<MailSendService>("MailSendService");
            const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
            const localizationService = container.resolve<LocalisationService>("LocalisationService");
            const dialogueHelper = container.resolve<DialogueHelper>("DialogueHelper");
            const paymentService = container.resolve<PaymentService>("PaymentService");

            const insuranceOverride = new InsuranceOverride(
                logger, randomUtil, mathUtil, hashUtil, eventOutputHolder, timeUtil, saveServer, databaseService, itemHelper, profileHelper,
                dialogueHelper, weightedRandomHelper, traderHelper, paymentService, InsuranceService, mailSendService, ragfairPriceService, localizationService, configServer, cloner);

            container.afterResolution("InsuranceController", (_t, result: InsuranceController) => {
                result.processReturnByProfile = (sessionID: string): void => {
                    return insuranceOverride.myProcessReturnByProfile(sessionID);
                }
            }, { frequency: "Always" });
        }


        staticRouterModService.registerStaticRouter(
            "Realism-OnValidate",
            [
                {
                    url: "/client/game/version/validate",
                    action: async (url, info, sessionID, output) => {

                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const postLoadDBServer = container.resolve<DatabaseService>("DatabaseService");
                        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
                        const ragfairServer = container.resolve<RagfairServer>("RagfairServer");
                        const weatherConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
                        const seeasonalEventConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<ISeasonalEventConfig>(ConfigTypes.SEASONAL_EVENT);
                        const locationConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<ILocationConfig>(ConfigTypes.LOCATION);
                        const seasonalEventsService = container.resolve<SeasonalEventService>("SeasonalEventService");
                        const postLoadTables = postLoadDBServer.getTables();
                        const utils = Utils.getInstance();
                        const tieredFlea = new TieredFlea(postLoadTables, aKIFleaConf);
                        const player = new Player(logger, postLoadTables, modConfig, medItems, utils);
                        const maps = new Spawns(logger, postLoadTables, modConfig, postLoadTables.locations, utils);
                        const quests = new Quests(logger, postLoadTables, modConfig);
                        const randomizeTraderAssort = new RandomizeTraderAssort();
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID);

                        try {
                            ProfileTracker.checkLoggedInProfiles(pmcData, profileData, false);
                            if (modConfig.backup_profiles == true) this.backupProfile(profileData, logger);
                            if (modConfig.enable_hazard_zones) quests.resetRepeatableQuests(profileData);
                            this.checkForSeasonalEvents(logger, seasonalEventsService, seeasonalEventConfig, weatherConfig);
                            this.tryLockTradersForEvent(pmcData, logger, postLoadTables.globals.config);
                            if (modConfig.loot_changes) this.loadMapLoot(locationConfig, sessionID, logger);

                            const healthProp = pmcData?.Health;
                            const hydroProp = pmcData?.Health?.Hydration;

                            if (healthProp != null) {
                                player.correctNegativeHP(pmcData);
                                player.setPlayerHealth(pmcData, scavData);
                                if (hydroProp != null) {
                                    if (modConfig.revert_med_changes == true && modConfig.med_changes == false) {
                                        this.revertMeds(pmcData, utils);
                                        this.revertMeds(scavData, utils);
                                        this.revertHydroEnergy(pmcData, postLoadTables);
                                        this.revertHydroEnergy(scavData, postLoadTables);
                                        modConfig.revert_med_changes = false;
                                        utils.writeConfigJSON(modConfig, 'config/config.json');
                                        logger.info("Realism Mod: Meds in Inventory/Stash Reverted To Defaults");
                                    }

                                    this.checkProfile(pmcData, pmcData.Info.Experience, utils, player, logger);
                                    this.checkProfile(scavData, pmcData.Info.Experience, utils, player, logger);
                                }
                            }

                            if (adjustedTradersOnStart == false) {
                                const profilesData: IPmcData[] = ProfileTracker.getPmcProfileData(profileHelper);
                                randomizeTraderAssort.adjustTraderStockAtGameStart(profilesData);
                            }
                            adjustedTradersOnStart = true;

                            const traders: string[] = (ragfairServer as any).getUpdateableTraders();
                            for (let traderID of traders) {
                                ragfairOfferGenerator.generateFleaOffersForTrader(traderID);
                            }

                            if (modConfig.tiered_flea == true) {
                                tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, ProfileTracker.averagePlayerLevel);
                            }
                            if (modConfig.boss_spawns == true) {
                                maps.setBossSpawnChance(ProfileTracker.averagePlayerLevel, databaseService, seeasonalEventConfig);
                            }

                            if (modConfig.logEverything == true) {
                                logger.info("Realism Mod: Profile Checked");
                            }
                        }
                        catch (err) {
                            logger.error("Realism Mod: Error Checking Player Profile: " + err);
                        }
                        return output;
                    }
                }
            ],
            "Realism"
        );

        staticRouterModService.registerStaticRouter(
            "Realism-RunOnGameLogout",
            [
                {
                    url: "/client/game/logout",
                    action: async (url, info, sessionID, output) => {
                        try {
                            const pmcData = profileHelper.getPmcProfile(sessionID);
                            const profileData = profileHelper.getFullProfile(sessionID)
                            ProfileTracker.checkLoggedInProfiles(pmcData, profileData, true);
                        }
                        catch (err) {
                            logger.error("Realism Mod: Error At Log Out: " + err);
                        }

                        return output;
                    }
                }
            ],
            "Realism"
        );

        staticRouterModService.registerStaticRouter(
            "Realism-RunAtProfileCreation",
            [
                {
                    url: "/client/game/profile/create",
                    action: async (url, info, sessionID, output) => {

                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const postLoadDBService = container.resolve<DatabaseService>("DatabaseService");
                        const postLoadtables = postLoadDBService.getTables();
                        const utils = Utils.getInstance();
                        const player = new Player(logger, postLoadtables, modConfig, medItems, utils);

                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);

                        try {

                            this.checkProfile(pmcData, pmcData.Info.Experience, utils, player, logger);
                            this.checkProfile(scavData, scavData.Info.Experience, utils, player, logger);

                            if (modConfig.realistic_player_health == true) {
                                player.correctNewHealth(pmcData, scavData);
                            }
                            logger.info("Realism Mod: New Profile Modified");
                        }
                        catch (e) {
                            logger.error("Realism Mod: Error Editing New Profile: " + e);
                        }
                        return output;
                    }
                }
            ],
            "Realism"
        );

        staticRouterModService.registerStaticRouter(
            "Realism-RunAtRaidStart",
            [
                {
                    url: "/client/match/local/start",
                    action: async (url, info, sessionID, output) => {

                        try {
                            const postLoadDBService = container.resolve<DatabaseService>("DatabaseService");
                            const postLoadTables = postLoadDBService.getTables();
                            const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                            const appContext = container.resolve<ApplicationContext>("ApplicationContext");
                            const weatherGenerator = container.resolve<WeatherGenerator>("WeatherGenerator");
                            const matchInfo = appContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
                            const pmcConf = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
                            const arrays = new BotArrays(postLoadTables);
                            const utils = Utils.getInstance();
                            const botLoader = BotLoader.getInstance();
                            const pmcData = profileHelper.getPmcProfile(sessionID);
                            const profileData = profileHelper.getFullProfile(sessionID);

                            RaidInfoTracker.generatedBotsCount = 0;

                            //had a concern that bot loot cache isn't being reset properly since I've overriden it with my own implementation, so to be safe...
                            // const myGetLootCache = new MyLootCache(logger, jsonUtil, itemHelper, postLoadDBServer, pmcLootGenerator, localisationService, ragfairPriceService);
                            // myGetLootCache.myClearCache();

                            const baseTime = weatherGenerator.calculateGameTime({ acceleration: 0, time: "", date: "", weather: undefined, season: 1 }).time; //apparently regenerates weather?
                            RaidInfoTracker.mapName = matchInfo.location.toLowerCase();
                            let realTime = "";
                            let mapType: MapType;

                            //update global player level
                            ProfileTracker.checkLoggedInProfiles(pmcData, profileData, false);

                            if (matchInfo.timeVariant === "PAST") {
                                realTime = utils.getTime(baseTime, 12);
                            }
                            if (matchInfo.timeVariant === "CURR") {
                                realTime = utils.getTime(baseTime, 0);
                            }
                            RaidInfoTracker.isNight = utils.isNight(realTime, matchInfo.location);

                            if (StaticArrays.cqbMaps.includes(RaidInfoTracker.mapName)) {
                                mapType = MapType.CQB;
                            }
                            if (StaticArrays.outdoorMaps.includes(RaidInfoTracker.mapName)) {
                                mapType = MapType.Outdoor;
                            }
                            if (StaticArrays.urbanMaps.includes(RaidInfoTracker.mapName)) {
                                mapType = MapType.Urban;
                            }
                            RaidInfoTracker.mapType = mapType;

                            if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
                                botLoader.updateBots(pmcData, logger, modConfig, botLoader, utils);
                            }

                            if (!ModTracker.swagPresent && !ModTracker.qtbSpawnsActive) {
                                pmcConf.convertIntoPmcChance.laboratory = {
                                    "assault":
                                    {
                                        "min": 100,
                                        "max": 100
                                    },
                                    "pmcbot":
                                    {
                                        "min": 0,
                                        "max": 0
                                    }

                                };
                            }

                            logger.warning("Avg. Player Level = " + ProfileTracker.averagePlayerLevel);
                            logger.warning("Map Name = " + matchInfo.location);
                            logger.warning("Map Type  = " + mapType);
                            logger.warning("Base Time: " + baseTime + " Real Time: " + realTime);
                            logger.warning("Is Night = " + RaidInfoTracker.isNight);
                        }
                        catch (err) {
                            logger.error("Realism Mod: Failed To Fetch Application Context Data" + err);
                        }
                        return output;
                    }
                }
            ],
            "Realism"
        );

        staticRouterModService.registerStaticRouter(
            "Realism-RunAtRaidEnd",
            [
                {
                    url: "/client/match/local/end",
                    action: async (url, info, sessionID, output) => {
                        const postLoadDBService = container.resolve<DatabaseService>("DatabaseService");
                        const postLoadTables = postLoadDBService.getTables();
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const locationConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<ILocationConfig>(ConfigTypes.LOCATION);
                        // const localisationService = container.resolve<LocalisationService>("LocalisationService");
                        // const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
                        // const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
                        // const itemHelper = container.resolve<ItemHelper>("ItemHelper");
                        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
                        const tieredFlea = new TieredFlea(postLoadTables, aKIFleaConf);
                        const utils = Utils.getInstance();
                        const player = new Player(logger, postLoadTables, modConfig, medItems, utils);
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID)
                        const quests = new Quests(logger, postLoadTables, modConfig);
                        const seeasonalEventConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<ISeasonalEventConfig>(ConfigTypes.SEASONAL_EVENT);
                        const maps = new Spawns(logger, postLoadTables, modConfig, postLoadTables.locations, utils);

                        //had a concern that bot loot cache isn't being reset properly since I've overriden it with my own implementation, so to be safe...
                        // const myGetLootCache = new MyLootCache(logger, jsonUtil, itemHelper, postLoadDBServer, pmcLootGenerator, localisationService, ragfairPriceService);
                        // myGetLootCache.myClearCache();

                        try {
                            RaidInfoTracker.generatedBotsCount = 0;
                            //update global player level
                            ProfileTracker.checkLoggedInProfiles(pmcData, profileData, false);

                            if (modConfig.tiered_flea == true) tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, ProfileTracker.averagePlayerLevel);

                            if (modConfig.enable_hazard_zones) quests.resetRepeatableQuests(profileData);

                            if (modConfig.boss_spawns == true) maps.setBossSpawnChance(ProfileTracker.averagePlayerLevel, databaseService, seeasonalEventConfig);

                            if (modConfig.loot_changes) this.modifyMapLoot(locationConfig, RaidInfoTracker.mapName, info, pmcData, sessionID, utils, logger);

                            this.checkEventQuests(pmcData);
                            player.correctNegativeHP(pmcData);

                            if (modConfig.realistic_player_health == true) player.setNewScavRealisticHealth(scavData);

                            this.tryLockTradersForEvent(pmcData, logger, postLoadTables.globals.config);

                            if (modConfig.logEverything == true) {
                                logger.info("Realism Mod: Updated at Raid End");
                            }
                        }
                        catch (err) {
                            logger.error("Realism Mod: Error Updating At Raid End: " + err);
                        }
                        return output;
                    }
                }
            ],
            "Realism"
        );
    }

    private backupProfile(profileData: ISptProfile, logger: ILogger) {
        const profileFileData = JSON.stringify(profileData, null, 4)
        let index = 0;
        if (index == 0) {
            index = 1;
            let modPath = path.join(__dirname, '..');
            let profileFolderPath = modPath + "/ProfileBackups/";
            let profileFilePath = modPath + "/ProfileBackups/" + profileData.info.id;

            if (fs.existsSync(profileFilePath)) {

                this.profileBackupHelper(profileFileData, profileFilePath, profileData, logger);

            } else {

                fs.mkdir(path.join(profileFolderPath, profileData.info.id), (err) => {
                    if (err) {
                        return logger.error("Realism Mod: Error Backing Up Profile; " + err);
                    }
                    logger.log("Realism Mod: Backup path does not exist, creating folder....", "magenta");

                });

                this.profileBackupHelper(profileFileData, profileFilePath, profileData, logger);
            }
        }
    }


    private profileBackupHelper(profileFileData: string, pathforProfile: string, profileData: ISptProfile, logger: ILogger) {
        let date = new Date();
        let time = date.toLocaleTimeString();
        let edit_time = time.replaceAll(" ", "_");
        let edit_time2 = edit_time.replaceAll(":", "-");
        let day = date.toISOString().slice(0, 10);
        let combinedTime = "_" + day + "_" + edit_time2;

        let backupName = pathforProfile + "/" + profileData.info.id + combinedTime + ".json";
        fs.writeFile(backupName, profileFileData, {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        }, (err) => {
            if (err)
                logger.error("Realism Mod: Error Backing Up Profile; " + err);
            else {
                logger.log(`Realism Mod: Profile backup executed successfully: ${combinedTime}`, "green");
            }
        });
    }

    public postDBLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseService = container.resolve<DatabaseService>("DatabaseService");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const weatherConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
        const locationConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        const seeasonalEventConfig = container.resolve<ConfigServer>("ConfigServer").getConfig<ISeasonalEventConfig>(ConfigTypes.SEASONAL_EVENT);
        const seasonalEventsService = container.resolve<SeasonalEventService>("SeasonalEventService");
        const hashUtil = container.resolve<HashUtil>("HashUtil");
        const tables = databaseService.getTables();
        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const inventoryConf = configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
        const raidConf = configServer.getConfig<IInRaidConfig>(ConfigTypes.IN_RAID);
        const itemConf = configServer.getConfig<IItemConfig>(ConfigTypes.ITEM);
        const traderConf = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const insConf = configServer.getConfig<IInsuranceConfig>(ConfigTypes.INSURANCE);
        const arrays = new BotArrays(tables);
        const utils = Utils.getInstance(tables);
        const ammo = new Ammo(logger, tables, modConfig);
        const armor = new Armor(logger, tables, modConfig);
        const attachBase = new AttachmentBase(logger, tables, modConfig, utils);
        const botLoader = BotLoader.getInstance(logger, tables, configServer, modConfig, arrays, utils);
        const itemsClass = new ItemsClass(logger, tables, modConfig, inventoryConf, raidConf, aKIFleaConf, itemConf);
        const consumables = new Consumables(logger, tables, modConfig, medItems, foodItems, medBuffs, foodBuffs, stimBuffs);
        const player = new Player(logger, tables, modConfig, medItems, utils);
        const weaponsGlobals = new WeaponsGlobals(logger, tables, modConfig);
        const fleaChangesPostDB = new FleaChangesPostDBLoad(logger, tables, modConfig, aKIFleaConf);
        const jsonGen = new JsonGen(logger, tables, modConfig, utils);
        const fleaChangesPreDB = new FleaChangesPreDBLoad(logger, aKIFleaConf, modConfig);
        const quests = new Quests(logger, tables, modConfig);
        const traders = new Traders(logger, tables, modConfig, traderConf, utils);
        const maps = new Spawns(logger, tables, modConfig, tables.locations, utils);
        const gear = new Gear(tables, logger, modConfig);
        const itemCloning = new ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const statHandler = ItemStatHandler.getInstance(tables, logger, hashUtil);
        const descGen = new DescriptionGen(tables, modConfig, logger, statHandler);

        //Remember to back up json data before using this, and make sure it isn't overriding existing json objects
        // jsonGen.attTemplatesCodeGen();
        // jsonGen.weapTemplatesCodeGen();
        // jsonGen.gearTemplatesCodeGen();
        // jsonGen.ammoTemplatesCodeGen();
        // jsonGen.genArmorMods();

        this.checkForSeasonalEvents(logger, seasonalEventsService, seeasonalEventConfig, weatherConfig, true);

        if (modConfig.enable_hazard_zones) {
            quests.loadHazardQuests();
        }

        if (modConfig.enable_hazard_zones) {
            gear.loadSpecialSlotChanges();
            gear.addResourceToGasMaskFilters();
            itemCloning.createCustomHazardItems();
        }

        if (modConfig.recoil_attachment_overhaul == true) {
            itemCloning.createCustomWeapons();
            itemCloning.createCustomAttachments();
            attachBase.loadAttCompat();
            attachBase.loadCaliberConversions();
        }

        itemsClass.addCustomItems();

        if (modConfig.realistic_ballistics) {
            itemCloning.createCustomPlates();
            botLoader.setBotHealth();
        }

        if (modConfig.open_zones_fix == true && !ModTracker.swagPresent) {
            maps.openZonesFix();
        }

        maps.loadSpawnChanges(locationConfig);

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            botLoader.loadBots();
        }

        //spt bug: items can have zero uses
        // if(modConfig.bot_loot_changes){
        //     bots.loadBotLootChanges();
        // }

        if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == true && modConfig.all_scavs == true && modConfig.bot_test_tier == 4) {
            logger.warning("Realism Mod: testing enabled, bots will be limited to a cap of 1");
            botLoader.testBotCap();
        }
        else if (modConfig.increased_bot_cap == true && !ModTracker.swagPresent && !ModTracker.qtbPresent) {
            botLoader.increaseBotCap();
        }
        else if (modConfig.spawn_waves == true && !ModTracker.swagPresent && !ModTracker.qtbPresent) {
            botLoader.increasePerformance();
        }

        if (modConfig.bot_names == true) {
            botLoader.botNames();
        }

        if (modConfig.guarantee_boss_spawn == true) {
            maps.forceBossSpawns();
        }

        //need to add diffuclity values to experience obj or abandon
        // if (modConfig.boss_difficulty == true) {
        //     bots.bossDifficulty();
        // }

        if (modConfig.med_changes == true) {
            itemCloning.createCustomMedItems();
            // bots.botMeds();
            consumables.loadMeds();
        }

        if (modConfig.food_changes == true) {
            consumables.loadFood();
        }

        if (modConfig.stim_changes == true) {
            consumables.loadStims();
        }

        botLoader.botHpMulti();

        fleaChangesPostDB.loadFleaGlobal(); //has to run post db load, otherwise item templates are undefined 
        fleaChangesPreDB.loadFleaConfig(); //probably redundant, but just in case

        // if (modConfig.headset_changes) {
        //     gear.loadHeadsetTweaks();
        // }

        if (modConfig.remove_quest_fir_req == true) {
            quests.removeFIRQuestRequire();
        }

        //traders
        traders.modifyInsurance(insConf);
        traders.loadTraderTweaks();
        traders.setBaseOfferValues();
        if (modConfig.add_cust_trader_items == true) {
            traders.addItemsToAssorts();
        }

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            attachBase.loadAttRequirements();
        }

        if (modConfig.trader_refresh_time > 0) {
            traders.setTraderRefreshTimes();
        }

        itemsClass.loadItemBlacklists();
        itemsClass.loadItemsRestrictions();
        player.loadPlayerStats();
        player.playerProfiles(jsonUtil);
        weaponsGlobals.loadGlobalWeps();


        traders.loadTraderRepairs();
        if (modConfig.realistic_ballistics) traders.adjustArmorHandbookPrices();

        //have to run this async to ensure correct load order
        (async () => {

            if (modConfig.realistic_ballistics == true) {
                ammo.loadAmmoStats();
                armor.loadArmorStats();
                ammo.grenadeTweaks();
            }

            if (modConfig.recoil_attachment_overhaul) {
                statHandler.pushModsToServer();
                statHandler.pushWeaponsToServer();
            }
            statHandler.pushGearToServer();

            await statHandler.processTemplateJson(false);
            descGen.descriptionGen();

            if (modConfig.malf_changes == true) {
                weaponsGlobals.loadGlobalMalfChanges();
            }

            if (modConfig.recoil_attachment_overhaul) {
                ammo.loadAmmoFirerateChanges();
                quests.fixMechancicQuests();
            }

            gear.loadGearConflicts();
            statHandler.modifiedItems = {}; //empty temp template object
        })();
    }

    public postSptLoad(container: DependencyContainer) {
        this.modLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
    }

    private setModInfo(logger: ILogger) {
        realismInfo.IsNightTime = RaidInfoTracker.isNight;
        realismInfo.IsHalloween = EventTracker.isHalloween;
        realismInfo.isChristmas = EventTracker.isChristmas;
        realismInfo.DoGasEvent = EventTracker.doGasEvent;
        realismInfo.HasExploded = EventTracker.isHalloween && !EventTracker.endExplosionEvent && EventTracker.hasExploded;
        realismInfo.IsPreExplosion = EventTracker.isHalloween && !EventTracker.endExplosionEvent && EventTracker.isPreExplosion;
        realismInfo.DoExtraRaiders = EventTracker.isHalloween && EventTracker.doExtraRaiderSpawns;
        realismInfo.DoExtraCultists = EventTracker.isHalloween && EventTracker.doExtraCultistSpawns;

        if (modConfig.logEverything) {
            logger.warning("realismInfo.DoExtraRaiders " + realismInfo.DoExtraRaiders);
            logger.warning("realismInfo.DoExtraCultists " + realismInfo.DoExtraCultists);
            logger.warning("realismInfo.IsPreExplosion " + realismInfo.IsPreExplosion);
            logger.warning("realismInfo.HasExploded " + realismInfo.HasExploded);
            logger.warning("realismInfo.DoGasEvent " + realismInfo.DoGasEvent);
            logger.warning("realismInfo.IsHalloween " + realismInfo.IsHalloween);
            logger.warning("realismInfo.IsNightTime " + realismInfo.IsNightTime);
        }
    }

    private revertMeds(profileData: IPmcData, utils: Utils) {
        utils.revertMedItems(profileData);
    }

    private revertHydroEnergy(profileData: IPmcData, tables: IDatabaseTables) {
        const healthTemplate = tables.templates.profiles.Standard.bear.character.Health;
        const defaultHydration = healthTemplate.Hydration.Maximum;
        const defaultEnergy = healthTemplate.Energy.Maximum;
        profileData.Health.Hydration.Maximum = defaultHydration
        profileData.Health.Energy.Maximum = defaultEnergy;

        if (profileData.Health.Energy.Current > profileData.Health.Energy.Maximum) {
            profileData.Health.Hydration.Current = defaultHydration
            profileData.Health.Energy.Current = defaultEnergy;
        }
    }

    private loadMapLoot(locationConfig: ILocationConfig, profileId: string, logger: ILogger) {
        if (!playerMapLoot[profileId]) {
            playerMapLoot[profileId] =
            {
                looseLootMultiplier: { ...baseMapLoot.looseLootMultiplier },
                staticLootMultiplier: { ...baseMapLoot.staticLootMultiplier }
            }
        }

        locationConfig.looseLootMultiplier = playerMapLoot[profileId].looseLootMultiplier;
        locationConfig.staticLootMultiplier = playerMapLoot[profileId].staticLootMultiplier;
    }

    private modifyMapLoot(locationConfig: ILocationConfig, map: string, raidData: IEndLocalRaidRequestData, pmcData: IPmcData, profileId: string, utils: Utils, logger: ILogger) {
        const exitStatus = raidData.results.result;
        let lootXp = 0;
        if (exitStatus !== ExitStatus.KILLED && exitStatus !== ExitStatus.MISSINGINACTION) {
            const counters = pmcData.Stats.Eft.OverallCounters.Items;
            for (const counter of counters) {
                if (counter.Key.includes("ExpLooting")) {
                    lootXp = Math.min(lootXp + counter.Value, 1000);
                }
            }
        }

        const looseModifier = utils.clampNumber(lootXp * 0.000035, 0, 0.04);
        const staticModifier = utils.clampNumber(lootXp * 0.00002, 0, 0.03);
        const looseLootRegenRate = 0.04;
        const staticLootRegenRate = 0.03;
        const baseLooseLoot: ILootMultiplier = baseMapLoot.looseLootMultiplier;
        const baseStaticLoot: ILootMultiplier = baseMapLoot.staticLootMultiplier;
        const originalLooseMapModi = baseLooseLoot[map];
        const originalStaticMapModi = baseStaticLoot[map];
        const minLooseLoot = originalLooseMapModi * 0.75;
        const minstaticLoot = originalLooseMapModi * 0.4;
        const mapAliases: { [key: string]: string[] } = {
            "factory4_day": ["factory4_day", "factory4_night"],
            "factory4_night": ["factory4_day", "factory4_night"]
        };
        const mapsToUpdate: string[] = mapAliases[map] || [map]; //if mapAliases has a key, use the corresponding array, otherwise make an array of our singular map
        // logger.warning("==============" + map + "==============");
        // logger.warning("==loose loot modi: " + looseModifier);
        // logger.warning("==static loot modi: " + staticModifier);
        if (!playerMapLoot[profileId]) {
            //logger.warning("no profile found, creating new entry");
            playerMapLoot[profileId] =
            {
                looseLootMultiplier: { ...baseLooseLoot },
                staticLootMultiplier: { ...baseStaticLoot }
            }
        }

        //logger.warning("Found profile entry ");
        let looseLootModis = playerMapLoot[profileId].looseLootMultiplier;
        let staticLootModis = playerMapLoot[profileId].staticLootMultiplier;
        mapsToUpdate.forEach((currentMap) => {
            // logger.warning("current loose loot modi: " + looseLootModis[currentMap]);
            // logger.warning("current static loot modi: " + staticLootModis[currentMap]);
            looseLootModis[map] = utils.clampNumber(looseLootModis[currentMap] - looseModifier, minLooseLoot, originalLooseMapModi);
            staticLootModis[map] = utils.clampNumber(staticLootModis[currentMap] - staticModifier, minstaticLoot, originalStaticMapModi);
            // logger.warning("modified loose loot modi: " + looseLootModis[currentMap]);
            // logger.warning("modified static loot modi: " + staticLootModis[currentMap]);
        });

        //logger.warning("==Regenerating other map loot");
        if (exitStatus !== ExitStatus.RUNNER) {
            for (const i in playerMapLoot[profileId].staticLootMultiplier) {
                //logger.warning("==");
                //logger.warning("map " + i);
                if (!mapsToUpdate.includes(i)) {
                    let looseMapLootModi = playerMapLoot[profileId].looseLootMultiplier;
                    let staticMapLootModi = playerMapLoot[profileId].staticLootMultiplier;
                    // logger.warning("current loose loot modi: " + looseMapLootModis[i]);
                    // logger.warning("current static loot modi: " + staticMapLootModis[i]);
                    looseMapLootModi[i] = utils.clampNumber(looseMapLootModi[i] + looseLootRegenRate, minLooseLoot, baseLooseLoot[i]);
                    staticMapLootModi[i] = utils.clampNumber(staticMapLootModi[i] + staticLootRegenRate, minstaticLoot, baseStaticLoot[i]);
                    // logger.warning("modified loose loot modi: " + looseMapLootModis[i]);
                    // logger.warning("modified static loot modi: " + staticMapLootModis[i]);
                }
            }
        }

        utils.writeConfigJSON(playerMapLoot, 'data/player_lootModifiers.json');
        //logger.warning("==Saved to file");
        locationConfig.looseLootMultiplier = playerMapLoot[profileId].looseLootMultiplier;
        locationConfig.staticLootMultiplier = playerMapLoot[profileId].staticLootMultiplier;
        //logger.warning("==Updated SPT configs");
    }

    private checkForSeasonalEvents(logger: ILogger, seasonalEventsService: SeasonalEventService, seasonalConfig: ISeasonalEventConfig, weatherConfig: IWeatherConfig, logGreetings: boolean = false) {
        if (modConfig.enable_hazard_zones) {

            const currentDate = new Date();
            const halloweenStart = new Date(currentDate.getFullYear(), 9, 20);
            const halloweenEnd = new Date(currentDate.getFullYear(), 10, 5);

            if (currentDate >= halloweenStart && currentDate <= halloweenEnd) {
                seasonalConfig.enableSeasonalEventDetection = false; //otherwise it enables BSG's summoning event which interferes with my events
                EventTracker.isHalloween = true;
            }
        }

        EventTracker.isChristmas = seasonalEventsService.christmasEventEnabled() && seasonalEventsService.isAutomaticEventDetectionEnabled() ? true : false;

        if (EventTracker.isChristmas == true && logGreetings) {
            logger.warning("Merry Christmas!");
        }
        if (EventTracker.isHalloween == true && logGreetings) {
            weatherConfig.overrideSeason = 1;
            const skull = `
   _______     
  /       \\   
 /  O   O  \\  
 |    ^    | 
 |   ---   | 
  \\___ ___/  
   |     |    
   |__ __|    
  /       \\   
 /_/|   |\\_\\`;

            logger.logWithColor(skull, LogTextColor.MAGENTA);
        }
    }

    public tryLockTradersForEvent(pmcData: IPmcData, logger: ILogger, globalConfig: IConfig) {
        let completedQuest;
        let didExplosion;
        let shouldDisableTraders = false;

        if (pmcData?.Quests == null) return;

        pmcData.Quests.forEach(q => {
            //blue flame part 2
            if (q.qid === "6702b4a27d4a4a89fce96fbc") {
                completedQuest = q.status === 4;
                didExplosion = q.completedConditions.includes("6702b4c1fda5e39ba46ccf35");
            }
        });

        if (EventTracker.isHalloween && didExplosion && !completedQuest) {
            shouldDisableTraders = true;
        }

        for (const traderId in pmcData.TradersInfo) {
            const trader = pmcData.TradersInfo[traderId];
            if (traderId === "579dc571d53a0658a154fbec") continue;
            trader.disabled = shouldDisableTraders;
        }

        if (shouldDisableTraders) {
            globalConfig.RagFair.minUserLevel = 99;
        }
    }

    public checkEventQuests(pmcData: IPmcData): number {
        EventTracker.doGasEvent = false;
        EventTracker.doExtraCultistSpawns = false;
        EventTracker.hasExploded = false;
        EventTracker.doExtraRaiderSpawns = false;
        EventTracker.isPreExplosion = false;
        EventTracker.endExplosionEvent = false;

        let baseGasChance = EventTracker.isHalloween ? 20 : 0;
        if (pmcData?.Quests != null) {
            pmcData.Quests.forEach(q => {
                const isStarted = q.status === 2 || q.status === 3;
                const isCompleted = q.status === 4;
                //bad omens part 1
                if (q.qid === "6702afe9504c9aca4ed75d9a") {
                    if (isStarted || isCompleted) {
                        baseGasChance += 50;
                    }
                }
                //bad omens part 2
                if (q.qid === "6702b0a1b9fb4619debd0697") {
                    if (isStarted || isCompleted) {
                        baseGasChance += 50;
                    }
                }
                //bad omens part 3
                if (q.qid === "6702b0e9601acf629d212eeb") {
                    if (isStarted || isCompleted) {
                        baseGasChance += 100;
                    }
                }
                //former patients
                if (q.qid === "6702b8b3c0f2f525d988e428") {
                    if (isStarted || isCompleted) {
                        baseGasChance += 250;
                    }
                }
                //critical mass
                if (q.qid === "670ae811bd43cbf026768126") {
                    if (isStarted || isCompleted) {
                        baseGasChance += 150;
                    }
                }
                //do no harm
                if (q.qid === "6702b3b624c7ac4e2d3e9c37") {
                    if (isStarted) {
                        baseGasChance = 1000;
                        EventTracker.doExtraCultistSpawns = true;
                    }
                    else if (isCompleted) {
                        baseGasChance = EventTracker.isHalloween ? 100 : 10;
                    }
                }
                //blue flame part 1
                if (q.qid === "6702b3e4aff397fa3e666fa5") {
                }

                //blue flame part 2
                if (q.qid === "6702b4a27d4a4a89fce96fbc") {
                    const didExplosion = q.completedConditions.includes("6702b4c1fda5e39ba46ccf35");
                    EventTracker.isPreExplosion = isStarted;

                    if (isStarted) {
                        EventTracker.doExtraRaiderSpawns = EventTracker.isHalloween;
                    }

                    if (didExplosion || isCompleted) {
                        EventTracker.doExtraRaiderSpawns = false;
                        EventTracker.hasExploded = true;
                    }
                    if (didExplosion && !isCompleted) {
                        baseGasChance = 0;
                    }
                    if (isCompleted) {
                        EventTracker.endExplosionEvent = true;
                    }
                }
            });
        }

        return baseGasChance;
    }

    public getEventData(pmcData: IPmcData, logger: ILogger, utils: Utils) {
        const gasChance = this.checkEventQuests(pmcData);
        EventTracker.doGasEvent = gasChance > utils.pickRandNumInRange(0, 1000);
        if (modConfig.logEverything) logger.warning("gas chance " + gasChance);
    }

    private checkProfile(pmcData: IPmcData, pmcEXP: number, utils: Utils, player: Player, logger: ILogger) {
        utils.correctItemResources(pmcData, pmcEXP, logger);
        if (modConfig.med_changes == true) {
            pmcData.Health.Hydration.Maximum = player.realisticHydration;
            pmcData.Health.Energy.Maximum = player.realisticEnergy;
            if (pmcData.Info.Experience == 0) {
                pmcData.Health.Hydration.Current = player.realisticHydration;
                pmcData.Health.Energy.Current = player.realisticEnergy
                logger.info("Realism Mod: New Profile Meds And Hydration/Energy Adjusted");
            }
        }
        if (modConfig.logEverything == true) {
            logger.info("Realism Mod: Profile Checked");
        }
    }

    private checkForMods(preSptModLoader: PreSptModLoader, logger: ILogger, modConf: any) {
        const activeMods = preSptModLoader.getImportedModDetails();
        for (const modname in activeMods) {
            // if (modname.includes("Jiro-BatterySystem")) {
            //     ModTracker.batteryModPresent = true;
            //     logger.logWithColor("Realism: Jiro Battery Mod Detected, Making Adjustments", LogTextColor.GREEN);
            // }
            if (modname.includes("Solarint-SAIN-ServerMod")) {
                ModTracker.sainPresent = true;
                logger.logWithColor("Realism: SAIN Detected, Making Adjustments", LogTextColor.GREEN);
            }
            if (modname.includes("QuestingBots")) {
                ModTracker.qtbPresent = true;
                logger.logWithColor("Realism: Questing Bots Detected, Making Adjustments", LogTextColor.GREEN);
            }
            if (modname.includes("SWAG")) {
                ModTracker.swagPresent = true;
                logger.logWithColor("Realism: SWAG Detected, Making Adjustments", LogTextColor.GREEN);
            }
            if (modname.includes("TacticalGearComponent")) {
                ModTracker.tgcPresent = true;
                logger.logWithColor("Realism: TGC Detected, Making Adjustments", LogTextColor.GREEN);
            }
            if (modname.includes("AlgorithmicLevelProgression")) {
                ModTracker.alpPresent = true;
                if (modConf.bot_changes == true) {
                    logger.logWithColor("===========================!============================", LogTextColor.WHITE, LogBackgroundColor.RED);
                    logger.logWithColor("Realism: WARNING, ALP DETECTED! You have Realism's bot progression enabled already. Either uninstall ALP or disable Realism's bot changes!", LogTextColor.WHITE, LogBackgroundColor.RED);
                    logger.logWithColor("===========================!============================", LogTextColor.WHITE, LogBackgroundColor.RED);
                }
                else {
                    logger.logWithColor("Realism: ALP Detected, Making Adjustments", LogTextColor.GREEN);
                }
            }
        }
    }
}

module.exports = { mod: new Main() }


