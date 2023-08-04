"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderRefresh = exports.RagCallback = exports.RandomizeTraderAssort = exports.Traders = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const arrays_1 = require("../utils/arrays");
const TraderAssortHelper_1 = require("C:/snapshot/project/obj/helpers/TraderAssortHelper");
const utils_1 = require("../utils/utils");
const enums_1 = require("../utils/enums");
const RagfairCallbacks_1 = require("C:/snapshot/project/obj/callbacks/RagfairCallbacks");
const modConfig = require("../../config/config.json");
const weapPath = modConfig.weap_preset;
const attPath = modConfig.att_preset;
const gearPath = modConfig.gear_preset;
const AssaultRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/MarksmanRifleTemplates.json");
const PistolTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/PistolTemplates.json");
const ShotgunTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/ShotgunTemplates.json");
const SMGTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SMGTemplates.json");
const SniperRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/GrenadeLauncherTemplates.json");
const armorComponentsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorComponentsTemplates.json");
const armorChestrigTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorChestrigTemplates.json");
const helmetTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/helmetTemplates.json");
const armorVestsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorVestsTemplates.json");
const armorMasksTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorMasksTemplates.json");
const chestrigTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/chestrigTemplates.json");
const headsetTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/headsetTemplates.json");
const ammoDB = require("../../db/templates/ammo/ammoTemplates.json");
const weapTemplatesArr = [AssaultCarbineTemplates, AssaultRifleTemplates, MachinegunTemplates, MarksmanRifleTemplates, PistolTemplates, ShotgunTemplates, SMGTemplates, SniperRifleTemplates, SpecialWeaponTemplates, GrenadeLauncherTemplates];
const gearTemlplatesArr = [armorComponentsTemplates, armorChestrigTemplates, helmetTemplates, armorVestsTemplates, armorMasksTemplates, chestrigTemplates, headsetTemplates];
const traderRepairs = require("../../db/traders/repair/traderRepair.json");
const fenceLimits = require("../../db/traders/fence/fenceLimits.json");
// const sellCatPrap = require("../../db/traders/prapor/sell_categories.json");
const sellCatThera = require("../../db/traders/therapist/sell_categories.json");
const sellCatSkier = require("../../db/traders/skier/sell_categories.json");
// const sellCatPK = require("../../db/traders/pk/sell_categories.json");
const sellCatMech = require("../../db/traders/mechanic/sell_categories.json");
// const sellCatRag = require("../../db/traders/ragman/sell_categories.json");
// const sellCatJaeg = require("../../db/traders/jaeger/sell_categories.json");
const prapId = "54cb50c76803fa8b248b4571";
const theraId = "54cb57776803fa99248b456e";
const skierId = "58330581ace78e27b8b10cee";
const pkId = "5935c25fb3acc3127c3d8cd9";
const mechId = "5a7c2eca46aef81a7ca2145d";
const ragmId = "5ac3b934156ae10c4430e83c";
const jaegId = "5c0647fdd443bc2504c2d371";
class Traders {
    constructor(logger, tables, modConf, traderConf, array, utils) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.traderConf = traderConf;
        this.array = array;
        this.utils = utils;
        this.itemDB = this.tables.templates.items;
    }
    loadTraderTweaks() {
        // this.tables.traders['54cb50c76803fa8b248b4571'].base.sell_category = sellCatPrap;
        this.tables.traders[theraId].base.sell_category = sellCatThera.sell_category;
        this.tables.traders[skierId].base.sell_category = sellCatSkier.sell_category;
        // this.tables.traders['5935c25fb3acc3127c3d8cd9'].base.sell_category = sellCatPK;
        this.tables.traders[mechId].base.sell_category = sellCatMech.sell_category;
        // this.tables.traders['5ac3b934156ae10c4430e83c'].base.sell_category = sellCatRag;
        // this.tables.traders['5c0647fdd443bc2504c2d371'].base.sell_category = sellCatJaeg;
        if (modConfig.nerf_fence == true) {
            this.traderConf.fence.discountOptions.assortSize = 10;
            this.traderConf.fence.discountOptions.presetPriceMult = 2.2;
            this.traderConf.fence.discountOptions.itemPriceMult = 1.8;
            this.traderConf.fence.maxPresetsPercent = 4;
            this.traderConf.fence.partialRefreshChangePercent = 50;
            this.traderConf.fence.discountOptions.assortSize = 10;
            this.traderConf.fence.assortSize = 30;
            this.traderConf.fence.itemPriceMult = 2;
            this.traderConf.fence.presetPriceMult = 2.5;
            this.traderConf.fence.itemTypeLimits = fenceLimits.itemTypeLimits;
            this.traderConf.fence.blacklist = fenceLimits.blacklist;
        }
        this.tables.globals.config.Health.HealPrice.HealthPointPrice = 100;
        this.tables.globals.config.Health.HealPrice.EnergyPointPrice = 30;
        this.tables.globals.config.Health.HealPrice.HydrationPointPrice = 30;
        if (this.modConf.logEverything == true) {
            this.logger.info("Traders Loaded");
        }
    }
    loadTraderRefreshTimes() {
        for (let trader in this.traderConf.updateTime) {
            this.traderConf.updateTime[trader].seconds = modConfig.trader_refresh_time;
        }
    }
    loadTraderRepairs() {
        this.tables.traders[prapId].base.repair = traderRepairs.Prapor;
        this.tables.traders[skierId].base.repair = traderRepairs.SkierRepair;
        this.tables.traders[mechId].base.repair = traderRepairs.MechanicRepair;
        for (let ll in this.tables.traders[prapId].base.loyaltyLevels) {
            this.tables.traders[prapId].base.loyaltyLevels[ll].repair_price_coef *= 1.5;
        }
        for (let ll in this.tables.traders[skierId].base.loyaltyLevels) {
            this.tables.traders[skierId].base.loyaltyLevels[ll].repair_price_coef *= 0.5;
        }
        for (let ll in this.tables.traders[mechId].base.loyaltyLevels) {
            this.tables.traders[mechId].base.loyaltyLevels[ll].repair_price_coef *= 2;
        }
    }
    setLoyaltyLevels() {
        this.loyaltyLevelHelper(ammoDB, false);
        this.loyaltyLevelHelper(weapTemplatesArr, true);
        this.loyaltyLevelHelper(gearTemlplatesArr, true);
    }
    loyaltyLevelHelper(db, multifile) {
        if (multifile == false) {
            this.setLL(db);
        }
        else {
            for (let files in db) {
                let file = db[files];
                this.setLL(file);
            }
        }
    }
    setLL(file) {
        for (let item in file) {
            let loyaltyLvl = file[item]?.LoyaltyLevel !== undefined ? file[item]?.LoyaltyLevel : 3;
            let itemID = file[item].ItemID;
            for (let trader in this.tables.traders) {
                if (this.tables.traders[trader].assort?.items !== undefined) {
                    for (let item in this.tables.traders[trader].assort.items) {
                        if (this.tables.traders[trader].assort.items[item].parentId === "hideout" && this.tables.traders[trader].assort.items[item]._tpl === itemID) {
                            let id = this.tables.traders[trader].assort.items[item]._id;
                            if (this.itemDB[this.tables.traders[trader]?.assort?.barter_scheme[id][0][0]?._tpl]?._parent !== enums_1.ParentClasses.MONEY) {
                                this.tables.traders[trader].assort.loyal_level_items[id] = Math.max(1, loyaltyLvl - 1);
                            }
                            else {
                                this.tables.traders[trader].assort.loyal_level_items[id] = Math.min(4, loyaltyLvl);
                            }
                        }
                    }
                }
            }
        }
    }
    addItemsToAssorts() {
        if (this.modConf.med_changes == true) {
            //therapist//
            this.assortItemPusher(theraId, "TIER1MEDKIT", 2, "5449016a4bdc2d6f028b456f", 1, false, 25000);
            this.assortItemPusher(theraId, "TIER2MEDKIT", 1, "5449016a4bdc2d6f028b456f", 3, false, 50000);
            this.assortItemPusher(theraId, "TIER3MEDKIT", 1, "5449016a4bdc2d6f028b456f", 4, false, 75000);
            //Skier//
            this.assortItemPusher(skierId, "SJ0", 2, "5449016a4bdc2d6f028b456f", 1, false, 25000);
        }
        //ragman//
        this.assortNestedItemPusher(ragmId, "5ac8d6885acfc400180ae7b0", { "5a16b7e1fcdbcb00165aa6c9": "mod_equipment_000" }, 1, "5449016a4bdc2d6f028b456f", 3, true, undefined, 1.25);
        this.assortNestedItemPusher(ragmId, "5e00c1ad86f774747333222c", { "5e01f31d86f77465cf261343": "mod_equipment_000" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.25, { "5c0558060db834001b735271": "mod_nvg" });
        this.assortNestedItemPusher(ragmId, "5ea05cf85ad9772e6624305d", { "5a16badafcdbcb001865f72d": "mod_equipment_000" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.25, { "5ea058e01dbce517f324b3e2": "mod_nvg" });
        this.assortNestedItemPusher(ragmId, "5aa7cfc0e5b5b00015693143", { "5a16b8a9fcdbcb00165aa6ca": "mod_nvg", "5a16b93dfcdbcbcae6687261": "mod_nvg", "57235b6f24597759bf5a30f1": "mod_nvg" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.3);
        //mechanic//
        if (this.modConf.recoil_attachment_overhaul == true) {
            //guns
            this.assortItemPusher(mechId, "mechOPSKSv1", 1, "5449016a4bdc2d6f028b456f", 2, false, 12500);
            this.assortItemPusher(mechId, "mechSKSv1", 1, "5449016a4bdc2d6f028b456f", 1, false, 10000);
            this.assortItemPusher(mechId, "mechSTM9v1", 1, "5449016a4bdc2d6f028b456f", 3, false, 15000);
            this.assortItemPusher(mechId, "mechSaiga12v1", 1, "5449016a4bdc2d6f028b456f", 3, false, 10000);
            this.assortItemPusher(mechId, "mechM3v1", 1, "5449016a4bdc2d6f028b456f", 4, false, 20000);
            //attachments
            this.assortItemPusher(mechId, "mechAR15_260mm", 1, "5449016a4bdc2d6f028b456f", 3, false, 10000);
            this.assortItemPusher(mechId, "mechSlant_366", 1, "5449016a4bdc2d6f028b456f", 1, false, 2000);
            this.assortItemPusher(mechId, "mechSpikes_366", 1, "5449016a4bdc2d6f028b456f", 2, false, 5000);
            this.assortItemPusher(mechId, "mechDTK_366", 1, "5449016a4bdc2d6f028b456f", 3, false, 10000);
            this.assortItemPusher(mechId, "mechJMAC_366", 1, "5449016a4bdc2d6f028b456f", 4, false, 20000);
        }
        //scopes
        this.assortNestedItemPusher(mechId, "616584766ef05c2ce828ef57", { "5c7d560b2e22160bc12c6139": "mod_scope", "5c7d55de2e221644f31bff68": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "58d39d3d86f77445bb794ae7", { "58d39b0386f77443380bf13c": "mod_scope", "58d399e486f77442e0016fe7": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 3, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "58d39d3d86f77445bb794ae7", { "58d399e486f77442e0016fe7": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 3, true, undefined, 1.1);
        this.assortNestedItemPusher(mechId, "5b31163c5acfc400153b71cb", { "5b3116595acfc40019476364": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.1);
        this.assortNestedItemPusher(mechId, "5a33b2c9c4a282000c5a9511", { "5a32aa8bc4a2826c6e06d737": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.1);
        this.assortNestedItemPusher(mechId, "58d2664f86f7747fec5834f6", { "58d268fc86f774111273f8c2": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.1);
        this.assortNestedItemPusher(mechId, "577d128124597739d65d0e56", { "577d141e24597739c5255e01": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.1);
        this.assortNestedItemPusher(mechId, "5b2389515acfc4771e1be0c0", { "5b2388675acfc4771e1be0be": "mod_scope_000" }, 1, "5449016a4bdc2d6f028b456f", 3, true, undefined, 1.1);
        this.assortNestedItemPusher(mechId, "5a37ca54c4a282000d72296a", { "5b3b99475acfc432ff4dcbee": "mod_scope_000" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.1, { "58d268fc86f774111273f8c2": "mod_scope_001" });
        this.assortNestedItemPusher(mechId, "618bab21526131765025ab3f", { "618ba27d9008e4636a67f61d": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.1, { "618ba92152ecee1505530bd3": "mod_mount", "5a32aa8bc4a2826c6e06d737": "mod_scope" });
        //skier//
        //guns
        if (this.modConf.recoil_attachment_overhaul == true) {
            this.assortItemPusher(skierId, "Skier209", 1, "5449016a4bdc2d6f028b456f", 1, false, 12500);
        }
    }
    assortNestedItemPusher(trader, itemId, nestedChildItems, buyRestriction, saleCurrency, loyalLvl, useHandbook, price = 0, priceMulti = 1, secondaryChildItems) {
        let assort = this.tables.traders[trader].assort;
        let assortId = this.utils.genId();
        let parent = assortId;
        let idArr = [];
        if (useHandbook == true) {
            idArr.push(itemId);
            for (let key in nestedChildItems) {
                idArr.push(key);
            }
            for (let key in secondaryChildItems) {
                idArr.push(key);
            }
            for (let item in idArr) {
                price += this.handBookPriceLookup(idArr[item]);
            }
        }
        this.assortPusherHelper(assort, assortId, price, saleCurrency, loyalLvl, itemId, buyRestriction, priceMulti);
        for (let key in nestedChildItems) {
            let id = this.utils.genId();
            assort.items.push({
                "_id": id,
                "_tpl": key,
                "parentId": parent,
                "slotId": nestedChildItems[key]
            });
            parent = id;
        }
        if (secondaryChildItems !== undefined) {
            for (let key in secondaryChildItems) {
                let id = this.utils.genId();
                assort.items.push({
                    "_id": id,
                    "_tpl": key,
                    "parentId": assortId,
                    "slotId": secondaryChildItems[key]
                });
                assortId = id;
            }
        }
    }
    assortItemPusher(trader, itemId, buyRestriction, saleCurrency, loyalLvl, useHandbookPrice, price = 0, priceMulti = 1) {
        let assort = this.tables.traders[trader].assort;
        let assortId = this.utils.genId();
        if (useHandbookPrice == true) {
            price += this.handBookPriceLookup(itemId);
        }
        this.assortPusherHelper(assort, assortId, price, saleCurrency, loyalLvl, itemId, buyRestriction, priceMulti);
    }
    handBookPriceLookup(itemId) {
        let item = this.tables.templates.handbook.Items.find(i => i.Id === itemId);
        return item.Price;
    }
    assortPusherHelper(assort, assortId, price, saleCurrency, loyalLvl, itemId, buyRestriction, priceMulti) {
        price *= priceMulti;
        if (loyalLvl === 5 && modConfig.randomize_trader_ll != true) {
            loyalLvl = 4;
        }
        assort.items.push({
            "_id": assortId,
            "_tpl": itemId,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd": {
                "BuyRestrictionMax": buyRestriction,
                "BuyRestrictionCurrent": 0,
                "StackObjectsCount": 1
            }
        });
        assort.barter_scheme[assortId] =
            [
                [
                    {
                        "count": price,
                        "_tpl": saleCurrency
                    }
                ]
            ];
        assort.loyal_level_items[assortId] = loyalLvl;
    }
}
exports.Traders = Traders;
class RandomizeTraderAssort {
    constructor() {
        this.databaseServer = tsyringe_1.container.resolve("DatabaseServer");
        this.logger = tsyringe_1.container.resolve("WinstonLogger");
        this.tables = this.databaseServer.getTables();
        this.itemDB = this.tables.templates.items;
        this.arrays = new arrays_1.Arrays(this.tables);
        this.utils = new utils_1.Utils(this.tables, this.arrays);
    }
    adjustTraderStockAtServerStart() {
        if (utils_1.EventTracker.isChristmas == true) {
            this.logger.warning("====== Christmas Sale, Everything 40% Off! ======");
        }
        for (let trader in this.tables.traders) {
            if (this.tables.traders[trader].assort?.items !== undefined) {
                let assortItems = this.tables.traders[trader].assort.items;
                for (let item in assortItems) {
                    let itemId = assortItems[item]._id;
                    let itemTemplId = assortItems[item]._tpl;
                    if (modConfig.randomize_trader_stock == true) {
                        if (assortItems[item].upd?.StackObjectsCount !== undefined) {
                            this.randomizeStockHelper(assortItems[item]);
                        }
                        if (assortItems[item].upd?.UnlimitedCount !== undefined) {
                            assortItems[item].upd.UnlimitedCount = false;
                        }
                    }
                    if (modConfig.randomize_trader_prices == true || modConfig.adjust_trader_prices) {
                        if (this.tables.traders[trader]?.assort?.barter_scheme) {
                            let barter = this.tables.traders[trader].assort.barter_scheme[itemId];
                            if (barter !== undefined) {
                                let randNum = this.utils.pickRandNumOneInTen();
                                this.setAndRandomizeCost(randNum, itemTemplId, barter, true);
                            }
                        }
                    }
                }
            }
            if (modConfig.randomize_trader_ll == true) {
                if (this.tables.traders[trader].assort?.loyal_level_items !== undefined) {
                    let ll = this.tables.traders[trader].assort.loyal_level_items;
                    for (let lvl in ll) {
                        this.randomizeLL(ll, lvl, this.logger);
                    }
                }
            }
        }
    }
    randomizeStockHelper(item) {
        let itemParent = this.itemDB[item._tpl]._parent;
        //ammo
        this.randomizeAmmoStock(itemParent, item);
        this.randomizeStock(itemParent, enums_1.ParentClasses.AMMO_BOX, item, 0 + modConfig.rand_stock_modifier, 2 + modConfig.rand_stock_modifier);
        //weapons
        for (let id in this.arrays.weaponParentIDs) {
            this.randomizeStock(itemParent, this.arrays.weaponParentIDs[id], item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        }
        //weapon mods
        for (let id in this.arrays.modParentIDs) {
            this.randomizeStock(itemParent, this.arrays.modParentIDs[id], item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        }
        //gear
        for (let id in this.arrays.gearParentIDs) {
            this.randomizeStock(itemParent, this.arrays.gearParentIDs[id], item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        }
        //barter items
        for (let id in this.arrays.barterParentIDs) {
            this.randomizeStock(itemParent, this.arrays.barterParentIDs[id], item, 0 + modConfig.rand_stock_modifier, 2 + modConfig.rand_stock_modifier);
        }
        //keys 
        for (let id in this.arrays.keyParentIDs) {
            this.randomizeStock(itemParent, this.arrays.keyParentIDs[id], item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        }
        //maps
        this.randomizeStock(itemParent, enums_1.ParentClasses.MAP, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        //nvg + thermals:
        this.randomizeStock(itemParent, enums_1.ParentClasses.NIGHTVISION, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.SPECIAL_SCOPE, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.THEMALVISION, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        //magazine
        if (itemParent === enums_1.ParentClasses.MAGAZINE) {
            let magCap = this.itemDB[item._tpl]?._props?.Cartridges[0]._max_count;
            if (magCap <= 35) {
                this.randomizeStock(itemParent, enums_1.ParentClasses.MAGAZINE, item, 0 + modConfig.rand_stock_modifier, 4 + modConfig.rand_stock_modifier);
            }
            else if (magCap > 35 && magCap <= 45) {
                this.randomizeStock(itemParent, enums_1.ParentClasses.MAGAZINE, item, 0 + modConfig.rand_stock_modifier, 3 + modConfig.rand_stock_modifier);
            }
            else {
                this.randomizeStock(itemParent, enums_1.ParentClasses.MAGAZINE, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
            }
        }
        //medical
        this.randomizeStock(itemParent, enums_1.ParentClasses.STIMULATOR, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.DRUGS, item, 0 + modConfig.rand_stock_modifier, 2 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.MEDICAL, item, 0 + modConfig.rand_stock_modifier, 3 + modConfig.rand_stock_modifier);
        //special items
        this.randomizeStock(itemParent, enums_1.ParentClasses.SPEC_ITEM, item, 3 + modConfig.rand_stock_modifier, 6 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.PORTABLE_RANGE_FINDER, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.COMPASS, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        //grenades
        this.randomizeStock(itemParent, enums_1.ParentClasses.THROW_WEAPON, item, 0 + modConfig.rand_stock_modifier, 3 + modConfig.rand_stock_modifier);
        //money
        this.randomizeStock(itemParent, enums_1.ParentClasses.MONEY, item, 0 * modConfig.rand_stackable_modifier, 1500 * modConfig.rand_stackable_modifier);
        //container
        this.randomizeStock(itemParent, enums_1.ParentClasses.SIMPLE_CONTAINER, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.LOCKABLE_CONTAINER, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        //provisions
        this.randomizeStock(itemParent, enums_1.ParentClasses.FOOD, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
        this.randomizeStock(itemParent, enums_1.ParentClasses.DRINK, item, 0 + modConfig.rand_stock_modifier, 1 + modConfig.rand_stock_modifier);
    }
    randomizeAmmoStock(assortItemParent, item) {
        if (assortItemParent === enums_1.ParentClasses.AMMO) {
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x18mm, 60 * modConfig.rand_stackable_modifier, 150 * modConfig.rand_stackable_modifier, 2);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x19mm, 50 * modConfig.rand_stackable_modifier, 130 * modConfig.rand_stackable_modifier, 3);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x21mm, 30 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 60);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x39mm, 30 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 55);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._45ACP, 50 * modConfig.rand_stackable_modifier, 130 * modConfig.rand_stackable_modifier, 3);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._357mag, 25 * modConfig.rand_stackable_modifier, 50 * modConfig.rand_stackable_modifier, 4);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._46x30mm, 40 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 50);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._57x28mm, 40 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 50);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x25mm, 60 * modConfig.rand_stackable_modifier, 140 * modConfig.rand_stackable_modifier, 2);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._366TKM, 60 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 3);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x39mm, 50 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 55);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x51mm, 30 * modConfig.rand_stackable_modifier, 80 * modConfig.rand_stackable_modifier, 4, true, 65);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x54rmm, 40 * modConfig.rand_stackable_modifier, 80 * modConfig.rand_stackable_modifier, 4, true, 69);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._300BLK, 30 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 53);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._556x45mm, 40 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 60);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._545x39mm, 50 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4, true, 60);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._127x108mm, 10 * modConfig.rand_stackable_modifier, 40 * modConfig.rand_stackable_modifier, 4);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._127x55mm, 20 * modConfig.rand_stackable_modifier, 120 * modConfig.rand_stackable_modifier, 4);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._12ga, 25 * modConfig.rand_stackable_modifier, 40 * modConfig.rand_stackable_modifier, 3);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._20ga, 40 * modConfig.rand_stackable_modifier, 80 * modConfig.rand_stackable_modifier, 2);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._23x75mm, 4 * modConfig.rand_stackable_modifier, 12 * modConfig.rand_stackable_modifier, 4);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._26x75mm, 1 * modConfig.rand_stackable_modifier, 2 * modConfig.rand_stackable_modifier, 4);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._40x46mm, 1 * modConfig.rand_stackable_modifier, 3 * modConfig.rand_stackable_modifier, 4);
            this.randomizeAmmoStockHelper(item, enums_1.Calibers._40x53mm, 1 * modConfig.rand_stackable_modifier, 3 * modConfig.rand_stackable_modifier, 4);
        }
    }
    randomizeAmmoStockHelper(item, caliber, min, max, outOfStockChance, usePenFactor = false, penThreshold = 50) {
        if (this.itemDB[item._tpl]._props.Caliber === caliber) {
            let oddsModifier = 0;
            let stockModifier = 1;
            if (usePenFactor == true) {
                if (this.itemDB[item._tpl]._props.PenetrationPower <= penThreshold) {
                    oddsModifier = 2;
                }
                stockModifier = penThreshold / this.itemDB[item._tpl]._props.PenetrationPower;
            }
            let randNum = this.utils.pickRandNumOneInTen();
            if (randNum <= (outOfStockChance - oddsModifier)) {
                item.upd.StackObjectsCount = 0;
            }
            else {
                item.upd.StackObjectsCount = Math.round(this.utils.pickRandNumInRange(min, max * stockModifier));
            }
        }
    }
    randomizeStock(assortItemParent, catParent, item, min, max) {
        if (assortItemParent === catParent) {
            item.upd.StackObjectsCount = this.utils.pickRandNumInRange(min, max);
        }
    }
    setAndRandomizeCost(randNum, itemTemplId, barter, setBasePrice) {
        if (this.itemDB[barter[0][0]._tpl]._parent === enums_1.ParentClasses.MONEY) {
            let cost = barter[0][0].count;
            if (setBasePrice == true && modConfig.adjust_trader_prices == true) {
                this.adjustPriceByCategory(barter[0][0], itemTemplId, cost);
            }
            if (modConfig.randomize_trader_prices == true) {
                if (randNum >= 8) {
                    barter[0][0].count = cost * modConfig.rand_cost_increase;
                }
                if (randNum <= 3) {
                    barter[0][0].count = cost * modConfig.rand_cost_discount;
                }
            }
            if (utils_1.EventTracker.isChristmas == true) {
                barter[0][0].count = cost * 0.6;
            }
        }
    }
    adjustPriceByCategory(barter, itemTemplId, cost) {
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.AMMO) {
            barter.count = cost * 2;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.AMMO_BOX) {
            barter.count = cost * 2;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.DRUGS) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.MEDKIT) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.MEDS) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.STIMULATOR) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.MEDICAL_SUPPLIES) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.FOOD) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.DRINK) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.HEADWEAR) {
            barter.count = cost * 0.6;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT) {
            barter.count = cost * 0.6;
        }
    }
    randomizeLL(ll, i, logger) {
        let level = ll[i];
        let randNum = this.utils.pickRandNumOneInTen();
        if (randNum <= 2) {
            ll[i] = Math.max(1, level - 1);
        }
        if (level === 5) {
            ll[i] = 4;
        }
    }
}
exports.RandomizeTraderAssort = RandomizeTraderAssort;
class RagCallback extends RagfairCallbacks_1.RagfairCallbacks {
    mySearch(url, info, sessionID) {
        this.httpResponse.getBody(this.ragfairController.getOffers(sessionID, info));
        return this.httpResponse.getBody(this.ragfairController.getOffers(sessionID, info));
    }
}
exports.RagCallback = RagCallback;
class TraderRefresh extends TraderAssortHelper_1.TraderAssortHelper {
    myResetExpiredTrader(trader) {
        const traderId = trader.base._id;
        trader.assort = this.jsonUtil.clone(this.traderAssortService.getPristineTraderAssort(traderId));
        if (modConfig.randomize_trader_prices == true || modConfig.randomize_trader_stock == true || modConfig.randomize_trader_ll == true) {
            trader.assort.items = this.modifyTraderAssorts(trader, this.logger);
        }
        trader.base.nextResupply = this.traderHelper.getNextUpdateTimestamp(trader.base._id);
        trader.base.refreshTraderRagfairOffers = true;
        //seems like manually refreshing ragfair is necessary. 
        this.ragfairOfferGenerator.generateFleaOffersForTrader(trader.base._id);
    }
    modifyTraderAssorts(trader, logger) {
        const tables = this.databaseServer.getTables();
        const randomTraderAss = new RandomizeTraderAssort();
        const arrays = new arrays_1.Arrays(tables);
        const utils = new utils_1.Utils(tables, arrays);
        var assortItems = trader.assort.items;
        var assortBarters = trader.assort.barter_scheme;
        if (modConfig.randomize_trader_ll == true) {
            let ll = trader.assort.loyal_level_items;
            for (let lvl in ll) {
                randomTraderAss.randomizeLL(ll, lvl, logger);
            }
        }
        for (let i in assortItems) {
            let item = assortItems[i];
            let itemId = assortItems[i]._id;
            let itemTemplId = assortItems[i]._tpl;
            if (modConfig.randomize_trader_stock == true) {
                if (item.upd?.StackObjectsCount !== undefined) {
                    randomTraderAss.randomizeStockHelper(item);
                }
                if (item.upd?.UnlimitedCount !== undefined) {
                    item.upd.UnlimitedCount = false;
                }
                if (item.upd?.BuyRestrictionCurrent !== undefined) {
                    item.upd.BuyRestrictionCurrent = 0;
                }
            }
            if (modConfig.randomize_trader_prices == true) {
                let barter = assortBarters[itemId];
                if (barter !== undefined) {
                    //roll randomization of prices several times for better potential spread of prices
                    this.randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter);
                    this.randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter);
                    this.randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter);
                }
            }
        }
        return assortItems;
    }
    randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter) {
        let randNum = utils.pickRandNumOneInTen();
        randomTraderAss.setAndRandomizeCost(randNum, itemTemplId, barter, false);
    }
}
exports.TraderRefresh = TraderRefresh;
