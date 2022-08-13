"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bots = void 0;
const ConfigTypes_1 = require("../../../../Aki_data/Server/lib/models/enums/ConfigTypes");
const scavLO = require("../db/bots/loadouts/scavLO.json");
const bearLO = require("../db/bots/loadouts/bearLO.json");
const usecLO = require("../db/bots/loadouts/usecLO.json");
const scavLootLimitCat = require("../db/bots/loadouts/scavLootLimitCat.json");
const PMCLootLimitCat = require("../db/bots/loadouts/PMCLootLimitCat.json");
const commonStats = require("../db/bots/common.json");
const rmBotConfig = require("../db/bots/botconfig.json");
const USECNames = require("../db/bots/names/USECNames.json");
const bearNames = require("../db/bots/names/bearNames.json");
const magazineJSON = require("../db/bots/loadouts/magazines.json");
class Bots {
    constructor(logger, tables, configServ, modConf, array) {
        this.logger = logger;
        this.tables = tables;
        this.configServ = configServ;
        this.modConf = modConf;
        this.array = array;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.botDB = this.tables.bots.types;
        this.scavBase = this.botDB["assault"];
        this.usecBase = this.botDB["usec"];
        this.bearBase = this.botDB["bear"];
        this.botArrNoScav = this.array.non_scav_bot_list;
        this.botArr = this.array.bot_list;
        this.botConf = this.configServ.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        this.botConfPMC = this.botConf.pmc;
    }
    loadBots() {
        //need to make this only apply to bosses and such
        // for (const id in this.botDB) {
        //     if (this.botDB[id].skills != null && this.botDB[id].skills !== undefined) {
        //         if (this.botDB[id].skills.Common != null && this.botDB[id].skills.Common !== undefined) {
        //             if (this.botDB[id].skills.Common["Vitality"] != null && this.botDB[id].skills.Common["Vitality"] !== undefined) {
        //                 this.botDB[id].skills.Common["Vitality"].max = 5100;
        //                 this.botDB[id].skills.Common["Vitality"].min = 5100;
        //                 this.logger.info(`${id} - ${this.botDB[id].skills.Common["Vitality"].min}`);
        //             } else {
        //                 this.botDB[id].skills.Common["Vitality"] = [];
        //                 this.botDB[id].skills.Common["Vitality"].max = 5100;
        //                 this.botDB[id].skills.Common["Vitality"].min = 5100;
        //                 this.logger.info(`${id} - ${this.botDB[id].skills.Common["Vitality"].min}`);
        //             }
        //         } else {
        //             this.botDB[id].skills.Common = [];
        //             this.botDB[id].skills.Common["Vitality"] = [];
        //             this.botDB[id].skills.Common["Vitality"].max = 5100;
        //             this.botDB[id].skills.Common["Vitality"].min = 5100;
        //             this.logger.info(`${id} - ${this.botDB[id].skills.Common["Vitality"].min}`);
        //         }
        //     }
        // }
        //Set bot loudouts to tier 1 as default
        this.botConfig1();
        if (this.modConf.bot_names == true) {
            this.usecBase.firstName = USECNames.firstName;
            this.usecBase.lastName = USECNames.lastName;
            if (this.modConf.cyrillic_bear_names == false) {
                this.bearBase.firstName = bearNames.firstName;
                this.bearBase.lastName = bearNames.lastName;
            }
            if (this.modConf.cyrillic_bear_names == true) {
                this.bearBase.firstName = bearNames.firstNameCyr;
                this.bearBase.lastName = bearNames.lastNameCyr;
            }
            if (this.modConf.logEverything == true) {
                this.logger.info("Bot Names Changed");
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Bots Loaded");
        }
    }
    setBotHealth() {
        //Set bot health
        this.scavBase.health.BodyParts = commonStats.scavHealth.BodyParts;
        this.scavBase.health.Temperature = commonStats.health.Temperature;
        this.botArrNoScav.forEach(setHealth);
        function setHealth(bot) {
            bot.health.BodyParts = commonStats.health.BodyParts;
            bot.health.Temperature = commonStats.health.Temperature;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("USEC chest health = " + this.usecBase.health.BodyParts[0].Chest.min);
            this.logger.info("Bot Health Set");
        }
    }
    botTest(tier) {
        if (tier == 1) {
            this.logger.warning("Tier 1 Test Selected");
            this.botConfig1();
        }
        if (tier == 2) {
            this.logger.warning("Tier 2 Test Selected");
            this.botConfig2();
        }
        if (tier == 3) {
            this.logger.warning("Tier 3 Test Selected");
            this.botConfig3();
        }
        if (this.modConf.bot_test_weps_enabled == false) {
            this.botArr.forEach(removeWeps);
            function removeWeps(bot) {
                bot.inventory.equipment.FirstPrimaryWeapon = [];
                bot.inventory.equipment.Holster = [];
            }
        }
        if (this.modConf.all_scavs == true && this.modConf.all_PMCs == false) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.scavTest.convertIntoPmcChance;
            this.logger.info("All Scavs");
        }
        if (this.modConf.all_scavs == false && this.modConf.all_PMCs == true) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance;
            this.logger.info("All PMCs");
        }
        if (this.modConf.all_bear == true) {
            this.botConfPMC.isUsec = 0;
            this.logger.info("All Bear");
        }
        if (this.modConf.all_USEC == true) {
            this.botConfPMC.isUsec = 100;
            this.logger.info("All USEC");
        }
    }
    botConfig1() {
        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability1.pmc;
        this.botConf.durability.pmcbot = rmBotConfig.durability1.pmcbot;
        this.botConf.durability.boss = rmBotConfig.durability1.boss;
        this.botConf.durability.follower = rmBotConfig.durability1.follower;
        this.botConf.durability.assault = rmBotConfig.durability1.assault;
        this.botConf.durability.cursedassault = rmBotConfig.durability1.cursedassault;
        this.botConf.durability.marksman = rmBotConfig.durability1.marksman;
        this.botConf.durability.exusec = rmBotConfig.durability1.exusec;
        this.botConf.durability.sectantpriest = rmBotConfig.durability1.sectantpriest;
        this.botConf.durability.sectantwarrior = rmBotConfig.durability1.sectantwarrior;
        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc1.dynamicLoot.moneyStackLimits;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;
        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc1.chanceSameSideIsHostilePercent;
        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc1.looseWeaponInBackpackChancePercent;
        this.botConfPMC.isUsec = rmBotConfig.pmc1.isUsec;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue1;
        this.scavLoad1();
        this.usecLoad1();
        this.bearLoad1();
        if (this.modConf.logEverything == true) {
            this.logger.info("botConfig1 loaded");
        }
    }
    botConfig2() {
        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability2.pmc;
        this.botConf.durability.pmcbot = rmBotConfig.durability2.pmcbot;
        this.botConf.durability.boss = rmBotConfig.durability2.boss;
        this.botConf.durability.follower = rmBotConfig.durability2.follower;
        this.botConf.durability.assault = rmBotConfig.durability2.assault;
        this.botConf.durability.cursedassault = rmBotConfig.durability2.cursedassault;
        this.botConf.durability.marksman = rmBotConfig.durability2.marksman;
        this.botConf.durability.exusec = rmBotConfig.durability2.exusec;
        this.botConf.durability.sectantpriest = rmBotConfig.durability2.sectantpriest;
        this.botConf.durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior;
        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc2.dynamicLoot.moneyStackLimits;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;
        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc2.chanceSameSideIsHostilePercent;
        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc2.looseWeaponInBackpackChancePercent;
        this.botConfPMC.isUsec = rmBotConfig.pmc2.isUsec;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue2;
        this.scavLoad2();
        this.usecLoad2();
        this.bearLoad2();
        if (this.modConf.logEverything == true) {
            this.logger.info("boatConfig2 loaded");
        }
    }
    botConfig3() {
        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability3.pmc;
        this.botConf.durability.pmcbot = rmBotConfig.durability3.pmcbot;
        this.botConf.durability.boss = rmBotConfig.durability3.boss;
        this.botConf.durability.follower = rmBotConfig.durability3.follower;
        this.botConf.durability.assault = rmBotConfig.durability3.assault;
        this.botConf.durability.cursedassault = rmBotConfig.durability3.cursedassault;
        this.botConf.durability.marksman = rmBotConfig.durability3.marksman;
        this.botConf.durability.exusec = rmBotConfig.durability3.exusec;
        this.botConf.durability.sectantpriest = rmBotConfig.durability3.sectantpriest;
        this.botConf.durability.sectantwarrior = rmBotConfig.durability3.sectantwarrior;
        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc3.dynamicLoot.moneyStackLimits;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc3.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc3.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc3.maxVestLootTotalRub;
        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc3.chanceSameSideIsHostilePercent;
        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc3.looseWeaponInBackpackChancePercent;
        this.botConfPMC.isUsec = rmBotConfig.pmc3.isUsec;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue3;
        this.scavLoad3();
        this.usecLoad3();
        this.bearLoad3();
        if (this.modConf.logEverything == true) {
            this.logger.info("botConfig3 loaded");
        }
    }
    scavLoad1() {
        this.scavBase.inventory.Ammo = scavLO.scavLO1.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO1.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO1.inventory.items;
        [scavLO.scavLO1.inventory.mods].push(magazineJSON);
        this.scavBase.inventory.mods = scavLO.scavLO1.inventory.mods;
        this.scavBase.chances = scavLO.scavLO1.chances;
        this.scavBase.generation = scavLO.scavLO1.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit1;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad1 loaded");
        }
    }
    scavLoad2() {
        this.scavBase.inventory.Ammo = scavLO.scavLO2.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO2.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO2.inventory.items;
        [scavLO.scavLO2.inventory.mods].push(magazineJSON);
        this.scavBase.inventory.mods = scavLO.scavLO2.inventory.mods;
        this.scavBase.chances = scavLO.scavLO2.chances;
        this.scavBase.generation = scavLO.scavLO2.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit2;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad2 loaded");
        }
    }
    scavLoad3() {
        this.scavBase.inventory.Ammo = scavLO.scavLO3.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO3.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO3.inventory.items;
        [scavLO.scavLO3.inventory.mods].push(magazineJSON);
        this.scavBase.inventory.mods = scavLO.scavLO3.inventory.mods;
        this.scavBase.chances = scavLO.scavLO3.chances;
        this.scavBase.generation = scavLO.scavLO3.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit3;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad3 loaded");
        }
    }
    usecLoad1() {
        this.usecBase.inventory.Ammo = usecLO.usecLO1.inventory.Ammo;
        this.usecBase.inventory.equipment = usecLO.usecLO1.inventory.equipment;
        this.usecBase.inventory.items = usecLO.usecLO1.inventory.items;
        [usecLO.usecLO1.inventory.mods].push(magazineJSON);
        this.usecBase.inventory.mods = usecLO.usecLO1.inventory.mods;
        this.usecBase.chances = usecLO.usecLO1.chances;
        this.usecBase.generation = usecLO.usecLO1.generation;
        this.usecBase.appearance.body = usecLO.usecLO1.appearance.body;
        this.usecBase.appearance.feet = usecLO.usecLO1.appearance.feet;
        this.usecBase.experience.level = usecLO.usecLO1.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit1;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad1 loaded");
        }
    }
    usecLoad2() {
        this.usecBase.inventory.Ammo = usecLO.usecLO2.inventory.Ammo;
        this.usecBase.inventory.equipment = usecLO.usecLO2.inventory.equipment;
        this.usecBase.inventory.items = usecLO.usecLO2.inventory.items;
        [usecLO.usecLO2.inventory.mods].push(magazineJSON);
        this.usecBase.inventory.mods = usecLO.usecLO2.inventory.mods;
        this.usecBase.chances = usecLO.usecLO2.chances;
        this.usecBase.generation = usecLO.usecLO2.generation;
        this.usecBase.appearance.body = usecLO.usecLO2.appearance.body;
        this.usecBase.appearance.feet = usecLO.usecLO2.appearance.feet;
        this.usecBase.experience.level = usecLO.usecLO2.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad2 loaded");
        }
    }
    usecLoad3() {
        this.usecBase.inventory.Ammo = usecLO.usecLO3.inventory.Ammo;
        this.usecBase.inventory.equipment = usecLO.usecLO3.inventory.equipment;
        this.usecBase.inventory.items = usecLO.usecLO3.inventory.items;
        [usecLO.usecLO3.inventory.mods].push(magazineJSON);
        this.usecBase.inventory.mods = usecLO.usecLO3.inventory.mods;
        this.usecBase.chances = usecLO.usecLO3.chances;
        this.usecBase.generation = usecLO.usecLO3.generation;
        this.usecBase.appearance.body = usecLO.usecLO3.appearance.body;
        this.usecBase.appearance.feet = usecLO.usecLO3.appearance.feet;
        this.usecBase.experience.level = usecLO.usecLO3.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad3 loaded");
        }
    }
    bearLoad1() {
        this.bearBase.inventory.Ammo = bearLO.bearLO1.inventory.Ammo;
        this.bearBase.inventory.equipment = bearLO.bearLO1.inventory.equipment;
        this.bearBase.inventory.items = bearLO.bearLO1.inventory.items;
        [bearLO.bearLO1.inventory.mods].push(magazineJSON);
        this.bearBase.inventory.mods = bearLO.bearLO1.inventory.mods;
        this.bearBase.chances = bearLO.bearLO1.chances;
        this.bearBase.generation = bearLO.bearLO1.generation;
        this.bearBase.appearance.body = bearLO.bearLO1.appearance.body;
        this.bearBase.appearance.feet = bearLO.bearLO1.appearance.feet;
        this.bearBase.experience.level = bearLO.bearLO1.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit1;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad1 loaded");
        }
    }
    bearLoad2() {
        this.bearBase.inventory.Ammo = bearLO.bearLO2.inventory.Ammo;
        this.bearBase.inventory.equipment = bearLO.bearLO2.inventory.equipment;
        this.bearBase.inventory.items = bearLO.bearLO2.inventory.items;
        [bearLO.bearLO2.inventory.mods].push(magazineJSON);
        this.bearBase.inventory.mods = bearLO.bearLO2.inventory.mods;
        this.bearBase.chances = bearLO.bearLO2.chances;
        this.bearBase.generation = bearLO.bearLO2.generation;
        this.bearBase.appearance.body = bearLO.bearLO2.appearance.body;
        this.bearBase.appearance.feet = bearLO.bearLO2.appearance.feet;
        this.bearBase.experience.level = bearLO.bearLO2.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad2 loaded");
        }
    }
    bearLoad3() {
        this.bearBase.inventory.Ammo = bearLO.bearLO3.inventory.Ammo;
        this.bearBase.inventory.equipment = bearLO.bearLO3.inventory.equipment;
        this.bearBase.inventory.items = bearLO.bearLO3.inventory.items;
        [bearLO.bearLO3.inventory.mods].push(magazineJSON);
        this.bearBase.inventory.mods = bearLO.bearLO3.inventory.mods;
        this.bearBase.chances = bearLO.bearLO3.chances;
        this.bearBase.generation = bearLO.bearLO3.generation;
        this.bearBase.appearance.body = bearLO.bearLO3.appearance.body;
        this.bearBase.appearance.feet = bearLO.bearLO3.appearance.feet;
        this.bearBase.experience.level = bearLO.bearLO3.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad3 loaded");
        }
    }
}
exports.Bots = Bots;
