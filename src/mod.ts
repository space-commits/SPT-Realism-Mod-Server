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
import { IAirdropConfig } from "@spt/models/spt/config/IAirdropConfig";
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
import { BotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
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

import * as path from 'path';
import * as fs from 'fs';

import { AttachmentBase } from "./weapons/attatchment_base";
import { FleaChangesPreDBLoad, TieredFlea, FleaChangesPostDBLoad } from "./traders/fleamarket";
import { ConfigChecker, Utils, ProfileTracker, RaidInfoTracker, ModTracker } from "./utils/utils"
import { Arrays } from "./utils/arrays"
import { Consumables } from "./items/meds";
import { Player } from "./player/player"
import { WeaponsGlobals } from "./weapons/weapons_globals"
import { BotLoader } from "./bots/bots";
import { BotGen } from "./bots/bot_gen";
import { ItemsClass } from "./items/items";
import { JsonGen } from "./json/json_gen";
import { Quests } from "./traders/quests";
import { RagCallback, RandomizeTraderAssort, TraderRefresh, Traders } from "./traders/traders";
import { Airdrops } from "./misc/airdrops";
import { Spawns } from "./bots/maps";
import { Gear } from "./items/gear";
import { EventTracker } from "./misc/seasonalevents";
import { ItemCloning } from "./items/item_cloning";
import { DescriptionGen } from "./json/description_gen";
import { ItemStatHandler } from "./json/json-handler";
import { Ammo } from "./ballistics/ammo";
import { Armor } from "./ballistics/armor";
import { MyLootCacheService } from "./bots/bot_loot_serv";
import { PMCLootGenerator } from "@spt/generators/PMCLootGenerator";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { ItemFilterService } from "@spt/services/ItemFilterService";

const crafts = require("../db/items/hideout_crafts.json");
const medItems = require("../db/items/med_items.json");
const medBuffs = require("../db/items/buffs.json");
const foodItems = require("../db/items/food_items.json");
const foodBuffs = require("../db/items/buffs_food.json");
const stimBuffs = require("../db/items/buffs_stims.json");
const modConfig = require("../config/config.json");

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

        this.checkForMods(preSptModLoader, logger, modConfig);
        flea.loadFleaConfig();

        dynamicRouter.registerDynamicRouter(
            "loadResources",
            [
                {
                    url: "/RealismMod/GetInfo",
                    action: async (url, info, sessionID, output) => {

                        try {
                            return jsonUtil.serialize(modConfig);
                        } catch (err) {
                            console.error("Failed to read config file", err);
                        }
                    }
                }
            ],
            "RealismMod"
        )

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            const botLevelGenerator = container.resolve<BotLevelGenerator>("BotLevelGenerator");
            const botDifficultyHelper = container.resolve<BotDifficultyHelper>("BotDifficultyHelper");
            const botInventoryGenerator = container.resolve<BotInventoryGenerator>("BotInventoryGenerator");
            const botHelper = container.resolve<BotHelper>("BotHelper");
            const botEquipmentFilterService = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
            const seasonalEventService = container.resolve<SeasonalEventService>("SeasonalEventService");
            const itemFilterService = container.resolve<ItemFilterService>("ItemFilterService");            const botGen = new BotGen(
                logger, hashUtil, randomUtil, timeUtil, 
                profileHelper, databaseService, botInventoryGenerator, 
                botLevelGenerator, botEquipmentFilterService, weightedRandomHelper, 
                botHelper, botDifficultyHelper, seasonalEventService,
                localisationService, itemFilterService, configServer, cloner);

            container.afterResolution("BotGenerator", (_t, result: BotGenerator) => {
                result.prepareAndGenerateBot = (sessionId: string, botGenerationDetails: BotGenerationDetails): IBotBase => {
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

        // if (modConfig.airdrop_changes == true) {
        //     const locationGenerator = container.resolve<LocationGenerator>("LocationGenerator");
        //     const lootGenerator = container.resolve<LootGenerator>("LootGenerator");
        //     const raidTimeAdjustmentService = container.resolve<RaidTimeAdjustmentService>("RaidTimeAdjustmentService");
        //     const appContext = container.resolve<ApplicationContext>("ApplicationContext");
        //     const itemFilterService = container.resolve<ItemFilterService>("ItemFilterService");
        //     const airdropController = new AirdropLootgen(jsonUtil, hashUtil, randomUtil, weightedRandomHelper, logger, locationGenerator, localisationService, raidTimeAdjustmentService, itemFilterService, lootGenerator, databaseServer, timeUtil, configServer, appContext)

        //     container.afterResolution("LocationController", (_t, result: LocationController) => {
        //         result.getAirdropLoot = (): IAirdropLootResult => {
        //             return airdropController.myGetAirdropLoot();
        //         }
        //     }, { frequency: "Always" });
        // }

        staticRouterModService.registerStaticRouter(
            "CheckProfile",
            [
                {
                    url: "/client/game/version/validate",
                    action: async (url, info, sessionID, output) => {

                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const seasonalEventsService = container.resolve<SeasonalEventService>("SeasonalEventService");
                        const postLoadDBServer = container.resolve<DatabaseService>("DatabaseService");
                        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
                        const ragfairServer = container.resolve<RagfairServer>("RagfairServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const arrays = new Arrays(postLoadTables);
                        const utils = new Utils(postLoadTables, arrays);
                        const tieredFlea = new TieredFlea(postLoadTables, aKIFleaConf);
                        const player = new Player(logger, postLoadTables, modConfig, medItems, utils);
                        const maps = new Spawns(logger, postLoadTables, modConfig, postLoadTables.locations);
                        const quests = new Quests(logger, postLoadTables, modConfig);
                        const randomizeTraderAssort = new RandomizeTraderAssort();
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID);

                        if(modConfig.enable_hazard_zones){
                            quests.resetHazardQuests(profileData);
                        }
         
                        this.checkPlayerLevel(sessionID, profileData, pmcData, logger, true);

                        try {

                            if (modConfig.backup_profiles == true) {
                                this.backupProfile(profileData, logger);
                            }

                            const healthProp = pmcData?.Health;
                            const hydroProp = pmcData?.Health?.Hydration;

                            if (healthProp !== undefined) {

                                player.correctNegativeHP(pmcData);

                                player.setPlayerHealth(pmcData, scavData);

                                if (hydroProp !== undefined) {
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
                            this.checkForEvents(logger, seasonalEventsService);

                            if (adjustedTradersOnStart == false) {
                                let pmcData: IPmcData[] = [];
                                ProfileTracker.profileIds.forEach(element => {
                                    pmcData.push(profileHelper.getPmcProfile(element));
                                });
                                randomizeTraderAssort.adjustTraderStockAtServerStart(pmcData);
                            }
                            adjustedTradersOnStart = true;

                            const traders: string[] = (ragfairServer as any).getUpdateableTraders();
                            for (let traderID in traders) {
                                ragfairOfferGenerator.generateFleaOffersForTrader(traders[traderID]);
                            }

                            if (modConfig.tiered_flea == true) {
                                tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, arrays, ProfileTracker.averagePlayerLevel);
                            }
                            if (modConfig.boss_spawns == true) {
                                maps.setBossSpawnChance(ProfileTracker.averagePlayerLevel);
                            }

                            if (modConfig.logEverything == true) {
                                logger.info("Realism Mod: Profile Checked");
                            }
                            return HttpResponse.nullResponse();
                        }
                        catch (e) {
                            logger.error("Realism Mod: Error Checking Player Profile: " + e);
                            return HttpResponse.nullResponse();
                        }
                    }
                }
            ],
            "aki"
        );

        staticRouterModService.registerStaticRouter(
            "runOnGameLogout",
            [
                {
                    url: "/client/game/logout",
                    action: async (url, info, sessionID, output) => {
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const profileData = profileHelper.getFullProfile(sessionID)

                        let playerCount = 0;
                        let cumulativePlayerLevel = 0;
                        delete ProfileTracker.playerRecord[profileData.info.id];
                        Object.values(ProfileTracker.playerRecord).forEach(value => {
                            cumulativePlayerLevel += value;
                            playerCount += 1;
                        });

                        ProfileTracker.averagePlayerLevel = cumulativePlayerLevel / playerCount;
                        logger.logWithColor(`Realism Mod: Players in server ${playerCount}, average level: ${ProfileTracker.averagePlayerLevel}`, LogTextColor.GREEN);
                        return output;
                    }
                }
            ],
            "aki"
        );

        staticRouterModService.registerStaticRouter(
            "runAtProfileCreation",
            [
                {
                    url: "/client/game/profile/create",
                    action: async (url, info, sessionID, output) => {

                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const postLoadDBService = container.resolve<DatabaseService>("DatabaseService");
                        const postLoadtables = postLoadDBService.getTables();
                        const arrays = new Arrays(postLoadtables);
                        const utils = new Utils(postLoadtables, arrays);
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
                            return HttpResponse.nullResponse();
                        }
                        catch (e) {
                            logger.error("Realism Mod: Error Editing New Profile: " + e);
                            return HttpResponse.nullResponse();
                        }
                    }
                }
            ],
            "aki"
        );

        staticRouterModService.registerStaticRouter(
            "runAtRaidStart",
            [
                {
                    url: "/client/raid/configuration",
                    action: async (url, info, sessionID, output) => {

                        try {
                            const postLoadDBService = container.resolve<DatabaseService>("DatabaseService");
                            const postLoadTables = postLoadDBService.getTables();
                            const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                            const appContext = container.resolve<ApplicationContext>("ApplicationContext");
                            const weatherController = container.resolve<WeatherController>("WeatherController");
                            const localisationService = container.resolve<LocalisationService>("LocalisationService");
                            const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
                            const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
                            const itemHelper = container.resolve<ItemHelper>("ItemHelper");
                            const matchInfo = appContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
                            const pmcConf = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
                            const arrays = new Arrays(postLoadTables);
                            const utils = new Utils(postLoadTables, arrays);
                            const bots = new BotLoader(logger, postLoadTables, configServer, modConfig, arrays, utils);
                            const pmcData = profileHelper.getPmcProfile(sessionID);
                            const profileData = profileHelper.getFullProfile(sessionID);

                            //had a concern that bot loot cache isn't being reset properly since I've overriden it with my own implementation, so to be safe...
                            // const myGetLootCache = new MyLootCache(logger, jsonUtil, itemHelper, postLoadDBServer, pmcLootGenerator, localisationService, ragfairPriceService);
                            // myGetLootCache.myClearCache();

                            const time = weatherController.generate().time; //apparently regenerates weather?
                            // const time = weatherController.getCurrentInRaidTime; //better way?
                            // const time = weatherGenerator.calculateGameTime({ acceleration: 0, time: "", date: "" }).time // better way?
                            RaidInfoTracker.mapName = matchInfo.location.toLowerCase();
                            let realTime = "";
                            let mapType = "";

                            //update global player level
                            this.checkPlayerLevel(sessionID, profileData, pmcData, logger);

                            if (matchInfo.timeVariant === "PAST") {
                                realTime = getTime(time, 12);
                            }
                            if (matchInfo.timeVariant === "CURR") {
                                realTime = time;
                            }

                            function getTime(time, hourDiff) {
                                let [h, m] = time.split(':');
                                if (parseInt(h) == 0) {
                                    return `${h}:${m}`
                                }
                                h = Math.abs(parseInt(h) - hourDiff);
                                return `${h}:${m}`
                            }

                            function getTOD(time) {
                                let TOD = "";
                                let [h, m] = time.split(':');
                                if ((matchInfo.location != "factory4_night" && parseInt(h) >= 5 && parseInt(h) < 22) || (RaidInfoTracker.mapName === "factory4_day" || RaidInfoTracker.mapName === "laboratory")) {
                                    TOD = "day";
                                }
                                else {
                                    TOD = "night";
                                }
                                return TOD;
                            }

                            if (arrays.cqbMaps.includes(RaidInfoTracker.mapName)) {
                                mapType = "cqb";
                            }
                            if (arrays.outdoorMaps.includes(RaidInfoTracker.mapName)) {
                                mapType = "outdoor";
                            }
                            if (arrays.urbanMaps.includes(RaidInfoTracker.mapName)) {
                                mapType = "urban";
                            }

                            RaidInfoTracker.TOD = getTOD(realTime);
                            RaidInfoTracker.mapType = mapType;

                            if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
                                bots.updateBots(pmcData, logger, modConfig, bots, utils);
                            }

                            if (!ModTracker.qtbPresent && !ModTracker.swagPresent && RaidInfoTracker.mapName === "laboratory") {
                                pmcConf.convertIntoPmcChance["pmcbot"].min = 0;
                                pmcConf.convertIntoPmcChance["pmcbot"].max = 0;
                                pmcConf.convertIntoPmcChance["assault"].min = 100;
                                pmcConf.convertIntoPmcChance["assault"].max = 100;
                            }

                            logger.warning("Avg. Player Level = " + ProfileTracker.averagePlayerLevel);
                            logger.warning("Map Name = " + matchInfo.location);
                            logger.warning("Map Type  = " + mapType);
                            logger.warning("Time " + time);
                            logger.warning("Time of Day = " + getTOD(realTime));

                            return HttpResponse.nullResponse();
                        }
                        catch (e) {
                            logger.error("Realism Mod: Failed To Fetch Application Context Data" + e);
                            return HttpResponse.nullResponse();
                        }
                    }
                }
            ],
            "aki"
        );

        staticRouterModService.registerStaticRouter(
            "runAtRaidEnd",
            [
                {
                    url: "/raid/profile/save",
                    action: async (url, info, sessionID, output) => {
                        const postLoadDBService = container.resolve<DatabaseService>("DatabaseService");
                        const postLoadTables = postLoadDBService.getTables();
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const localisationService = container.resolve<LocalisationService>("LocalisationService");
                        const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
                        const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
                        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
                        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
                        const arrays = new Arrays(postLoadTables);
                        const tieredFlea = new TieredFlea(postLoadTables, aKIFleaConf);
                        const utils = new Utils(postLoadTables, arrays);
                        const player = new Player(logger, postLoadTables, modConfig, medItems, utils);
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID)

                        //had a concern that bot loot cache isn't being reset properly since I've overriden it with my own implementation, so to be safe...
                        // const myGetLootCache = new MyLootCache(logger, jsonUtil, itemHelper, postLoadDBServer, pmcLootGenerator, localisationService, ragfairPriceService);
                        // myGetLootCache.myClearCache();

                        //update global player level
                        this.checkPlayerLevel(sessionID, profileData, pmcData, logger);
                        try {

                            if (modConfig.tiered_flea == true) {
                                tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, arrays, ProfileTracker.averagePlayerLevel);
                            }

                            player.correctNegativeHP(pmcData);

                            if (modConfig.realistic_player_health == true) {
                                player.setNewScavHealth(scavData);
                            }


                            if (modConfig.logEverything == true) {
                                logger.info("Realism Mod: Updated at Raid End");
                            }
                            return HttpResponse.nullResponse();
                        }
                        catch (e) {
                            logger.error("Realism Mod: Error Updating At Raid End: " + e);
                            return HttpResponse.nullResponse();
                        }
                    }
                }
            ],
            "aki"
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
                        return console.error("Realism Mod: Error Backing Up Profile; " + err);
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
                console.log("Realism Mod: Error Backing Up Profile; " + err);
            else {
                logger.log(`Realism Mod: Profile backup executed successfully: ${combinedTime}`, "green");
            }
        });
    }



    // public async postSptLoadAsync(container: DependencyContainer): Promise<void> {
    //     const logger = container.resolve<ILogger>("WinstonLogger");

    //     const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
    //     const tables = databaseServer.getTables();
    //     const jsonHand = new JsonHandler(tables, logger);
    //     jsonHand.pushWeaponsToServer();
    //     jsonHand.pushModsToServer();
    // }

    public postDBLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseService = container.resolve<DatabaseService>("DatabaseService");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const tables = databaseService.getTables();
        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const inventoryConf = configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
        const raidConf = configServer.getConfig<IInRaidConfig>(ConfigTypes.IN_RAID);
        const itemConf = configServer.getConfig<IItemConfig>(ConfigTypes.ITEM);
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const airConf = configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);
        const traderConf = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const arrays = new Arrays(tables);
        const utils = new Utils(tables, arrays);
        const ammo = new Ammo(logger, tables, modConfig);
        const armor = new Armor(logger, tables, modConfig);
        const attachBase = new AttachmentBase(logger, tables, arrays, modConfig, utils);
        const bots = new BotLoader(logger, tables, configServer, modConfig, arrays, utils);
        const itemsClass = new ItemsClass(logger, tables, modConfig, inventoryConf, raidConf, aKIFleaConf, itemConf, arrays);
        const consumables = new Consumables(logger, tables, modConfig, medItems, foodItems, medBuffs, foodBuffs, stimBuffs);
        const player = new Player(logger, tables, modConfig, medItems, utils);
        const weaponsGlobals = new WeaponsGlobals(logger, tables, modConfig);
        const fleaChangesPostDB = new FleaChangesPostDBLoad(logger, tables, modConfig, aKIFleaConf);
        const jsonGen = new JsonGen(logger, tables, modConfig, utils, arrays);
        const fleaChangesPreDB = new FleaChangesPreDBLoad(logger, aKIFleaConf, modConfig);
        const quests = new Quests(logger, tables, modConfig);
        const traders = new Traders(logger, tables, modConfig, traderConf, arrays, utils);
        const airdrop = new Airdrops(logger, modConfig, airConf);
        const maps = new Spawns(logger, tables, modConfig, tables.locations);
        const gear = new Gear(arrays, tables, logger, modConfig);
        const itemCloning = new ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const descGen = new DescriptionGen(tables, modConfig, logger);
        const jsonHand = new ItemStatHandler(tables, logger);
        // jsonGen.attTemplatesCodeGen();
        // jsonGen.weapTemplatesCodeGen();
        // jsonGen.gearTemplatesCodeGen();
        // jsonGen.ammoTemplatesCodeGen();

        // this.dllChecker(logger, modConfig);

        if (modConfig.enable_hazard_zones) {
            quests.loadHazardQuests();
        }

        if (modConfig.enable_hazard_zones) {
            gear.loadSpecialSlotChanges();
            gear.addResourceToGasMaskFilters();
        }

        if (modConfig.recoil_attachment_overhaul == true) {
            itemCloning.createCustomWeapons();
            itemCloning.createCustomAttachments();
            itemsClass.addCustomItems();
            attachBase.loadAttCompat();
            attachBase.loadCaliberConversions();
        }

        if (modConfig.realistic_ballistics) {
            itemCloning.createCustomPlates();
            bots.setBotHealth();
        }

        if (modConfig.open_zones_fix == true && !ModTracker.swagPresent) {
            maps.openZonesFix();
        }

        maps.loadSpawnChanges();

        if (modConfig.airdrop_changes == true) {
            airdrop.loadAirdropChanges();
        }

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            bots.loadBots();
        }

        if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == true && modConfig.all_scavs == true && modConfig.bot_test_tier == 4) {
            logger.warning("Realism Mod: testing enabled, bots will be limited to a cap of 1");
            bots.testBotCap();
        }
        else if (modConfig.increased_bot_cap == true && ModTracker.swagPresent == false && ModTracker.qtbPresent == false) {
            bots.increaseBotCap();
        }
        else if (modConfig.spawn_waves == true && ModTracker.swagPresent == false && ModTracker.qtbPresent == false) {
            bots.increasePerformance();
        }

        if (modConfig.bot_names == true) {
            bots.botNames();
        }

        if (modConfig.guarantee_boss_spawn == true || EventTracker.isHalloween) {
            bots.forceBossSpawns();
        }

        if (modConfig.boss_difficulty == true && !ModTracker.sainPresent) {
            bots.bossDifficulty();
        }

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

        bots.botHpMulti();

        fleaChangesPostDB.loadFleaGlobal(); //has to run post db load, otherwise item templates are undefined 
        fleaChangesPreDB.loadFleaConfig(); //probably redundant, but just in case

        if (modConfig.trader_repair_changes == true) {
            traders.loadTraderRepairs();
        }

        if (modConfig.headset_changes) {
            gear.loadHeadsetTweaks();
        }

        if (modConfig.remove_quest_fir_req == true) {
            quests.removeFIRQuestRequire();
        }

        //traders
        traders.loadTraderTweaks();
        traders.setBaseOfferValues();
        if (modConfig.add_cust_trader_items == true) {
            traders.addItemsToAssorts();
        }

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            attachBase.loadAttRequirements();
        }

        traders.loadTraderRefreshTimes();

        itemsClass.loadItemBlacklists();
        itemsClass.loadItemsRestrictions();
        player.loadPlayerStats();
        player.playerProfiles(jsonUtil);
        weaponsGlobals.loadGlobalWeps();

        //have to run this async to ensure correct load order
        (async () => {
            if (modConfig.recoil_attachment_overhaul) {
                jsonHand.pushModsToServer();
                jsonHand.pushWeaponsToServer();
            }
            jsonHand.pushGearToServer();

            await jsonHand.processUserJsonFiles();

            descGen.descriptionGen();

            if (modConfig.realistic_ballistics == true) {
                ammo.loadAmmoStats();
                armor.loadArmorStats();
            }

            if (modConfig.malf_changes == true) {
                ammo.loadAmmoStatAdjustments();
                weaponsGlobals.loadGlobalMalfChanges();
            }

            if (modConfig.recoil_attachment_overhaul) {
                ammo.loadAmmoFirerateChanges();
                quests.fixMechancicQuests();
                ammo.grenadeTweaks();
            }

            gear.loadGearConflicts();
        })();
    }

    public postSptLoad(container: DependencyContainer) {
        this.modLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
    }

    //unsure if I still need to do this or not, now that configuration has been expanded
    // private dllChecker(logger: ILogger, modConfig: any) {

    //     ConfigChecker.dllIsPresent = true;

    //     const realismdll = path.join(__dirname, '../../../../BepInEx/plugins/RealismMod.dll');
    //     if (fs.existsSync(realismdll)) {
    //         ConfigChecker.dllIsPresent = true;
    //         if (modConfig.recoil_attachment_overhaul == false) {
    //             logger.info("Realism Mod: RealismMod.dll is present at path: " + realismdll + ", but 'Recoil, Ballistics and Attachment Overhaul' is disabled, the mod may behave unpredictably.");
    //         }
    //     } else {
    //         ConfigChecker.dllIsPresent = false;
    //         if (modConfig.recoil_attachment_overhaul == true) {
    //             logger.error("Realism Mod: RealismMod.dll is missing form path: " + realismdll + ", but 'Recoil, Ballistics and Attachment Overhaul' is enabled, server will disable these changes.");
    //         }
    //     }
    // }

    private revertMeds(profileData: IPmcData, utils: Utils) {
        utils.revertMedItems(profileData);
    }

    private revertHydroEnergy(profileData: IPmcData, tables: IDatabaseTables){
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

    private checkForEvents(logger: ILogger, seasonalEventsService: SeasonalEventService) {
        EventTracker.isChristmas = seasonalEventsService.christmasEventEnabled() && seasonalEventsService.isAutomaticEventDetectionEnabled() ? true : false;
        EventTracker.isHalloween = seasonalEventsService.halloweenEventEnabled() && seasonalEventsService.isAutomaticEventDetectionEnabled() ? true : false;
        if (EventTracker.isChristmas == true) {
            logger.warning("Merry Christmas!");
        }
        if (EventTracker.isHalloween == true) {
            logger.warning("Happy Halloween!");
        }
    }

    private checkPlayerLevel(sessionID: string, profileData: ISptProfile, pmcData: IPmcData, logger: ILogger, shouldLog: boolean = false) {
        let level = 1;
        if (pmcData?.Info?.Level !== undefined) {
            level = pmcData.Info.Level;
        }
        let playerCount = 0;
        let cumulativePlayerLevel = 0;
        ProfileTracker.playerRecord[profileData.info.id] = level;
        Object.values(ProfileTracker.playerRecord).forEach(value => {
            cumulativePlayerLevel += value;
            playerCount += 1;
        });
        ProfileTracker.averagePlayerLevel = cumulativePlayerLevel / playerCount;
        ProfileTracker.profileIds.push(sessionID);

        if (shouldLog) {
            logger.logWithColor(`Realism Mod: Players in server ${playerCount}, average level: ${ProfileTracker.averagePlayerLevel}`, LogTextColor.GREEN);
        }
    }

    private checkProfile(pmcData: IPmcData, pmcEXP: number, utils: Utils, player: Player, logger: ILogger) {
        utils.correctItemResources(pmcData, pmcEXP, logger);
        if (modConfig.med_changes == true) {
            pmcData.Health.Hydration.Maximum = player.hydration;
            pmcData.Health.Energy.Maximum = player.energy;
            if (pmcData.Info.Experience == 0) {
                pmcData.Health.Hydration.Current = player.hydration;
                pmcData.Health.Energy.Current = player.energy
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


