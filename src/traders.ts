import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";

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


export class Traders {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private traderConf : ITraderConfig) {}


    public loadTraders() {

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

        if (this.modConf.logEverything == true) {
            this.logger.info("Traders Loaded");
        }
    }


}
