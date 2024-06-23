"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieredFlea = exports.FleaChangesPreDBLoad = exports.FleaChangesPostDBLoad = void 0;
const enums_1 = require("../utils/enums");
const custFleaConfig = require("../../db/traders/ragfair/flea_config.json");
class FleaChangesPostDBLoad {
    logger;
    tables;
    modConfig;
    fleaConf;
    constructor(logger, tables, modConfig, fleaConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.fleaConf = fleaConf;
    }
    globalDB() {
        return this.tables.globals.config;
    }
    loadFleaGlobal() {
        if (this.modConfig.tiered_flea == true) {
            this.globalDB().RagFair.minUserLevel = 1;
            if (this.modConfig.disable_flea_blacklist == false) {
                this.fleaConf.dynamic.blacklist.custom = [];
                for (let i in this.tables.templates.items) {
                    if (this.tables.templates.items[i]._props.CanSellOnRagfair == false) {
                        this.fleaConf.dynamic.blacklist.custom.push(this.tables.templates.items[i]._id);
                    }
                }
            }
        }
    }
}
exports.FleaChangesPostDBLoad = FleaChangesPostDBLoad;
class FleaChangesPreDBLoad {
    logger;
    fleaConf;
    modConfig;
    constructor(logger, fleaConf, modConfig) {
        this.logger = logger;
        this.fleaConf = fleaConf;
        this.modConfig = modConfig;
    }
    loadFleaConfig() {
        if (this.modConfig.disable_flea_blacklist == true) {
            this.fleaConf.dynamic.blacklist.enableBsgList = false;
            this.fleaConf.dynamic.blacklist.custom = [];
        }
        else if (this.modConfig.flea_changes == true) {
            this.fleaConf.dynamic.blacklist.enableBsgList = true;
            this.fleaConf.dynamic.blacklist.custom.push("generic_debuff", "performance_debuff", "weight_debuff", "clotting_debuff", "damage_debuff", "adrenal_debuff", "regen_debuff");
        }
        if (this.modConfig.flea_changes == true) {
            //disabled due to SPT changes
            // this.fleaConf.dynamic.condition = custFleaConfig.condition;
            //need to chec kif globalDB is initialized at this stage
            // this.globalDB.ratingDecreaseCount = 0.12;
            // this.globalDB.ratingIncreaseCount = 0.1;
            this.fleaConf.dynamic.currencies = {
                "5449016a4bdc2d6f028b456f": 20,
                "5696686a4bdc2da3298b456a": 40,
                "569668774bdc2da2298b4568": 40
            };
            this.fleaConf.dynamic.offerItemCount.min = 0;
            this.fleaConf.dynamic.offerItemCount.max = 2;
            this.fleaConf.dynamic.priceRanges.default.min = 0.75;
            this.fleaConf.dynamic.priceRanges.default.max = 1.75;
            this.fleaConf.dynamic.priceRanges.preset.min = 0.75;
            this.fleaConf.dynamic.priceRanges.preset.max = 1.75;
            this.fleaConf.dynamic.priceRanges.pack.min = 0.75;
            this.fleaConf.dynamic.priceRanges.pack.max = 1.75;
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
exports.FleaChangesPreDBLoad = FleaChangesPreDBLoad;
class TieredFlea {
    tables;
    fleaConf;
    constructor(tables, fleaConf) {
        this.tables = tables;
        this.fleaConf = fleaConf;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    fleaHelper(fetchTier, ragfairOfferGen, container) {
        const offers = container.resolve("RagfairOfferService").getOffers();
        const ragfairServer = container.resolve("RagfairServer");
        const traders = ragfairServer.getUpdateableTraders();
        for (let o in offers) {
            container.resolve("RagfairOfferService").removeOfferById(offers[o]._id);
        }
        fetchTier();
        ragfairOfferGen.generateDynamicOffers();
        for (let traderID in traders) {
            if (this.tables.traders[traders[traderID]]?.assort && this.tables.traders[traders[traderID]].base.name !== "БТР") {
                ragfairOfferGen.generateFleaOffersForTrader(traders[traderID]);
            }
        }
    }
    updateFlea(logger, ragfairOfferGen, container, arrays, level) {
        if (level === undefined) {
            this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
            logger.info("Realism Mod: Fleamarket Tier Set To Default (tier 0)");
        }
        if (level !== undefined) {
            if (level < 5) {
                this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
                logger.info("Realism mod: Fleamarket Locked At Tier 0");
            }
            else if (level < 10) {
                this.fleaHelper(this.flea1.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
            }
            else if (level < 15) {
                this.fleaHelper(this.flea2.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
            }
            else if (level < 20) {
                this.fleaHelper(this.flea3.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
            }
            else if (level < 25) {
                this.fleaHelper(this.flea4.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
            }
            else if (level < 30) {
                this.fleaHelper(this.flea5.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
            }
            else if (level < 35) {
                this.fleaHelper(this.flea6.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
            }
            else if (level < 40) {
                this.fleaHelper(this.flea7.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 7 Unlocked");
            }
            else {
                this.fleaHelper(this.fleaFullUnlock.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Unlocked");
            }
        }
    }
    flea0() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
        }
    }
    flea1() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellMounts(true, serverItem);
        }
    }
    flea2() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }
    flea3() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }
    flea4() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }
    flea5() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellSnip(true, serverItem);
            this.canSellGrenades(true, serverItem);
            this.canSellAmmoBox(true, serverItem);
            this.canSellHandguards(true, serverItem);
            this.canSellBarrels(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellTools(true, serverItem);
            this.canSellHelmet(true, serverItem);
            this.canSellSMG(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }
    flea6() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellSnip(true, serverItem);
            this.canSellGrenades(true, serverItem);
            this.canSellAmmoBox(true, serverItem);
            this.canSellHandguards(true, serverItem);
            this.canSellBarrels(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellTools(true, serverItem);
            this.canSellHelmet(true, serverItem);
            this.canSellHelmParts(true, serverItem);
            this.canSellPlates(true, serverItem);
            this.canSellSMG(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellHouseholdGoods(true, serverItem);
            this.canSellBuildingMats(true, serverItem);
            this.canSellBags(true, serverItem);
            this.canSellArmorVest(true, serverItem);
            this.canSellGrips(true, serverItem);
            this.canSellStocks(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellJewelry(true, serverItem);
            this.canSellElectronics(true, serverItem);
            this.canSellDMR(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }
    flea7() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellSnip(true, serverItem);
            this.canSellGrenades(true, serverItem);
            this.canSellAmmoBox(true, serverItem);
            this.canSellHandguards(true, serverItem);
            this.canSellBarrels(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellTools(true, serverItem);
            this.canSellHelmet(true, serverItem);
            this.canSellHelmParts(true, serverItem);
            this.canSellPlates(true, serverItem);
            this.canSellSMG(true, serverItem);
            this.canSellDMR(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellHouseholdGoods(true, serverItem);
            this.canSellBuildingMats(true, serverItem);
            this.canSellBags(true, serverItem);
            this.canSellArmorVest(true, serverItem);
            this.canSellGrips(true, serverItem);
            this.canSellStocks(true, serverItem);
            this.canSellAR(true, serverItem);
            this.canSellFlare(true, serverItem);
            this.canSellMagazines(true, serverItem);
            this.canSellReddots(true, serverItem);
            this.canSellAssaultScopes(true, serverItem);
            this.canSellMagnifiedScopes(true, serverItem);
            this.canSellLights(true, serverItem);
            this.canSellSupps(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellJewelry(true, serverItem);
            this.canSellElectronics(true, serverItem);
            this.canSellMeds(true, serverItem);
            this.canSellAmmo(true, serverItem);
            this.canSellInfo(true, serverItem);
            this.canSellKeys(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }
    fleaFullUnlock() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (this.checkIfBanned(serverItem._id)) {
                serverItem._props.CanSellOnRagfair = false;
            }
            else {
                serverItem._props.CanSellOnRagfair = true;
            }
        }
    }
    canSellAll(bool, serverItem) {
        this.canSellIrons(bool, serverItem);
        this.canSellSecureContainer(bool, serverItem);
        this.canSellMeds(bool, serverItem);
        this.canSellStims(bool, serverItem);
        this.canSellFood(bool, serverItem);
        this.canSellPlates(bool, serverItem);
        this.canSellArmorVest(bool, serverItem);
        this.canSellRigs(bool, serverItem);
        this.canSellHelmet(bool, serverItem);
        this.canSellGear(bool, serverItem);
        this.canSellBags(bool, serverItem);
        this.canSellArmbands(bool, serverItem);
        this.canSellHelmParts(bool, serverItem);
        this.canSellKeys(bool, serverItem);
        this.canSellKeyCards(bool, serverItem);
        this.canSellOtherLoot(bool, serverItem);
        this.canSellFuel(bool, serverItem);
        this.canSellBuildingMats(bool, serverItem);
        this.canSellTools(bool, serverItem);
        this.canSellElectronics(bool, serverItem);
        this.canSellLube(bool, serverItem);
        this.canSellHouseholdGoods(bool, serverItem);
        this.canSellJewelry(bool, serverItem);
        this.canSellMedicalSupplies(bool, serverItem);
        this.canSellMounts(bool, serverItem);
        this.canSellReddots(bool, serverItem);
        this.canSellAssaultScopes(bool, serverItem);
        this.canSellMagnifiedScopes(bool, serverItem);
        this.canSellThermalScopes(bool, serverItem);
        this.canSellNVGScopes(bool, serverItem);
        this.canSellNVG(bool, serverItem);
        this.canSellThermal(bool, serverItem);
        this.canSellMagazines(bool, serverItem);
        this.canSellParts(bool, serverItem);
        this.canSellHandguards(bool, serverItem);
        this.canSellBarrels(bool, serverItem);
        this.canSellStocks(bool, serverItem);
        this.canSellGrips(bool, serverItem);
        this.canSellLights(bool, serverItem);
        this.canSellSupps(bool, serverItem);
        this.canSellMuzzleDevices(bool, serverItem);
        this.canSellSpecWeap(bool, serverItem);
        this.canSellFlare(bool, serverItem);
        this.canSellNadeLauncher(bool, serverItem);
        this.canSellAR(bool, serverItem);
        this.canSellSMG(bool, serverItem);
        this.canSellMelee(bool, serverItem);
        this.canSellSnip(bool, serverItem);
        this.canSellCarbine(bool, serverItem);
        this.canSellShotgun(bool, serverItem);
        this.canSellPistol(bool, serverItem);
        this.canSellGrenades(bool, serverItem);
        this.canSellAmmoBox(bool, serverItem);
        this.canSellAmmo(bool, serverItem);
        this.canSellInfo(bool, serverItem);
        this.canSellRepairKit(bool, serverItem);
        this.canSellSpecial(bool, serverItem);
        this.canSellMaps(bool, serverItem);
        this.canSellContainer(bool, serverItem);
        this.canSellDMR(bool, serverItem);
    }
    checkIfBanned(itemId) {
        return this.fleaConf.dynamic.blacklist.custom.includes(itemId);
    }
    canSellContainer(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SIMPLE_CONTAINER || serverItem._parent === enums_1.ParentClasses.LOCKABLE_CONTAINER) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellSecureContainer(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SECURE_CONTAINER) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMeds(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.MEDKIT
            || serverItem._parent === enums_1.ParentClasses.DRUGS
            || serverItem._parent === enums_1.ParentClasses.MEDICAL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellStims(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.STIMULATOR) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellFood(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._props.foodUseTime) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellPlates(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ARMOR_PLATE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellArmorVest(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ARMORVEST) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellRigs(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.CHESTRIG) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellHelmet(bool, serverItem) {
        let armorLevl = typeof serverItem._props.armorClass === 'number' ? serverItem._props.armorClass : parseInt(serverItem._props.armorClass);
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if ((serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER) && armorLevl > 0) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellGear(bool, serverItem) {
        let armorLevl = typeof serverItem._props.armorClass === 'number' ? serverItem._props.armorClass : parseInt(serverItem._props.armorClass);
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if ((serverItem._parent === enums_1.ParentClasses.FACECOVER && armorLevl <= 0)
            || (serverItem._parent === enums_1.ParentClasses.HEADWEAR && armorLevl <= 0)
            || serverItem._parent === enums_1.ParentClasses.HEADSET) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellBags(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.BACKPACK) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellArmbands(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ARMBAND) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellHelmParts(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === enums_1.ParentClasses.VISORS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellKeys(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.KEY_MECHANICAL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellKeyCards(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.KEYCARD) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellOtherLoot(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.OTHER) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellFuel(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.FUEL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellBuildingMats(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.BUILDING_MATERIAL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellTools(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.TOOL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellElectronics(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ELECTRONICS || serverItem._parent === enums_1.ParentClasses.BATTERY) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellLube(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.LUBRICANT) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellHouseholdGoods(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.HOUSEHOLD_GOODS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellJewelry(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.JEWELRY) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMedicalSupplies(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.MEDICAL_SUPPLIES) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMounts(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.MOUNT) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellReddots(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.COMPACT_COLLIMATOR || serverItem._parent === enums_1.ParentClasses.COLLIMATOR) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellIrons(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.IRON_SIGHTS) {
        }
    }
    canSellAssaultScopes(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ASSAULT_SCOPE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMagnifiedScopes(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.OPTIC_SCOPE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellThermalScopes(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SPECIAL_SCOPE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellNVGScopes(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._id === "5b3b6e495acfc4330140bd88" || serverItem._id === "5a7c74b3e899ef0014332c29") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellNVG(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.NIGHTVISION) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellThermal(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.THEMALVISION) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMagazines(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.MAGAZINE || serverItem._parent === enums_1.ParentClasses.CYLINDER_MAGAZINE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellParts(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818afb4bdc2dde698b456d" ||
            serverItem._parent === "5a74651486f7744e73386dd1" ||
            serverItem._parent === "55818a6f4bdc2db9688b456b" ||
            serverItem._parent === "55818a304bdc2db5418b457d" ||
            serverItem._parent === "56ea9461d2720b67698b456f") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellHandguards(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.HANDGUARDS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellBarrels(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.BARRELS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellStocks(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818a594bdc2db9688b456a") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellGrips(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818af64bdc2d5b648b4570" || serverItem._parent === "55818a684bdc2ddd698b456d") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellLights(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818b164bdc2ddc698b456c" || serverItem._parent === "55818b084bdc2d5b648b4571") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellSupps(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "550aa4cd4bdc2dd8348b456c") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMuzzleDevices(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "550aa4bf4bdc2dd6348b456b" || serverItem._parent === "550aa4dd4bdc2dc9348b4569") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellSpecWeap(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SPECIAL_WEAPON) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellFlare(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._id === "6217726288ed9f0845317459" || serverItem._id === "62178be9d0050232da3485d9" || serverItem._id === "62178c4d4ecf221597654e3d") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellNadeLauncher(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.GRENADE_LAUNCHER || serverItem._parent === "55818b014bdc2ddc698b456b") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellAR(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ASSAULT_RIFLE || serverItem._parent === enums_1.ParentClasses.MACHINE_GUN) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellDMR(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.MARKSMAN_RIFLE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellSMG(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SMG) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMelee(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.KNIFE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellSnip(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SNIPER_RIFLE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellCarbine(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.ASSAULT_CARBINE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellShotgun(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.SHOTGUN
            || serverItem._id === "60db29ce99594040e04c4a27") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellPistol(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if ((serverItem._parent === enums_1.ParentClasses.PISTOL || serverItem._parent === "617f1ef5e8b54b0998387733") && serverItem._id !== "6275303a9f372d6ea97f9ec7") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellGrenades(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.THROW_WEAPON) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellAmmoBox(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.AMMO_BOX) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellAmmo(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.AMMO) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellInfo(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.INFO) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellRepairKit(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.REPAIRKITS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellSpecial(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "5447e0e74bdc2d3c308b4567"
            || serverItem._parent === "5f4fbaaca5573a5ac31db429"
            || serverItem._parent === "61605ddea09d851a0a0c1bbc") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    canSellMaps(bool, serverItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === enums_1.ParentClasses.MAP) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
}
exports.TieredFlea = TieredFlea;
//# sourceMappingURL=fleamarket.js.map