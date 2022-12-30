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
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const ContextVariableType_1 = require("C:/snapshot/project/obj/context/ContextVariableType");
;
const ammo_1 = require("./ammo");
const armor_1 = require("./armor");
const attatchment_base_1 = require("./attatchment_base");
const attatchment_stats_1 = require("./attatchment_stats");
const fleamarket_1 = require("./fleamarket");
const helper_1 = require("./helper");
const arrays_1 = require("./arrays");
const meds_1 = require("./meds");
const player_1 = require("./player");
const weapons_globals_1 = require("./weapons_globals");
const bots_1 = require("./bots");
const bot_gen_1 = require("./bot_gen");
const bot_loot_serv_1 = require("./bot_loot_serv");
const items_1 = require("./items");
const code_gen_1 = require("./code_gen");
const quests_1 = require("./quests");
const traders_1 = require("./traders");
const airdrops_1 = require("./airdrops");
const maps_1 = require("./maps");
const gear_1 = require("./gear");
const seasonalevents_1 = require("./seasonalevents");
const item_cloning_1 = require("./item_cloning");
const _path = __importStar(require("path"));
const fs = require('fs');
const medRevertCount = require("../db/saved/info.json");
const custFleaBlacklist = require("../db/traders/ragfair/blacklist.json");
const medItems = require("../db/items/med_items.json");
const crafts = require("../db/items/hideout_crafts.json");
const buffs = require("../db/items/buffs.json");
const custProfile = require("../db/profile/profile.json");
const botHealth = require("../db/bots/botHealth.json");
const modConfig = require("../config/config.json");
const airdropLoot = require("../db/airdrops/airdrop_loot.json");
const pmcTypes = require("../db/bots/pmcTypes.json");
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
        const itemHelper = container.resolve("ItemHelper");
        const botWeaponGeneratorHelper = container.resolve("BotWeaponGeneratorHelper");
        const probabilityHelper = container.resolve("ProbabilityHelper");
        const botEquipmentFilterService = container.resolve("BotEquipmentFilterService");
        const itemFilterService = container.resolve("ItemFilterService");
        const botGeneratorHelper = container.resolve("BotGeneratorHelper");
        const inventoryMagGenComponents = container.resolveAll("InventoryMagGen");
        const traderPurchasePefrsisterService = container.resolve("TraderPurchasePersisterService");
        const botEquipmentModGenerator = container.resolve("BotEquipmentModGenerator");
        const botWeaponModLimitService = container.resolve("BotWeaponModLimitService");
        const botHelper = container.resolve("BotHelper");
        const botEquipmentModPoolService = container.resolve("BotEquipmentModPoolService");
        const handbookHelper = container.resolve("HandbookHelper");
        const botWeaponGenerator = container.resolve("BotWeaponGenerator");
        const botLootCacheService = container.resolve("BotLootCacheService");
        const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
        const ragfairAssortGenerator = container.resolve("RagfairAssortGenerator");
        const traderRefersh = new traders_1.TraderRefresh(logger, jsonUtil, mathUtil, timeUtil, databaseServer, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator, traderAssortService, localisationService, traderPurchasePefrsisterService, traderHelper, fenceService, configServer);
        const _botWepGen = new bot_gen_1.BotWepGen(jsonUtil, logger, hashUtil, databaseServer, itemHelper, weightedRandomHelper, botGeneratorHelper, randomUtil, configServer, botWeaponGeneratorHelper, botWeaponModLimitService, botEquipmentModGenerator, localisationService, inventoryMagGenComponents);
        const _botModGen = new bot_gen_1.BotGenHelper(logger, jsonUtil, hashUtil, randomUtil, probabilityHelper, databaseServer, itemHelper, botEquipmentFilterService, itemFilterService, profileHelper, botWeaponModLimitService, botHelper, botGeneratorHelper, botWeaponGeneratorHelper, localisationService, botEquipmentModPoolService, configServer);
        const botLooGen = new bot_loot_serv_1.BotLooGen(logger, hashUtil, randomUtil, databaseServer, handbookHelper, botGeneratorHelper, botWeaponGenerator, botWeaponGeneratorHelper, botLootCacheService, localisationService, configServer);
        const genBotLvl = new bot_gen_1.GenBotLvl(logger, randomUtil, databaseServer);
        const flea = new fleamarket_1.FleamarketConfig(logger, fleaConf, modConfig, custFleaBlacklist);
        flea.loadFleaConfig();
        const router = container.resolve("DynamicRouterModService");
        this.path = require("path");
        router.registerDynamicRouter("loadResources", [
            {
                url: "/RealismMod/GetInfo",
                action: (url, info, sessionId, output) => {
                    return jsonUtil.serialize(this.path.resolve(this.modLoader.getModPath("SPT-Realism-Mod")));
                }
            }
        ], "RealismMod");
        if (modConfig.bot_changes == true) {
            container.afterResolution("BotWeaponGenerator", (_t, result) => {
                result.generateWeaponByTpl = (sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel) => {
                    return _botWepGen.botWepGen(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel);
                };
                result.addExtraMagazinesToInventory = (generatedWeaponResult, magCounts, inventory, botRole) => {
                    return _botWepGen.magGen(generatedWeaponResult, magCounts, inventory, botRole);
                };
            }, { frequency: "Always" });
            container.afterResolution("BotEquipmentModGenerator", (_t, result) => {
                result.generateModsForWeapon = (sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole, botLevel, modLimits, botEquipmentRole) => {
                    return _botModGen.botModGen(sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole, botLevel, modLimits, botEquipmentRole);
                };
            }, { frequency: "Always" });
            container.afterResolution("BotLootGenerator", (_t, result) => {
                result.generateLoot = (sessionId, templateInventory, itemCounts, isPmc, botRole, botInventory, equipmentChances, botLevel) => {
                    return botLooGen.genLoot(sessionId, templateInventory, itemCounts, isPmc, botRole, botInventory, equipmentChances, botLevel);
                };
            }, { frequency: "Always" });
            container.afterResolution("BotLevelGenerator", (_t, result) => {
                result.generateBotLevel = (levelDetails, botGenerationDetails, bot) => {
                    return genBotLvl.genBotLvl(levelDetails, botGenerationDetails, bot);
                };
            }, { frequency: "Always" });
        }
        if (modConfig.trader_changes == true) {
            container.afterResolution("TraderAssortHelper", (_t, result) => {
                result.resetExpiredTrader = (trader) => {
                    return traderRefersh.myResetExpiredTrader(trader);
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
                    const helper = new helper_1.Helper(postLoadTables, arrays);
                    const tieredFlea = new fleamarket_1.TieredFlea(postLoadTables);
                    const player = new player_1.Player(logger, postLoadTables, modConfig, custProfile, botHealth);
                    const randomizeTraderAssort = new traders_1.RandomizeTraderAssort();
                    let pmcData = profileHelper.getPmcProfile(sessionID);
                    let scavData = profileHelper.getScavProfile(sessionID);
                    try {
                        var healthProp = pmcData?.Health;
                        var hydroProp = pmcData?.Health?.Hydration;
                        if (healthProp !== undefined) {
                            player.correctNegativeHP(pmcData);
                            player.setPlayerHealth(pmcData, scavData);
                            if (hydroProp !== undefined) {
                                if (modConfig.revert_med_changes == true && modConfig.med_changes == false) {
                                    this.revertMeds(pmcData, helper);
                                    this.revertMeds(scavData, helper);
                                    modConfig.revert_med_changes = false;
                                    helper.saveToJSONFile(medRevertCount, 'db/saved/info.json');
                                    helper.saveToJSONFile(modConfig, 'config/config.json');
                                    logger.info("Realism Mod: Meds in Inventory/Stash Reverted To Defaults");
                                }
                                if (modConfig.med_changes == true) {
                                    this.checkMeds(pmcData, pmcData.Info.Experience, helper, player, logger);
                                    this.checkMeds(scavData, pmcData.Info.Experience, helper, player, logger);
                                }
                                if (modConfig.med_changes == false) {
                                    helper.removeCustomItems(pmcData);
                                    pmcData.Health.Hydration.Maximum = player.defaultHydration;
                                    pmcData.Health.Energy.Maximum = player.defaultEnergy;
                                    if (pmcData.Health.Energy.Current > pmcData.Health.Energy.Maximum) {
                                        pmcData.Health.Hydration.Current = player.defaultHydration;
                                        pmcData.Health.Energy.Current = player.defaultEnergy;
                                    }
                                }
                            }
                        }
                        if (modConfig.dev_mode == true && pmcData?.Info !== undefined) {
                            pmcData.Info.AccountType = 1;
                            pmcData.Info.MemberCategory = 1;
                        }
                        if (modConfig.dev_mode == false && pmcData?.Info !== undefined) {
                            pmcData.Info.AccountType = 0;
                            pmcData.Info.MemberCategory = 2;
                        }
                        this.checkForEvents(logger, seasonalEventsService);
                        if (modConfig.trader_changes == true) {
                            randomizeTraderAssort.loadRandomizedTraderStock();
                        }
                        if (modConfig.tiered_flea == true) {
                            this.updateFlea(pmcData, logger, tieredFlea, ragfairOfferGenerator, container, arrays);
                        }
                        if (modConfig.boss_spawns == true) {
                            this.setBossSpawnChance(pmcData, postLoadTables.locations);
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
                    const player = new player_1.Player(logger, postLoadtables, modConfig, custProfile, botHealth);
                    const arrays = new arrays_1.Arrays(postLoadtables);
                    const helper = new helper_1.Helper(postLoadtables, arrays);
                    let pmcData = profileHelper.getPmcProfile(sessionID);
                    let scavData = profileHelper.getScavProfile(sessionID);
                    try {
                        if (modConfig.med_changes == true) {
                            this.checkMeds(pmcData, pmcData.Info.Experience, helper, player, logger);
                            this.checkMeds(scavData, scavData.Info.Experience, helper, player, logger);
                        }
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
                url: "/client/match/offline/start",
                action: (url, info, sessionID, output) => {
                    try {
                        const airConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.AIRDROP);
                        const postLoadDBServer = container.resolve("DatabaseServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const profileHelper = container.resolve("ProfileHelper");
                        const appContext = container.resolve("ApplicationContext");
                        const weatherController = container.resolve("WeatherController");
                        const seasonalEventsService = container.resolve("SeasonalEventService");
                        const matchinfoRegPlayer = appContext.getLatestValue(ContextVariableType_1.ContextVariableType.REGISTER_PLAYER_REQUEST).getValue();
                        const matchInfoStartOff = appContext.getLatestValue(ContextVariableType_1.ContextVariableType.MATCH_INFO).getValue();
                        const botConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
                        const arrays = new arrays_1.Arrays(postLoadTables);
                        const helper = new helper_1.Helper(postLoadTables, arrays);
                        const bots = new bots_1.Bots(logger, postLoadTables, configServer, modConfig, arrays, helper);
                        const seasonalEvents = new seasonalevents_1.SeasonalEventsHandler(logger, postLoadTables, modConfig, arrays, seasonalEventsService);
                        const time = weatherController.generate().time;
                        const mapNameRegPlayer = matchinfoRegPlayer.locationId;
                        const mapNameStartOffl = matchInfoStartOff.locationName;
                        helper_1.RaidInfoTracker.mapName = mapNameStartOffl;
                        helper_1.RaidInfoTracker.mapNameUnreliable = mapNameRegPlayer;
                        let realTime = "";
                        let mapType = "";
                        let pmcData = profileHelper.getPmcProfile(sessionID);
                        if (mapNameStartOffl === "Laboratory") {
                            botConf.pmc.convertIntoPmcChance["pmcbot"].min = 15;
                            botConf.pmc.convertIntoPmcChance["pmcbot"].max = 25;
                        }
                        if (matchInfoStartOff.dateTime === "PAST") {
                            realTime = getTime(time, 12);
                        }
                        if (matchInfoStartOff.dateTime === "CURR") {
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
                            if ((mapNameRegPlayer != "factory4_night" && parseInt(h) >= 5 && parseInt(h) < 22) || (mapNameRegPlayer === "factory4_day" || mapNameStartOffl === "Laboratory")) {
                                TOD = "day";
                            }
                            else {
                                TOD = "night";
                            }
                            return TOD;
                        }
                        for (let map in arrays.cqbMaps) {
                            if (arrays.cqbMaps[map] === mapNameStartOffl) {
                                mapType = "cqb";
                            }
                        }
                        for (let map in arrays.outdoorMaps) {
                            if (arrays.outdoorMaps[map] === mapNameStartOffl) {
                                mapType = "outdoor";
                            }
                        }
                        for (let map in arrays.urbanMaps) {
                            if (arrays.urbanMaps[map] === mapNameStartOffl) {
                                mapType = "urban";
                            }
                        }
                        helper_1.RaidInfoTracker.TOD = getTOD(realTime);
                        helper_1.RaidInfoTracker.mapType = mapType;
                        if (modConfig.pmc_types == true) {
                            if (helper_1.RaidInfoTracker.TOD === "day") {
                                botConf.pmc.pmcType = pmcTypes.pmcTypeDay;
                            }
                            if (helper_1.RaidInfoTracker.TOD === "night") {
                                botConf.pmc.pmcType = pmcTypes.pmcTypeNight;
                            }
                        }
                        if (modConfig.bot_changes) {
                            this.updateBots(pmcData, logger, modConfig, bots, helper);
                            if (helper_1.EventTracker.isChristmas == true) {
                                logger.warning("====== Giving Bots Christmas Presents, Don't Be A Scrooge! ======");
                                seasonalEvents.giveBotsChristmasPresents();
                            }
                        }
                        if (modConfig.airdrop_changes == true) {
                            if (helper_1.RaidInfoTracker.TOD === "day") {
                                this.updateAirdrops(logger, modConfig, airConf, helper, [60, 60, 30, 30, 20, 15, 15, 15, 1]);
                            }
                            if (helper_1.RaidInfoTracker.TOD === "night") {
                                this.updateAirdrops(logger, modConfig, airConf, helper, [10, 10, 10, 10, 30, 40, 40, 40, 1]);
                            }
                        }
                        if (modConfig.logEverything == true) {
                            logger.warning("Map Name = " + mapNameStartOffl);
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
                    const saveServer = container.resolve("SaveServer");
                    const arrays = new arrays_1.Arrays(postLoadTables);
                    const tieredFlea = new fleamarket_1.TieredFlea(postLoadTables);
                    const player = new player_1.Player(logger, postLoadTables, modConfig, custProfile, botHealth);
                    let pmcData = profileHelper.getPmcProfile(sessionID);
                    // logger.warning("Saved Map = " + pmcData.);
                    try {
                        if (modConfig.tiered_flea == true) {
                            this.updateFlea(pmcData, logger, tieredFlea, ragfairOfferGenerator, container, arrays);
                        }
                        player.correctNegativeHP(pmcData);
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
        const helper = new helper_1.Helper(tables, arrays);
        const ammo = new ammo_1.Ammo(logger, tables, modConfig);
        const armor = new armor_1.Armor(logger, tables, modConfig);
        const attachBase = new attatchment_base_1.AttatchmentBase(logger, tables, arrays, modConfig);
        const attachStats = new attatchment_stats_1.AttatchmentStats(logger, tables, modConfig, arrays);
        const bots = new bots_1.Bots(logger, tables, configServer, modConfig, arrays, helper);
        const items = new items_1._Items(logger, tables, modConfig, inventoryConf);
        const meds = new meds_1.Meds(logger, tables, modConfig, medItems, buffs);
        const player = new player_1.Player(logger, tables, modConfig, custProfile, botHealth, medItems);
        const weaponsGlobals = new weapons_globals_1.WeaponsGlobals(logger, tables, modConfig);
        const flea = new fleamarket_1.FleamarketGlobal(logger, tables, modConfig);
        const codegen = new code_gen_1.CodeGen(logger, tables, modConfig, helper, arrays);
        const custFleaConf = new fleamarket_1.FleamarketConfig(logger, AKIFleaConf, modConfig, custFleaBlacklist);
        const quests = new quests_1.Quests(logger, tables, modConfig);
        const traders = new traders_1.Traders(logger, tables, modConfig, traderConf, arrays, helper);
        const airdrop = new airdrops_1.Airdrops(logger, modConfig, airConf);
        const maps = new maps_1.Maps(logger, tables, modConfig);
        const gear = new gear_1.Gear(arrays, tables);
        const itemCloning = new item_cloning_1.ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        this.dllChecker(logger, modConfig);
        if (modConfig.trader_changes == true) {
            itemCloning.createCustomWeapons();
        }
        // codegen.attTemplatesCodeGen();
        // codegen.weapTemplatesCodeGen();
        // codegen.armorTemplatesCodeGen();
        codegen.pushModsToServer();
        codegen.pushWeaponsToServer();
        codegen.pushArmorToServer();
        codegen.descriptionGen();
        if (modConfig.armor_mouse_penalty == true) {
            armor.armorMousePenalty();
        }
        if (modConfig.headgear_conflicts == true) {
            gear.loadGearConflicts();
        }
        if (modConfig.open_zones_fix == true) {
            maps.openZonesFix();
        }
        if (modConfig.boss_spawns == true) {
            maps.loadSpawnChanges();
        }
        if (modConfig.airdrop_changes == true) {
            airdrop.loadAirdrops();
        }
        if (modConfig.bot_changes == true) {
            bots.loadBots();
        }
        if (modConfig.increased_bot_cap == true) {
            bots.increaseBotCap();
        }
        if (modConfig.bot_names == true) {
            bots.botNames();
        }
        if (modConfig.guarantee_boss_spawn == true) {
            bots.forceBossSpawns();
        }
        bots.botDifficulty();
        if (modConfig.realistic_ballistics == true) {
            ammo.loadAmmoStats();
            armor.loadArmor();
            bots.setBotHealth();
        }
        if (modConfig.med_changes == true) {
            itemCloning.createCustomMedItems();
            meds.loadMeds();
            bots.botMeds();
        }
        custFleaConf.loadFleaConfig();
        flea.loadFleaGlobal();
        if (modConfig.malf_changes == true) {
            ammo.loadGlobalMalfChanges();
        }
        if (modConfig.recoil_attachment_overhaul && helper_1.ConfigChecker.dllIsPresent == true) {
            ammo.loadAmmoFirerateChanges();
            quests.fixMechancicQuests();
            attachStats.loadAttStats();
        }
        if (modConfig.remove_fir_req == true) {
            quests.removeFIRQuestRequire();
        }
        if (modConfig.trader_changes == true) {
            traders.loadTraderTweaks();
            traders.addItemsToAssorts();
            traders.setLoyaltyLevels();
        }
        if (modConfig.bot_changes == true) {
            attachBase.loadAttRequirements();
        }
        attachBase.loadAttCompat();
        items.loadItemsRestrictions();
        player.loadPlayerStats();
        player.playerProfiles();
        weaponsGlobals.loadGlobalWeps();
    }
    postAkiLoad(container) {
        this.modLoader = container.resolve("PreAkiModLoader");
    }
    dllChecker(logger, modConfig) {
        const plugin = _path.join(__dirname, '../../../../BepInEx/plugins/RealismMod.dll');
        if (fs.existsSync(plugin)) {
            helper_1.ConfigChecker.dllIsPresent = true;
            if (modConfig.recoil_attachment_overhaul == false) {
                logger.error("RealismMod.dll is present at path: " + plugin + ", but 'Recoil, Ballistics and Attachment Overhaul' is disabled, plugin will disable itself.");
            }
        }
        else {
            if (modConfig.recoil_attachment_overhaul == true) {
                logger.error("RealismMod.dll is missing form path: " + plugin + ", but 'Recoil, Ballistics and Attachment Overhaul' is enabled, server will disable these changes.");
            }
            helper_1.ConfigChecker.dllIsPresent = false;
        }
    }
    revertMeds(pmcData, helper) {
        helper.revertMedItems(pmcData);
    }
    checkForEvents(logger, seasonalEventsService) {
        const isChristmasActive = seasonalEventsService.christmasEventEnabled();
        helper_1.EventTracker.isChristmas = isChristmasActive;
        if (isChristmasActive == true) {
            logger.warning("Merry Christmas!");
        }
    }
    checkMeds(pmcData, pmcEXP, helper, player, logger) {
        helper.correctMedItems(pmcData, pmcEXP);
        pmcData.Health.Hydration.Maximum = player.hydration;
        pmcData.Health.Energy.Maximum = player.energy;
        if (pmcData.Info.Experience == 0) {
            pmcData.Health.Hydration.Current = player.hydration;
            pmcData.Health.Energy.Current = player.energy;
            logger.info("Realism Mod: New Profile Meds And Hydration/Energy Adjusted");
        }
        if (modConfig.logEverything == true) {
            logger.info("Realism Mod: Meds Checked");
        }
    }
    fleaHelper(fetchTier, ragfairOfferGen, container) {
        var offers = container.resolve("RagfairOfferService").getOffers();
        for (let o in offers) {
            container.resolve("RagfairOfferService").removeOfferById(offers[o]._id);
        }
        let traders = container.resolve("RagfairServer").getUpdateableTraders();
        fetchTier;
        ragfairOfferGen.generateDynamicOffers();
        for (let traderID in traders) {
            ragfairOfferGen.generateFleaOffersForTrader(traders[traderID]);
        }
    }
    updateFlea(pmcData, logger, flea, ragfairOfferGen, container, arrays) {
        var property = pmcData?.Info?.Level;
        if (property === undefined) {
            this.fleaHelper(flea.flea0, ragfairOfferGen, container);
            logger.info("Realism Mod: Fleamarket Tier Set To Default (tier 0)");
        }
        if (property !== undefined) {
            if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 5) {
                this.fleaHelper(flea.flea0(), ragfairOfferGen, container);
                logger.info("Realism mod: Fleamarket Locked At Tier 0");
            }
            if (pmcData.Info.Level >= 5 && pmcData.Info.Level < 10) {
                this.fleaHelper(flea.flea1(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
            }
            if (pmcData.Info.Level >= 10 && pmcData.Info.Level < 15) {
                this.fleaHelper(flea.flea2(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
            }
            if (pmcData.Info.Level >= 15 && pmcData.Info.Level < 20) {
                this.fleaHelper(flea.flea3(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
            }
            if (pmcData.Info.Level >= 20 && pmcData.Info.Level < 25) {
                this.fleaHelper(flea.flea4(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
            }
            if (pmcData.Info.Level >= 25 && pmcData.Info.Level < 30) {
                this.fleaHelper(flea.flea5(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
            }
            if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
                this.fleaHelper(flea.flea6(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
            }
            if (pmcData.Info.Level >= 35) {
                this.fleaHelper(flea.fleaFullUnlock(), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Unlocked");
            }
        }
    }
    setBossSpawnChance(pmcData, mapDB) {
        if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 5) {
            this.bossSpawnHelper(mapDB, 0.01);
        }
        if (pmcData.Info.Level >= 5 && pmcData.Info.Level < 10) {
            this.bossSpawnHelper(mapDB, 0.1);
        }
        if (pmcData.Info.Level >= 10 && pmcData.Info.Level < 15) {
            this.bossSpawnHelper(mapDB, 0.4);
        }
        if (pmcData.Info.Level >= 15 && pmcData.Info.Level < 20) {
            this.bossSpawnHelper(mapDB, 0.5);
        }
        if (pmcData.Info.Level >= 20 && pmcData.Info.Level < 25) {
            this.bossSpawnHelper(mapDB, 0.6);
        }
        if (pmcData.Info.Level >= 25 && pmcData.Info.Level < 30) {
            this.bossSpawnHelper(mapDB, 0.8);
        }
        if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
            this.bossSpawnHelper(mapDB, 1);
        }
        if (pmcData.Info.Level >= 35 && pmcData.Info.Level < 40) {
            this.bossSpawnHelper(mapDB, 1.2);
        }
        if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
            this.bossSpawnHelper(mapDB, 1.3);
        }
    }
    bossSpawnHelper(mapDB, chanceMulti) {
        for (let i in mapDB) {
            if (mapDB[i].base?.BossLocationSpawn !== undefined) {
                for (let k in mapDB[i].base.BossLocationSpawn) {
                    let chance = Math.round(mapDB[i].base.BossLocationSpawn[k].BossChance * chanceMulti);
                    mapDB[i].base.BossLocationSpawn[k].BossChance = chance;
                }
            }
        }
    }
    getBotTier(pmcData, bots, helper) {
        this.setBotTier(pmcData, "scav", bots, helper);
        this.setBotTier(pmcData, "bear", bots, helper);
        this.setBotTier(pmcData, "usec", bots, helper);
        this.setBotTier(pmcData, "raider", bots, helper);
        this.setBotTier(pmcData, "rogue", bots, helper);
        this.setBotTier(pmcData, "goons", bots, helper);
        this.setBotTier(pmcData, "killa", bots, helper);
        this.setBotTier(pmcData, "tagilla", bots, helper);
    }
    setBotTier(pmcData, type, bots, helper) {
        var tier = 1;
        var tierArray = [1, 2, 3, 4];
        if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 5) {
            tier = helper.probabilityWeighter(tierArray, [15, 1, 0, 0]);
        }
        if (pmcData.Info.Level >= 5 && pmcData.Info.Level < 10) {
            tier = helper.probabilityWeighter(tierArray, [20, 5, 1, 0]);
        }
        if (pmcData.Info.Level >= 10 && pmcData.Info.Level < 15) {
            tier = helper.probabilityWeighter(tierArray, [15, 10, 5, 1]);
        }
        if (pmcData.Info.Level >= 15 && pmcData.Info.Level < 20) {
            tier = helper.probabilityWeighter(tierArray, [5, 20, 5, 1]);
        }
        if (pmcData.Info.Level >= 20 && pmcData.Info.Level < 25) {
            tier = helper.probabilityWeighter(tierArray, [5, 15, 15, 5]);
        }
        if (pmcData.Info.Level >= 25 && pmcData.Info.Level < 30) {
            tier = helper.probabilityWeighter(tierArray, [1, 2, 30, 10]);
        }
        if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
            tier = helper.probabilityWeighter(tierArray, [1, 2, 8, 30]);
        }
        if (pmcData.Info.Level >= 35 && pmcData.Info.Level) {
            tier = helper.probabilityWeighter(tierArray, [1, 2, 5, 40]);
        }
        if (type === "tagilla") {
            if (tier == 1) {
                bots.tagillaLoad1();
            }
            if (tier == 2) {
                bots.tagillaLoad2();
            }
            if (tier == 3) {
                bots.tagillaLoad2();
            }
            if (tier == 4) {
                bots.tagillaLoad3();
            }
        }
        if (type === "killa") {
            if (tier == 1) {
                bots.killaLoad1();
            }
            if (tier == 2) {
                bots.killaLoad2();
            }
            if (tier == 3) {
                bots.killaLoad2();
            }
            if (tier == 4) {
                bots.killaLoad3();
            }
        }
        if (type === "goons") {
            if (tier == 1) {
                bots.goonsLoad1();
            }
            if (tier == 2) {
                bots.goonsLoad2();
            }
            if (tier == 3) {
                bots.goonsLoad2();
            }
            if (tier == 4) {
                bots.goonsLoad3();
            }
        }
        if (type === "raider") {
            if (tier == 1) {
                bots.raiderLoad1();
            }
            if (tier == 2) {
                bots.raiderLoad2();
            }
            if (tier == 3) {
                bots.raiderLoad2();
            }
            if (tier == 4) {
                bots.raiderLoad3();
            }
        }
        if (type === "rogue") {
            if (tier == 1) {
                bots.rogueLoad1();
            }
            if (tier == 2) {
                bots.rogueLoad2();
            }
            if (tier == 3) {
                bots.rogueLoad2();
            }
            if (tier == 4) {
                bots.rogueLoad3();
            }
        }
        if (type === "scav") {
            if (tier == 1) {
                bots.scavLoad1();
            }
            if (tier == 2) {
                bots.scavLoad2();
            }
            if (tier == 3) {
                bots.scavLoad3();
            }
            if (tier == 4) {
                bots.scavLoad3();
            }
        }
        if (type === "usec") {
            if (tier == 1) {
                bots.usecLoad1();
            }
            if (tier == 2) {
                bots.usecLoad2();
            }
            if (tier == 3) {
                bots.usecLoad3();
            }
            if (tier == 4) {
                bots.usecLoad4();
            }
        }
        if (type === "bear") {
            if (tier == 1) {
                bots.bearLoad1();
            }
            if (tier == 2) {
                bots.bearLoad2();
            }
            if (tier == 3) {
                bots.bearLoad3();
            }
            if (tier == 4) {
                bots.bearLoad4();
            }
        }
    }
    updateBots(pmcData, logger, config, bots, helper) {
        var property = pmcData?.Info?.Level;
        if (property === undefined) {
            bots.botConfig1();
            bots.scavLoad1();
            bots.usecLoad1();
            bots.bearLoad1();
            bots.rogueLoad1();
            bots.raiderLoad1();
            bots.goonsLoad1();
            bots.killaLoad1();
            bots.tagillaLoad1();
            if (modConfig.force_boss_items == true) {
                bots.forceBossItems();
            }
            logger.info("Realism Mod: Bots Have Been Set To Default (Tier 1)");
            if (config.logEverything == true) {
                logger.info("Realism Mod: Bots Have Been Reconfigured");
            }
        }
        if (property !== undefined) {
            if (config.bot_testing == true) {
                bots.botTest(config.bot_test_tier);
                logger.warning("Realism Mod: Bots Are In Test Mode");
            }
            if (config.bot_testing == false) {
                this.getBotTier(pmcData, bots, helper);
                if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 15) {
                    bots.botConfig1();
                    logger.info("Realism Mod: Bots Have Been Set To Base Tier 1");
                }
                if (pmcData.Info.Level >= 16 && pmcData.Info.Level < 25) {
                    bots.botConfig2();
                    logger.info("Realism Mod: Bots Have Been Adjusted To Base Tier 2");
                }
                if (pmcData.Info.Level >= 26) {
                    bots.botConfig3();
                    logger.info("Realism Mod: Bots Have Been Adjusted To Base Tier 3");
                }
                if (config.logEverything == true) {
                    logger.info("Realism Mod: Bots Base Tier Has Been Reconfigured");
                }
            }
            if (modConfig.force_boss_items == true) {
                bots.forceBossItems();
            }
        }
    }
    updateAirdrops(logger, modConfig, airConf, helper, weights) {
        var airdropLootArr = ["medical_loot", "provisions_loot", "materials_loot", "supplies_loot", "electronics_loot", "ammo_loot", "weapons_loot", "gear_loot", "tp"];
        var loot = helper.probabilityWeighter(airdropLootArr, weights);
        if (loot === "medical_loot") {
            airConf.loot = airdropLoot.medical_loot;
        }
        if (loot === "provisions_loot") {
            airConf.loot = airdropLoot.provisions_loot;
        }
        if (loot === "materials_loot") {
            airConf.loot = airdropLoot.materials_loot;
        }
        if (loot === "supplies_loot") {
            airConf.loot = airdropLoot.supplies_loot;
        }
        if (loot === "electronics_loot") {
            airConf.loot = airdropLoot.electronics_loot;
        }
        if (loot === "ammo_loot") {
            airConf.loot = airdropLoot.ammo_loot;
        }
        if (loot === "weapons_loot") {
            airConf.loot = airdropLoot.weapons_loot;
        }
        if (loot === "gear_loot") {
            airConf.loot = airdropLoot.gear_loot;
        }
        if (loot === "tp") {
            airConf.loot = airdropLoot.tp;
        }
        if (modConfig.logEverything == true) {
            logger.info("Aidrop Loot = " + loot);
            logger.info("Realism Mod: Airdrop Loot Has Been Reconfigured");
        }
    }
}
module.exports = { mod: new Main() };
