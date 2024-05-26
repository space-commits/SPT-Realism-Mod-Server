"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const ContextVariableType_1 = require("C:/snapshot/project/obj/context/ContextVariableType");
;
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const LogBackgroundColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogBackgroundColor");
const attatchment_base_1 = require("./weapons/attatchment_base");
const fleamarket_1 = require("./traders/fleamarket");
const utils_1 = require("./utils/utils");
const arrays_1 = require("./utils/arrays");
const meds_1 = require("./items/meds");
const player_1 = require("./player/player");
const weapons_globals_1 = require("./weapons/weapons_globals");
const bots_1 = require("./bots/bots");
const bot_gen_1 = require("./bots/bot_gen");
const items_1 = require("./items/items");
const json_gen_1 = require("./json/json_gen");
const quests_1 = require("./traders/quests");
const traders_1 = require("./traders/traders");
const airdrops_1 = require("./misc/airdrops");
const maps_1 = require("./bots/maps");
const gear_1 = require("./items/gear");
const seasonalevents_1 = require("./misc/seasonalevents");
const item_cloning_1 = require("./items/item_cloning");
const description_gen_1 = require("./json/description_gen");
const json_handler_1 = require("./json/json-handler");
const ammo_1 = require("./ballistics/ammo");
const armor_1 = require("./ballistics/armor");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const crafts = require("../db/items/hideout_crafts.json");
const medItems = require("../db/items/med_items.json");
const medBuffs = require("../db/items/buffs.json");
const foodItems = require("../db/items/food_items.json");
const foodBuffs = require("../db/items/buffs_food.json");
const stimBuffs = require("../db/items/buffs_stims.json");
const modConfig = require("../config/config.json");
let adjustedTradersOnStart = false;
class Main {
    modLoader;
    preAkiLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const jsonUtil = container.resolve("JsonUtil");
        const hashUtil = container.resolve("HashUtil");
        const randomUtil = container.resolve("RandomUtil");
        const weightedRandomHelper = container.resolve("WeightedRandomHelper");
        const staticRouterModService = container.resolve("StaticRouterModService");
        const HttpResponse = container.resolve("HttpResponseUtil");
        const configServer = container.resolve("ConfigServer");
        const databaseServer = container.resolve("DatabaseServer");
        const localisationService = container.resolve("LocalisationService");
        const fleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const profileHelper = container.resolve("ProfileHelper");
        const assortHelper = container.resolve("AssortHelper");
        const paymentHelper = container.resolve("PaymentHelper");
        const mathUtil = container.resolve("MathUtil");
        const timeUtil = container.resolve("TimeUtil");
        const traderAssortService = container.resolve("TraderAssortService");
        const traderHelper = container.resolve("TraderHelper");
        const fenceService = container.resolve("FenceService");
        const traderPurchasePefrsisterService = container.resolve("TraderPurchasePersisterService");
        const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
        const ragfairAssortGenerator = container.resolve("RagfairAssortGenerator");
        const router = container.resolve("DynamicRouterModService");
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const traderRefersh = new traders_1.TraderRefresh(logger, jsonUtil, mathUtil, timeUtil, databaseServer, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator, traderAssortService, localisationService, traderPurchasePefrsisterService, traderHelper, fenceService, configServer);
        const flea = new fleamarket_1.FleaChangesPreDBLoad(logger, fleaConf, modConfig);
        this.checkForMods(preAkiModLoader, logger, modConfig);
        flea.loadFleaConfig();
        router.registerDynamicRouter("loadResources", [
            {
                url: "/RealismMod/GetInfo",
                action: (url, info, sessionId, output) => {
                    try {
                        return jsonUtil.serialize(modConfig);
                    }
                    catch (err) {
                        console.error("Failed to read config file", err);
                    }
                }
            }
        ], "RealismMod");
        if (modConfig.bot_changes == true && utils_1.ModTracker.alpPresent == false) {
            const botLevelGenerator = container.resolve("BotLevelGenerator");
            const botDifficultyHelper = container.resolve("BotDifficultyHelper");
            const botInventoryGenerator = container.resolve("BotInventoryGenerator");
            const botHelper = container.resolve("BotHelper");
            const botEquipmentFilterService = container.resolve("BotEquipmentFilterService");
            const seasonalEventService = container.resolve("SeasonalEventService");
            const botGen = new bot_gen_1.BotGen(logger, hashUtil, randomUtil, timeUtil, jsonUtil, profileHelper, databaseServer, botInventoryGenerator, botLevelGenerator, botEquipmentFilterService, weightedRandomHelper, botHelper, botDifficultyHelper, seasonalEventService, localisationService, configServer);
            container.afterResolution("BotGenerator", (_t, result) => {
                result.prepareAndGenerateBot = (sessionId, botGenerationDetails) => {
                    return botGen.myPrepareAndGenerateBot(sessionId, botGenerationDetails);
                };
            }, { frequency: "Always" });
            container.afterResolution("BotGenerator", (_t, result) => {
                result.generatePlayerScav = (sessionId, role, difficulty, botTemplate) => {
                    return botGen.myGeneratePlayerScav(sessionId, role, difficulty, botTemplate);
                };
            }, { frequency: "Always" });
        }
        container.afterResolution("TraderAssortHelper", (_t, result) => {
            result.resetExpiredTrader = (trader) => {
                return traderRefersh.myResetExpiredTrader(trader);
            };
        }, { frequency: "Always" });
        if (modConfig.randomize_trader_stock == true) {
            const httpResponse = container.resolve("HttpResponseUtil");
            const ragfairController = container.resolve("RagfairController");
            const ragfairTaxServ = container.resolve("RagfairTaxService");
            const ragfairServer = container.resolve("RagfairServer");
            const ragFairCallback = new traders_1.RagCallback(httpResponse, jsonUtil, ragfairServer, ragfairController, ragfairTaxServ, configServer);
            container.afterResolution("RagfairCallbacks", (_t, result) => {
                result.search = (url, info, sessionID) => {
                    return ragFairCallback.mySearch(url, info, sessionID);
                };
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
        staticRouterModService.registerStaticRouter("CheckProfile", [
            {
                url: "/client/game/version/validate",
                action: (url, info, sessionID, output) => {
                    const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
                    const profileHelper = container.resolve("ProfileHelper");
                    const seasonalEventsService = container.resolve("SeasonalEventService");
                    const postLoadDBServer = container.resolve("DatabaseServer");
                    const aKIFleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
                    const ragfairServer = container.resolve("RagfairServer");
                    const postLoadTables = postLoadDBServer.getTables();
                    const arrays = new arrays_1.Arrays(postLoadTables);
                    const utils = new utils_1.Utils(postLoadTables, arrays);
                    const tieredFlea = new fleamarket_1.TieredFlea(postLoadTables, aKIFleaConf);
                    const player = new player_1.Player(logger, postLoadTables, modConfig, medItems, utils);
                    const maps = new maps_1.Spawns(logger, postLoadTables, modConfig, postLoadTables.locations);
                    const randomizeTraderAssort = new traders_1.RandomizeTraderAssort();
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
                                    pmcData.Health.Hydration.Maximum = player.defaultHydration;
                                    pmcData.Health.Energy.Maximum = player.defaultEnergy;
                                    if (pmcData.Health.Energy.Current > pmcData.Health.Energy.Maximum) {
                                        pmcData.Health.Hydration.Current = player.defaultHydration;
                                        pmcData.Health.Energy.Current = player.defaultEnergy;
                                    }
                                }
                            }
                        }
                        this.checkForEvents(logger, seasonalEventsService);
                        if (adjustedTradersOnStart == false) {
                            let pmcData = [];
                            utils_1.ProfileTracker.profileIds.forEach(element => {
                                pmcData.push(profileHelper.getPmcProfile(element));
                            });
                            randomizeTraderAssort.adjustTraderStockAtServerStart(pmcData);
                        }
                        adjustedTradersOnStart = true;
                        const traders = ragfairServer.getUpdateableTraders();
                        for (let traderID in traders) {
                            ragfairOfferGenerator.generateFleaOffersForTrader(traders[traderID]);
                        }
                        if (modConfig.tiered_flea == true) {
                            tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, arrays, utils_1.ProfileTracker.averagePlayerLevel);
                        }
                        if (modConfig.boss_spawns == true) {
                            maps.setBossSpawnChance(utils_1.ProfileTracker.averagePlayerLevel);
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
        ], "aki");
        staticRouterModService.registerStaticRouter("runOnGameLogout", [
            {
                url: "/client/game/logout",
                action: (url, info, sessionID, output) => {
                    const profileHelper = container.resolve("ProfileHelper");
                    const profileData = profileHelper.getFullProfile(sessionID);
                    let playerCount = 0;
                    let cumulativePlayerLevel = 0;
                    delete utils_1.ProfileTracker.playerRecord[profileData.info.id];
                    Object.values(utils_1.ProfileTracker.playerRecord).forEach(value => {
                        cumulativePlayerLevel += value;
                        playerCount += 1;
                    });
                    utils_1.ProfileTracker.averagePlayerLevel = cumulativePlayerLevel / playerCount;
                    logger.logWithColor(`Realism Mod: Players in server ${playerCount}, average level: ${utils_1.ProfileTracker.averagePlayerLevel}`, LogTextColor_1.LogTextColor.GREEN);
                    return output;
                }
            }
        ], "aki");
        staticRouterModService.registerStaticRouter("runAtProfileCreation", [
            {
                url: "/client/game/profile/create",
                action: (url, info, sessionID, output) => {
                    const profileHelper = container.resolve("ProfileHelper");
                    const postLoadDBServer = container.resolve("DatabaseServer");
                    const postLoadtables = postLoadDBServer.getTables();
                    const arrays = new arrays_1.Arrays(postLoadtables);
                    const utils = new utils_1.Utils(postLoadtables, arrays);
                    const player = new player_1.Player(logger, postLoadtables, modConfig, medItems, utils);
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
        ], "aki");
        staticRouterModService.registerStaticRouter("runAtRaidStart", [
            {
                url: "/client/raid/configuration",
                action: (url, info, sessionID, output) => {
                    try {
                        const postLoadDBServer = container.resolve("DatabaseServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const profileHelper = container.resolve("ProfileHelper");
                        const appContext = container.resolve("ApplicationContext");
                        const weatherController = container.resolve("WeatherController");
                        const matchInfo = appContext.getLatestValue(ContextVariableType_1.ContextVariableType.RAID_CONFIGURATION).getValue();
                        const pmcConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.PMC);
                        const arrays = new arrays_1.Arrays(postLoadTables);
                        const utils = new utils_1.Utils(postLoadTables, arrays);
                        const bots = new bots_1.BotLoader(logger, postLoadTables, configServer, modConfig, arrays, utils);
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID);
                        const time = weatherController.generate().time; //apparently regenerates weather?
                        // const time = weatherController.getCurrentInRaidTime; //better way?
                        // const time = weatherGenerator.calculateGameTime({ acceleration: 0, time: "", date: "" }).time // better way?
                        utils_1.RaidInfoTracker.mapName = matchInfo.location.toLowerCase();
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
                                return `${h}:${m}`;
                            }
                            h = Math.abs(parseInt(h) - hourDiff);
                            return `${h}:${m}`;
                        }
                        function getTOD(time) {
                            let TOD = "";
                            let [h, m] = time.split(':');
                            if ((matchInfo.location != "factory4_night" && parseInt(h) >= 5 && parseInt(h) < 22) || (utils_1.RaidInfoTracker.mapName === "factory4_day" || utils_1.RaidInfoTracker.mapName === "laboratory")) {
                                TOD = "day";
                            }
                            else {
                                TOD = "night";
                            }
                            return TOD;
                        }
                        if (arrays.cqbMaps.includes(utils_1.RaidInfoTracker.mapName)) {
                            mapType = "cqb";
                        }
                        if (arrays.outdoorMaps.includes(utils_1.RaidInfoTracker.mapName)) {
                            mapType = "outdoor";
                        }
                        if (arrays.urbanMaps.includes(utils_1.RaidInfoTracker.mapName)) {
                            mapType = "urban";
                        }
                        utils_1.RaidInfoTracker.TOD = getTOD(realTime);
                        utils_1.RaidInfoTracker.mapType = mapType;
                        if (modConfig.bot_changes == true && utils_1.ModTracker.alpPresent == false) {
                            bots.updateBots(pmcData, logger, modConfig, bots, utils);
                        }
                        if (!utils_1.ModTracker.qtbPresent && !utils_1.ModTracker.swagPresent && utils_1.RaidInfoTracker.mapName === "laboratory") {
                            pmcConf.convertIntoPmcChance["pmcbot"].min = 0;
                            pmcConf.convertIntoPmcChance["pmcbot"].max = 0;
                            pmcConf.convertIntoPmcChance["assault"].min = 100;
                            pmcConf.convertIntoPmcChance["assault"].max = 100;
                        }
                        logger.warning("Avg. Player Level = " + utils_1.ProfileTracker.averagePlayerLevel);
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
        ], "aki");
        staticRouterModService.registerStaticRouter("runAtRaidEnd", [
            {
                url: "/raid/profile/save",
                action: (url, info, sessionID, output) => {
                    const postLoadDBServer = container.resolve("DatabaseServer");
                    const postLoadTables = postLoadDBServer.getTables();
                    const profileHelper = container.resolve("ProfileHelper");
                    const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
                    const aKIFleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
                    const arrays = new arrays_1.Arrays(postLoadTables);
                    const tieredFlea = new fleamarket_1.TieredFlea(postLoadTables, aKIFleaConf);
                    const utils = new utils_1.Utils(postLoadTables, arrays);
                    const player = new player_1.Player(logger, postLoadTables, modConfig, medItems, utils);
                    const pmcData = profileHelper.getPmcProfile(sessionID);
                    const scavData = profileHelper.getScavProfile(sessionID);
                    const profileData = profileHelper.getFullProfile(sessionID);
                    const appContext = container.resolve("ApplicationContext");
                    const matchInfo = appContext.getLatestValue(ContextVariableType_1.ContextVariableType.RAID_CONFIGURATION).getValue();
                    logger.warning("============== " + matchInfo.keyId);
                    //update global player level
                    this.checkPlayerLevel(sessionID, profileData, pmcData, logger);
                    try {
                        if (modConfig.tiered_flea == true) {
                            tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, arrays, utils_1.ProfileTracker.averagePlayerLevel);
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
        ], "aki");
    }
    backupProfile(profileData, logger) {
        const profileFileData = JSON.stringify(profileData, null, 4);
        let index = 0;
        if (index == 0) {
            index = 1;
            let modPath = path.join(__dirname, '..');
            let profileFolderPath = modPath + "/ProfileBackups/";
            let profileFilePath = modPath + "/ProfileBackups/" + profileData.info.id;
            if (fs.existsSync(profileFilePath)) {
                this.profileBackupHelper(profileFileData, profileFilePath, profileData, logger);
            }
            else {
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
    profileBackupHelper(profileFileData, pathforProfile, profileData, logger) {
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
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const tables = databaseServer.getTables();
        const aKIFleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const inventoryConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.INVENTORY);
        const raidConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.IN_RAID);
        const itemConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.ITEM);
        const jsonUtil = container.resolve("JsonUtil");
        const airConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.AIRDROP);
        const traderConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const arrays = new arrays_1.Arrays(tables);
        const utils = new utils_1.Utils(tables, arrays);
        const ammo = new ammo_1.Ammo(logger, tables, modConfig);
        const armor = new armor_1.Armor(logger, tables, modConfig);
        const attachBase = new attatchment_base_1.AttachmentBase(logger, tables, arrays, modConfig, utils);
        const bots = new bots_1.BotLoader(logger, tables, configServer, modConfig, arrays, utils);
        const itemsClass = new items_1.ItemsClass(logger, tables, modConfig, inventoryConf, raidConf, aKIFleaConf, itemConf, arrays);
        const consumables = new meds_1.Consumables(logger, tables, modConfig, medItems, foodItems, medBuffs, foodBuffs, stimBuffs);
        const player = new player_1.Player(logger, tables, modConfig, medItems, utils);
        const weaponsGlobals = new weapons_globals_1.WeaponsGlobals(logger, tables, modConfig);
        const fleaChangesPostDB = new fleamarket_1.FleaChangesPostDBLoad(logger, tables, modConfig, aKIFleaConf);
        const jsonGen = new json_gen_1.JsonGen(logger, tables, modConfig, utils, arrays);
        const fleaChangesPreDB = new fleamarket_1.FleaChangesPreDBLoad(logger, aKIFleaConf, modConfig);
        const quests = new quests_1.Quests(logger, tables, modConfig);
        const traders = new traders_1.Traders(logger, tables, modConfig, traderConf, arrays, utils);
        const airdrop = new airdrops_1.Airdrops(logger, modConfig, airConf);
        const maps = new maps_1.Spawns(logger, tables, modConfig, tables.locations);
        const gear = new gear_1.Gear(arrays, tables, logger);
        const itemCloning = new item_cloning_1.ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const descGen = new description_gen_1.DescriptionGen(tables, modConfig, logger);
        const jsonHand = new json_handler_1.JsonHandler(tables, logger);
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
        if (modConfig.open_zones_fix == true && !utils_1.ModTracker.swagPresent) {
            maps.openZonesFix();
        }
        if (!utils_1.ModTracker.qtbPresent && !utils_1.ModTracker.swagPresent) {
            maps.loadSpawnChanges();
        }
        // if (modConfig.airdrop_changes == true) {
        //     airdrop.loadAirdropChanges();
        // }
        if (modConfig.bot_changes == true && utils_1.ModTracker.alpPresent == false) {
            bots.loadBots();
        }
        if (modConfig.bot_testing == true && modConfig.bot_test_weps_enabled == true && modConfig.all_scavs == true && modConfig.bot_test_tier == 4) {
            logger.warning("Realism Mod: testing enabled, bots will be limited to a cap of 1");
            bots.testBotCap();
        }
        else if (modConfig.increased_bot_cap == true && utils_1.ModTracker.swagPresent == false) {
            bots.increaseBotCap();
        }
        else if (modConfig.spawn_waves == true && utils_1.ModTracker.swagPresent == false) {
            bots.increasePerformance();
        }
        if (modConfig.bot_names == true) {
            bots.botNames();
        }
        if (utils_1.ModTracker.swagPresent == false && (modConfig.guarantee_boss_spawn == true || seasonalevents_1.EventTracker.isHalloween)) {
            bots.forceBossSpawns();
        }
        if (modConfig.boss_difficulty == true && !utils_1.ModTracker.sainPresent) {
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
        if (modConfig.bot_changes == true && utils_1.ModTracker.alpPresent == false) {
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
    postAkiLoad(container) {
        this.modLoader = container.resolve("PreAkiModLoader");
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
    revertMeds(pmcData, utils) {
        utils.revertMedItems(pmcData);
    }
    checkForEvents(logger, seasonalEventsService) {
        seasonalevents_1.EventTracker.isChristmas = seasonalEventsService.christmasEventEnabled() && seasonalEventsService.isAutomaticEventDetectionEnabled() ? true : false;
        seasonalevents_1.EventTracker.isHalloween = seasonalEventsService.halloweenEventEnabled() && seasonalEventsService.isAutomaticEventDetectionEnabled() ? true : false;
        if (seasonalevents_1.EventTracker.isChristmas == true) {
            logger.warning("Merry Christmas!");
        }
        if (seasonalevents_1.EventTracker.isHalloween == true) {
            logger.warning("Happy Halloween!");
        }
    }
    checkPlayerLevel(sessionID, profileData, pmcData, logger, shouldLog = false) {
        let level = 1;
        if (pmcData?.Info?.Level !== undefined) {
            level = pmcData.Info.Level;
        }
        let playerCount = 0;
        let cumulativePlayerLevel = 0;
        utils_1.ProfileTracker.playerRecord[profileData.info.id] = level;
        Object.values(utils_1.ProfileTracker.playerRecord).forEach(value => {
            cumulativePlayerLevel += value;
            playerCount += 1;
        });
        utils_1.ProfileTracker.averagePlayerLevel = cumulativePlayerLevel / playerCount;
        utils_1.ProfileTracker.profileIds.push(sessionID);
        if (shouldLog) {
            logger.logWithColor(`Realism Mod: Players in server ${playerCount}, average level: ${utils_1.ProfileTracker.averagePlayerLevel}`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    checkProfile(pmcData, pmcEXP, utils, player, logger) {
        utils.correctItemResources(pmcData, pmcEXP, logger);
        if (modConfig.med_changes == true) {
            pmcData.Health.Hydration.Maximum = player.hydration;
            pmcData.Health.Energy.Maximum = player.energy;
            if (pmcData.Info.Experience == 0) {
                pmcData.Health.Hydration.Current = player.hydration;
                pmcData.Health.Energy.Current = player.energy;
                logger.info("Realism Mod: New Profile Meds And Hydration/Energy Adjusted");
            }
        }
        if (modConfig.logEverything == true) {
            logger.info("Realism Mod: Profile Checked");
        }
    }
    checkForMods(preAkiModLoader, logger, modConf) {
        const activeMods = preAkiModLoader.getImportedModDetails();
        for (const modname in activeMods) {
            if (modname.includes("Jiro-BatterySystem")) {
                utils_1.ModTracker.batteryModPresent = true;
                logger.logWithColor("Realism: Jiro Battery Mod Detected, Making Adjustments", LogTextColor_1.LogTextColor.GREEN);
            }
            if (modname.includes("Solarint-SAIN-ServerMod")) {
                utils_1.ModTracker.sainPresent = true;
                logger.logWithColor("Realism: SAIN Detected, Making Adjustments", LogTextColor_1.LogTextColor.GREEN);
            }
            if (modname.includes("QuestingBots")) {
                utils_1.ModTracker.qtbPresent = true;
                logger.logWithColor("Realism: Questing Bots Detected, Making Adjustments", LogTextColor_1.LogTextColor.GREEN);
            }
            if (modname.includes("SWAG")) {
                utils_1.ModTracker.swagPresent = true;
                logger.logWithColor("Realism: SWAG Detected, Making Adjustments", LogTextColor_1.LogTextColor.GREEN);
            }
            if (modname.includes("AlgorithmicLevelProgression")) {
                utils_1.ModTracker.alpPresent = true;
                if (modConf.bot_changes == true) {
                    logger.logWithColor("===========================!============================", LogTextColor_1.LogTextColor.WHITE, LogBackgroundColor_1.LogBackgroundColor.RED);
                    logger.logWithColor("Realism: WARNING, ALP DETECTED! You have Realism's bot progression enabled already. Either uninstall ALP or disable Realism's bot changes!", LogTextColor_1.LogTextColor.WHITE, LogBackgroundColor_1.LogBackgroundColor.RED);
                    logger.logWithColor("===========================!============================", LogTextColor_1.LogTextColor.WHITE, LogBackgroundColor_1.LogBackgroundColor.RED);
                }
                else {
                    logger.logWithColor("Realism: ALP Detected, Making Adjustments", LogTextColor_1.LogTextColor.GREEN);
                }
            }
        }
    }
}
exports.Main = Main;
module.exports = { mod: new Main() };
//# sourceMappingURL=mod.js.map