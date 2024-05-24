import { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RagfairOfferGenerator } from "@spt-aki/generators/RagfairOfferGenerator";
import { BotEquipmentFilterService } from "@spt-aki/services/BotEquipmentFilterService";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
import { WeatherController } from "@spt-aki/controllers/WeatherController";
import { ContextVariableType } from "@spt-aki/context/ContextVariableType";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import { TraderAssortHelper } from "@spt-aki/helpers/TraderAssortHelper";
import { MathUtil } from "@spt-aki/utils/MathUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
import { AssortHelper } from "@spt-aki/helpers/AssortHelper";
import { RagfairAssortGenerator } from "@spt-aki/generators/RagfairAssortGenerator";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { FenceService } from "@spt-aki/services/FenceService";
import { TraderAssortService } from "@spt-aki/services/TraderAssortService";
import { PaymentHelper } from "@spt-aki/helpers/PaymentHelper";
import { ITrader } from "@spt-aki/models/eft/common/tables/ITrader";
import { TraderPurchasePersisterService } from "@spt-aki/services/TraderPurchasePersisterService";
import { RagfairServer } from "@spt-aki/servers/RagfairServer";;
import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { BotLevelGenerator } from "@spt-aki/generators/BotLevelGenerator";
import { BotGenerationDetails } from "@spt-aki/models/spt/bots/BotGenerationDetails";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { RagfairCallbacks } from "@spt-aki/callbacks/RagfairCallbacks";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IGetOffersResult } from "@spt-aki/models/eft/ragfair/IGetOffersResult";
import { RagfairController } from "@spt-aki/controllers/RagfairController";
import { LocationController } from "@spt-aki/controllers/LocationController";
import { LocationGenerator } from "@spt-aki/generators/LocationGenerator";
import { LootGenerator } from "@spt-aki/generators/LootGenerator";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { BotInventoryGenerator } from "@spt-aki/generators/BotInventoryGenerator";
import { BotDifficultyHelper } from "@spt-aki/helpers/BotDifficultyHelper";
import { BotGenerator } from "@spt-aki/generators/BotGenerator";
import { IAirdropLootResult } from "@spt-aki/models/eft/location/IAirdropLootResult";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { RagfairTaxService } from "@spt-aki/services/RagfairTaxService";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { RaidTimeAdjustmentService } from "@spt-aki/services/RaidTimeAdjustmentService";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { IItemConfig } from "@spt-aki/models/spt/config/IItemConfig";
import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";

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
import { AirdropLootgen, Airdrops } from "./misc/airdrops";
import { Spawns } from "./bots/maps";
import { Gear } from "./items/gear";
import { EventTracker } from "./misc/seasonalevents";
import { ItemCloning } from "./items/item_cloning";
import { DescriptionGen } from "./json/description_gen";
import { JsonHandler } from "./json/json-handler";
import { Ammo } from "./ballistics/ammo";
import { Armor } from "./ballistics/armor";

import * as path from 'path';
import * as fs from 'fs';

const crafts = require("../db/items/hideout_crafts.json");
const medItems = require("../db/items/med_items.json");
const medBuffs = require("../db/items/buffs.json");
const foodItems = require("../db/items/food_items.json");
const foodBuffs = require("../db/items/buffs_food.json");
const stimBuffs = require("../db/items/buffs_stims.json");
const modConfig = require("../config/config.json");

let adjustedTradersOnStart = false;

export class Main implements IPreAkiLoadMod, IPostDBLoadMod, IPostAkiLoadMod {

    private modLoader: PreAkiModLoader;

    public preAkiLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const hashUtil = container.resolve<HashUtil>("HashUtil");
        const randomUtil = container.resolve<RandomUtil>("RandomUtil");
        const weightedRandomHelper = container.resolve<WeightedRandomHelper>("WeightedRandomHelper");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        const HttpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const localisationService = container.resolve<LocalisationService>("LocalisationService");
        const fleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
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
        const router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const traderRefersh = new TraderRefresh(logger, jsonUtil, mathUtil, timeUtil, databaseServer, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator, traderAssortService, localisationService, traderPurchasePefrsisterService, traderHelper, fenceService, configServer);
        const flea = new FleaChangesPreDBLoad(logger, fleaConf, modConfig);

        this.checkForMods(preAkiModLoader, logger, modConfig);
        flea.loadFleaConfig();

        router.registerDynamicRouter(
            "loadResources",
            [
                {
                    url: "/RealismMod/GetInfo",
                    action: (url, info, sessionId, output) => {

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
            const botGen = new BotGen(logger, hashUtil, randomUtil, timeUtil, jsonUtil, profileHelper, databaseServer, botInventoryGenerator, botLevelGenerator, botEquipmentFilterService, weightedRandomHelper, botHelper, botDifficultyHelper, seasonalEventService, localisationService, configServer);

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
            const ragFairCallback = new RagCallback(httpResponse, jsonUtil, ragfairServer, ragfairController, ragfairTaxServ, configServer);
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
                    action: (url, info, sessionID, output) => {

                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const seasonalEventsService = container.resolve<SeasonalEventService>("SeasonalEventService");
                        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
                        const ragfairServer = container.resolve<RagfairServer>("RagfairServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const arrays = new Arrays(postLoadTables);
                        const utils = new Utils(postLoadTables, arrays);
                        const tieredFlea = new TieredFlea(postLoadTables, aKIFleaConf);
                        const player = new Player(logger, postLoadTables, modConfig, medItems, utils);
                        const maps = new Spawns(logger, postLoadTables, modConfig, postLoadTables.locations);
                        const randomizeTraderAssort = new RandomizeTraderAssort();
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID);

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
                                        modConfig.revert_med_changes = false;
                                        utils.writeConfigJSON(modConfig, 'config/config.json');
                                        logger.info("Realism Mod: Meds in Inventory/Stash Reverted To Defaults");
                                    }

                                    this.checkProfile(pmcData, pmcData.Info.Experience, utils, player, logger);
                                    this.checkProfile(scavData, pmcData.Info.Experience, utils, player, logger);

                                    if (modConfig.med_changes == false && modConfig.revert_hp == true) {
                                        pmcData.Health.Hydration.Maximum = player.defaultHydration
                                        pmcData.Health.Energy.Maximum = player.defaultEnergy;
                                        if (pmcData.Health.Energy.Current > pmcData.Health.Energy.Maximum) {
                                            pmcData.Health.Hydration.Current = player.defaultHydration
                                            pmcData.Health.Energy.Current = player.defaultEnergy;
                                        }
                                    }
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
                    action: (url, info, sessionID, output) => {
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
                    action: (url, info, sessionID, output) => {

                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                        const postLoadtables = postLoadDBServer.getTables();
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
                    action: (url, info, sessionID, output) => {

                        try {
                            const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                            const postLoadTables = postLoadDBServer.getTables();
                            const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                            const appContext = container.resolve<ApplicationContext>("ApplicationContext");
                            const weatherController = container.resolve<WeatherController>("WeatherController");
                            const matchInfo = appContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
                            const pmcConf = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
                            const arrays = new Arrays(postLoadTables);
                            const utils = new Utils(postLoadTables, arrays);
                            const bots = new BotLoader(logger, postLoadTables, configServer, modConfig, arrays, utils);
                            const pmcData = profileHelper.getPmcProfile(sessionID);
                            const profileData = profileHelper.getFullProfile(sessionID);

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
                    action: (url, info, sessionID, output) => {
                        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const aKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
                        const arrays = new Arrays(postLoadTables);
                        const tieredFlea = new TieredFlea(postLoadTables, aKIFleaConf);
                        const utils = new Utils(postLoadTables, arrays);
                        const player = new Player(logger, postLoadTables, modConfig, medItems, utils);
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID)

                        const appContext = container.resolve<ApplicationContext>("ApplicationContext");
                        const matchInfo = appContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
                        logger.warning("============== " + matchInfo.keyId);


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

    private backupProfile(profileData: IAkiProfile, logger: ILogger) {
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


    private profileBackupHelper(profileFileData: string, pathforProfile: string, profileData: IAkiProfile, logger: ILogger) {
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



    // public async postAkiLoadAsync(container: DependencyContainer): Promise<void> {
    //     const logger = container.resolve<ILogger>("WinstonLogger");

    //     const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
    //     const tables = databaseServer.getTables();
    //     const jsonHand = new JsonHandler(tables, logger);
    //     jsonHand.pushWeaponsToServer();
    //     jsonHand.pushModsToServer();
    // }

    public postDBLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const tables = databaseServer.getTables();
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
        const gear = new Gear(arrays, tables, logger);
        const itemCloning = new ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const descGen = new DescriptionGen(tables, modConfig, logger);
        const jsonHand = new JsonHandler(tables, logger);
        // jsonGen.attTemplatesCodeGen();
        // jsonGen.weapTemplatesCodeGen();
        // jsonGen.gearTemplatesCodeGen();
        // jsonGen.ammoTemplatesCodeGen();

        // this.dllChecker(logger, modConfig);

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

        if (modConfig.headgear_conflicts == true) {
            gear.loadGearConflicts();
        }

        if (modConfig.open_zones_fix == true && !ModTracker.swagPresent) {
            maps.openZonesFix();
        }

        if (!ModTracker.qtbPresent && !ModTracker.swagPresent) {
            maps.loadSpawnChanges();
        }

        // if (modConfig.airdrop_changes == true) {
        //     airdrop.loadAirdropChanges();
        // }

        if (modConfig.bot_changes == true && ModTracker.alpPresent == false) {
            bots.loadBots();
        }

        if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == true && modConfig.all_scavs == true && modConfig.bot_test_tier == 4) {
            logger.warning("Realism Mod: testing enabled, bots will be limited to a cap of 1");
            bots.testBotCap();
        }
        else if (modConfig.increased_bot_cap == true && ModTracker.swagPresent == false) {
            bots.increaseBotCap();
        }
        else if (modConfig.spawn_waves == true && ModTracker.swagPresent == false) {
            bots.increasePerformance();
        }

        if (modConfig.bot_names == true) {
            bots.botNames();
        }

        if (ModTracker.swagPresent == false && (modConfig.guarantee_boss_spawn == true || EventTracker.isHalloween)) {
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

        if (modConfig.change_trader_ll == true) {
            traders.setLoyaltyLevels();
        }
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
            await jsonHand.processUserJsonFiles();

            if (modConfig.recoil_attachment_overhaul) {
                jsonHand.pushModsToServer();
                jsonHand.pushWeaponsToServer();
            }
            jsonHand.pushGearToServer();
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
        })();
    }

    public postAkiLoad(container: DependencyContainer) {
        this.modLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
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

    private revertMeds(pmcData: IPmcData, utils: Utils) {
        utils.revertMedItems(pmcData);
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

    private checkPlayerLevel(sessionID: string, profileData: IAkiProfile, pmcData: IPmcData, logger: ILogger, shouldLog: boolean = false) {
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

    private checkForMods(preAkiModLoader: PreAkiModLoader, logger: ILogger, modConf: any) {
        const activeMods = preAkiModLoader.getImportedModDetails();
        for (const modname in activeMods) {
            if (modname.includes("Jiro-BatterySystem")) {
                ModTracker.batteryModPresent = true;
                logger.logWithColor("Realism: Jiro Battery Mod Detected, Making Adjustments", LogTextColor.GREEN);
            }
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


