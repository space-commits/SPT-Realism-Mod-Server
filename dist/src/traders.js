"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traders = void 0;
const customPrap = require("../db/traders/prapor/assort.json");
const customThera = require("../db/traders/therapist/assort.json");
const customSkier = require("../db/traders/skier/assort.json");
const customPK = require("../db/traders/pk/assort.json");
const customMech = require("../db/traders/mechanic/assort.json");
const customRag = require("../db/traders/ragman/assort.json");
const customJaeg = require("../db/traders/jaeger/assort.json");
class Traders {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
    }
    loadTraders() {
        if (this.modConf.trader_changes == true) {
            //load custom assorts
            this.tables.traders['54cb50c76803fa8b248b4571'].assort = customPrap;
            this.tables.traders['54cb57776803fa99248b456e'].assort = customThera;
            this.tables.traders['58330581ace78e27b8b10cee'].assort = customSkier;
            this.tables.traders['5935c25fb3acc3127c3d8cd9'].assort = customPK;
            this.tables.traders['5a7c2eca46aef81a7ca2145d'].assort = customMech;
            this.tables.traders['5ac3b934156ae10c4430e83c'].assort = customRag;
            this.tables.traders['5c0647fdd443bc2504c2d371'].assort = customJaeg;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Traders Loaded");
        }
    }
}
exports.Traders = Traders;
