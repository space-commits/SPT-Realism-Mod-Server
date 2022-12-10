"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderRefresh = exports.RandomizeTraderAssort = exports.Traders = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const arrays_1 = require("./arrays");
const TraderAssortHelper_1 = require("C:/snapshot/project/obj/helpers/TraderAssortHelper");
const customPrap = require("../db/traders/prapor/assort.json");
const customThera = require("../db/traders/therapist/assort.json");
const customSkier = require("../db/traders/skier/assort.json");
const customPK = require("../db/traders/pk/assort.json");
const customMech = require("../db/traders/mechanic/assort.json");
const customRag = require("../db/traders/ragman/assort.json");
const customJaeg = require("../db/traders/jaeger/assort.json");
const fenseLimits = require("../db/traders/fence/fenceLimits.json");
// const sellCatPrap = require("../db/traders/prapor/sell_categories.json");
const sellCatThera = require("../db/traders/therapist/sell_categories.json");
const sellCatSkier = require("../db/traders/skier/sell_categories.json");
// const sellCatPK = require("../db/traders/pk/sell_categories.json");
const sellCatMech = require("../db/traders/mechanic/sell_categories.json");
// const sellCatRag = require("../db/traders/ragman/sell_categories.json");
// const sellCatJaeg = require("../db/traders/jaeger/sell_categories.json");
const ammoDB = require("../db/templates/ammo/ammoTemplates.json");
const prapId = "54cb50c76803fa8b248b4571";
const theraId = "54cb57776803fa99248b456e";
const skierId = "58330581ace78e27b8b10cee";
const pkId = "5935c25fb3acc3127c3d8cd9";
const mechId = "5a7c2eca46aef81a7ca2145d";
const ragmId = "5ac3b934156ae10c4430e83c";
const jaegId = "5c0647fdd443bc2504c2d371";
class Traders {
    constructor(logger, tables, modConf, traderConf, array, helper) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.traderConf = traderConf;
        this.array = array;
        this.helper = helper;
    }
    loadTraderTweaks() {
        // this.tables.traders['54cb50c76803fa8b248b4571'].base.sell_category = sellCatPrap;
        this.tables.traders[theraId].base.sell_category = sellCatThera.sell_category;
        this.tables.traders[skierId].base.sell_category = sellCatSkier.sell_category;
        // this.tables.traders['5935c25fb3acc3127c3d8cd9'].base.sell_category = sellCatPK;
        this.tables.traders[mechId].base.sell_category = sellCatMech.sell_category;
        // this.tables.traders['5ac3b934156ae10c4430e83c'].base.sell_category = sellCatRag;
        // this.tables.traders['5c0647fdd443bc2504c2d371'].base.sell_category = sellCatJaeg;
        this.traderConf.fence.maxPresetsPercent = 5;
        this.traderConf.fence.partialRefreshChangePercent = 30;
        this.traderConf.fence.assortSize = 60;
        this.traderConf.fence.itemPriceMult = 1.8;
        this.traderConf.fence.presetPriceMult = 2.5;
        this.traderConf.fence.itemTypeLimits = fenseLimits.itemTypeLimits;
        this.tables.globals.config.Health.HealPrice.HealthPointPrice = 100;
        this.tables.globals.config.Health.HealPrice.EnergyPointPrice = 30;
        this.tables.globals.config.Health.HealPrice.HydrationPointPrice = 30;
        if (this.modConf.logEverything == true) {
            this.logger.info("Traders Loaded");
        }
    }
    loadTraderAssorts() {
        this.tables.traders[prapId].assort = customPrap;
        this.tables.traders[theraId].assort = customThera;
        this.tables.traders[skierId].assort = customSkier;
        this.tables.traders[pkId].assort = customPK;
        this.tables.traders[mechId].assort = customMech;
        this.tables.traders[ragmId].assort = customRag;
        this.tables.traders[jaegId].assort = customJaeg;
    }
    setLoyaltyLevels() {
        this.loyaltyLevelHeleper(ammoDB);
    }
    loyaltyLevelHeleper(db) {
        for (let i in db) {
            let loyaltyLvl = db[i].LoyaltyLevel;
            let itemID = db[i].ItemID;
            for (let trader in this.tables.traders) {
                if (this.tables.traders[trader].assort?.items !== undefined) {
                    for (let item in this.tables.traders[trader].assort.items) {
                        if (this.tables.traders[trader].assort.items[item].parentId === "hideout" && this.tables.traders[trader].assort.items[item]._tpl === itemID) {
                            let id = this.tables.traders[trader].assort.items[item]._id;
                            this.tables.traders[trader].assort.loyal_level_items[id] = loyaltyLvl;
                        }
                    }
                }
            }
        }
    }
    addItemsToAssorts() {
        //therapist
        if (this.modConf.med_changes == true) {
            this.assortPusher(theraId, "TIER1MEDKIT", 1, "5449016a4bdc2d6f028b456f", 1, false, 25000);
            this.assortPusher(theraId, "TIER2MEDKIT", 1, "5449016a4bdc2d6f028b456f", 3, false, 50000);
            this.assortPusher(theraId, "TIER3MEDKIT", 1, "5449016a4bdc2d6f028b456f", 4, false, 75000);
        }
    }
    assortPusher(trader, itemId, buyRestriction, saleCurrency, loyalLvl, useHandbook, cost) {
        let assort = this.tables.traders[trader].assort;
        let assortId = this.helper.genId();
        if (useHandbook == true) {
            for (let i in this.tables.templates.handbook.Items) {
                if (this.tables.templates.handbook.Items[i].Id === itemId) {
                    cost = this.tables.templates.handbook.Items[i].Price;
                }
            }
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
                        "count": cost,
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
        this.tables = this.databaseServer.getTables();
        this.itemDB = this.tables.templates.items;
        this.arrays = new arrays_1.Arrays(this.tables);
    }
    loadRandomizedTraderStock() {
        for (let trader in this.tables.traders) {
            if (this.tables.traders[trader].assort?.items !== undefined) {
                let assort = this.tables.traders[trader].assort.items;
                for (let i in assort) {
                    if (assort[i].upd?.StackObjectsCount !== undefined) {
                        this.stockHelper(assort[i]);
                    }
                    if (assort[i].upd?.UnlimitedCount !== undefined) {
                        assort[i].upd.UnlimitedCount = false;
                    }
                }
            }
            if (this.tables.traders[trader].assort?.loyal_level_items !== undefined) {
                let ll = this.tables.traders[trader].assort?.loyal_level_items;
                for (let i in ll) {
                    this.randomizeLL(ll, i);
                }
            }
        }
    }
    stockHelper(item) {
        //ammo
        this.randomizeStock("5485a8684bdc2da71d8b4567", item, 0, 120);
        this.randomizeStock("543be5cb4bdc2deb348b4568", item, 0, 2);
        //weapons
        for (let id in this.arrays.weapon_parent_IDs) {
            this.randomizeStock(this.arrays.weapon_parent_IDs[id], item, 0, 1);
        }
        //weapon mods
        for (let id in this.arrays.mod_parent_IDs) {
            this.randomizeStock(this.arrays.mod_parent_IDs[id], item, 0, 1);
        }
        //gear
        for (let id in this.arrays.gear_parent_id) {
            this.randomizeStock(this.arrays.gear_parent_id[id], item, 0, 1);
        }
        //barter items
        for (let id in this.arrays.barter_parent_id) {
            this.randomizeStock(this.arrays.barter_parent_id[id], item, 0, 2);
        }
        //keys 
        for (let id in this.arrays.key_parent_id) {
            this.randomizeStock(this.arrays.key_parent_id[id], item, 0, 1);
        }
        //magazine
        this.randomizeStock("5448bc234bdc2d3c308b4569", item, 0, 4);
        //medical
        this.randomizeStock("5448f3a64bdc2d60728b456a", item, 0, 1);
        this.randomizeStock("5448f3a14bdc2d27728b4569", item, 0, 2);
        this.randomizeStock("5448f3ac4bdc2dce718b4569", item, 0, 3);
        //special items
        this.randomizeStock("5447e0e74bdc2d3c308b4567", item, 3, 6);
        //grenades
        this.randomizeStock("543be6564bdc2df4348b4568", item, 0, 3);
        //money
        this.randomizeStock("543be5dd4bdc2deb348b4569", item, 0, 1000);
        //container
        this.randomizeStock("5795f317245977243854e041", item, 0, 1);
        //provisions
        this.randomizeStock("5448e8d64bdc2dce718b4568", item, 0, 1);
        this.randomizeStock("5448e8d04bdc2ddf718b4569", item, 0, 1);
        //map
        this.randomizeStock("5448e8d04bdc2ddf718b4569", item, 0, 1);
    }
    randomizeStock(parent, item, min, max) {
        var itemParent = this.itemDB[item._tpl]._parent;
        if (itemParent === parent) {
            item.upd.StackObjectsCount = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    randomizeLL(ll, i) {
        let level = ll[i];
        let randNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        if (randNum <= 3) {
            ll[i] = Math.max(1, Math.floor(Math.random() * (level - level - 1)) + level);
        }
    }
}
exports.RandomizeTraderAssort = RandomizeTraderAssort;
class TraderRefresh extends TraderAssortHelper_1.TraderAssortHelper {
    myResetExpiredTrader(trader) {
        trader.assort.items = this.getDirtyTraderAssorts(trader);
        trader.base.nextResupply = this.traderHelper.getNextUpdateTimestamp(trader.base._id);
        trader.base.refreshTraderRagfairOffers = true;
    }
    getDirtyTraderAssorts(trader) {
        const randomTraderAss = new RandomizeTraderAssort();
        var assortItems = trader.assort.items;
        for (let i in assortItems) {
            let item = assortItems[i];
            if (item.upd?.StackObjectsCount !== undefined) {
                randomTraderAss.stockHelper(item);
            }
            if (item.upd?.UnlimitedCount !== undefined) {
                item.upd.UnlimitedCount = false;
            }
            if (item.upd?.BuyRestrictionCurrent !== undefined) {
                item.upd.BuyRestrictionCurrent = 0;
            }
        }
        return assortItems;
    }
}
exports.TraderRefresh = TraderRefresh;
