import { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { BotWeaponGenerator } from "@spt-aki/generators/BotWeaponGenerator";
import { BotGeneratorHelper } from "@spt-aki/helpers/BotGeneratorHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { PMCLootGenerator } from "@spt-aki/generators/PMCLootGenerator";
import { Inventory, Items, Mods, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { RagfairOfferService } from "@spt-aki/services/RagfairOfferService";
import { ContainerHelper } from "@spt-aki/helpers/ContainerHelper";
import { DurabilityLimitsHelper } from "@spt-aki/helpers/DurabilityLimitsHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProbabilityHelper } from "@spt-aki/helpers/ProbabilityHelper";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { CustomItemService } from "../types/services/mod/CustomItemService";
import { RagfairOfferGenerator } from "@spt-aki/generators/RagfairOfferGenerator";
import { GenerateWeaponResult } from "@spt-aki/models/spt/bots/GenerateWeaponResult";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { LootCacheType } from "@spt-aki/models/spt/bots/BotLootCache";

import { Ammo } from "./ammo";
import { Armor } from "./armor";
import { AttatchmentBase } from "./attatchment_base";
import { AttatchmentStats } from "./attatchment_stats";
import { FleamarketConfig, TieredFlea, FleamarketGlobal } from "./fleamarket";
import { Helper } from "./helper"
import { Arrays } from "./arrays"
import { Meds } from "./meds";
import { Player } from "./player"
import { WeaponsGlobals } from "./weapons_globals"
import { WeaponsStats } from "./weapons_stats"
import { Bots } from "./bots";
import { BotModGen, BotWepGen } from "./bot_wep_gen";
import { CodeGen } from "./code_gen";
import { BotLootServer } from "./bot_loot_serv";
import { _Items } from "./items";


const medRevertCount = require("../db/saved/info.json");
const customFleaConfig = require("../db/traders/ragfair/blacklist.json");
const medItems = require("../db/items/med_items.json");
const buffs = require("../db/items/buffs.json");
const custProfile = require("../db/profile/profile.json");
const commonStats = require("../db/bots/common.json");
const modConfig = require("../config/config.json");

class Mod implements IPreAkiLoadMod, IPostDBLoadMod {

    private static container: DependencyContainer;

    public preAkiLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");

        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
        const hashUtil = container.resolve<HashUtil>("HashUtil");
        const randomUtil = container.resolve<RandomUtil>("RandomUtil");
        const weightedRandomHelper = container.resolve<WeightedRandomHelper>("WeightedRandomHelper");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        const HttpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const databaseServer1 = container.resolve<DatabaseServer>("DatabaseServer");
        const fleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const tables = databaseServer1.getTables();

        const flea = new FleamarketConfig(logger, tables, fleaConf, modConfig, customFleaConfig);
        if (modConfig.flea_changes == true) {
            flea.loadFleaConfig();
        }

        if (modConfig.bot_changes == true) {
            container.afterResolution("BotWeaponGenerator", (_t, result: BotWeaponGenerator) => {
                const botGeneratorHelper = container.resolve<BotGeneratorHelper>("BotGeneratorHelper");
                const itemHelper = container.resolve<ItemHelper>("ItemHelper");
                const _botWepGen = new BotWepGen(jsonUtil, logger, hashUtil, databaseServer1, itemHelper, weightedRandomHelper, botGeneratorHelper, randomUtil, configServer);
                result.generateWeaponByTpl = (weaponTpl: string, equipmentSlot: string, botTemplateInventory: Inventory, weaponParentId: string, modChances: ModsChances, botRole: string, isPmc: boolean): GenerateWeaponResult => {
                    return _botWepGen.botWepGen(weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotGeneratorHelper", (_t, result: BotGeneratorHelper) => {
                const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
                const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
                const itemHelper = container.resolve<ItemHelper>("ItemHelper");
                const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
                const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
                const _botModGen = new BotModGen(logger, jsonUtil, hashUtil, randomUtil, probabilityHelper, databaseServer1, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, configServer);
                result.generateModsForItem = (items: Item[], modPool: Mods, parentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances): Item[] => {
                    return _botModGen.botModGen(items, modPool, parentId, parentTemplate, modSpawnChances);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotLootCacheService", (_t, result: BotLootCacheService) => {
                const ragfairPriceServ = container.resolve<RagfairPriceService>("RagfairPriceService");
                const botLootServ = new BotLootServer(logger, jsonUtil, databaseServer1, pmcLootGenerator, ragfairPriceServ);
                result.getLootFromCache = (botRole: string, isPmc: boolean, lootType: LootCacheType, lootPool: Items): ITemplateItem[] => {
                    return botLootServ.getLootCache(botRole, isPmc, lootType, lootPool);
                }
            }, { frequency: "Always" });

        }

        staticRouterModService.registerStaticRouter(
            "CheckProfile",
            [
                {
                    url: "/client/game/version/validate",
                    action: (url, info, sessionID, output) => {
                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const databaseServer2 = container.resolve<DatabaseServer>("DatabaseServer");
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const tables = databaseServer2.getTables();
                        const array = new Arrays(tables);
                        const bots = new Bots(logger, tables, configServer, modConfig, array);
                        const tieredFlea = new TieredFlea(tables);
                        const player = new Player(logger, tables, modConfig, custProfile, commonStats);
                        const helper = new Helper(tables, array, logger);

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
                                    pmcData.Health.Temperature.Current = player.defaultTemp
                                    pmcData.Health.Temperature.Maximum = player.defaultTemp

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
                                        pmcData.Health.Hydration.Maximum = player.defaultHydration
                                        pmcData.Health.Energy.Maximum = player.defaultEnergy;
                                        if (pmcData.Health.Energy.Current > pmcData.Health.Energy.Maximum) {
                                            pmcData.Health.Hydration.Current = player.defaultHydration
                                            pmcData.Health.Energy.Current = player.defaultEnergy;
                                        }
                                    }
                                }
                            }
                            this.updateFlea(pmcData, logger, modConfig, tieredFlea, ragfairOfferGenerator, container);
                            this.updateBots(pmcData, logger, modConfig, bots);
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
            "RealismMod"
        );

        staticRouterModService.registerStaticRouter(
            "runAtProfileCreation",
            [
                {
                    url: "/client/game/profile/create",
                    action: (url, info, sessionID, output) => {

                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const databaseServer3 = container.resolve<DatabaseServer>("DatabaseServer");
                        const tables = databaseServer3.getTables();
                        const player = new Player(logger, tables, modConfig, custProfile, commonStats);
                        const array = new Arrays(tables);
                        const helper = new Helper(tables, array, logger);

                        let pmcData = profileHelper.getPmcProfile(sessionID);

                        try {
                            this.checkMeds(pmcData, pmcData.Info.Experience, helper, player, logger);
                            this.correctNewHealth(pmcData, player, logger);
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
            "RealismMod"
        );


        staticRouterModService.registerStaticRouter(
            "runAtRaidEnd",
            [
                {
                    url: "/raid/profile/save",
                    action: (url, info, sessionID, output) => {
                        const databaseServer4 = container.resolve<DatabaseServer>("DatabaseServer");
                        const configServer = container.resolve<ConfigServer>("ConfigServer");
                        const tables = databaseServer4.getTables();
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
                        const array = new Arrays(tables);
                        const bots = new Bots(logger, tables, configServer, modConfig, array);
                        const tieredFlea = new TieredFlea(tables);

                        let pmcData = profileHelper.getPmcProfile(sessionID);

                        try {

                            this.updateBots(pmcData, logger, modConfig, bots);
                            this.updateFlea(pmcData, logger, modConfig, tieredFlea, ragfairOfferGenerator, container);
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
            "pmc"
        );
    }

    public postDBLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const tables = databaseServer.getTables();
        const AKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const array = new Arrays(tables);

        const helper = new Helper(tables, array, logger);
        const ammo = new Ammo(logger, tables, modConfig);
        const armor = new Armor(logger, tables, modConfig);
        const attatchBase = new AttatchmentBase(logger, tables, array, modConfig);
        const attatchStats = new AttatchmentStats(logger, tables, modConfig);
        const bots = new Bots(logger, tables, configServer, modConfig, array);
        const items = new _Items(logger, tables, modConfig);
        const meds = new Meds(logger, tables, modConfig, medItems, buffs);
        const player = new Player(logger, tables, modConfig, custProfile, commonStats);
        const weapons_globals = new WeaponsGlobals(logger, tables, modConfig);
        const weapons_stats = new WeaponsStats(logger, tables, modConfig);
        const flea = new FleamarketGlobal(logger, tables, modConfig);
        const codegen = new CodeGen(logger, tables, modConfig, helper);
        const custFleaConf = new FleamarketConfig(logger, tables, AKIFleaConf, modConfig, customFleaConfig);

   

        // codegen.codeGen();
        codegen.pushModsToServer();
        codegen.pushWepsToServer();

        if (modConfig.bot_changes == true) {
            bots.loadBots();
        }

        if (modConfig.realism == true) {
            ammo.loadAmmo();
            armor.loadArmor();
            bots.setBotHealth();
        }

        if (modConfig.med_changes == true) {
            meds.loadMeds();
        }

        if (modConfig.flea_changes == true || modConfig.tiered_flea == true) {
            flea.loadFleaGlobal();
        }

        if (modConfig.flea_changes == true) {
            custFleaConf.loadFleaConfig();
        }

        attatchBase.loadAttRestrict();
        attatchStats.loadAttStats();
        items.loadItems();
        player.loadPlayer();
        weapons_globals.loadGlobalWeps();
        weapons_stats.loadWepStats();
    }

    public revertMeds(pmcData: IPmcData, helper: Helper) {
        helper.revertMedItems(pmcData);
    }

    public checkMeds(pmcData: IPmcData, pmcEXP, helper: Helper, player: Player, logger: ILogger) {
        helper.correctMedItems(pmcData, pmcEXP);
        pmcData.Health.Hydration.Maximum = player.hydration;
        pmcData.Health.Energy.Maximum = player.energy;
        if (pmcData.Info.Experience == 0) {
            pmcData.Health.Hydration.Current = player.hydration;
            pmcData.Health.Energy.Current = player.energy;
            logger.info("Realism Mod: New Profile Meds And Hydration/Energy Adjusted");
        }
        if (modConfig.logEverything == true) {
            logger.info("Realism Mod: Meds Adjusted");
        }
    }

    public correctNewHealth(pmcData: IPmcData, player: Player, logger: ILogger) {
        if (modConfig.realism == true) {
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
            logger.info("Realism Mod: New Profile Hhealth Has Been Adjusted");
        }
    }

    public fleaHelper(tier, ragfairOfferGen, container: DependencyContainer) {
        container.resolve<RagfairOfferService>("RagfairOfferService").offers = [];
        tier;
        ragfairOfferGen.generateDynamicOffers();
    }



    public updateFlea(pmcData: IPmcData, logger: ILogger, config, flea: TieredFlea, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer) {

        var property = pmcData?.Info?.Level;

        if (config.tiered_flea == true) {
            this.fleaHelper(flea.flea1(), ragfairOfferGen, container);
            if (property === undefined) {
                flea.flea1();
                logger.info("Realism Mod: Fleamarket Tier Set To Default (tier 0)");
            }
            if (property !== undefined) {
                // flea.flea1();
                // ragfairOfferGen.generateDynamicOffers();
                if (pmcData.Info.Level >= 0) {
                    this.fleaHelper(flea.flea0(), ragfairOfferGen, container);
                    logger.info("Realism mod: Fleamarket Locked At Tier 0");
                }
                if (pmcData.Info.Level >= 5) {
                    this.fleaHelper(flea.flea1(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
                }
                if (pmcData.Info.Level >= 10) {
                    this.fleaHelper(flea.flea2(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
                }
                if (pmcData.Info.Level >= 15) {
                    this.fleaHelper(flea.flea3(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
                }
                if (pmcData.Info.Level >= 20) {
                    this.fleaHelper(flea.flea4(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
                }
                if (pmcData.Info.Level >= 25) {
                    this.fleaHelper(flea.flea5(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
                }
                if (pmcData.Info.Level >= 30) {
                    this.fleaHelper(flea.flea6(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
                }
                if (pmcData.Info.Level >= 35) {
                    this.fleaHelper(flea.fleaFullUnlock(), ragfairOfferGen, container);
                    logger.info("Realism Mod: Fleamarket Unlocked");
                }
            }
        }

    }

    public updateBots(pmcData: IPmcData, logger: ILogger, config, bots: Bots) {

        var property = pmcData?.Info?.Level;
        if (config.bot_changes == true) { 
            if (property === undefined) {
                bots.botConfig1();
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
                    if (pmcData.Info.Level >= 0) {
                        bots.botConfig1();
                        logger.info("Realism Mod: Bots Have Been Set To Tier 1");
                    }
                    if (pmcData.Info.Level >= 12) {
                        bots.botConfig2();
                        logger.info("Realism Mod: Bots Have Been Adjusted To Tier 2");
                    }
                    if (pmcData.Info.Level >= 25) {
                        bots.botConfig3();
                        logger.info("Realism Mod: Bots Have Been Adjusted To Tier 3");
                    }
                    if (config.logEverything == true) {
                        logger.info("Realism Mod: Bots Have Been Reconfigured");
                    }
                }
            }
        }     
    }
}

module.exports = { mod: new Mod() }