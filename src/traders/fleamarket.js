"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieredFlea = exports.FleamarketConfig = exports.FleamarketGlobal = void 0;
const enums_1 = require("../utils/enums");
const custFleaConfig = require("../../db/traders/ragfair/flea_config.json");
class FleamarketGlobal {
    constructor(logger, tables, modConfig) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.globalDB = this.tables.globals.config;
    }
    loadFleaGlobal() {
        if (this.modConfig.flea_changes == true && this.modConfig.tiered_flea != true) {
            this.globalDB.RagFair.minUserLevel = 20;
        }
        if (this.modConfig.tiered_flea == true) {
            this.globalDB.RagFair.minUserLevel = 1;
        }
    }
}
exports.FleamarketGlobal = FleamarketGlobal;
class FleamarketConfig {
    constructor(logger, fleaConf, modConfig, custFleaBlacklist) {
        this.logger = logger;
        this.fleaConf = fleaConf;
        this.modConfig = modConfig;
        this.custFleaBlacklist = custFleaBlacklist;
    }
    loadFleaConfig() {
        // if (this.modConfig.flea_changes == true || this.modConfig.tiered_flea == true) {
        //     this.fleaConf.dynamic.blacklist.enableBsgList = true;
        //     this.fleaConf.dynamic.blacklist.custom = this.custFleaBlacklist.blacklist.custom;
        // }
        if (this.modConfig.disable_flea_blacklist == true) {
            this.fleaConf.dynamic.blacklist.enableBsgList = false;
            this.fleaConf.dynamic.blacklist.custom = [];
        }
        else {
            this.fleaConf.dynamic.blacklist.enableBsgList = true;
        }
        // if (this.modConfig.med_changes == true) {
        //     this.fleaConf.dynamic.blacklist.custom.push("TIER1MEDKIT", "TIER2MEDKIT", "TIER3MEDKIT");
        // }
        if (this.modConfig.flea_changes == true) {
            this.fleaConf.dynamic.condition = custFleaConfig.condition;
            this.fleaConf.sell.chance.base = 45;
            this.fleaConf.sell.time.base = 30;
            this.fleaConf.sell.time.min = 10;
            this.fleaConf.sell.time.max = 30;
            this.fleaConf.sell.reputation.gain = 0.0000007;
            this.fleaConf.sell.reputation.loss = 0.0000007;
            this.fleaConf.dynamic.currencies = {
                "5449016a4bdc2d6f028b456f": 20,
                "5696686a4bdc2da3298b456a": 40,
                "569668774bdc2da2298b4568": 40
            };
            this.fleaConf.dynamic.offerItemCount.min = 0;
            this.fleaConf.dynamic.offerItemCount.max = 2;
            this.fleaConf.dynamic.price.min = 1.3;
            this.fleaConf.dynamic.price.max = 2;
            this.fleaConf.dynamic.presetPrice.min = 1.3;
            this.fleaConf.dynamic.presetPrice.max = 2;
            this.fleaConf.dynamic.endTimeSeconds.min = 600;
            this.fleaConf.dynamic.endTimeSeconds.max = 3600;
            this.fleaConf.dynamic.nonStackableCount.min = 1;
            this.fleaConf.dynamic.nonStackableCount.max = 2;
            this.fleaConf.dynamic.stackablePercent.min = 15;
            this.fleaConf.dynamic.stackablePercent.max = 100;
            if (this.modConfig.logEverything == true) {
                this.logger.info("Flea Changes Enabled");
            }
        }
        if (this.modConfig.logEverything == true) {
            this.logger.info("Fleamarket loaded");
        }
    }
}
exports.FleamarketConfig = FleamarketConfig;
class TieredFlea {
    constructor(tables) {
        this.tables = tables;
        this.itemDB = this.tables.templates.items;
    }
    fleaHelper(fetchTier, ragfairOfferGen, container) {
        const offers = container.resolve("RagfairOfferService").getOffers();
        const traders = container.resolve("RagfairServer").getUpdateableTraders();
        for (let o in offers) {
            container.resolve("RagfairOfferService").removeOfferById(offers[o]._id);
        }
        fetchTier();
        ragfairOfferGen.generateDynamicOffers();
        for (let traderID in traders) {
            ragfairOfferGen.generateFleaOffersForTrader(traders[traderID]);
        }
    }
    updateFlea(logger, ragfairOfferGen, container, arrays, level) {
        if (level === undefined) {
            this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
            logger.info("Realism Mod: Fleamarket Tier Set To Default  (tier 0)");
        }
        if (level !== undefined) {
            if (level >= 0 && level < 5) {
                this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
                logger.info("Realism mod: Fleamarket Locked At Tier 0");
            }
            if (level >= 5 && level < 10) {
                this.fleaHelper(this.flea1.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
            }
            if (level >= 10 && level < 15) {
                this.fleaHelper(this.flea2.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
            }
            if (level >= 15 && level < 20) {
                this.fleaHelper(this.flea3.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
            }
            if (level >= 20 && level < 25) {
                this.fleaHelper(this.flea4.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
            }
            if (level >= 25 && level < 30) {
                this.fleaHelper(this.flea5.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
            }
            if (level >= 30 && level < 35) {
                this.fleaHelper(this.flea6.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
            }
            if (level >= 35 && level < 40) {
                this.fleaHelper(this.flea7.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 7 Unlocked");
            }
            if (level >= 40) {
                this.fleaHelper(this.fleaFullUnlock.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Unlocked");
            }
        }
    }
    flea0() {
        this.canSellAll(false);
    }
    flea1() {
        this.canSellAll(false);
        this.canSellShotgun(true);
        this.canSellIrons(true);
    }
    flea2() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellIrons(true);
    }
    flea3() {
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellSMG(true);
        this.canSellShotgun(true);
        this.canSellHelmet(true);
        this.canSellGrips(true);
        this.canSellNVGScopes(true);
        this.canSellIrons(true);
    }
    flea4() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellBP(true);
        this.canSellHelmParts(true);
        this.canSellSnip(true);
        this.canSellGrips(true);
        this.canSellBarrels(true);
        this.canSellNVGScopes(true);
        this.canSellIrons(true);
    }
    flea5() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellBP(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellSnip(true);
        this.canSellGear(true);
        this.canSellAmmo(true);
        this.canSellLights(true);
        this.canSellGrips(true);
        this.canSellStocks(true);
        this.canSellBarrels(true);
        this.canSellHandguards(true);
        this.canSellNVGScopes(true);
        this.canSellAssaultScopes(true);
        this.canSellIrons(true);
        this.canSellParts(true);
        this.canSellFlare(true);
    }
    flea6() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellGear(true);
        this.canSellLights(true);
        this.canSellGrips(true);
        this.canSellStocks(true);
        this.canSellBarrels(true);
        this.canSellHandguards(true);
        this.canSellMagazines(true);
        this.canSellNVGScopes(true);
        this.canSellAssaultScopes(true);
        this.canSellIrons(true);
        this.canSellReddots(true);
        this.canSellMounts(true);
        this.canSellParts(true);
        this.canSellSpecWeap(true);
        this.canSellFlare(true);
    }
    flea7() {
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellKeys(true);
        this.canSellAR(true);
        this.canSellGear(true);
        this.canSellMuzzleDevices(true);
        this.canSellSupps(true);
        this.canSellLights(true);
        this.canSellGrips(true);
        this.canSellStocks(true);
        this.canSellBarrels(true);
        this.canSellHandguards(true);
        this.canSellMagazines(true);
        this.canSellNVG(true);
        this.canSellNVGScopes(true);
        this.canSellMagnifiedScopes(true);
        this.canSellAssaultScopes(true);
        this.canSellIrons(true);
        this.canSellReddots(true);
        this.canSellMounts(true);
        this.canSellParts(true);
        this.canSellSpecWeap(true);
        this.canSellFlare(true);
    }
    fleaFullUnlock() {
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellKeys(true);
        this.canSellKeyCards(true);
        this.canSellAR(true);
        this.canSellGear(true);
        this.canSellRepairKit(true);
        this.canSellMuzzleDevices(true);
        this.canSellSupps(true);
        this.canSellLights(true);
        this.canSellGrips(true);
        this.canSellStocks(true);
        this.canSellBarrels(true);
        this.canSellHandguards(true);
        this.canSellMagazines(true);
        this.canSellNVG(true);
        this.canSellNVGScopes(true);
        this.canSellMagnifiedScopes(true);
        this.canSellAssaultScopes(true);
        this.canSellIrons(true);
        this.canSellReddots(true);
        this.canSellMounts(true);
        this.canSellParts(true);
        this.canSellSpecWeap(true);
        this.canSellFlare(true);
        this.canSellMeds(true);
        this.canSellStims(true);
        this.canSellFood(true);
        this.canSellThermalScopes(true);
        this.canSellThermal(true);
        this.canSellNadeLauncher(true);
    }
    canSellAll(bool) {
        this.canSellFlare(bool);
        this.canSellNadeLauncher(bool);
        this.canSellSpecWeap(bool);
        this.canSellMeds(bool);
        this.canSellStims(bool);
        this.canSellFood(bool);
        this.canSellArmor(bool);
        this.canSellHelmet(bool);
        this.canSellHelmParts(bool);
        this.canSellGear(bool);
        this.canSellBP(bool);
        this.canSellArm(bool);
        this.canSellKeys(bool);
        this.canSellKeyCards(bool);
        this.canSellBarters(bool);
        this.canSellFuel(bool);
        this.canSellInfo(bool);
        this.canSellSpecial(bool);
        this.canSellMaps(bool);
        this.canSellAR(bool);
        this.canSellSnip(bool);
        this.canSellCarbine(bool);
        this.canSellShotgun(bool);
        this.canSellPistol(bool);
        this.canSellGrenades(bool);
        this.canSellMelee(bool);
        this.canSellDMR(bool);
        this.canSellSMG(bool);
        this.canSellAmmo(bool);
        this.canSellContainer(bool);
        this.canSellPouch(bool);
        this.canSellRepairKit(bool);
        this.canSellMounts(bool);
        this.canSellReddots(bool);
        this.canSellIrons(bool);
        this.canSellAssaultScopes(bool);
        this.canSellMagnifiedScopes(bool);
        this.canSellThermalScopes(bool);
        this.canSellThermal(bool);
        this.canSellNVGScopes(bool);
        this.canSellNVG(bool);
        this.canSellMagazines(bool);
        this.canSellHandguards(bool);
        this.canSellBarrels(bool);
        this.canSellStocks(bool);
        this.canSellGrips(bool);
        this.canSellLights(bool);
        this.canSellSupps(bool);
        this.canSellMuzzleDevices(bool);
        this.canSellParts(bool);
    }
    canSellContainer(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5795f317245977243854e041" || this.itemDB[i]._parent === "5671435f4bdc2d96058b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellPouch(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448bf274bdc2dfc2f8b456a") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMeds(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448f39d4bdc2d0a728b4568"
                || this.itemDB[i]._parent === "5448f3a14bdc2d27728b4569"
                || this.itemDB[i]._parent === "5448f3ac4bdc2dce718b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellStims(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448f3a64bdc2d60728b456a") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellFood(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._props.foodUseTime) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellArmor(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448e54d4bdc2dcc718b4568"
                || this.itemDB[i]._parent === "5448e5284bdc2dcb718b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellHelmet(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5a341c4086f77401f2541505") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellGear(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5b432be65acfc433000ed01f"
                || this.itemDB[i]._parent === "5a341c4686f77469e155819e"
                || this.itemDB[i]._parent === "5a341c4086f77401f2541505"
                || this.itemDB[i]._parent === "5645bcb74bdc2ded0b8b4578"
                || this.itemDB[i]._parent === "5448e5724bdc2ddf718b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellBP(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448e53e4bdc2d60728b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellArm(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5b3f15d486f77432d0509248") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellHelmParts(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "57bef4c42459772e8d35a53b") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellKeys(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5c99f98d86f7745c314214b3") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellKeyCards(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5c164d2286f774194c5e69fa") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellBarters(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "590c745b86f7743cc433c5f2"
                || this.itemDB[i]._parent === "57864ada245977548638de91"
                || this.itemDB[i]._parent === "57864bb7245977548b3b66c2"
                || this.itemDB[i]._parent === "57864a66245977548f04a81f"
                || this.itemDB[i]._parent === "57864e4c24597754843f8723"
                || this.itemDB[i]._parent === "57864ee62459775490116fc1"
                || this.itemDB[i]._parent === "57864c322459775490116fbf"
                || this.itemDB[i]._parent === "5448ecbe4bdc2d60728b4568"
                || this.itemDB[i]._parent === "57864a3d24597754843f8721"
                || this.itemDB[i]._parent === "57864c8c245977548867e7f1") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellFuel(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5d650c3e815116009f6201d2") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMounts(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818b224bdc2dde698b456f") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellReddots(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818acf4bdc2dde698b456b" || this.itemDB[i]._parent === "55818ad54bdc2ddc698b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellIrons(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818ac54bdc2d5b648b456e") {
            }
        }
    }
    canSellAssaultScopes(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818add4bdc2d5b648b456f") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMagnifiedScopes(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818ae44bdc2dde698b456c") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellThermalScopes(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818aeb4bdc2ddc698b456a") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellNVGScopes(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._id === "5b3b6e495acfc4330140bd88" || this.itemDB[i]._id === "5a7c74b3e899ef0014332c29") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellNVG(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5a2c3a9486f774688b05e574") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellThermal(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5d21f59b6dbe99052b54ef83") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMagazines(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448bc234bdc2d3c308b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellParts(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818afb4bdc2dde698b456d" ||
                this.itemDB[i]._parent === "5a74651486f7744e73386dd1" ||
                this.itemDB[i]._parent === "55818a6f4bdc2db9688b456b" ||
                this.itemDB[i]._parent === "55818a304bdc2db5418b457d" ||
                this.itemDB[i]._parent === "56ea9461d2720b67698b456f") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellHandguards(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818a104bdc2db9688b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellBarrels(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "555ef6e44bdc2de9068b457e") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellStocks(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818a594bdc2db9688b456a") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellGrips(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818af64bdc2d5b648b4570" || this.itemDB[i]._parent === "55818a684bdc2ddd698b456d") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellLights(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818b164bdc2ddc698b456c" || this.itemDB[i]._parent === "55818b084bdc2d5b648b4571") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellSupps(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "550aa4cd4bdc2dd8348b456c") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMuzzleDevices(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "550aa4bf4bdc2dd6348b456b" || this.itemDB[i]._parent === "550aa4dd4bdc2dc9348b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellSpecWeap(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.SPECIAL_WEAPON) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellFlare(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._id === "6217726288ed9f0845317459" || this.itemDB[i]._id === "62178be9d0050232da3485d9" || this.itemDB[i]._id === "62178c4d4ecf221597654e3d") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellNadeLauncher(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.GRENADE_LAUNCHER || this.itemDB[i]._parent === "55818b014bdc2ddc698b456b") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellAR(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.ASSAULT_RIFLE || this.itemDB[i]._parent === enums_1.ParentClasses.MACHINE_GUN) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellDMR(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.MARKSMAN_RIFLE) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellSMG(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.SMG) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMelee(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.KNIFE) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellSnip(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.SNIPER_RIFLE) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellCarbine(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.ASSAULT_CARBINE) {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellShotgun(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === enums_1.ParentClasses.SHOTGUN
                || this.itemDB[i]._id === "60db29ce99594040e04c4a27") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellPistol(bool) {
        for (let i in this.itemDB) {
            if ((this.itemDB[i]._parent === "5447b5cf4bdc2d65278b4567" || this.itemDB[i]._parent === "617f1ef5e8b54b0998387733") && this.itemDB[i]._id !== "6275303a9f372d6ea97f9ec7") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellGrenades(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "543be6564bdc2df4348b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellAmmo(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "543be5cb4bdc2deb348b4568"
                || this.itemDB[i]._parent === "5485a8684bdc2da71d8b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellInfo(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448ecbe4bdc2d60728b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellRepairKit(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "616eb7aea207f41933308f46") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellSpecial(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447e0e74bdc2d3c308b4567"
                || this.itemDB[i]._parent === "5f4fbaaca5573a5ac31db429"
                || this.itemDB[i]._parent === "61605ddea09d851a0a0c1bbc") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
    canSellMaps(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "567849dd4bdc2d150f8b456e") {
                this.itemDB[i]._props.CanSellOnRagfair = bool;
            }
        }
    }
}
exports.TieredFlea = TieredFlea;
