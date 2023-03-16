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
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { BotWeaponGenerator } from "@spt-aki/generators/BotWeaponGenerator";
import { BotGeneratorHelper } from "@spt-aki/helpers/BotGeneratorHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { Chances, Inventory, ItemMinMax, Mods, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { RagfairOfferService } from "@spt-aki/services/RagfairOfferService";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProbabilityHelper } from "@spt-aki/helpers/ProbabilityHelper";
import { RagfairOfferGenerator } from "@spt-aki/generators/RagfairOfferGenerator";
import { GenerateWeaponResult } from "@spt-aki/models/spt/bots/GenerateWeaponResult";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { BotEquipmentFilterService } from "@spt-aki/services/BotEquipmentFilterService";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { BotWeaponGeneratorHelper } from "@spt-aki/helpers/BotWeaponGeneratorHelper";
import { IInventoryMagGen } from "@spt-aki/generators/weapongen/IInventoryMagGen";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
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
import { ITrader, ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { IRegisterPlayerRequestData } from "@spt-aki/models/eft/inRaid/IRegisterPlayerRequestData";
import { TraderPurchasePersisterService } from "@spt-aki/services/TraderPurchasePersisterService";
import { RagfairServer } from "@spt-aki/servers/RagfairServer";;
import { BotEquipmentModGenerator } from "@spt-aki/generators/BotEquipmentModGenerator";
import { BotModLimits, BotWeaponModLimitService } from "@spt-aki/services/BotWeaponModLimitService";
import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { BotEquipmentModPoolService } from "@spt-aki/services/BotEquipmentModPoolService";
import { BotLootGenerator } from "@spt-aki/generators/BotLootGenerator";
import { IBotBase, Inventory as PmcInventory } from "@spt-aki/models/eft/common/tables/IBotBase";
import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { BotLevelGenerator } from "@spt-aki/generators/BotLevelGenerator";
import { MinMax } from "@spt-aki/models/common/MinMax";
import { IRandomisedBotLevelResult } from "@spt-aki/models/eft/bot/IRandomisedBotLevelResult";
import { BotGenerationDetails } from "@spt-aki/models/spt/bots/BotGenerationDetails";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { ILocations } from "@spt-aki/models/spt/server/ILocations";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { RagfairCallbacks } from "@spt-aki/callbacks/RagfairCallbacks";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IGetOffersResult } from "@spt-aki/models/eft/ragfair/IGetOffersResult";
import { RagfairController } from "@spt-aki/controllers/RagfairController";
import { IPostAkiLoadModAsync } from "@spt-aki/models/external/IPostAkiLoadModAsync";
import { LootItem } from "@spt-aki/models/spt/services/LootItem";
import { LocationController } from "@spt-aki/controllers/LocationController";

import { Ammo } from "./ammo";
import { Armor } from "./armor";
import { AttatchmentBase as AttachmentBase } from "./attatchment_base";
import { AttatchmentStats as AttachmentStats } from "./attatchment_stats";
import { FleamarketConfig, TieredFlea, FleamarketGlobal } from "./fleamarket";
import { ConfigChecker, EventTracker, Helper, RaidInfoTracker } from "./helper"
import { Arrays } from "./arrays"
import { Meds } from "./meds";
import { Player } from "./player"
import { WeaponsGlobals } from "./weapons_globals"
import { Bots } from "./bots";
import { BotGenHelper, BotWepGen, GenBotLvl } from "./bot_gen";
import { BotLooGen } from "./bot_loot_serv";
import { _Items } from "./items";
import { CodeGen } from "./code_gen";
import { Quests } from "./quests";
import { RagCallback, RandomizeTraderAssort, TraderRefresh, Traders } from "./traders";
import { AirdropLootgen, Airdrops } from "./airdrops";
import { Maps } from "./maps";
import { Gear } from "./gear";
import { SeasonalEventsHandler } from "./seasonalevents";
import { ItemCloning } from "./item_cloning";
import * as _path from 'path';
import { DescriptionGen } from "./description_gen";
import { JsonHandler } from "./json-handler";
import { info } from "console";
import { url } from "inspector";
import { LocationGenerator } from "@spt-aki/generators/LocationGenerator";
import { LootGenerator } from "@spt-aki/generators/LootGenerator";
import { OldAmmo } from "./ammo_old";
import { OldArmor } from "./armor_old";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ItemBaseClassService } from "@spt-aki/services/ItemBaseClassService";

const fs = require('fs');
const custFleaBlacklist = require("../db/traders/ragfair/blacklist.json");
const medItems = require("../db/items/med_items.json");
const crafts = require("../db/items/hideout_crafts.json");
const buffs = require("../db/items/buffs.json");
const custProfile = require("../db/profile/profile.json");
const modConfig = require("../config/config.json");

const pmcTypes = require("../db/bots/pmcTypes.json");

var clientValidateCount = 0;

class Main implements IPreAkiLoadMod, IPostDBLoadMod, IPostAkiLoadMod, IPostAkiLoadModAsync {

    private path: { resolve: (arg0: string) => any; };
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

        const itemHelper = container.resolve<ItemHelper>("ItemHelper");
        const botWeaponGeneratorHelper = container.resolve<BotWeaponGeneratorHelper>("BotWeaponGeneratorHelper");
        const probabilityHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
        const botEquipmentFilterService = container.resolve<BotEquipmentFilterService>("BotEquipmentFilterService");
        const itemFilterService = container.resolve<ItemFilterService>("ItemFilterService");
        const botGeneratorHelper = container.resolve<BotGeneratorHelper>("BotGeneratorHelper");
        const inventoryMagGenComponents = container.resolveAll<IInventoryMagGen>("InventoryMagGen");
        const traderPurchasePefrsisterService = container.resolve<TraderPurchasePersisterService>("TraderPurchasePersisterService");
        const botEquipmentModGenerator = container.resolve<BotEquipmentModGenerator>("BotEquipmentModGenerator");
        const botWeaponModLimitService = container.resolve<BotWeaponModLimitService>("BotWeaponModLimitService");
        const botHelper = container.resolve<BotHelper>("BotHelper");
        const botEquipmentModPoolService = container.resolve<BotEquipmentModPoolService>("BotEquipmentModPoolService");
        const handbookHelper = container.resolve<HandbookHelper>("HandbookHelper");
        const botWeaponGenerator = container.resolve<BotWeaponGenerator>("BotWeaponGenerator");
        const botLootCacheService = container.resolve<BotLootCacheService>("BotLootCacheService");
        const httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        const ragfairServer = container.resolve<RagfairServer>("RagfairServer");
        const ragfairController = container.resolve<RagfairController>("RagfairController");
        const ragfairOfferGenerator = container.resolve<RagfairOfferGenerator>("RagfairOfferGenerator");
        const ragfairAssortGenerator = container.resolve<RagfairAssortGenerator>("RagfairAssortGenerator");
        const locationGenerator = container.resolve<LocationGenerator>("LocationGenerator");
        const lootGenerator = container.resolve<LootGenerator>("LootGenerator");
        const itemBaseClassService = container.resolve<ItemBaseClassService>("ItemBaseClassService");


        const ragFairCallback = new RagCallback(httpResponse, jsonUtil, ragfairServer, ragfairController, configServer);
        const traderRefersh = new TraderRefresh(logger, jsonUtil, mathUtil, timeUtil, databaseServer, profileHelper, assortHelper, paymentHelper, ragfairAssortGenerator, ragfairOfferGenerator, traderAssortService, localisationService, traderPurchasePefrsisterService, traderHelper, fenceService, configServer);
        const _botWepGen = new BotWepGen(jsonUtil, logger, hashUtil, databaseServer, itemHelper, weightedRandomHelper, botGeneratorHelper, randomUtil, configServer, botWeaponGeneratorHelper, botWeaponModLimitService, botEquipmentModGenerator, localisationService, inventoryMagGenComponents);
        const _botModGen = new BotGenHelper(logger, jsonUtil, hashUtil, randomUtil, probabilityHelper, databaseServer, itemHelper, botEquipmentFilterService, itemBaseClassService, itemFilterService, profileHelper, botWeaponModLimitService, botHelper, botGeneratorHelper, botWeaponGeneratorHelper, localisationService, botEquipmentModPoolService, configServer);
        const botLootGen = new BotLooGen(logger, hashUtil, randomUtil, itemHelper, databaseServer, handbookHelper, botGeneratorHelper, botWeaponGenerator, botWeaponGeneratorHelper, botLootCacheService, localisationService, configServer);
        const genBotLvl = new GenBotLvl(logger, randomUtil, databaseServer);
        const airdropController = new AirdropLootgen(jsonUtil, hashUtil, logger, locationGenerator, localisationService, lootGenerator, databaseServer, timeUtil, configServer)

        const flea = new FleamarketConfig(logger, fleaConf, modConfig, custFleaBlacklist);
        flea.loadFleaConfig();

        const router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.path = require("path");

        router.registerDynamicRouter(
            "loadResources",
            [
                {
                    url: "/RealismMod/GetInfo",
                    action: (url, info, sessionId, output) => {
                        const parsedPath = __dirname.split("\\");
                        const folderName = parsedPath[parsedPath.length - 2];
                        return jsonUtil.serialize(this.path.resolve(this.modLoader.getModPath(`${folderName}`)));
                    }
                }
            ],
            "RealismMod"
        )

        if (modConfig.bot_changes == true) {
            container.afterResolution("BotWeaponGenerator", (_t, result: BotWeaponGenerator) => {
                result.generateWeaponByTpl = (sessionId: string, weaponTpl: string, equipmentSlot: string, botTemplateInventory: Inventory, weaponParentId: string, modChances: ModsChances, botRole: string, isPmc: boolean, botLevel: number): GenerateWeaponResult => {
                    return _botWepGen.botWepGen(sessionId, weaponTpl, equipmentSlot, botTemplateInventory, weaponParentId, modChances, botRole, isPmc, botLevel);
                }
                result.addExtraMagazinesToInventory = (generatedWeaponResult: GenerateWeaponResult, magCounts: MinMax, inventory: PmcInventory, botRole: string): void => {
                    return _botWepGen.magGen(generatedWeaponResult, magCounts, inventory, botRole);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotEquipmentModGenerator", (_t, result: BotEquipmentModGenerator) => {
                result.generateModsForWeapon = (sessionId: string, weapon: Item[], modPool: Mods, weaponParentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string, botLevel: number, modLimits: BotModLimits, botEquipmentRole: string): Item[] => {
                    return _botModGen.botModGen(sessionId, weapon, modPool, weaponParentId, parentTemplate, modSpawnChances, ammoTpl, botRole, botLevel, modLimits, botEquipmentRole);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotLootGenerator", (_t, result: BotLootGenerator) => {
                result.generateLoot = (sessionId: string, templateInventory: Inventory, itemCounts: ItemMinMax, isPmc: boolean, botRole: string, botInventory: PmcInventory, equipmentChances: Chances, botLevel: number): void => {
                    return botLootGen.genLoot(sessionId, templateInventory, itemCounts, isPmc, botRole, botInventory, equipmentChances, botLevel);
                }
            }, { frequency: "Always" });

            container.afterResolution("BotLevelGenerator", (_t, result: BotLevelGenerator) => {
                result.generateBotLevel = (levelDetails: MinMax, botGenerationDetails: BotGenerationDetails, bot: IBotBase): IRandomisedBotLevelResult => {
                    return genBotLvl.genBotLvl(levelDetails, botGenerationDetails, bot);
                }
            }, { frequency: "Always" });
        }


        if (modConfig.randomize_trader_prices == true || modConfig.randomize_trader_stock == true || modConfig.randomize_trader_ll == true) {
            container.afterResolution("TraderAssortHelper", (_t, result: TraderAssortHelper) => {
                result.resetExpiredTrader = (trader: ITrader): void => {
                    return traderRefersh.myResetExpiredTrader(trader);
                }
            }, { frequency: "Always" });
        }

        if (modConfig.randomize_trader_stock == true) {
            container.afterResolution("RagfairCallbacks", (_t, result: RagfairCallbacks) => {
                result.search = (url: string, info: ISearchRequestData, sessionID: string): IGetBodyResponseData<IGetOffersResult> => {
                    return ragFairCallback.mySearch(url, info, sessionID);
                }
            }, { frequency: "Always" });
        }

        if (modConfig.airdrop_changes == true) {
            container.afterResolution("LocationController", (_t, result: LocationController) => {
                result.getAirdropLoot = (): LootItem[] => {
                    return airdropController.myGetAirdropLoot();
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
                        const seasonalEventsService = container.resolve<SeasonalEventService>("SeasonalEventService");
                        const postLoadDBServer = container.resolve<DatabaseServer>("DatabaseServer");
                        const postLoadTables = postLoadDBServer.getTables();
                        const arrays = new Arrays(postLoadTables);
                        const helper = new Helper(postLoadTables, arrays);
                        const tieredFlea = new TieredFlea(postLoadTables);
                        const player = new Player(logger, postLoadTables, modConfig, custProfile, medItems, helper);
                        const randomizeTraderAssort = new RandomizeTraderAssort();
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);
                        const profileData = profileHelper.getFullProfile(sessionID)

                        let level = 1;

                        if (pmcData?.Info?.Level !== undefined) {
                            level = pmcData.Info.Level;
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
                                        this.revertMeds(pmcData, helper);
                                        this.revertMeds(scavData, helper);
                                        modConfig.revert_med_changes = false;
                                        helper.saveToJSONFile(modConfig, 'config/config.json');
                                        logger.info("Realism Mod: Meds in Inventory/Stash Reverted To Defaults");
                                    }

                                    this.checkProfile(pmcData, pmcData.Info.Experience, helper, player, logger);
                                    this.checkProfile(scavData, pmcData.Info.Experience, helper, player, logger);

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
                            this.checkForEvents(logger, seasonalEventsService);

                            if (clientValidateCount === 0) {
                                randomizeTraderAssort.adjustTraderStockAtServerStart();
                            }
                            clientValidateCount += 1;

                            if (modConfig.tiered_flea == true) {
                                this.updateFlea(logger, tieredFlea, ragfairOfferGenerator, container, arrays, level);
                            }
                            if (modConfig.boss_spawns == true) {
                                this.setBossSpawnChance(postLoadTables.locations, level);
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
                        const arrays = new Arrays(postLoadtables);
                        const helper = new Helper(postLoadtables, arrays);
                        const player = new Player(logger, postLoadtables, modConfig, custProfile, medItems, helper);

                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);


                        try {

                            this.checkProfile(pmcData, pmcData.Info.Experience, helper, player, logger);
                            this.checkProfile(scavData, scavData.Info.Experience, helper, player, logger);

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
            "RealismMod"
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
                            const seasonalEventsService = container.resolve<SeasonalEventService>("SeasonalEventService");
                            const matchInfoStartOff = appContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
                            const botConf = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);

                            const arrays = new Arrays(postLoadTables);
                            const helper = new Helper(postLoadTables, arrays);
                            const bots = new Bots(logger, postLoadTables, configServer, modConfig, arrays, helper);
                            const seasonalEvents = new SeasonalEventsHandler(logger, postLoadTables, modConfig, arrays, seasonalEventsService);
                            const pmcData = profileHelper.getPmcProfile(sessionID);

                            const time = weatherController.generate().time;
                            RaidInfoTracker.mapName = matchInfoStartOff.location;
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
                                    return `${h}:${m}`
                                }
                                h = Math.abs(parseInt(h) - hourDiff);
                                return `${h}:${m}`
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

                            RaidInfoTracker.TOD = getTOD(realTime);
                            RaidInfoTracker.mapType = mapType;

                            if (modConfig.pmc_types == true) {
                                if (RaidInfoTracker.TOD === "day") {
                                    botConf.pmc.pmcType = pmcTypes.BotTypes2.pmcTypeDay;
                                }
                                if (RaidInfoTracker.TOD === "night") {
                                    botConf.pmc.pmcType = pmcTypes.BotTypes2.pmcTypeNight;
                                }
                            }

                            if (modConfig.bot_changes) {
                                this.updateBots(pmcData, logger, modConfig, bots, helper);
                                if (EventTracker.isChristmas == true) {
                                    logger.warning("====== Giving Bots Christmas Presents, Don't Be A Scrooge! ======");
                                    seasonalEvents.giveBotsChristmasPresents();
                                }
                            }

                            if (matchInfoStartOff.location === "Laboratory" || matchInfoStartOff.location === "laboratory") {
                                botConf.pmc.convertIntoPmcChance["pmcbot"].min = 15;
                                botConf.pmc.convertIntoPmcChance["pmcbot"].max = 25;
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
                        const helper = new Helper(postLoadTables, arrays);
                        const player = new Player(logger, postLoadTables, modConfig, custProfile, medItems, helper);
                        const pmcData = profileHelper.getPmcProfile(sessionID);
                        const scavData = profileHelper.getScavProfile(sessionID);

                        let level = 1;

                        if (pmcData?.Info?.Level !== undefined) {
                            level = pmcData.Info.Level;
                        }

                        try {

                            if (modConfig.tiered_flea == true) {
                                this.updateFlea(logger, tieredFlea, ragfairOfferGenerator, container, arrays, level);
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
            "pmc"
        );
    }

    private backupProfile(profileData: IAkiProfile, logger: ILogger) {
        const profileFileData = JSON.stringify(profileData, null, 4)
        var index = 0;
        if (index == 0) {
            index = 1;
            var modPath = _path.join(__dirname, '..');
            var profileFolderPath = modPath + "/ProfileBackups/";
            var profileFilePath = modPath + "/ProfileBackups/" + profileData.info.id;

            if (fs.existsSync(profileFilePath)) {

                this.profileBackupHelper(profileFileData, profileFilePath, profileData, logger);

            } else {

                fs.mkdir(_path.join(profileFolderPath, profileData.info.id), (err) => {
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



    public async postAkiLoadAsync(container: DependencyContainer): Promise<void> {
        const logger = container.resolve<ILogger>("WinstonLogger");

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();
        const jsonHand = new JsonHandler(tables);
        jsonHand.pushWeaponsToServer();
        jsonHand.pushModsToServer();
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
        const oldAmmo = new OldAmmo(logger, tables, modConfig);
        const oldArmor = new OldArmor(logger, tables, modConfig);
        const attachBase = new AttachmentBase(logger, tables, arrays, modConfig);
        const attachStats = new AttachmentStats(logger, tables, modConfig, arrays);
        const bots = new Bots(logger, tables, configServer, modConfig, arrays, helper);
        const items = new _Items(logger, tables, modConfig, inventoryConf);
        const meds = new Meds(logger, tables, modConfig, medItems, buffs);
        const player = new Player(logger, tables, modConfig, custProfile, medItems, helper);
        const weaponsGlobals = new WeaponsGlobals(logger, tables, modConfig);
        const flea = new FleamarketGlobal(logger, tables, modConfig);
        const codegen = new CodeGen(logger, tables, modConfig, helper, arrays);
        const custFleaConf = new FleamarketConfig(logger, AKIFleaConf, modConfig, custFleaBlacklist);
        const quests = new Quests(logger, tables, modConfig);
        const traders = new Traders(logger, tables, modConfig, traderConf, arrays, helper);
        const airdrop = new Airdrops(logger, modConfig, airConf);
        const maps = new Maps(logger, tables, modConfig);
        const gear = new Gear(arrays, tables);
        const itemCloning = new ItemCloning(logger, tables, modConfig, jsonUtil, medItems, crafts);
        const descGen = new DescriptionGen(tables);
        const jsonHand = new JsonHandler(tables);

        this.dllChecker(logger, modConfig);

        if (modConfig.recoil_attachment_overhaul == true) {
            itemCloning.createCustomWeapons();
        }

        // codegen.attTemplatesCodeGen();
        // codegen.weapTemplatesCodeGen();
        // codegen.gearTemplatesCodeGen();


        if (modConfig.realistic_ballistics == true && modConfig.old_ballistics == false) {
            ammo.loadAmmoStats();
            armor.loadArmor();
            bots.setBotHealth();
        }

        jsonHand.pushModsToServer();
        jsonHand.pushWeaponsToServer();
        jsonHand.pushArmorToServer();
        descGen.descriptionGen();

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

        if (modConfig.med_changes == true) {
            itemCloning.createCustomMedItems();
            meds.loadMeds();
            // bots.botMeds();
        }

        if (modConfig.old_ballistics == true && modConfig.realistic_ballistics == false) {
            oldAmmo.loadAmmoStatsOld();
            oldArmor.loadArmorOld();
            bots.setBotHealth();
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

        if (modConfig.recoil_attachment_overhaul && ConfigChecker.dllIsPresent == true) {
            ammo.loadAmmoFirerateChanges();
            quests.fixMechancicQuests();
            attachStats.loadAttStats();
            ammo.grenadeTweaks();
        }

        if (modConfig.headset_changes) {
            gear.loadHeadsetTweaks();
        }

        if (modConfig.remove_fir_req == true) {
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

    public postAkiLoad(container: DependencyContainer) {
        this.modLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
    }

    private dllChecker(logger: ILogger, modConfig: any) {
        const realismdll = _path.join(__dirname, '../../../../BepInEx/plugins/RealismMod.dll');
        if (fs.existsSync(realismdll)) {
            ConfigChecker.dllIsPresent = true;
            if (modConfig.recoil_attachment_overhaul == false) {
                logger.error("Realism Mod: RealismMod.dll is present at path: " + realismdll + ", but 'Recoil, Ballistics and Attachment Overhaul' is disabled, plugin will disable itself.");
            }
        } else {
            ConfigChecker.dllIsPresent = false;
            if (modConfig.recoil_attachment_overhaul == true) {
                logger.error("Realism Mod: RealismMod.dll is missing form path: " + realismdll + ", but 'Recoil, Ballistics and Attachment Overhaul' is enabled, server will disable these changes.");
            }
        }
    }

    private revertMeds(pmcData: IPmcData, helper: Helper) {
        helper.revertMedItems(pmcData);
    }

    private checkForEvents(logger: ILogger, seasonalEventsService: SeasonalEventService) {
        const isChristmasActive = seasonalEventsService.christmasEventEnabled();
        EventTracker.isChristmas = isChristmasActive;
        if (isChristmasActive == true) {
            logger.warning("Merry Christmas!");
        }
    }

    private checkProfile(pmcData: IPmcData, pmcEXP: number, helper: Helper, player: Player, logger: ILogger) {
        helper.correctItemResources(pmcData, pmcEXP);
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

    private fleaHelper(fetchTier: Function, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer) {

        const offers = container.resolve<RagfairOfferService>("RagfairOfferService").getOffers();
        const traders = container.resolve<RagfairServer>("RagfairServer").getUpdateableTraders();

        for (let o in offers) {
            container.resolve<RagfairOfferService>("RagfairOfferService").removeOfferById(offers[o]._id);
        }

        fetchTier();
        ragfairOfferGen.generateDynamicOffers();
        for (let traderID in traders) {
            ragfairOfferGen.generateFleaOffersForTrader(traders[traderID]);
        }
    }

    private updateFlea(logger: ILogger, flea: TieredFlea, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer, arrays: Arrays, level: number) {

        if (level === undefined) {
            this.fleaHelper(flea.flea0.bind(flea), ragfairOfferGen, container);
            logger.info("Realism Mod: Fleamarket Tier Set To Default (tier 0)");
        }
        if (level !== undefined) {
            if (level >= 0 && level < 5) {
                this.fleaHelper(flea.flea0.bind(flea), ragfairOfferGen, container);
                logger.info("Realism mod: Fleamarket Locked At Tier 0");
            }
            if (level >= 5 && level < 10) {
                this.fleaHelper(flea.flea1.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
            }
            if (level >= 10 && level < 15) {
                this.fleaHelper(flea.flea2.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
            }
            if (level >= 15 && level < 20) {
                this.fleaHelper(flea.flea3.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
            }
            if (level >= 20 && level < 25) {
                this.fleaHelper(flea.flea4.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
            }
            if (level >= 25 && level < 30) {
                this.fleaHelper(flea.flea5.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
            }
            if (level >= 30 && level < 35) {
                this.fleaHelper(flea.flea6.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
            }
            if (level >= 35 && level < 40) {
                this.fleaHelper(flea.flea7.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 7 Unlocked");
            }
            if (level >= 40) {
                this.fleaHelper(flea.fleaFullUnlock.bind(flea), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Unlocked");
            }
        }
    }

    private setBossSpawnChance(mapDB: ILocations, level: number) {

        if (level >= 0 && level < 5) {
            this.bossSpawnHelper(mapDB, 0.01);
        }
        if (level >= 5 && level < 10) {
            this.bossSpawnHelper(mapDB, 0.05);
        }
        if (level >= 10 && level < 15) {
            this.bossSpawnHelper(mapDB, 0.1);
        }
        if (level >= 15 && level < 20) {
            this.bossSpawnHelper(mapDB, 0.2);
        }
        if (level >= 20 && level < 25) {
            this.bossSpawnHelper(mapDB, 0.4);
        }
        if (level >= 25 && level < 30) {
            this.bossSpawnHelper(mapDB, 0.6);
        }
        if (level >= 30 && level < 35) {
            this.bossSpawnHelper(mapDB, 0.8);
        }
        if (level >= 35 && level < 40) {
            this.bossSpawnHelper(mapDB, 0.9);
        }
        if (level >= 40 && level < 45) {
            this.bossSpawnHelper(mapDB, 1);
        }
        if (level >= 45 && level < 50) {
            this.bossSpawnHelper(mapDB, 1.1);
        }
        if (level >= 45 && level < 50) {
            this.bossSpawnHelper(mapDB, 1.1);
        }
    }

    private bossSpawnHelper(mapDB: ILocations, chanceMulti: number) {
        for (let i in mapDB) {
            if (i !== "lighthouse" && i !== "laboratory" && mapDB[i].base?.BossLocationSpawn !== undefined) {
                for (let k in mapDB[i].base.BossLocationSpawn) {
                    let chance = mapDB[i].base.BossLocationSpawn[k].BossChance;
                    if (mapDB[i].base.BossLocationSpawn[k]?.TriggerId !== undefined && mapDB[i].base.BossLocationSpawn[k]?.TriggerId !== "") {
                        chance = Math.round(mapDB[i].base.BossLocationSpawn[k].BossChance * chanceMulti * 2);
                        mapDB[i].base.BossLocationSpawn[k].BossChance = Math.min(chance, 100);
                    }
                    else {
                        chance = Math.round(mapDB[i].base.BossLocationSpawn[k].BossChance * chanceMulti);
                        mapDB[i].base.BossLocationSpawn[k].BossChance = Math.min(chance, 100);
                    }
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
        this.setBotTier(pmcData, "killa", bots, helper);
        this.setBotTier(pmcData, "tagilla", bots, helper);
    }

    private setBotTier(pmcData: IPmcData, type: string, bots: Bots, helper: Helper) {
        var tier = 1;
        var tierArray = [1, 2, 3, 4];
        if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 5) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds1);
        }
        if (pmcData.Info.Level >= 5 && pmcData.Info.Level < 10) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds2);
        }
        if (pmcData.Info.Level >= 10 && pmcData.Info.Level < 15) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds3);
        }
        if (pmcData.Info.Level >= 15 && pmcData.Info.Level < 20) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds4);
        }
        if (pmcData.Info.Level >= 20 && pmcData.Info.Level < 25) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds5);
        }
        if (pmcData.Info.Level >= 25 && pmcData.Info.Level < 30) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds6);
        }
        if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds7);
        }
        if (pmcData.Info.Level >= 35) {
            tier = helper.probabilityWeighter(tierArray, modConfig.botTierOdds8);
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


    private updateBots(pmcData: IPmcData, logger: ILogger, config, bots: Bots, helper: Helper) {

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
                }
                if (pmcData.Info.Level >= 16 && pmcData.Info.Level < 25) {
                    bots.botConfig2();
                }
                if (pmcData.Info.Level >= 26) {
                    bots.botConfig3();
                }
                if (config.logEverything == true) {
                    logger.info("Realism Mod: Bot Tiers Have Been Set");
                }
            }
            if (modConfig.force_boss_items == true) {
                bots.forceBossItems();
            }
        }
    }
}

module.exports = { mod: new Main() }


