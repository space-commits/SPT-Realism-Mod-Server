"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
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
const weapons_stats_1 = require("./weapons_stats");
const bots_1 = require("./bots");
const bot_wep_gen_1 = require("./bot_wep_gen");
const bot_loot_serv_1 = require("./bot_loot_serv");
const items_1 = require("./items");
const code_gen_1 = require("./code_gen");
const quests_1 = require("./quests");
const traders_1 = require("./traders");
const airdrops_1 = require("./airdrops");
const medRevertCount = require("../db/saved/info.json");
const customFleaConfig = require("../db/traders/ragfair/blacklist.json");
const medItems = require("../db/items/med_items.json");
const crafts = require("../db/items/hideout_crafts.json");
const buffs = require("../db/items/buffs.json");
const custProfile = require("../db/profile/profile.json");
const botHealth = require("../db/bots/botHealth.json");
const modConfig = require("../config/config.json");
const airdropLoot = require("../db/airdrops/airdrop_loot.json");
class Mod {
    preAkiLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const jsonUtil = container.resolve("JsonUtil");
        const pmcLootGenerator = container.resolve("PMCLootGenerator");
        const hashUtil = container.resolve("HashUtil");
        const randomUtil = container.resolve("RandomUtil");
        const weightedRandomHelper = container.resolve("WeightedRandomHelper");
        const staticRouterModService = container.resolve("StaticRouterModService");
        const HttpResponse = container.resolve("HttpResponseUtil");
        const configServer = container.resolve("ConfigServer");
        const databaseServer = container.resolve("DatabaseServer");
        const fleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const tables = databaseServer.getTables();
        const router = container.resolve("DynamicRouterModService");
        this.path = require("path");
        const flea = new fleamarket_1.FleamarketConfig(logger, tables, fleaConf, modConfig, customFleaConfig);
        flea.loadFleaConfig();
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
                const botGeneratorHelper = container.resolve("BotGeneratorHelper");
                const itemHelper = container.resolve("ItemHelper");
                const botWeaponGeneratorHelper = container.resolve("BotWeaponGeneratorHelper");
                const inventoryMagGenComponents = container.resolveAll("InventoryMagGen");
                const _botWepGen = new bot_wep_gen_1.BotWepGen(jsonUtil, logger, hashUtil, databaseServer, itemHelper, weightedRandomHelper, botGeneratorHelper, randomUtil, configServer, botWeaponGeneratorHelper, inventoryMagGenComponents);
                result.generateWeaponByTpl = (sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc) => {
                    return _botWepGen.botWepGen(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc);
                };
            }, { frequency: "Always" });
            container.afterResolution("BotGeneratorHelper", (_t, result) => {
                const probabilityHelper = container.resolve("ProbabilityHelper");
                const durabilityLimitsHelper = container.resolve("DurabilityLimitsHelper");
                const itemHelper = container.resolve("ItemHelper");
                const inventoryHelper = container.resolve("InventoryHelper");
                const containerHelper = container.resolve("ContainerHelper");
                const botEquipFilterServ = container.resolve("BotEquipmentFilterService");
                const itemFilterServ = container.resolve("ItemFilterService");
                const profileHelper = container.resolve("ProfileHelper");
                const botWeaponGeneratorHelper = container.resolve("BotWeaponGeneratorHelper");
                const _botModGen = new bot_wep_gen_1.BotModGen(logger, jsonUtil, hashUtil, randomUtil, probabilityHelper, databaseServer, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, botEquipFilterServ, itemFilterServ, profileHelper, botWeaponGeneratorHelper, configServer);
                result.generateExtraPropertiesForItem = (itemTemplate, botRole = null) => {
                    return _botModGen.genExtraItemProps(itemTemplate, botRole);
                };
                result.generateModsForWeapon = (sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole) => {
                    return _botModGen.botModGen(sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole);
                };
            }, { frequency: "Always" });
            container.afterResolution("BotLootCacheService", (_t, result) => {
                const ragfairPriceServ = container.resolve("RagfairPriceService");
                const botLootServ = new bot_loot_serv_1.BotLootServer(logger, jsonUtil, databaseServer, pmcLootGenerator, ragfairPriceServ);
                result.getLootFromCache = (botRole, isPmc, lootType, lootPool) => {
                    return botLootServ.getLootCache(botRole, isPmc, lootType, lootPool);
                };
            }, { frequency: "Always" });
        }
        staticRouterModService.registerStaticRouter("CheckProfile", [
            {
                url: "/client/game/version/validate",
                action: (url, info, sessionID, output) => {
                    const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
                    const databaseServer2 = container.resolve("DatabaseServer");
                    const profileHelper = container.resolve("ProfileHelper");
                    const tables = databaseServer2.getTables();
                    const arrays = new arrays_1.Arrays(tables);
                    const helper = new helper_1.Helper(tables, arrays, logger);
                    const bots = new bots_1.Bots(logger, tables, configServer, modConfig, arrays, helper);
                    const tieredFlea = new fleamarket_1.TieredFlea(tables);
                    const player = new player_1.Player(logger, tables, modConfig, custProfile, botHealth);
                    const airConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.AIRDROP);
                    let pmcData = profileHelper.getPmcProfile(sessionID);
                    let scavData = profileHelper.getScavProfile(sessionID);
                    try {
                        var healthProp = pmcData?.Health;
                        var hydroProp = pmcData?.Health?.Hydration;
                        if (healthProp !== undefined) {
                            if (modConfig.realism == false) {
                                pmcData.Health.BodyParts["Head"].Health.Maximum = player.defaultHeadHealth;
                                pmcData.Health.BodyParts["Chest"].Health.Maximum = player.defaultChestHealth;
                                pmcData.Health.BodyParts["Stomach"].Health.Maximum = player.defaultStomaHealth;
                                pmcData.Health.BodyParts["LeftArm"].Health.Maximum = player.defaultArmHealth;
                                pmcData.Health.BodyParts["RightArm"].Health.Maximum = player.defaultArmHealth;
                                pmcData.Health.BodyParts["LeftLeg"].Health.Maximum = player.defaultLegHealth;
                                pmcData.Health.BodyParts["RightLeg"].Health.Maximum = player.defaultLegHealth;
                                pmcData.Health.Temperature.Current = player.defaultTemp;
                                pmcData.Health.Temperature.Maximum = player.defaultTemp;
                                if (pmcData.Health.BodyParts["Chest"].Health.Current > pmcData.Health.BodyParts["Chest"].Health.Maximum) {
                                    pmcData.Health.BodyParts["Head"].Health.Current = player.defaultHeadHealth;
                                    pmcData.Health.BodyParts["Chest"].Health.Current = player.defaultChestHealth;
                                    pmcData.Health.BodyParts["Stomach"].Health.Current = player.defaultStomaHealth;
                                    pmcData.Health.BodyParts["LeftArm"].Health.Current = player.defaultArmHealth;
                                    pmcData.Health.BodyParts["RightArm"].Health.Current = player.defaultArmHealth;
                                    pmcData.Health.BodyParts["LeftLeg"].Health.Current = player.defaultLegHealth;
                                    pmcData.Health.BodyParts["RightLeg"].Health.Current = player.defaultLegHealth;
                                }
                                if (modConfig.logEverything == true) {
                                    logger.info("Realism Mod: Player Health Set To Vanilla Defaults");
                                }
                            }
                            if (modConfig.realism == true) {
                                pmcData.Health.BodyParts["Head"].Health.Maximum = player.headHealth;
                                pmcData.Health.BodyParts["Chest"].Health.Maximum = player.chestHealth;
                                pmcData.Health.BodyParts["Stomach"].Health.Maximum = player.stomaHealth;
                                pmcData.Health.BodyParts["LeftArm"].Health.Maximum = player.armHealth;
                                pmcData.Health.BodyParts["RightArm"].Health.Maximum = player.armHealth;
                                pmcData.Health.BodyParts["LeftLeg"].Health.Maximum = player.legHealth;
                                pmcData.Health.BodyParts["RightLeg"].Health.Maximum = player.legHealth;
                                pmcData.Health.Temperature.Current = player.tempCurr;
                                pmcData.Health.Temperature.Maximum = player.tempMax;
                                if (pmcData.Info.Experience == 0 || pmcData.Health.BodyParts["Head"].Health.Current > player.headHealth) {
                                    pmcData.Health.BodyParts["Head"].Health.Current = player.headHealth;
                                    pmcData.Health.BodyParts["Chest"].Health.Current = player.chestHealth;
                                    pmcData.Health.BodyParts["Stomach"].Health.Current = player.stomaHealth;
                                    pmcData.Health.BodyParts["LeftArm"].Health.Current = player.armHealth;
                                    pmcData.Health.BodyParts["RightArm"].Health.Current = player.armHealth;
                                    pmcData.Health.BodyParts["LeftLeg"].Health.Current = player.legHealth;
                                    pmcData.Health.BodyParts["RightLeg"].Health.Current = player.legHealth;
                                    logger.info("Realism Mod: Profile Health Has Been Corrected");
                                }
                                if (modConfig.logEverything == true) {
                                    logger.info("Realism Mod: Player Health Has Been Adjusted");
                                }
                            }
                            if (hydroProp !== undefined) {
                                if (modConfig.revert_med_changes == true && modConfig.med_changes == false && medRevertCount.MedRevertCount <= 4) {
                                    this.revertMeds(pmcData, helper);
                                    this.revertMeds(scavData, helper);
                                    medRevertCount.MedRevertCount += 1;
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
                        this.updateFlea(pmcData, logger, modConfig, tieredFlea, ragfairOfferGenerator, container, arrays);
                        this.updateBots(pmcData, logger, modConfig, bots, helper);
                        if (modConfig.airdrop_changes == true) {
                            this.updateAirdrops(logger, modConfig, airConf, helper);
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
                    const databaseServer3 = container.resolve("DatabaseServer");
                    const tables = databaseServer3.getTables();
                    const player = new player_1.Player(logger, tables, modConfig, custProfile, botHealth);
                    const arrays = new arrays_1.Arrays(tables);
                    const helper = new helper_1.Helper(tables, arrays, logger);
                    let pmcData = profileHelper.getPmcProfile(sessionID);
                    try {
                        if (modConfig.med_changes == true) {
                            this.checkMeds(pmcData, pmcData.Info.Experience, helper, player, logger);
                        }
                        if (modConfig.realism == true) {
                            this.correctNewHealth(pmcData, player, logger);
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
        staticRouterModService.registerStaticRouter("runAtRaidEnd", [
            {
                url: "/raid/profile/save",
                action: (url, info, sessionID, output) => {
                    const databaseServer4 = container.resolve("DatabaseServer");
                    const configServer = container.resolve("ConfigServer");
                    const tables = databaseServer4.getTables();
                    const profileHelper = container.resolve("ProfileHelper");
                    const ragfairOfferGenerator = container.resolve("RagfairOfferGenerator");
                    const airConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.AIRDROP);
                    const arrays = new arrays_1.Arrays(tables);
                    const tieredFlea = new fleamarket_1.TieredFlea(tables);
                    const helper = new helper_1.Helper(tables, arrays, logger);
                    const bots = new bots_1.Bots(logger, tables, configServer, modConfig, arrays, helper);
                    let pmcData = profileHelper.getPmcProfile(sessionID);
                    try {
                        this.updateBots(pmcData, logger, modConfig, bots, helper);
                        this.updateFlea(pmcData, logger, modConfig, tieredFlea, ragfairOfferGenerator, container, arrays);
                        if (modConfig.airdrop_changes == true) {
                            this.updateAirdrops(logger, modConfig, airConf, helper);
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
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const tables = databaseServer.getTables();
        const AKIFleaConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const jsonUtil = container.resolve("JsonUtil");
        const airConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.AIRDROP);
        const traderConf = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const arrays = new arrays_1.Arrays(tables);
        const helper = new helper_1.Helper(tables, arrays, logger);
        const ammo = new ammo_1.Ammo(logger, tables, modConfig);
        const armor = new armor_1.Armor(logger, tables, modConfig);
        const attatchBase = new attatchment_base_1.AttatchmentBase(logger, tables, arrays, modConfig);
        const attatchStats = new attatchment_stats_1.AttatchmentStats(logger, tables, modConfig, arrays);
        const bots = new bots_1.Bots(logger, tables, configServer, modConfig, arrays, helper);
        const items = new items_1._Items(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const meds = new meds_1.Meds(logger, tables, modConfig, medItems, buffs);
        const player = new player_1.Player(logger, tables, modConfig, custProfile, botHealth);
        const weaponsGlobals = new weapons_globals_1.WeaponsGlobals(logger, tables, modConfig);
        const weaponsStats = new weapons_stats_1.WeaponsStats(logger, tables, modConfig);
        const flea = new fleamarket_1.FleamarketGlobal(logger, tables, modConfig);
        const codegen = new code_gen_1.CodeGen(logger, tables, modConfig, helper, arrays);
        const custFleaConf = new fleamarket_1.FleamarketConfig(logger, tables, AKIFleaConf, modConfig, customFleaConfig);
        const quests = new quests_1.Quests(logger, tables, modConfig);
        const traders = new traders_1.Traders(logger, tables, modConfig, traderConf);
        const airdrop = new airdrops_1.Airdrops(logger, tables, modConfig, airConf);
        // codegen.attTemplatesCodeGen();
        // codegen.weapTemplatesCodeGen();
        // codegen.armorTemplatesCodeGen();
        // codegen.pushToAllMods();
        codegen.pushModsToServer();
        codegen.pushWeaponsToServer();
        codegen.pushArmorToServer();
        codegen.descriptionGen();
        if (modConfig.airdrop_changes == true) {
            airdrop.loadAirdrops();
        }
        if (modConfig.trader_changes == true) {
            traders.loadTraders();
        }
        if (modConfig.bot_changes == true) {
            bots.loadBots();
        }
        if (modConfig.realism == true) {
            ammo.loadAmmo();
            armor.loadArmor();
            bots.setBotHealth();
        }
        if (modConfig.med_changes == true) {
            items.createCustomMedItems();
            meds.loadMeds();
        }
        custFleaConf.loadFleaConfig();
        flea.loadFleaGlobal();
        if (modConfig.malf_changes == true) {
            weaponsStats.loadWepStats();
        }
        if (modConfig.recoil_attachment_overhaul) {
            quests.fixMechancicQuests();
        }
        attatchBase.loadAttRestrict();
        attatchStats.loadAttStats();
        items.loadItems();
        player.loadPlayer();
        weaponsGlobals.loadGlobalWeps();
    }
    postAkiLoad(container) {
        this.modLoader = container.resolve("PreAkiModLoader");
    }
    revertMeds(pmcData, helper) {
        helper.revertMedItems(pmcData);
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
    correctNewHealth(pmcData, player, logger) {
        pmcData.Health.BodyParts["Head"].Health.Maximum = player.headHealth;
        pmcData.Health.BodyParts["Chest"].Health.Maximum = player.chestHealth;
        pmcData.Health.BodyParts["Stomach"].Health.Maximum = player.stomaHealth;
        pmcData.Health.BodyParts["LeftArm"].Health.Maximum = player.armHealth;
        pmcData.Health.BodyParts["RightArm"].Health.Maximum = player.armHealth;
        pmcData.Health.BodyParts["LeftLeg"].Health.Maximum = player.legHealth;
        pmcData.Health.BodyParts["RightLeg"].Health.Maximum = player.legHealth;
        pmcData.Health.BodyParts["Head"].Health.Current = player.headHealth;
        pmcData.Health.BodyParts["Chest"].Health.Current = player.chestHealth;
        pmcData.Health.BodyParts["Stomach"].Health.Current = player.stomaHealth;
        pmcData.Health.BodyParts["LeftArm"].Health.Current = player.armHealth;
        pmcData.Health.BodyParts["RightArm"].Health.Current = player.armHealth;
        pmcData.Health.BodyParts["LeftLeg"].Health.Current = player.legHealth;
        pmcData.Health.BodyParts["RightLeg"].Health.Current = player.legHealth;
        pmcData.Health.Temperature.Current = player.tempCurr;
        pmcData.Health.Temperature.Maximum = player.tempMax;
        logger.info("Realism Mod: New Profile Health Has Been Adjusted");
    }
    fleaHelper(tier, ragfairOfferGen, container, arrays) {
        container.resolve("RagfairOfferService").offers = [];
        tier;
        ragfairOfferGen.generateDynamicOffers();
        for (let i in arrays.traderIDs) {
            ragfairOfferGen.generateFleaOffersForTrader(arrays.traderIDs[i]);
        }
    }
    updateFlea(pmcData, logger, config, flea, ragfairOfferGen, container, arrays) {
        var property = pmcData?.Info?.Level;
        if (config.tiered_flea == true) {
            if (property === undefined) {
                this.fleaHelper(flea.flea0(), ragfairOfferGen, container, arrays);
                logger.info("Realism Mod: Fleamarket Tier Set To Default (tier 0)");
            }
            if (property !== undefined) {
                if (pmcData.Info.Level >= 0) {
                    this.fleaHelper(flea.flea0(), ragfairOfferGen, container, arrays);
                    logger.info("Realism mod: Fleamarket Locked At Tier 0");
                }
                if (pmcData.Info.Level >= 5) {
                    this.fleaHelper(flea.flea1(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
                }
                if (pmcData.Info.Level >= 10) {
                    this.fleaHelper(flea.flea2(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
                }
                if (pmcData.Info.Level >= 15) {
                    this.fleaHelper(flea.flea3(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
                }
                if (pmcData.Info.Level >= 20) {
                    this.fleaHelper(flea.flea4(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
                }
                if (pmcData.Info.Level >= 25) {
                    this.fleaHelper(flea.flea5(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
                }
                if (pmcData.Info.Level >= 30) {
                    this.fleaHelper(flea.flea6(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
                }
                if (pmcData.Info.Level >= 35) {
                    this.fleaHelper(flea.fleaFullUnlock(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Unlocked");
                }
            }
        }
    }
    getBotTier(pmcData, bots, helper) {
        this.setBotTier(pmcData, "scav", bots, helper);
        this.setBotTier(pmcData, "bear", bots, helper);
        this.setBotTier(pmcData, "usec", bots, helper);
    }
    setBotTier(pmcData, type, bots, helper) {
        var tier = 1;
        var tierArray = [1, 2, 3, 4];
        if (pmcData.Info.Level >= 0) {
            tier = helper.probabilityWeighter(tierArray, [20, 1, 0, 0]);
        }
        if (pmcData.Info.Level >= 5) {
            tier = helper.probabilityWeighter(tierArray, [20, 5, 1, 0]);
        }
        if (pmcData.Info.Level >= 10) {
            tier = helper.probabilityWeighter(tierArray, [30, 10, 5, 1]);
        }
        if (pmcData.Info.Level >= 15) {
            tier = helper.probabilityWeighter(tierArray, [10, 20, 5, 1]);
        }
        if (pmcData.Info.Level >= 20) {
            tier = helper.probabilityWeighter(tierArray, [5, 15, 15, 1]);
        }
        if (pmcData.Info.Level >= 25) {
            tier = helper.probabilityWeighter(tierArray, [1, 5, 30, 5]);
        }
        if (pmcData.Info.Level >= 30) {
            tier = helper.probabilityWeighter(tierArray, [1, 2, 5, 25]);
        }
        if (pmcData.Info.Level >= 35) {
            tier = helper.probabilityWeighter(tierArray, [1, 2, 5, 35]);
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
        var baseTier = 1;
        var property = pmcData?.Info?.Level;
        if (config.bot_changes == true) {
            if (property === undefined) {
                bots.randomizedPMCBehaviour();
                bots.botConfig1();
                bots.scavLoad1();
                bots.usecLoad1();
                bots.bearLoad1();
                bots.rogueLoad1();
                bots.raiderLoad1();
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
                    bots.randomizedPMCBehaviour();
                    this.getBotTier(pmcData, bots, helper);
                    var baseTiers = [1, 2, 3];
                    if (pmcData.Info.Level >= 0) {
                        baseTier = helper.probabilityWeighter(baseTiers, [10, 1, 0, 0]);
                    }
                    if (pmcData.Info.Level >= 5) {
                        baseTier = helper.probabilityWeighter(baseTiers, [10, 1, 0, 0]);
                    }
                    if (pmcData.Info.Level >= 10) {
                        baseTier = helper.probabilityWeighter(baseTiers, [10, 2, 1, 0]);
                    }
                    if (pmcData.Info.Level >= 15) {
                        baseTier = helper.probabilityWeighter(baseTiers, [10, 3, 1, 0]);
                    }
                    if (pmcData.Info.Level >= 20) {
                        baseTier = helper.probabilityWeighter(baseTiers, [6, 5, 1, 0]);
                    }
                    if (pmcData.Info.Level >= 25) {
                        baseTier = helper.probabilityWeighter(baseTiers, [2, 10, 2, 0]);
                    }
                    if (pmcData.Info.Level >= 30) {
                        baseTier = helper.probabilityWeighter(baseTiers, [1, 5, 15, 0]);
                    }
                    if (pmcData.Info.Level >= 35) {
                        baseTier = helper.probabilityWeighter(baseTiers, [1, 2, 20, 0]);
                    }
                    if (baseTier == 1) {
                        bots.botConfig1();
                        logger.info("Realism Mod: Bots Have Been Set To Base Tier 1");
                    }
                    if (baseTier == 2) {
                        bots.botConfig2();
                        logger.info("Realism Mod: Bots Have Been Adjusted To Base Tier 2");
                    }
                    if (baseTier == 3) {
                        bots.botConfig3();
                        logger.info("Realism Mod: Bots Have Been Adjusted To Base Tier 3");
                    }
                    if (config.logEverything == true) {
                        logger.info("Realism Mod: Bots Base Tier Has Been Reconfigured");
                    }
                }
            }
        }
    }
    updateAirdrops(logger, modConfig, airConf, helper) {
        var airdropLootArr = ["medical_loot", "provisions_loot", "materials_loot", "supplies_loot", "electronics_loot", "ammo_loot", "weapons_loot", "gear_loot", "tp"];
        var weights = [60, 60, 30, 30, 20, 10, 10, 10, 1];
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
module.exports = { mod: new Mod() };
