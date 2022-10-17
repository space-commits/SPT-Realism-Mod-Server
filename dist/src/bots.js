"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bots = void 0;
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
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
const botZones = require("../db/bots/spawnZones.json");
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
        this.map = this.tables.locations;
        this.scavBase = this.botDB["assault"];
        this.usecBase = this.botDB["usec"];
        this.bearBase = this.botDB["bear"];
        this.botConf = this.configServ.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        this.botConfPMC = this.botConf.pmc;
    }
    loadBots() {
        if (this.modConf.openZonesFix == true) {
            for (const location in botZones.zones) {
                this.tables.locations[location].base.OpenZones = botZones.zones[location];
            }
        }
        this.botConf.equipment["pmc"] = {
            "weaponModLimits": {
                "scopeLimit": 10,
                "lightLaserLimit": 1
            },
            "randomisedArmorSlots": [],
            "randomisedWeaponModSlots": [],
            "blacklist": [{
                    "levelRange": {
                        "min": 1,
                        "max": 100
                    },
                    "equipment": {},
                    "cartridge": {}
                }
            ],
            "whitelist": [{
                    "levelRange": {
                        "min": 101,
                        "max": 101
                    },
                    "equipment": {},
                    "cartridge": {}
                }
            ]
        };
        for (let item in this.itemDB) {
            for (let hat in this.array.conflicting_hats) {
                if (this.itemDB[item]._id === this.array.conflicting_hats[hat]) {
                    let ca = this.array.conflicting_masks;
                    let sa = this.itemDB[item]._props.ConflictingItems;
                    this.itemDB[item]._props.ConflictingItems = ca.concat(sa);
                }
            }
        }
        if (this.modConf.med_changes == true) {
            this.array.non_scav_bot_list.forEach(addBotMedkit);
            function addBotMedkit(bot) {
                if (bot !== "assault" && bot !== "marskman" && bot.inventory.items.SecuredContainer) {
                    bot.inventory.items.SecuredContainer.push("SUPERBOTMEDKIT");
                }
            }
        }
        if (this.modConf.difficulty == true) {
            this.botConfPMC.useDifficultyOverride = true;
            for (let i in this.map) {
                if (this.map[i].base?.BossLocationSpawn !== undefined) {
                    for (let k in this.map[i].base.BossLocationSpawn) {
                        this.map[i].base.BossLocationSpawn[k].BossDifficult = "impossible";
                        if (this.map[i].base.BossLocationSpawn[k].BossName === "bossKnight") {
                            this.map[i].base.BossLocationSpawn[k].BossEscortDifficult = "impossible";
                        }
                        else {
                            this.map[i].base.BossLocationSpawn[k].BossEscortDifficult = "hard";
                        }
                    }
                }
            }
        }
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
        this.array.boss_bot_list.forEach(increaseVitality);
        function increaseVitality(bot) {
            if (bot.skills?.Common !== undefined) {
                if (bot.skills.Common["Vitality"] !== undefined) {
                    bot.skills.Common["Vitality"].max = 5100;
                    bot.skills.Common["Vitality"].min = 5100;
                }
                else {
                    bot.skills.Common["Vitality"] = [];
                    bot.skills.Common["Vitality"].max = 5100;
                    bot.skills.Common["Vitality"].min = 5100;
                }
            }
            else {
                bot.skills.Common = [];
                bot.skills.Common["Vitality"] = [];
                bot.skills.Common["Vitality"].max = 5100;
                bot.skills.Common["Vitality"].min = 5100;
            }
        }
        this.array.scav_bot_health_list.forEach(setScavHealth);
        function setScavHealth(bot) {
            bot.health.BodyParts = commonStats.scavHealth.BodyParts;
            bot.health.Temperature = commonStats.health.Temperature;
        }
        this.array.PMC_list.forEach(setHealth);
        function setHealth(bot) {
            bot.health.BodyParts = commonStats.health.BodyParts;
            bot.health.Temperature = commonStats.health.Temperature;
        }
        if (this.modConf.realistic_boss_health == true) {
            this.array.boss_bot_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = commonStats.health.BodyParts;
                bot.health.Temperature = commonStats.health.Temperature;
            }
        }
        if (this.modConf.realistic_boss_follower_health == true) {
            this.array.boss_follower_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = commonStats.health.BodyParts;
                bot.health.Temperature = commonStats.health.Temperature;
            }
        }
        if (this.modConf.realistic_raider_rogue_health == true) {
            this.array.rogue_raider_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = commonStats.health.BodyParts;
                bot.health.Temperature = commonStats.health.Temperature;
            }
        }
        if (this.modConf.realistic_cultist_health == true) {
            this.array.cultist_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = commonStats.health.BodyParts;
                bot.health.Temperature = commonStats.health.Temperature;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Killa chest health = " + this.botDB["bosskilla"].health.BodyParts[0].Chest.min);
            this.logger.info("Killa Vitality = " + this.botDB["bosskilla"].skills.Common["Vitality"].max);
            this.logger.info("PMC chest health = " + this.botDB["usec"].health.BodyParts[0].Chest.min);
            this.logger.info("Scav head health min = " + this.botDB["assault"].health.BodyParts[0].Head.min);
            this.logger.info("Scav head health max = " + this.botDB["assault"].health.BodyParts[0].Head.max);
            this.logger.info("Cultist chest health = " + this.botDB["sectantwarrior"].health.BodyParts[0].Chest.min);
            this.logger.info("Bot Health Set");
        }
    }
    botTest(tier) {
        if (tier == 1) {
            this.botConfig1();
            this.logger.warning("Tier 1 Test Selected");
        }
        if (tier == 2) {
            this.botConfig2();
            this.logger.warning("Tier 2 Test Selected");
        }
        if (tier == 3) {
            this.botConfig3();
            this.logger.warning("Tier 3 Test Selected");
        }
        if (this.modConf.bot_test_weps_enabled == false) {
            this.array.bot_list.forEach(removeWeps);
            function removeWeps(bot) {
                bot.inventory.equipment.FirstPrimaryWeapon = [];
                bot.inventory.equipment.Holster = [];
            }
        }
        if (this.modConf.all_scavs == true && this.modConf.all_PMCs == false) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.scavTest.convertIntoPmcChance;
            this.logger.warning("All Scavs");
        }
        if (this.modConf.all_scavs == false && this.modConf.all_PMCs == true) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance;
            this.logger.warning("All PMCs");
        }
        if (this.modConf.all_USEC == false && this.modConf.all_bear == true) {
            this.botConfPMC.isUsec = 0;
            this.logger.warning("All Bear");
        }
        if (this.modConf.all_bear == false && this.modConf.all_USEC == true) {
            this.botConfPMC.isUsec = 100;
            this.logger.warning("All USEC");
        }
        if (this.modConf.guarantee_boss_spawn == true) {
            for (let i in this.map) {
                if (this.map[i].base?.BossLocationSpawn !== undefined) {
                    for (let k in this.map[i].base.BossLocationSpawn) {
                        this.map[i].base.BossLocationSpawn[k].BossChance = 100;
                    }
                }
            }
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
        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc1.convertIntoPmcChance;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue1;
        if (this.modConf.difficulty == true) {
            this.botConfPMC.pmcType = rmBotConfig.pmcType1;
            this.botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;
            ;
        }
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
        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc2.convertIntoPmcChance;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue2;
        if (this.modConf.difficulty == true) {
            this.botConfPMC.pmcType = rmBotConfig.pmcType2;
            this.botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;
            ;
        }
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
        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc3.convertIntoPmcChance;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue3;
        if (this.modConf.difficulty == true) {
            this.botConfPMC.pmcType = rmBotConfig.pmcType3;
            this.botConfPMC.difficulty = rmBotConfig.pmc3.difficulty;
            ;
        }
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
