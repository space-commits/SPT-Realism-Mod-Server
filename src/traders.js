"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderRefresh = exports.RandomizeTraderAssort = exports.Traders = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const arrays_1 = require("./arrays");
const TraderAssortHelper_1 = require("C:/snapshot/project/obj/helpers/TraderAssortHelper");
const helper_1 = require("./helper");
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
            this.assortItemPusher(theraId, "TIER1MEDKIT", 1, "5449016a4bdc2d6f028b456f", 1, false, 25000);
            this.assortItemPusher(theraId, "TIER2MEDKIT", 1, "5449016a4bdc2d6f028b456f", 3, false, 50000);
            this.assortItemPusher(theraId, "TIER3MEDKIT", 1, "5449016a4bdc2d6f028b456f", 4, false, 75000);
        }
        this.assortNestedItemPusher(mechId, "616584766ef05c2ce828ef57", { "5c7d560b2e22160bc12c6139": "mod_scope", "5c7d55de2e221644f31bff68": "mod_scope" }, 2, "5449016a4bdc2d6f028b456f", 1, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "58d39d3d86f77445bb794ae7", { "58d39b0386f77443380bf13c": "mod_scope", "58d399e486f77442e0016fe7": "mod_scope" }, 3, "5449016a4bdc2d6f028b456f", 1, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "58d39d3d86f77445bb794ae7", { "58d399e486f77442e0016fe7": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 3, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "5b31163c5acfc400153b71cb", { "5b3116595acfc40019476364": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "5a33b2c9c4a282000c5a9511", { "5a32aa8bc4a2826c6e06d737": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "58d2664f86f7747fec5834f6", { "58d268fc86f774111273f8c2": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "577d128124597739d65d0e56", { "577d141e24597739c5255e01": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 2, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "5b2389515acfc4771e1be0c0", { "5b2389515acfc4771e1be0c0": "mod_scope_000" }, 1, "5449016a4bdc2d6f028b456f", 3, true, undefined, 1.25);
        this.assortNestedItemPusher(mechId, "5a37ca54c4a282000d72296a", { "5b3b99475acfc432ff4dcbee": "mod_scope_000" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.25, { "58d268fc86f774111273f8c2": "mod_scope_001" });
        this.assortNestedItemPusher(mechId, "618bab21526131765025ab3f", { "618ba27d9008e4636a67f61d": "mod_scope" }, 1, "5449016a4bdc2d6f028b456f", 4, true, undefined, 1.25, { "618ba92152ecee1505530bd3": "mod_mount", "5a32aa8bc4a2826c6e06d737": "mod_scope" });
    }
    assortNestedItemPusher(trader, itemId, nestedChildItems, buyRestriction, saleCurrency, loyalLvl, useHandbook, price, priceMulti, secondaryChildItems) {
        let assort = this.tables.traders[trader].assort;
        let assortId = this.helper.genId();
        let parent = assortId;
        let idArr = [];
        if (price === undefined) {
            price = 0;
        }
        if (useHandbook == true) {
            idArr.push(itemId);
            for (let key in nestedChildItems) {
                idArr.push(key);
            }
            for (let key in secondaryChildItems) {
                idArr.push(key);
            }
            for (let item in idArr) {
                for (let i in this.tables.templates.handbook.Items) {
                    if (this.tables.templates.handbook.Items[i].Id === idArr[item]) {
                        price += this.tables.templates.handbook.Items[i].Price;
                    }
                }
            }
        }
        price *= priceMulti;
        this.logger.warning("ID = " + assortId);
        this.logger.warning("" + price);
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
        for (let key in nestedChildItems) {
            let id = this.helper.genId();
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
                let id = this.helper.genId();
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
    assortItemPusher(trader, itemId, buyRestriction, saleCurrency, loyalLvl, useHandbook, price, priceMulti) {
        let assort = this.tables.traders[trader].assort;
        let assortId = this.helper.genId();
        if (useHandbook == true) {
            for (let i in this.tables.templates.handbook.Items) {
                if (this.tables.templates.handbook.Items[i].Id === itemId) {
                    price = this.tables.templates.handbook.Items[i].Price * priceMulti;
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
        this.tables = this.databaseServer.getTables();
        this.itemDB = this.tables.templates.items;
        this.arrays = new arrays_1.Arrays(this.tables);
        this.helper = new helper_1.Helper(this.tables, this.arrays);
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
        this.randomizeStock("5485a8684bdc2da71d8b4567", item, 1, 120, true);
        this.randomizeStock("543be5cb4bdc2deb348b4568", item, 0, 2);
        //weapons
        for (let id in this.arrays.weaponParentIDs) {
            this.randomizeStock(this.arrays.weaponParentIDs[id], item, 0, 1);
        }
        //weapon mods
        for (let id in this.arrays.modParentIDs) {
            this.randomizeStock(this.arrays.modParentIDs[id], item, 0, 1);
        }
        //gear
        for (let id in this.arrays.gearParentIDs) {
            this.randomizeStock(this.arrays.gearParentIDs[id], item, 0, 1);
        }
        //barter items
        for (let id in this.arrays.barterParentIDs) {
            this.randomizeStock(this.arrays.barterParentIDs[id], item, 0, 2);
        }
        //keys 
        for (let id in this.arrays.keyParentIDs) {
            this.randomizeStock(this.arrays.keyParentIDs[id], item, 0, 1);
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
        this.randomizeStock("5671435f4bdc2d96058b4569", item, 0, 1);
        //provisions
        this.randomizeStock("5448e8d64bdc2dce718b4568", item, 0, 1);
        this.randomizeStock("5448e8d04bdc2ddf718b4569", item, 0, 1);
        //map
        this.randomizeStock("5448e8d04bdc2ddf718b4569", item, 0, 1);
    }
    randomizeStock(parent, item, min, max, isAmmo) {
        var itemParent = this.itemDB[item._tpl]._parent;
        if (itemParent === parent) {
            if (isAmmo == true) {
                let randNum = this.helper.pickRandNumOneInTen();
                if (randNum <= 4) {
                    item.upd.StackObjectsCount = 0;
                }
                else {
                    item.upd.StackObjectsCount = this.helper.pickRandNumInRange(min, max);
                }
            }
            else {
                item.upd.StackObjectsCount = this.helper.pickRandNumInRange(min, max);
            }
        }
    }
    randomizeLL(ll, i) {
        let level = ll[i];
        let randNum = this.helper.pickRandNumOneInTen();
        if (randNum <= 2) {
            ll[i] = Math.max(1, level - 1);
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
