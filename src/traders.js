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
class Traders {
    constructor(logger, tables, modConf, traderConf, array) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.traderConf = traderConf;
        this.array = array;
    }
    loadTraderTweaks() {
        // this.tables.traders['54cb50c76803fa8b248b4571'].base.sell_category = sellCatPrap;
        this.tables.traders['54cb57776803fa99248b456e'].base.sell_category = sellCatThera.sell_category;
        this.tables.traders['58330581ace78e27b8b10cee'].base.sell_category = sellCatSkier.sell_category;
        // this.tables.traders['5935c25fb3acc3127c3d8cd9'].base.sell_category = sellCatPK;
        this.tables.traders['5a7c2eca46aef81a7ca2145d'].base.sell_category = sellCatMech.sell_category;
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
        this.tables.traders["54cb50c76803fa8b248b4571"].assort = customPrap;
        this.tables.traders["54cb57776803fa99248b456e"].assort = customThera;
        this.tables.traders["58330581ace78e27b8b10cee"].assort = customSkier;
        this.tables.traders["5935c25fb3acc3127c3d8cd9"].assort = customPK;
        this.tables.traders["5a7c2eca46aef81a7ca2145d"].assort = customMech;
        this.tables.traders["5ac3b934156ae10c4430e83c"].assort = customRag;
        this.tables.traders["5c0647fdd443bc2504c2d371"].assort = customJaeg;
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
                    let item = assort[i];
                    if (item.upd?.StackObjectsCount !== undefined) {
                        this.stockHelper(item);
                    }
                    if (item.upd?.UnlimitedCount !== undefined) {
                        item.upd.UnlimitedCount = false;
                    }
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
