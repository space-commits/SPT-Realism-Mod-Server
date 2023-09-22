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
const ammo_1 = require("./ballistics/ammo");
const armor_1 = require("./ballistics/armor");
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
const code_gen_1 = require("./json/code_gen");
const quests_1 = require("./traders/quests");
const traders_1 = require("./traders/traders");
const airdrops_1 = require("./misc/airdrops");
const maps_1 = require("./bots/maps");
const gear_1 = require("./items/gear");
const seasonalevents_1 = require("./misc/seasonalevents");
const item_cloning_1 = require("./items/item_cloning");
const path = __importStar(require("path"));
const description_gen_1 = require("./json/description_gen");
const json_handler_1 = require("./json/json-handler");
const fs = require('fs');
const custFleaBlacklist = require("../db/traders/ragfair/blacklist.json");
const medItems = require("../db/items/med_items.json");
const crafts = require("../db/items/hideout_crafts.json");
const buffs = require("../db/items/buffs.json");
const custProfile = require("../db/profile/profile.json");
const modConfig = require("../config/config.json");
var clientValidateCount = 0;
class Main {
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
        const botEquipmentFilterService = container.resolve("BotEquipmentFilterService");
        const traderPurchasePefrsisterService = container.resolve("TraderPurchasePersisterService");
        const botHelper = container.resolve("BotHelper");
        const httpResponse = container.resolve("HttpResponseUtil");
        const ragfairServer = container.resolve("RagfairServer");
        const ragfairController = container.resolve("RagfairController");
        const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
        const ragfairAssortGenerator = container.resolve("RagfairAssortGenerator");
        const locationGenerator = container.resolve("LocationGenerator");
        const lootGenerator = container.resolve("LootGenerator");
        const botInventoryGenerator = container.resolve("BotInventoryGenerator");
        const botLevelGenerator = container.resolve("BotLevelGenerator");
        const botDifficultyHelper = container.resolve("BotDifficultyHelper");
        const seasonalEventService = container.resolve("SeasonalEventService");
        const ragFairCallback = new traders_1.RagCallback(httpResponse, jsonUtil, ragfairServer, ragfairController, configServer);
        const traderRefersh = new traders_1.TraderRefresh(logger, jsonUtil, mathUtil, timeUtil, databaseServer, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator, traderAssortService, localisationService, traderPurchasePefrsisterService, traderHelper, fenceService, configServer);
        const airdropController = new airdrops_1.AirdropLootgen(jsonUtil, hashUtil, weightedRandomHelper, logger, locationGenerator, localisationService, lootGenerator, databaseServer, timeUtil, configServer);
        const botGen = new bot_gen_1.BotGen(logger, hashUtil, randomUtil, timeUtil, jsonUtil, profileHelper, databaseServer, botInventoryGenerator, botLevelGenerator, botEquipmentFilterService, weightedRandomHelper, botHelper, botDifficultyHelper, seasonalEventService, localisationService, configServer);
        const flea = new fleamarket_1.FleamarketConfig(logger, fleaConf, modConfig, custFleaBlacklist);
        flea.loadFleaConfig();
        const router = container.resolve("DynamicRouterModService");
        this.path = require("path");
        router.registerDynamicRouter("loadResources", [
            {
                url: "/RealismMod/GetInfo",
                action: (url, info, sessionId, output) => {
                    const parsedPath = __dirname.split("\\");
                    const folderName = parsedPath[parsedPath.length - 2];
                    return jsonUtil.serialize(this.path.resolve(this.modLoader.getModPath(`${folderName}`)));
                }
            }
        ], "RealismMod");
        if (modConfig.bot_changes == true) {
            container.afterResolution("BotGenerator", (_t, result) => {
                result.prepareAndGenerateBots = (sessionId, botGenerationDetails) => {
                    return botGen.myPrepareAndGenerateBots(sessionId, botGenerationDetails);
                };
            }, { frequency: "Always" });
        }
        container.afterResolution("TraderAssortHelper", (_t, result) => {
            result.resetExpiredTrader = (trader) => {
                return traderRefersh.myResetExpiredTrader(trader);
            };
        }, { frequency: "Always" });
        if (modConfig.randomize_trader_stock == true) {
            container.afterResolution("RagfairCallbacks", (_t, result) => {
                result.search = (url, info, sessionID) => {
                    return ragFairCallback.mySearch(url, info, sessionID);
                };
            }, { frequency: "Always" });
        }
        if (modConfig.airdrop_changes == true) {
            container.afterResolution("LocationController", (_t, result) => {
                result.getAirdropLoot = () => {
                    return airdropController.myGetAirdropLoot();
                };
            }, { frequency: "Always" });
        }
        staticRouterModService.registerStaticRouter("CheckProfile", [
            {
                url: "/client/game/version/validate",
                action: (url, info, sessionID, output) => {
                    const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
                    const profileHelper = container.resolve("ProfileHelper");
                    const seasonalEventsService = container.resolve("SeasonalEventService");
                    const postLoadDBServer = container.resolve("DatabaseServer");
                    const postLoadTables = postLoadDBServer.getTables();
                    const arrays = new arrays_1.Arrays(postLoadTables);
                    const utils = new utils_1.Utils(postLoadTables, arrays);
                    const tieredFlea = new fleamarket_1.TieredFlea(postLoadTables);
                    const player = new player_1.Player(logger, postLoadTables, modConfig, custProfile, medItems, utils);
                    const maps = new maps_1.Spawns(logger, postLoadTables, modConfig);
                    const randomizeTraderAssort = new traders_1.RandomizeTraderAssort();
                    const pmcData = profileHelper.getPmcProfile(sessionID);
                    const scavData = profileHelper.getScavProfile(sessionID);
                    const profileData = profileHelper.getFullProfile(sessionID);
                    let level = 1;
                    if (pmcData?.Info?.Level !== undefined) {
                        level = pmcData.Info.Level;
                        utils_1.ProfileTracker.level = level;
                    }
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
                                    utils.saveToJSONFile(modConfig, 'config/config.json');
                                    logger.info("Realism Mod: Meds in Inventory/Stash Reverted To Defaults");
                                }
                                this.checkProfile(pmcData, pmcData.Info.Experience, utils, player, logger);
                                this.checkProfile(scavData, pmcData.Info.Experience, utils, player, logger);
                                if (modConfig.med_changes == false && modConfig.revert_hp == true) {
                                    utils.removeCustomItems(pmcData);
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
                        if (clientValidateCount === 0) {
                            randomizeTraderAssort.adjustTraderStockAtServerStart();
                        }
                        clientValidateCount += 1;
                        const traders = container.resolve("RagfairServer").getUpdateableTraders();
                        for (let traderID in traders) {
                            ragfairOfferGenerator.generateFleaOffersForTrader(traders[traderID]);
                        }
                        if (modConfig.tiered_flea == true) {
                            tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, arrays, level);
                        }
                        if (modConfig.boss_spawns == true) {
                            maps.setBossSpawnChance(postLoadTables.locations, level);
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
        ], "RealismMod");
        staticRouterModService.registerStaticRouter("runAtProfileCreation", [
            {
                url: "/client/game/profile/create",
                action: (url, info, sessionID, output) => {
                    const profileHelper = container.resolve("ProfileHelper");
                    const postLoadDBServer = container.resolve("DatabaseServer");
                    const postLoadtables = postLoadDBServer.getTables();
                    const arrays = new arrays_1.Arrays(postLoadtables);
                    const utils = new utils_1.Utils(postLoadtables, arrays);
                    const player = new player_1.Player(logger, postLoadtables, modConfig, custProfile, medItems, utils);
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
        ], "RealismMod");
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
                        const seasonalEventsService = container.resolve("SeasonalEventService");
                        const matchInfoStartOff = appContext.getLatestValue(ContextVariableType_1.ContextVariableType.RAID_CONFIGURATION).getValue();
                        const botConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
                        const arrays = new arrays_1.Arrays(postLoadTables);
                        const utils = new utils_1.Utils(postLoadTables, arrays);
                        const bots = new bots_1.BotLoader(logger, postLoadTables, configServer, modConfig, arrays, utils);
                        const seasonalEvents = new seasonalevents_1.SeasonalEventsHandler(logger, postLoadTables, modConfig, arrays, seasonalEventsService);
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const time = weatherController.generate().time;
                        utils_1.RaidInfoTracker.mapName = matchInfoStartOff.location;
                        let realTime = "";
                        let mapType = "";
                        if (matchInfoStartOff.timeVariant === "PAST") {
                            realTime = getTime(time, 12);
                        }
                        if (matchInfoStartOff.timeVariant === "CURR") {
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
                            if ((matchInfoStartOff.location != "factory4_night" && parseInt(h) >= 5 && parseInt(h) < 22) || (matchInfoStartOff.location === "factory4_day" || matchInfoStartOff.location === "Laboratory" || matchInfoStartOff.location === "laboratory")) {
                                TOD = "day";
                            }
                            else {
                                TOD = "night";
                            }
                            return TOD;
                        }
                        for (let map in arrays.cqbMaps) {
                            if (arrays.cqbMaps[map] === matchInfoStartOff.location) {
                                mapType = "cqb";
                            }
                        }
                        for (let map in arrays.outdoorMaps) {
                            if (arrays.outdoorMaps[map] === matchInfoStartOff.location) {
                                mapType = "outdoor";
                            }
                        }
                        for (let map in arrays.urbanMaps) {
                            if (arrays.urbanMaps[map] === matchInfoStartOff.location) {
                                mapType = "urban";
                            }
                        }
                        utils_1.RaidInfoTracker.TOD = getTOD(realTime);
                        utils_1.RaidInfoTracker.mapType = mapType;
                        if (modConfig.bot_changes == true) {
                            bots.updateBots(pmcData, logger, modConfig, bots, utils);
                            if (utils_1.EventTracker.isChristmas == true) {
                                logger.warning("====== Giving Bots Christmas Presents, Don't Be A Scrooge! ======");
                                seasonalEvents.giveBotsChristmasPresents();
                            }
                        }
                        if (matchInfoStartOff.location === "Laboratory" || matchInfoStartOff.location === "laboratory") {
                            botConf.pmc.convertIntoPmcChance["pmcbot"].min = 0;
                            botConf.pmc.convertIntoPmcChance["pmcbot"].max = 0;
                            botConf.pmc.convertIntoPmcChance["assault"].min = 100;
                            botConf.pmc.convertIntoPmcChance["assault"].max = 100;
                        }
                        if (modConfig.logEverything == true) {
                            logger.warning("Map Name star off = " + matchInfoStartOff.location);
                            logger.warning("Map Type  = " + mapType);
                            logger.warning("Time " + time);
                            logger.warning("Time of Day = " + getTOD(realTime));
                        }
                        return HttpResponse.nullResponse();
                    }
                    catch (e) {
                        logger.error("Realism Mod: Failed To Fetch Application Context Data" + e);
                        return HttpResponse.nullResponse();
                    }
                }
            }
        ], "RealismMod");
        staticRouterModService.registerStaticRouter("runAtRaidEnd", [
            {
                url: "/raid/profile/save",
                action: (url, info, sessionID, output) => {
                    const postLoadDBServer = container.resolve("DatabaseServer");
                    const postLoadTables = postLoadDBServer.getTables();
                    const profileHelper = container.resolve("ProfileHelper");
                    const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
                    const arrays = new arrays_1.Arrays(postLoadTables);
                    const tieredFlea = new fleamarket_1.TieredFlea(postLoadTables);
                    const utils = new utils_1.Utils(postLoadTables, arrays);
                    const player = new player_1.Player(logger, postLoadTables, modConfig, custProfile, medItems, utils);
                    const pmcData = profileHelper.getPmcProfile(sessionID);
                    const scavData = profileHelper.getScavProfile(sessionID);
                    let level = 1;
                    if (pmcData?.Info?.Level !== undefined) {
                        level = pmcData.Info.Level;
                    }
                    try {
                        if (modConfig.tiered_flea == true) {
                            tieredFlea.updateFlea(logger, ragfairOfferGenerator, container, arrays, level);
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
        ], "pmc");
    }
    backupProfile(profileData, logger) {
        const profileFileData = JSON.stringify(profileData, null, 4);
        var index = 0;
        if (index == 0) {
            index = 1;
            var modPath = path.join(__dirname, '..');
            var profileFolderPath = modPath + "/ProfileBackups/";
            var profileFilePath = modPath + "/ProfileBackups/" + profileData.info.id;
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
        var date = new Date();
        var time = date.toLocaleTimeString();
        var edit_time = time.replaceAll(" ", "_");
        var edit_time2 = edit_time.replaceAll(":", "-");
        var day = date.toISOString().slice(0, 10);
        var combinedTime = "_" + day + "_" + edit_time2;
        var backupName = pathforProfile + "/" + profileData.info.id + combinedTime + ".json";
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
    async postAkiLoadAsync(container) {
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const jsonHand = new json_handler_1.JsonHandler(tables, logger);
        jsonHand.pushWeaponsToServer();
        jsonHand.pushModsToServer();
    }
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const tables = databaseServer.getTables();
        const AKIFleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const inventoryConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.INVENTORY);
        const jsonUtil = container.resolve("JsonUtil");
        const airConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.AIRDROP);
        const traderConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const arrays = new arrays_1.Arrays(tables);
        const utils = new utils_1.Utils(tables, arrays);
        const ammo = new ammo_1.Ammo(logger, tables, modConfig);
        const armor = new armor_1.Armor(logger, tables, modConfig);
        const attachBase = new attatchment_base_1.AttatchmentBase(logger, tables, arrays, modConfig, utils);
        const bots = new bots_1.BotLoader(logger, tables, configServer, modConfig, arrays, utils);
        const items = new items_1._Items(logger, tables, modConfig, inventoryConf);
        const meds = new meds_1.Meds(logger, tables, modConfig, medItems, buffs);
        const player = new player_1.Player(logger, tables, modConfig, custProfile, medItems, utils);
        const weaponsGlobals = new weapons_globals_1.WeaponsGlobals(logger, tables, modConfig);
        const flea = new fleamarket_1.FleamarketGlobal(logger, tables, modConfig);
        const codegen = new code_gen_1.JsonGen(logger, tables, modConfig, utils, arrays);
        const custFleaConf = new fleamarket_1.FleamarketConfig(logger, AKIFleaConf, modConfig, custFleaBlacklist);
        const quests = new quests_1.Quests(logger, tables, modConfig);
        const traders = new traders_1.Traders(logger, tables, modConfig, traderConf, arrays, utils);
        const airdrop = new airdrops_1.Airdrops(logger, modConfig, airConf);
        const maps = new maps_1.Spawns(logger, tables, modConfig);
        const gear = new gear_1.Gear(arrays, tables);
        const itemCloning = new item_cloning_1.ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const descGen = new description_gen_1.DescriptionGen(tables);
        const jsonHand = new json_handler_1.JsonHandler(tables, logger);
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const activeMods = preAkiModLoader.getImportedModDetails();
        for (const modname in activeMods) {
            if (modname.includes("Jiro-BatterySystem")) {
                utils_1.ModTracker.batteryModPresent = true;
            }
            if (modname.includes("Solarint-SAIN-ServerMod")) {
                utils_1.ModTracker.sainPresent = true;
            }
        }
        this.dllChecker(logger, modConfig);
        if (modConfig.recoil_attachment_overhaul == true) {
            itemCloning.createCustomWeapons();
            itemCloning.createCustomAttachments();
        }
        // codegen.attTemplatesCodeGen();
        // codegen.weapTemplatesCodeGen();
        // codegen.gearTemplatesCodeGen();
        // codegen.ammoTemplatesCodeGen();
        if (modConfig.realistic_ballistics == true) {
            ammo.loadAmmoStats();
            armor.loadArmor();
            bots.setBotHealth();
        }
        jsonHand.pushModsToServer();
        jsonHand.pushWeaponsToServer();
        jsonHand.pushGearToServer();
        descGen.descriptionGen();
        armor.armorMousePenalty();
        if (modConfig.headgear_conflicts == true) {
            gear.loadGearConflicts();
        }
        if (modConfig.open_zones_fix == true) {
            maps.openZonesFix();
        }
        maps.loadSpawnChanges();
        if (modConfig.airdrop_changes == true) {
            airdrop.loadAirdrops();
        }
        if (modConfig.bot_changes == true) {
            bots.loadBots();
        }
        if (modConfig.increased_bot_cap == true) {
            bots.increaseBotCap();
        }
        else if (modConfig.spawn_waves == true) {
            bots.increasePerformance();
        }
        if (modConfig.bot_names == true) {
            bots.botNames();
        }
        if (modConfig.guarantee_boss_spawn == true) {
            bots.forceBossSpawns();
        }
        bots.botDifficulty();
        if (modConfig.med_changes == true) {
            itemCloning.createCustomMedItems();
            // bots.botMeds();
            meds.loadMeds();
        }
        bots.botHpMulti();
        custFleaConf.loadFleaConfig();
        flea.loadFleaGlobal();
        if (modConfig.malf_changes == true) {
            ammo.loadAmmoMalfChanges();
            weaponsGlobals.loadGlobalMalfChanges();
        }
        if (modConfig.trader_repair_changes == true) {
            traders.loadTraderRepairs();
        }
        if (utils_1.ConfigChecker.dllIsPresent == true) {
            if (modConfig.recoil_attachment_overhaul) {
                ammo.loadAmmoFirerateChanges();
                quests.fixMechancicQuests();
                ammo.grenadeTweaks();
            }
            if (modConfig.headset_changes) {
                gear.loadHeadsetTweaks();
            }
        }
        if (modConfig.remove_quest_fir_req == true) {
            quests.removeFIRQuestRequire();
        }
        //traders
        if (modConfig.trader_changes == true) {
            traders.loadTraderTweaks();
        }
        if (modConfig.change_trader_ll == true) {
            traders.setLoyaltyLevels();
        }
        if (modConfig.add_cust_trader_items == true) {
            traders.addItemsToAssorts();
        }
        traders.loadTraderRefreshTimes();
        //
        if (modConfig.bot_changes == true) {
            attachBase.loadAttRequirements();
        }
        attachBase.loadAttCompat();
        items.loadItemsRestrictions();
        player.loadPlayerStats();
        player.playerProfiles(jsonUtil);
        weaponsGlobals.loadGlobalWeps();
    }
    postAkiLoad(container) {
        this.modLoader = container.resolve("PreAkiModLoader");
    }
    dllChecker(logger, modConfig) {
        const realismdll = path.join(__dirname, '../../../../BepInEx/plugins/RealismMod.dll');
        if (fs.existsSync(realismdll)) {
            utils_1.ConfigChecker.dllIsPresent = true;
            if (modConfig.recoil_attachment_overhaul == false) {
                logger.error("Realism Mod: RealismMod.dll is present at path: " + realismdll + ", but 'Recoil, Ballistics and Attachment Overhaul' is disabled, the mod may behave unpredictably.");
            }
        }
        else {
            utils_1.ConfigChecker.dllIsPresent = false;
            if (modConfig.recoil_attachment_overhaul == true) {
                logger.error("Realism Mod: RealismMod.dll is missing form path: " + realismdll + ", but 'Recoil, Ballistics and Attachment Overhaul' is enabled, server will disable these changes.");
            }
        }
    }
    revertMeds(pmcData, utils) {
        utils.revertMedItems(pmcData);
    }
    checkForEvents(logger, seasonalEventsService) {
        const isChristmasActive = seasonalEventsService.christmasEventEnabled();
        utils_1.EventTracker.isChristmas = isChristmasActive;
        if (isChristmasActive == true) {
            logger.warning("Merry Christmas!");
        }
    }
    checkProfile(pmcData, pmcEXP, utils, player, logger) {
        utils.correctItemResources(pmcData, pmcEXP);
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
}
exports.Main = Main;
module.exports = { mod: new Main() };
