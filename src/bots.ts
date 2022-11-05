import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Helper } from "./helper";

const scavLO = require("../db/bots/loadouts/scavs/scavLO.json");
const bearLO = require("../db/bots/loadouts/PMCs/bearLO.json");
const usecLO = require("../db/bots/loadouts/PMCs/usecLO.json");
const raiderLO = require("../db/bots/loadouts/raiders_rogues/raiderLO.json");
const rogueLO = require("../db/bots/loadouts/raiders_rogues/rogueLO.json");
const scavLootLimitCat = require("../db/bots/loadouts/scavs/scavLootLimitCat.json");
const PMCLootLimitCat = require("../db/bots/loadouts/PMCs/PMCLootLimitCat.json");
const botHealth = require("../db/bots/botHealth.json");
const rmBotConfig = require("../db/bots/botconfig.json");
const USECNames = require("../db/bots/names/USECNames.json");
const bearNames = require("../db/bots/names/bearNames.json");
const botZones = require("../db/bots/spawnZones.json");

export class Bots {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private configServ: ConfigServer, private modConf, private array, private helper: Helper) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;
    public botDB = this.tables.bots.types;
    public map = this.tables.locations;

    public scavBase = this.botDB["assault"];
    public usecBase = this.botDB["usec"];
    public bearBase = this.botDB["bear"];
    public raiderBase = this.botDB["pmcbot"];
    public rogueBase = this.botDB["exusec"];

    public botConf = this.configServ.getConfig<IBotConfig>(ConfigTypes.BOT);
    public botConfPMC = this.botConf.pmc;

    public tierTrakcer = new BotTierTracker();

    public loadBots() {

        // this.botConfig1();
        // this.randomizedPMCBehaviour();

        
        if (this.modConf.realism == true) {
            //Adjust Thermal stim to compensate for lower base temp
            this.globalDB.Health.Effects.Stimulator.Buffs.Buffs_BodyTemperature["Value"] = -3;
        }


        if (this.modConf.openZonesFix == true) {
            for (let location in botZones.zones) {
                this.tables.locations[location].base.OpenZones = botZones.zones[location];
            }
        }

        if (this.modConf.increased_bot_cap == true) {

            this.botConf.maxBotCap = rmBotConfig.maxBotCap
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
        }

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

        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.useDifficultyOverride = true;
        }


        if (this.modConf.boss_difficulty == true) {
            for (let i in this.map) {
                if (this.map[i].base?.BossLocationSpawn !== undefined) {
                    for (let k in this.map[i].base.BossLocationSpawn) {
                        this.map[i].base.BossLocationSpawn[k].BossDifficult = "hard";
                        this.map[i].base.BossLocationSpawn[k].BossEscortDifficult = "hard";
                    }
                }
            }
        }



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

    public setBotHealth() {

        this.array.bot_list.forEach(increaseVitality);
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
            bot.health.BodyParts = botHealth.scavHealth.BodyParts
            bot.health.Temperature = botHealth.health.Temperature;
        }

        this.array.PMC_list.forEach(setHealth);
        function setHealth(bot) {
            bot.health.BodyParts = botHealth.health.BodyParts;
            bot.health.Temperature = botHealth.health.Temperature;
        }

        if (this.modConf.realistic_boss_health == true) {
            this.array.boss_bot_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = botHealth.health.BodyParts;
                bot.health.Temperature = botHealth.health.Temperature;
            }
        }

        if (this.modConf.realistic_boss_follower_health == true) {
            this.array.boss_follower_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = botHealth.health.BodyParts;
                bot.health.Temperature = botHealth.health.Temperature;
            }
        }

        if (this.modConf.realistic_raider_rogue_health == true) {
            this.array.rogue_raider_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = botHealth.health.BodyParts;
                bot.health.Temperature = botHealth.health.Temperature;
            }
        }

        if (this.modConf.realistic_cultist_health == true) {
            this.array.cultist_list.forEach(setHealth);
            function setHealth(bot) {
                bot.health.BodyParts = botHealth.health.BodyParts;
                bot.health.Temperature = botHealth.health.Temperature;
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

    public botTest(tier) {
        if (tier == 1) {
            this.botConfig1();
            this.scavLoad1();
            this.usecLoad1();
            this.bearLoad1();
            this.rogueLoad1();
            this.raiderLoad1();
            this.logger.warning("Tier 1 Test Selected");
        }

        if (tier == 2) {
            this.botConfig2();
            this.scavLoad2();
            this.usecLoad2();
            this.bearLoad2();
            this.rogueLoad2();
            this.raiderLoad1();
            this.logger.warning("Tier 2 Test Selected");
        }

        if (tier == 3) {
            this.botConfig3();
            this.scavLoad3();
            this.usecLoad3();
            this.bearLoad3();
            this.rogueLoad3();
            this.raiderLoad1();
            this.logger.warning("Tier 3 Test Selected");
        }

        if (tier == 4) {
            this.botConfig3();
            this.scavLoad3();
            this.usecLoad4();
            this.bearLoad4();
            this.rogueLoad3();
            this.raiderLoad1();
            this.logger.warning("Tier 4 Test Selected");
        }

        if (this.modConf.bot_test_weps_enabled == false) {
            this.array.bot_list.forEach(removeWeps);
            function removeWeps(bot) {
                bot.inventory.equipment.FirstPrimaryWeapon = [];
                bot.inventory.equipment.Holster = [];
            }
        }

        if (this.modConf.all_scavs == true && this.modConf.all_PMCs == false) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.scavTest.convertIntoPmcChance
            this.logger.warning("All Scavs");
        }

        if (this.modConf.all_scavs == false && this.modConf.all_PMCs == true) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance
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

    public randomizedPMCBehaviour() {

        if (this.modConf.pmc_difficulty == true) {
            var behaviourWeights = [5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            var behavioursArray = ["assault", "pmcBot", "exUsec", "bossKilla", "bossBully", "bossKilla", "bossGluhar", "bossSanitar", "bossKnight", "followerBully", "followerSanitar", "followerBigPipe", "followerGluharAssault", "followerGluharScout"];

            var behaviour1 = this.helper.probabilityWeighter(behavioursArray, behaviourWeights);
            var behaviour2 = this.helper.probabilityWeighter(behavioursArray, behaviourWeights);
            var behaviour3 = this.helper.probabilityWeighter(behavioursArray, behaviourWeights);
            var behaviour4 = this.helper.probabilityWeighter(behavioursArray, behaviourWeights);
            var behaviour5 = this.helper.probabilityWeighter(behavioursArray, behaviourWeights);
            var behaviour6 = this.helper.probabilityWeighter(behavioursArray, behaviourWeights);

            this.botConfPMC.pmcType = {
                "Factory": {
                    "usec": behaviour1,
                    "bear": behaviour2
                },
                "Customs": {
                    "usec": behaviour3,
                    "bear": behaviour4
                },
                "Woods": {
                    "usec": behaviour5,
                    "bear": behaviour6
                },
                "Interchange": {
                    "usec": behaviour6,
                    "bear": behaviour1
                },
                "Laboratory": {
                    "usec": behaviour5,
                    "bear": behaviour2
                },
                "Lighthouse": {
                    "usec": behaviour3,
                    "bear": behaviour4
                },
                "ReserveBase": {
                    "usec": behaviour2,
                    "bear": behaviour6
                },
                "Shoreline": {
                    "usec": behaviour1,
                    "bear": behaviour5
                },
                "default": {
                    "usec": behaviour4,
                    "bear": behaviour5
                }
            }
            this.logger.info("" + this.botConfPMC.pmcType.Factory.usec);
            this.logger.info("" + this.botConfPMC.pmcType.Customs.usec);
            this.logger.info("" + this.botConfPMC.pmcType.Woods.usec);
            this.logger.info("" + this.botConfPMC.pmcType.Lighthouse.usec);
            this.logger.info("" + this.botConfPMC.pmcType.ReserveBase.usec);
            this.logger.info("" + this.botConfPMC.pmcType.Laboratory.usec);
            this.logger.info("" + this.botConfPMC.pmcType.Factory.bear);
            this.logger.info("" + this.botConfPMC.pmcType.Customs.bear);
            this.logger.info("" + this.botConfPMC.pmcType.Woods.bear);
            this.logger.info("" + this.botConfPMC.pmcType.Lighthouse.bear);
            this.logger.info("" + this.botConfPMC.pmcType.ReserveBase.bear);
            this.logger.info("" + this.botConfPMC.pmcType.Laboratory.bear);
        }
    }

    public botConfig1() {

        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability1.pmc
        this.botConf.durability.pmcbot = rmBotConfig.durability1.pmcbot
        this.botConf.durability.boss = rmBotConfig.durability1.boss
        this.botConf.durability.follower = rmBotConfig.durability1.follower
        this.botConf.durability.assault = rmBotConfig.durability1.assault
        this.botConf.durability.cursedassault = rmBotConfig.durability1.cursedassault
        this.botConf.durability.marksman = rmBotConfig.durability1.marksman
        this.botConf.durability.exusec = rmBotConfig.durability1.exusec
        this.botConf.durability.sectantpriest = rmBotConfig.durability1.sectantpriest
        this.botConf.durability.sectantwarrior = rmBotConfig.durability1.sectantwarrior

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

        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;;
        }

        this.raiderLoad1();
        this.rogueLoad1();


        if (this.modConf.logEverything == true) {
            this.logger.info("botConfig1 loaded");
        }
    }

    public botConfig2() {

        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability2.pmc
        this.botConf.durability.pmcbot = rmBotConfig.durability2.pmcbot
        this.botConf.durability.boss = rmBotConfig.durability2.boss
        this.botConf.durability.follower = rmBotConfig.durability2.follower
        this.botConf.durability.assault = rmBotConfig.durability2.assault
        this.botConf.durability.cursedassault = rmBotConfig.durability2.cursedassault
        this.botConf.durability.marksman = rmBotConfig.durability2.marksman
        this.botConf.durability.exusec = rmBotConfig.durability2.exusec
        this.botConf.durability.sectantpriest = rmBotConfig.durability2.sectantpriest
        this.botConf.durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior

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

        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;;
        }

        this.raiderLoad1();
        this.rogueLoad2();

        if (this.modConf.logEverything == true) {
            this.logger.info("boatConfig2 loaded");
        }
    }

    public botConfig3() {

        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability2.pmc
        this.botConf.durability.pmcbot = rmBotConfig.durability2.pmcbot
        this.botConf.durability.boss = rmBotConfig.durability2.boss
        this.botConf.durability.follower = rmBotConfig.durability2.follower
        this.botConf.durability.assault = rmBotConfig.durability2.assault
        this.botConf.durability.cursedassault = rmBotConfig.durability2.cursedassault
        this.botConf.durability.marksman = rmBotConfig.durability2.marksman
        this.botConf.durability.exusec = rmBotConfig.durability2.exusec
        this.botConf.durability.sectantpriest = rmBotConfig.durability2.sectantpriest
        this.botConf.durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior

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
        this.botConf.lootNValue = rmBotConfig.lootNValue3;

        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;;
        }

        this.raiderLoad1();
        this.rogueLoad3();

        if (this.modConf.logEverything == true) {
            this.logger.info("botConfig3 loaded");
        }
    }

    public scavLoad1() {
        this.scavBase.inventory.Ammo = scavLO.scavLO1.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO1.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO1.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO1.inventory.mods;
        this.scavBase.chances = scavLO.scavLO1.chances;
        this.scavBase.generation = scavLO.scavLO1.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit1;
        BotTierTracker.scavTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad1 loaded");
        }
    }

    public scavLoad2() {
        this.scavBase.inventory.Ammo = scavLO.scavLO2.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO2.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO2.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO2.inventory.mods;
        this.scavBase.chances = scavLO.scavLO2.chances;
        this.scavBase.generation = scavLO.scavLO2.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit2;
        BotTierTracker.scavTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad2 loaded");
        }
    }

    public scavLoad3() {
        this.scavBase.inventory.Ammo = scavLO.scavLO3.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO3.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO3.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO3.inventory.mods;
        this.scavBase.chances = scavLO.scavLO3.chances;
        this.scavBase.generation = scavLO.scavLO3.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit3;
        BotTierTracker.scavTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad3 loaded");
        }
    }

    public usecLoad1() {
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
        BotTierTracker.usecTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad1 loaded");
        }
    }

    public usecLoad2() {
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
        BotTierTracker.usecTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad2 loaded");
        }
    }

    public usecLoad3() {
        this.usecBase.inventory.Ammo = usecLO.usecLO3.inventory.Ammo;
        this.usecBase.inventory.equipment = usecLO.usecLO3.inventory.equipment;
        this.usecBase.inventory.items = usecLO.usecLO3.inventory.items;
        this.usecBase.inventory.mods = usecLO.usecLO3.inventory.mods;
        this.usecBase.chances = usecLO.usecLO3.chances;
        this.usecBase.generation = usecLO.usecLO3.generation;
        this.usecBase.appearance.body = usecLO.usecLO3.appearance.body;
        this.usecBase.appearance.feet = usecLO.usecLO3.appearance.feet;
        this.usecBase.experience.level = usecLO.usecLO3.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;
        BotTierTracker.usecTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad3 loaded");
        }
    }

    public usecLoad4() {
        this.usecBase.inventory.Ammo = usecLO.usecLO4.inventory.Ammo;
        this.usecBase.inventory.equipment = usecLO.usecLO4.inventory.equipment;
        this.usecBase.inventory.items = usecLO.usecLO4.inventory.items;
        this.usecBase.inventory.mods = usecLO.usecLO4.inventory.mods;
        this.usecBase.chances = usecLO.usecLO4.chances;
        this.usecBase.generation = usecLO.usecLO4.generation;
        this.usecBase.appearance.body = usecLO.usecLO4.appearance.body;
        this.usecBase.appearance.feet = usecLO.usecLO4.appearance.feet;
        this.usecBase.experience.level = usecLO.usecLO4.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;
        BotTierTracker.usecTier = 4;
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad4 loaded");
        }
    }


    public bearLoad1() {
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
        BotTierTracker.bearTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad1 loaded");
        }
    }

    public bearLoad2() {
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
        BotTierTracker.bearTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad2 loaded");
        }
    }

    public bearLoad3() {
        this.bearBase.inventory.Ammo = bearLO.bearLO3.inventory.Ammo;
        this.bearBase.inventory.equipment = bearLO.bearLO3.inventory.equipment;
        this.bearBase.inventory.items = bearLO.bearLO3.inventory.items;
        this.bearBase.inventory.mods = bearLO.bearLO3.inventory.mods;
        this.bearBase.chances = bearLO.bearLO3.chances;
        this.bearBase.generation = bearLO.bearLO3.generation;
        this.bearBase.appearance.body = bearLO.bearLO3.appearance.body;
        this.bearBase.appearance.feet = bearLO.bearLO3.appearance.feet;
        this.bearBase.experience.level = bearLO.bearLO3.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;
        BotTierTracker.bearTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad3 loaded");
        }
    }

    public bearLoad4() {
        this.bearBase.inventory.Ammo = bearLO.bearLO4.inventory.Ammo;
        this.bearBase.inventory.equipment = bearLO.bearLO4.inventory.equipment;
        this.bearBase.inventory.items = bearLO.bearLO4.inventory.items;
        this.bearBase.inventory.mods = bearLO.bearLO4.inventory.mods;
        this.bearBase.chances = bearLO.bearLO4.chances;
        this.bearBase.generation = bearLO.bearLO4.generation;
        this.bearBase.appearance.body = bearLO.bearLO4.appearance.body;
        this.bearBase.appearance.feet = bearLO.bearLO4.appearance.feet;
        this.bearBase.experience.level = bearLO.bearLO4.experience.level;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;
        BotTierTracker.bearTier = 4;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad4 loaded");
        }
    }

    public raiderLoad1() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO1.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO1.inventory.equipment;
        this.raiderBase.inventory.mods = raiderLO.raiderLO1.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO1.chances;
        this.raiderBase.generation = raiderLO.raiderLO1.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;
        BotTierTracker.raiderTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad1 loaded");
        }
    }

    public rogueLoad1() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO1.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO1.inventory.equipment;
        this.rogueBase.inventory.mods = {};
        this.rogueBase.chances = rogueLO.rogueLO1.chances;
        this.rogueBase.generation = rogueLO.rogueLO1.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;
        BotTierTracker.rogueTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad1 loaded");
        }
    }


    public rogueLoad2() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO2.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO2.inventory.equipment;
        this.rogueBase.inventory.mods = {};
        this.rogueBase.chances = rogueLO.rogueLO2.chances;
        this.rogueBase.generation = rogueLO.rogueLO2.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;
        BotTierTracker.rogueTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad2 loaded");
        }
    }

    public rogueLoad3() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO3.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO3.inventory.equipment;
        this.rogueBase.inventory.mods = {};
        this.rogueBase.chances = rogueLO.rogueLO3.chances;
        this.rogueBase.generation = rogueLO.rogueLO3.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        BotTierTracker.rogueTier = 3;
        this.logger.info("/////////////////Tier = " + this.tierTrakcer.getTier("exusec"));
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad3 loaded");
        }
    }

}

export class BotTierTracker {
    public static usecTier: number = 1;
    public static bearTier: number = 1;
    public static scavTier: number = 1;
    public static rogueTier: number = 1;
    public static raiderTier: number = 1;


    public getTier(botType: string): number {
        if (botType === "usec") {
            return BotTierTracker.usecTier;
        }
        if (botType === "bear") {
            return BotTierTracker.bearTier;
        }
        if (botType === "assault") {
            return BotTierTracker.scavTier;
        }
        if (botType === "pmcbot") {
            return BotTierTracker.raiderTier;
        }
        if (botType === "exusec") {
            return BotTierTracker.rogueTier;
        }
    }

}