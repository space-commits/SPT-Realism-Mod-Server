import { container, DependencyContainer } from "tsyringe";
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
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { BotWeaponGenerator } from "@spt-aki/generators/BotWeaponGenerator";
import { BotGeneratorHelper } from "@spt-aki/helpers/BotGeneratorHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { PMCLootGenerator } from "@spt-aki/generators/PMCLootGenerator";
import { Inventory, Items, Mods, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { Item, Upd } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { RagfairOfferService } from "@spt-aki/services/RagfairOfferService";
import { ContainerHelper } from "@spt-aki/helpers/ContainerHelper";
import { DurabilityLimitsHelper } from "@spt-aki/helpers/DurabilityLimitsHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProbabilityHelper } from "@spt-aki/helpers/ProbabilityHelper";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { RagfairOfferGenerator } from "@spt-aki/generators/RagfairOfferGenerator";
import { GenerateWeaponResult } from "@spt-aki/models/spt/bots/GenerateWeaponResult";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { LootCacheType } from "@spt-aki/models/spt/bots/BotLootCache";
import { BotEquipmentFilterService } from "@spt-aki/services/BotEquipmentFilterService";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { BotWeaponGeneratorHelper } from "@spt-aki/helpers/BotWeaponGeneratorHelper";
import { IInventoryMagGen } from "@spt-aki/generators/weapongen/IInventoryMagGen";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { IStartOfflineRaidRequestData } from "@spt-aki/models/eft/match/IStartOffineRaidRequestData";
import { WeatherController } from "@spt-aki/controllers/WeatherController";
import { ContextVariableType } from "@spt-aki/context/ContextVariableType";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
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


import { Ammo } from "./ammo";
import { Armor } from "./armor";
import { AttatchmentBase } from "./attatchment_base";
import { AttatchmentStats } from "./attatchment_stats";
import { FleamarketConfig, TieredFlea, FleamarketGlobal } from "./fleamarket";
import { Helper, RaidInfoTracker } from "./helper"
import { Arrays } from "./arrays"
import { Meds } from "./meds";
import { Player } from "./player"
import { WeaponsGlobals } from "./weapons_globals"
import { Bots } from "./bots";
import { BotGenHelper, BotWepGen } from "./bot_wep_gen";
import { BotLootServer } from "./bot_loot_serv";
import { _Items } from "./items";
import { CodeGen } from "./code_gen";
import { Quests } from "./quests";
import { RandomizeTraderAssort, TraderRefresh, Traders } from "./traders";
import { Airdrops } from "./airdrops";
import { Maps } from "./maps";
import { Gear } from "./gear";
import { SaveServer } from "@spt-aki/servers/SaveServer";

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

class Mod implements IPreAkiLoadMod, IPostDBLoadMod, IPostAkiLoadMod {

    private path: { resolve: (arg0: string) => any; };
    private modLoader: PreAkiModLoader;

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
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const localisationService = container.resolve<LocalisationService>("LocalisationService");
        const fleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const tables = databaseServer.getTables();

        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const assortHelper = container.resolve<AssortHelper>("AssortHelper");
        const paymentHelper = container.resolve<PaymentHelper>("PaymentHelper");

        const mathUtil = container.resolve<MathUtil>("MathUtil");
        const timeUtil = container.resolve<TimeUtil>("TimeUtil");
        const traderAssortService = container.resolve<TraderAssortService>("TraderAssortService");
        const traderHelper = container.resolve<TraderHelper>("TraderHelper");
        const fenceService = container.resolve<FenceService>("FenceService");

        const ragfairPriceServ = container.resolve<RagfairPriceService>("RagfairPriceService");
        const botLootServ = new BotLootServer(logger, jsonUtil, databaseServer, pmcLootGenerator, ragfairPriceServ);

        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const botWeaponGeneratorHelper = container.resolve<BotWeaponGeneratorHelper>("BotWeaponGeneratorHelper");
        const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
        const durabilityLimitsHelper = container.resolve<DurabilityLimitsHelper>("DurabilityLimitsHelper");
        const inventoryHelper = container.resolve<InventoryHelper>("InventoryHelper");
        const containerHelper = container.resolve<ContainerHelper>("ContainerHelper");
        const botEquipFilterServ = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
        const itemFilterServ = container.resolve<ItemFilterService>("ItemFilterService");
        const botGeneratorHelper = container.resolve<BotGeneratorHelper>("BotGeneratorHelper");
        const inventoryMagGenComponents = container.resolveAll<IInventoryMagGen>("InventoryMagGen");

        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
        const ragfairAssortGenerator = container.resolve<RagfairAssortGenerator>("RagfairAssortGenerator");

        const traderRefersh = new TraderRefresh(logger, jsonUtil, mathUtil, timeUtil, databaseServer, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator, traderAssortService, traderHelper, fenceService, configServer);
        const _botWepGen = new BotWepGen(jsonUtil, logger, hashUtil, databaseServer, itemHelper, weightedRandomHelper, botGeneratorHelper, randomUtil, configServer, botWeaponGeneratorHelper, localisationService, inventoryMagGenComponents);
        const _botModGen = new BotGenHelper(logger, jsonUtil, hashUtil, randomUtil, probabilityHelper, databaseServer, durabilityLimitsHelper, itemHelper, inventoryHelper, containerHelper, botEquipFilterServ, itemFilterServ, profileHelper, botWeaponGeneratorHelper, localisationService, configServer);

        const router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.path = require("path");

        const flea = new FleamarketConfig(logger, fleaConf, modConfig, custFleaBlacklist);
        flea.loadFleaConfig();

        router.registerDynamicRouter(
            "loadResources",
            [
                {
                    url: "/RealismMod/GetInfo",
                    action: (url, info, sessionId, output) => {
                        return jsonUtil.serialize(this.path.resolve(this.modLoader.getModPath("SPT-Realism-Mod")));
                    }
                }
            ],
            "RealismMod"
        )

        if (modConfig.bot_changes == true) {
            container.afterResolution("BotWeaponGenerator", (_t, result: BotWeaponGenerator) => {
                result.generateWeaponByTpl = (sessionId: string, weaponTpl: string, equipmentSlot: string, botTemplateInventory: Inventory, weaponParentId: string, modChances: ModsChances, botRole: string, isPmc: boolean): GenerateWeaponResult => {
                    return _botWepGen.botWepGen(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotGeneratorHelper", (_t, result: BotGeneratorHelper) => {
                result.generateExtraPropertiesForItem = (itemTemplate: ITemplateItem, botRole = null): { upd?: Upd } => {
                    return _botModGen.genExtraItemProps(itemTemplate, botRole);
                }
                result.generateModsForWeapon = (sessionId: string, weapon: Item[], modPool: Mods, weaponParentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string): Item[] => {
                    return _botModGen.botModGen(sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole);
                }
            }, { frequency: "Always" });
            container.afterResolution("BotLootCacheService", (_t, result: BotLootCacheService) => {
                result.getLootFromCache = (botRole: string, isPmc: boolean, lootType: LootCacheType, lootPool: Items): ITemplateItem[] => {
                    return botLootServ.getLootCache(botRole, isPmc, lootType, lootPool);
                }
            }, { frequency: "Always" });
        }

        if (modConfig.trader_changes == true) {
            container.afterResolution("TraderAssortHelper", (_t, result: TraderAssortHelper) => {
                result.resetExpiredTrader = (trader: ITrader): void => {
                    return traderRefersh.myResetExpiredTrader(trader);
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
                        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const arrays = new Arrays(postLoadTables);
                        const helper = new Helper(postLoadTables, arrays);
                        const tieredFlea = new TieredFlea(postLoadTables);
                        const player = new Player(logger, postLoadTables, modConfig, custProfile, botHealth);

                        let pmcData = profileHelper.getPmcProfile(sessionID);
                        let scavData = profileHelper.getScavProfile(sessionID);

                        try {
                            var healthProp = pmcData?.Health;
                            var hydroProp = pmcData?.Health?.Hydration;

                            if (healthProp !== undefined) {

                                this.correctNegativeHP(pmcData, logger);

                                if (modConfig.realistic_player_health == false) {
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
                                if (modConfig.realistic_player_health == true) {
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
                                        pmcData.Health.Hydration.Maximum = player.defaultHydration
                                        pmcData.Health.Energy.Maximum = player.defaultEnergy;
                                        if (pmcData.Health.Energy.Current > pmcData.Health.Energy.Maximum) {
                                            pmcData.Health.Hydration.Current = player.defaultHydration
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
                        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                        const postLoadtables = postLoadDBServer.getTables();
                        const player = new Player(logger, postLoadtables, modConfig, custProfile, botHealth);
                        const arrays = new Arrays(postLoadtables);
                        const helper = new Helper(postLoadtables, arrays);

                        let pmcData = profileHelper.getPmcProfile(sessionID);

                        try {
                            if (modConfig.med_changes == true) {
                                this.checkMeds(pmcData, pmcData.Info.Experience, helper, player, logger);
                            }

                            if (modConfig.realistic_player_health == true) {
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
            ],
            "RealismMod"
        );

        staticRouterModService.registerStaticRouter(
            "runAtRaidStart",
            [
                {
                    url: "/client/match/offline/start",
                    action: (url, info, sessionID, output) => {

                        try {
                            const airConf = configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);
                            const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                            const postLoadTables = postLoadDBServer.getTables();
                            const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
                            const appContext = container.resolve<ApplicationContext>("ApplicationContext");
                            const weatherController = container.resolve<WeatherController>("WeatherController");
                            const matchInfo = appContext.getLatestValue(ContextVariableType.MATCH_INFO).getValue<IStartOfflineRaidRequestData>();
                            const botConf = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
                            const arrays = new Arrays(postLoadTables);
                            const helper = new Helper(postLoadTables, arrays);
                            const bots = new Bots(logger, postLoadTables, configServer, modConfig, arrays);
                            // const sessionId = appContext.getLatestValue(ContextVariableType.SESSION_ID).getValue<string>();
                            const time = weatherController.generate().time;
                            const mapName = matchInfo.locationName;
                            RaidInfoTracker.mapName = mapName;
                            let realTime = "";
                            let mapType = "";
                            let pmcData = profileHelper.getPmcProfile(sessionID);

                            if(mapName === "laboratory"){
                                botConf.pmc.convertIntoPmcChance["pmcbot"].min = 15;
                                botConf.pmc.convertIntoPmcChance["pmcbot"].max = 25;
                            }

                            if (matchInfo.dateTime === "PAST") {
                                realTime = getTime(time, 12);
                            }
                            if (matchInfo.dateTime === "CURR") {
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
                                if (parseInt(h) >= 6 && parseInt(h) < 20 || (mapName === "factory4_day" || mapName === "Factory" || mapName === "Laboratory" || mapName === "laboratory")) {
                                    TOD = "day";
                                }
                                else {
                                    TOD = "night";
                                }
                                return TOD;
                            }

                            for (let map in arrays.cqbMaps) {
                                if (arrays.cqbMaps[map] === mapName) {
                                    mapType = "cqb";
                                }
                            }
                            for (let map in arrays.outdoorMaps) {
                                if (arrays.outdoorMaps[map] === mapName) {
                                    mapType = "outdoor";
                                }
                            }
                            for (let map in arrays.urbanMaps) {
                                if (arrays.urbanMaps[map] === mapName) {
                                    mapType = "urban";
                                }
                            }

                            RaidInfoTracker.TOD = getTOD(realTime);
                            RaidInfoTracker.mapType = mapType;

                            if (modConfig.pmc_types == true) {
                                if (RaidInfoTracker.TOD === "day") {
                                    botConf.pmc.pmcType = pmcTypes.pmcTypeDay;
                                }
                                if (RaidInfoTracker.TOD === "night") {
                                    botConf.pmc.pmcType = pmcTypes.pmcTypeNight;
                                }
                            }

                            logger.warning("pre update bots");
                            this.updateBots(pmcData, logger, modConfig, bots, helper);
                            logger.warning("post update bots");

                            if (modConfig.airdrop_changes == true) {
                                if (RaidInfoTracker.TOD === "day") {
                                    this.updateAirdrops(logger, modConfig, airConf, helper, [60, 60, 30, 30, 20, 15, 15, 15, 1]);
                                }
                                if (RaidInfoTracker.TOD === "night") {
                                    this.updateAirdrops(logger, modConfig, airConf, helper, [10, 10, 10, 10, 30, 40, 40, 40, 1]);
                                }
                            }

                            if (modConfig.logEverything == true) {
                                logger.warning("Map Name = " + mapName);
                                logger.warning("Map Type  = " + RaidInfoTracker.mapType);
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
            ],
            "RealismMod"
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
                        const arrays = new Arrays(postLoadTables);
                        const tieredFlea = new TieredFlea(postLoadTables);

                        let pmcData = profileHelper.getPmcProfile(sessionID);

                        try {
                            this.updateFlea(pmcData, logger, modConfig, tieredFlea, ragfairOfferGenerator, container, arrays);

                            this.correctNegativeHP(pmcData, logger);

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

    private correctNegativeHP(pmcData: IPmcData, logger: ILogger) {
        for (let part in pmcData.Health.BodyParts) {
            if (pmcData.Health.BodyParts[part].Health.Current <= 0) {
                logger.warning("Body Part " + pmcData.Health.BodyParts[part] + "has negative HP: " + pmcData.Health.BodyParts[part].Health.Current + " , correcting");
                pmcData.Health.BodyParts[part].Health.Current = 15;
            }

        }
        if (modConfig.logEverything == true) {
            logger.info("Realism Mod: Checked for Negative HP");
        }
    }

    public postDBLoad(container: DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const tables = databaseServer.getTables();
        const AKIFleaConf = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const inventoryConf = configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const airConf = configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);
        const traderConf = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const arrays = new Arrays(tables);
        const helper = new Helper(tables, arrays);
        const ammo = new Ammo(logger, tables, modConfig);
        const armor = new Armor(logger, tables, modConfig);
        const attatchBase = new AttatchmentBase(logger, tables, arrays, modConfig);
        const attatchStats = new AttatchmentStats(logger, tables, modConfig, arrays);
        const bots = new Bots(logger, tables, configServer, modConfig, arrays);
        const items = new _Items(logger, tables, modConfig, jsonUtil, medItems, crafts, inventoryConf);
        const meds = new Meds(logger, tables, modConfig, medItems, buffs);
        const player = new Player(logger, tables, modConfig, custProfile, botHealth);
        const weaponsGlobals = new WeaponsGlobals(logger, tables, modConfig);
        const flea = new FleamarketGlobal(logger, tables, modConfig);
        const codegen = new CodeGen(logger, tables, modConfig, helper, arrays);
        const custFleaConf = new FleamarketConfig(logger, AKIFleaConf, modConfig, custFleaBlacklist);
        const quests = new Quests(logger, tables, modConfig);
        const traders = new Traders(logger, tables, modConfig, traderConf, arrays, helper);
        const airdrop = new Airdrops(logger, modConfig, airConf);
        const maps = new Maps(logger, tables, modConfig);
        const randomizeTraderAssort = new RandomizeTraderAssort();
        const gear = new Gear(arrays, tables);

        // codegen.attTemplatesCodeGen();
        // codegen.weapTemplatesCodeGen();
        // codegen.armorTemplatesCodeGen();


        codegen.pushModsToServer();
        codegen.pushWeaponsToServer();
        codegen.pushArmorToServer();
        codegen.descriptionGen();

        if(modConfig.armor_mouse_penalty == true){
            armor.armorMousePenalty();            
        }

        if(modConfig.headgear_conflicts == true){
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

        if (modConfig.realistic_ballistics == true) {
            ammo.loadAmmoStats();
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
            ammo.loadGlobalMalfChanges();
        }

        if (modConfig.recoil_attachment_overhaul) {
            ammo.loadAmmoFirerateChanges();
            quests.fixMechancicQuests();
            attatchStats.loadAttStats();
        }

        if (modConfig.remove_fir_req == true) {
            quests.removeFIRQuestRequire();
        }

        if (modConfig.trader_changes == true) {
            traders.loadTraderTweaks();
            traders.addItemsToAssorts();
            traders.setLoyaltyLevels();
            randomizeTraderAssort.loadRandomizedTraderStock();
        }
        if (modConfig.bot_changes == true) {
            attatchBase.loadAttRequirements();
        }

        attatchBase.loadAttConmpat();

        items.loadItemsRestrictions();
        player.loadPlayer();
        weaponsGlobals.loadGlobalWeps();
    }

    public postAkiLoad(container: DependencyContainer) {
        this.modLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
    }

    private revertMeds(pmcData: IPmcData, helper: Helper) {
        helper.revertMedItems(pmcData);
    }

    private checkMeds(pmcData: IPmcData, pmcEXP: number, helper: Helper, player: Player, logger: ILogger) {
        helper.correctMedItems(pmcData, pmcEXP);
        pmcData.Health.Hydration.Maximum = player.hydration;
        pmcData.Health.Energy.Maximum = player.energy;
        if (pmcData.Info.Experience == 0) {
            pmcData.Health.Hydration.Current = player.hydration;
            pmcData.Health.Energy.Current = player.energy
            logger.info("Realism Mod: New Profile Meds And Hydration/Energy Adjusted");
        }
        if (modConfig.logEverything == true) {
            logger.info("Realism Mod: Meds Checked");
        }
    }

    private correctNewHealth(pmcData: IPmcData, player: Player, logger: ILogger) {
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

    private fleaHelper(tier, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer, arrays: Arrays) {
        container.resolve<RagfairOfferService>("RagfairOfferService").offers = [];
        tier;
        ragfairOfferGen.generateDynamicOffers();
        for (let i in arrays.traderIDs) {
            ragfairOfferGen.generateFleaOffersForTrader(arrays.traderIDs[i]);
        }
    }

    private updateFlea(pmcData: IPmcData, logger: ILogger, config, flea: TieredFlea, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer, arrays: Arrays) {

        var property = pmcData?.Info?.Level;

        if (config.tiered_flea == true) {
            if (property === undefined) {
                this.fleaHelper(flea.flea0(), ragfairOfferGen, container, arrays);
                logger.info("Realism Mod: Fleamarket Tier Set To Default (tier 0)");
            }
            if (property !== undefined) {
                if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 5) {
                    this.fleaHelper(flea.flea0(), ragfairOfferGen, container, arrays);
                    logger.info("Realism mod: Fleamarket Locked At Tier 0");
                }
                if (pmcData.Info.Level >= 5 && pmcData.Info.Level < 10) {
                    this.fleaHelper(flea.flea1(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
                }
                if (pmcData.Info.Level >= 10 && pmcData.Info.Level < 15) {
                    this.fleaHelper(flea.flea2(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
                }
                if (pmcData.Info.Level >= 15 && pmcData.Info.Level < 20) {
                    this.fleaHelper(flea.flea3(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
                }
                if (pmcData.Info.Level >= 20 && pmcData.Info.Level < 25) {
                    this.fleaHelper(flea.flea4(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
                }
                if (pmcData.Info.Level >= 25 && pmcData.Info.Level < 30) {
                    this.fleaHelper(flea.flea5(), ragfairOfferGen, container, arrays);
                    logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
                }
                if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
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

    private getBotTier(pmcData, bots: Bots, helper: Helper) {
        this.setBotTier(pmcData, "scav", bots, helper);
        this.setBotTier(pmcData, "bear", bots, helper);
        this.setBotTier(pmcData, "usec", bots, helper);
        this.setBotTier(pmcData, "raider", bots, helper);
        this.setBotTier(pmcData, "rogue", bots, helper);
        this.setBotTier(pmcData, "goons", bots, helper);
    }

    private setBotTier(pmcData: IPmcData, type: string, bots: Bots, helper: Helper) {
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


    private updateBots(pmcData: IPmcData, logger: ILogger, config, bots: Bots, helper: Helper) {

        var property = pmcData?.Info?.Level;
        if (config.bot_changes == true) {
            if (property === undefined) {
                bots.botConfig1();
                bots.scavLoad1();
                bots.usecLoad1();
                bots.bearLoad1();
                bots.rogueLoad1();
                bots.raiderLoad1();
                bots.goonsLoad1();
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
            }
        }
    }

    private updateAirdrops(logger: ILogger, modConfig, airConf: IAirdropConfig, helper: Helper, weights: Array<number>) {
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

module.exports = { mod: new Mod() }


