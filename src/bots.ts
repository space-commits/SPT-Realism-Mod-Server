import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { BotTierTracker, Helper, RaidInfoTracker } from "./helper";
import { Arrays } from "./arrays";
import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";


const scavLO = require("../db/bots/loadouts/scavs/scavLO.json");
const bearLO = require("../db/bots/loadouts/PMCs/bearLO.json");
const usecLO = require("../db/bots/loadouts/PMCs/usecLO.json");
const raiderLO = require("../db/bots/loadouts/raiders_rogues/raiderLO.json");
const rogueLO = require("../db/bots/loadouts/raiders_rogues/rogueLO.json");
const knightLO = require("../db/bots/loadouts/bosses/goons/knightLO.json");
const bigpipeLO = require("../db/bots/loadouts/bosses/goons/bigpipeLO.json");
const birdeyeLO = require("../db/bots/loadouts/bosses/goons/birdeyeLO.json");
const killaLO = require("../db/bots/loadouts/bosses/killaLO.json");
const tagillaLO = require("../db/bots/loadouts/bosses/tagillaLO.json");
const scavLootLimitCat = require("../db/bots/loadouts/scavs/scavLootLimitCat.json");
const PMCLootLimitCat = require("../db/bots/loadouts/PMCs/PMCLootLimitCat.json");
const botHealth = require("../db/bots/botHealth.json");
const rmBotConfig = require("../db/bots/botconfig.json");
const USECNames = require("../db/bots/names/USECNames.json");
const bearNames = require("../db/bots/names/bearNames.json");
const pmcTypes = require("../db/bots/pmcTypes.json");

export class Bots {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private configServ: ConfigServer, private modConf, private arrays: Arrays, private helper: Helper) { }

    globalDB = this.tables.globals.config;
    itemDB = this.tables.templates.items;
    botDB = this.tables.bots.types;
    mapDB = this.tables.locations;

    scavBase = this.botDB["assault"];
    usecBase = this.botDB["usec"];
    bearBase = this.botDB["bear"];
    raiderBase = this.botDB["pmcbot"];
    rogueBase = this.botDB["exusec"];
    knightBase = this.botDB["bossknight"];
    bigpipeBase = this.botDB["followerbigpipe"];
    birdeyeBase = this.botDB["followerbirdeye"];
    killaBase = this.botDB["bosskilla"];
    tagillaBase = this.botDB["bosstagilla"];

    botConf = this.configServ.getConfig<IBotConfig>(ConfigTypes.BOT);
    botConfPMC = this.botConf.pmc;

    public loadBots() {

        const botEquipmentTempalte = {
            "lightLaserIsActiveChancePercent": 50,
            "faceShieldIsActiveChancePercent": 100,
            "nvgIsActiveChancePercent": 50,
            "weaponSightWhitelist": {},
            "randomisation": [],
            "weaponModLimits": {},
            "clothing": [],
            "weightingAdjustments": [],
            "blacklist": [],
            "whitelist": []
        }

        this.botConf.equipment["assault"] = botEquipmentTempalte;
        this.botConf.equipment["pmcbot"] = botEquipmentTempalte;
        this.botConf.equipment["exusec"] = botEquipmentTempalte;
        this.botConf.equipment["bossknight"] = botEquipmentTempalte;
        this.botConf.equipment["followerbigpipe"] = botEquipmentTempalte;
        this.botConf.equipment["followerbirdeye"] = botEquipmentTempalte;
        this.botConf.equipment["bosskilla"] = botEquipmentTempalte;
        this.botConf.equipment["bosstagilla"] = botEquipmentTempalte;


        this.botConf.equipment["pmc"].weaponModLimits.scopeLimit = 100;
        this.botConf.equipment["pmc"].weaponModLimits.lightLaserLimit = 2;
        this.botConf.equipment["pmc"].randomisation = [];
        this.botConf.equipment["pmc"].blacklist = [];
        this.botConf.equipment["pmc"].weightingAdjustments = [];
        this.botConf.equipment["pmc"].clothing = [];
        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;



        if (this.modConf.logEverything == true) {
            this.logger.info("Bots Loaded");
        }
    }

    public botMeds() {
        // this.arrays.nonScavBotArr.forEach(addBotMedkit);
        // function addBotMedkit(bot) {
        //     if (bot !== "assault" && bot !== "marskman" && bot.inventory.items.SecuredContainer) {
        //         bot.inventory.items.SecuredContainer.push("SUPERBOTMEDKIT");
        //     }
        // }
    }

    public forceBossSpawns() {
        for (let i in this.mapDB) {
            if (this.mapDB[i].base?.BossLocationSpawn !== undefined) {
                for (let k in this.mapDB[i].base.BossLocationSpawn) {
                    this.mapDB[i].base.BossLocationSpawn[k].BossChance = 100;
                }
            }
        }
    }

    public botNames() {
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

    public botDifficulty() {
        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.useDifficultyOverride = true;
            this.botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;;
        }

        if (this.modConf.boss_difficulty == true) {
            for (let i in this.mapDB) {
                if (this.mapDB[i].base?.BossLocationSpawn !== undefined) {
                    for (let k in this.mapDB[i].base.BossLocationSpawn) {
                        this.mapDB[i].base.BossLocationSpawn[k].BossDifficult = "hard";
                        this.mapDB[i].base.BossLocationSpawn[k].BossEscortDifficult = "hard";
                    }
                }
            }
        }
    }

    public increaseBotCap() {
        this.botConf.maxBotCap = rmBotConfig.maxBotCap
    }

    public setBotHealth() {
        for (let bot in this.arrays.botArr) {
            let botType = this.arrays.botArr[bot];
            if (botType.skills?.Common !== undefined) {
                if (botType.skills.Common["Vitality"] !== undefined) {
                    botType.skills.Common["Vitality"].max = 5100;
                    botType.skills.Common["Vitality"].min = 5100;
                }
                else {
                    botType.skills.Common["Vitality"] = {};
                    botType.skills.Common["Vitality"].max = 5100;
                    botType.skills.Common["Vitality"].min = 5100;
                }
            }
            else {
                botType.skills.Common = [];
                botType.skills.Common["Vitality"] = {};
                botType.skills.Common["Vitality"].max = 5100;
                botType.skills.Common["Vitality"].min = 5100;
            }
        }

        this.setBotHPHelper(this.arrays.standardBotHPArr);

        if (this.modConf.realistic_boss_health == true) {
            this.setBotHPHelper(this.arrays.bossBotArr);
        }

        if (this.modConf.realistic_boss_follower_health == true) {
            this.setBotHPHelper(this.arrays.bossFollowerArr);
        }

        if (this.modConf.realistic_raider_rogue_health == true) {
            this.setBotHPHelper(this.arrays.rogueRaiderList);
        }

        if (this.modConf.realistic_cultist_health == true) {
            this.setBotHPHelper(this.arrays.cultistArr);
        }
    }

    private setBotHPHelper(botArr: IBotType[]) {
        for (let bot in botArr) {
            for (let hpSet in botArr[bot].health.BodyParts) {
                let botPartSet = botArr[bot].health.BodyParts[hpSet];
                for (let part in botPartSet) {
                    for (let tempPart in botHealth.health.BodyParts[0]) {
                        if (part === tempPart) {
                            botPartSet[part].min = botHealth.health.BodyParts[0][tempPart].min;
                            botPartSet[part].max = botHealth.health.BodyParts[0][tempPart].max;
                        }
                    }
                }
            }
            botArr[bot].health.Temperature = botHealth.health.Temperature;
        }
    }

    //this thing is fucking demonic and cursed
    public botHpMulti() {

        this.botHPMultiHelper(this.arrays.standardBotHPArr, this.modConf.standard_bot_hp_multi);
        this.botHPMultiHelper(this.arrays.midBotHPArr, this.modConf.mid_bot_hp_multi);
        this.botHPMultiHelper(this.arrays.bossBotArr, this.modConf.boss_bot_hp_multi);

        if (this.modConf.logEverything == true) {
            this.logger.info("Killa chest health = " + this.botDB["bosskilla"].health.BodyParts[0].Chest.max);
            this.logger.info("Killa vitality = " + this.botDB["bosskilla"].skills.Common["Vitality"].min);
            this.logger.info("USEC chest health = " + this.botDB["usec"].health.BodyParts[0].Chest.min);
            this.logger.info("Bear chest health = " + this.botDB["bear"].health.BodyParts[0].Chest.min);
            this.logger.info("USEC head health = " + this.botDB["usec"].health.BodyParts[0].Head.min);
            this.logger.info("Bear head health = " + this.botDB["bear"].health.BodyParts[0].Head.min);
            this.logger.info("Bear leg health = " + this.botDB["bear"].health.BodyParts[0].LeftLeg.min);
            this.logger.info("Bear arm health = " + this.botDB["bear"].health.BodyParts[0].LeftArm.min);
            this.logger.info("Scav head health  max = " + this.botDB["assault"].health.BodyParts[0].Head.max);
            this.logger.info("Scav chest health  max = " + this.botDB["assault"].health.BodyParts[0].Chest.max);
            this.logger.info("Scav leg health max = " + this.botDB["assault"].health.BodyParts[0].LeftLeg.max);
            this.logger.info("Scav arm health  max = " + this.botDB["assault"].health.BodyParts[0].LeftArm.max);
            this.logger.info("Scav stomach health  max = " + this.botDB["assault"].health.BodyParts[0].Stomach.max);
            this.logger.info("Cultist chest health = " + this.botDB["sectantwarrior"].health.BodyParts[0].Chest.max);
            this.logger.info("Bot Health Set");
        }
    }

    //the devil himself
    private botHPMultiHelper(botArr: IBotType[], multi) {
        for (let bot in botArr) {
            for (let hpSet in botArr[bot].health.BodyParts) {
                let botPartSet = botArr[bot].health.BodyParts[hpSet];
                for (let part in botPartSet) {
                    botPartSet[part].min = Math.round(botPartSet[part].min * multi);
                    botPartSet[part].max = Math.round(botPartSet[part].max * multi);
                }
            }
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
            this.goonsLoad1();
            this.killaLoad1();
            this.tagillaLoad1();
            this.logger.warning("Tier 1 Test Selected");
        }

        if (tier == 2) {
            this.botConfig2();
            this.scavLoad2();
            this.usecLoad2();
            this.bearLoad2();
            this.rogueLoad2();
            this.raiderLoad2();
            this.goonsLoad2();
            this.killaLoad2();
            this.tagillaLoad2();
            this.logger.warning("Tier 2 Test Selected");
        }

        if (tier == 3) {
            this.botConfig3();
            this.scavLoad3();
            this.usecLoad3();
            this.bearLoad3();
            this.rogueLoad3();
            this.raiderLoad3();
            this.goonsLoad3();
            this.killaLoad3();
            this.tagillaLoad3();
            this.logger.warning("Tier 3 Test Selected");
        }

        if (tier == 4) {
            this.botConfig3();
            this.scavLoad3();
            this.usecLoad4();
            this.bearLoad4();
            this.rogueLoad3();
            this.raiderLoad3();
            this.goonsLoad3();
            this.killaLoad3();
            this.tagillaLoad3();
            this.logger.warning("Tier 4 Test Selected");
        }

        if (this.modConf.bot_test_weps_enabled == false) {
            this.arrays.botArr.forEach(removeWeps);
            function removeWeps(bot) {
                bot.inventory.equipment.FirstPrimaryWeapon = [];
                bot.inventory.equipment.Holster = [];
            }

            this.botConf.pmc.looseWeaponInBackpackChancePercent = 0;
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
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance
            this.botConfPMC.isUsec = 0;
            this.logger.warning("All Bear");
        }

        if (this.modConf.all_bear == false && this.modConf.all_USEC == true) {
            this.botConf.pmc.convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance
            this.botConfPMC.isUsec = 100;
            this.logger.warning("All USEC");
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
        this.botConfPMC.dynamicLoot = rmBotConfig.pmc1.dynamicLoot;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = this.modConf.bot_hostile1;

        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc1.looseWeaponInBackpackChancePercent;

        this.botConfPMC.isUsec = rmBotConfig.pmc1.isUsec;

        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc1.convertIntoPmcChance;

        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue1;

        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit1;

        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;

        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 100;
            this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 80;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 50;
            this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 100;
        } else {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 30;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 80;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 20;
            }
        }


        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;;
        }


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
        this.botConfPMC.dynamicLoot = rmBotConfig.pmc2.dynamicLoot;

        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = this.modConf.bot_hostile2;

        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc2.looseWeaponInBackpackChancePercent;

        this.botConfPMC.isUsec = rmBotConfig.pmc2.isUsec;

        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc2.convertIntoPmcChance;

        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue2;

        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;

        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;

        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 100;
            this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 50;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 50;
            this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 100;
        } else {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 25;
            }
        }

        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;;
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("boatConfig2 loaded");
        }
    }

    public botConfig3() {

        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability3.pmc
        this.botConf.durability.pmcbot = rmBotConfig.durability3.pmcbot
        this.botConf.durability.boss = rmBotConfig.durability3.boss
        this.botConf.durability.follower = rmBotConfig.durability3.follower
        this.botConf.durability.assault = rmBotConfig.durability3.assault
        this.botConf.durability.cursedassault = rmBotConfig.durability3.cursedassault
        this.botConf.durability.marksman = rmBotConfig.durability3.marksman
        this.botConf.durability.exusec = rmBotConfig.durability3.exusec
        this.botConf.durability.sectantpriest = rmBotConfig.durability3.sectantpriest
        this.botConf.durability.sectantwarrior = rmBotConfig.durability3.sectantwarrior

        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot = rmBotConfig.pmc3.dynamicLoot;

        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc3.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc3.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc3.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = this.modConf.bot_hostile3;

        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc3.looseWeaponInBackpackChancePercent;

        this.botConfPMC.isUsec = rmBotConfig.pmc3.isUsec;

        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc3.convertIntoPmcChance;

        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue3;

        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;

        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;

        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 100;
            this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 25;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 50;
            this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 100;
        } else {
            this.botConf.equipment["pmc"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 75;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["pmc"].lightLaserIsActiveChancePercent = 30;
            }
        }

        if (this.modConf.pmc_difficulty == true) {
            this.botConfPMC.difficulty = rmBotConfig.pmc3.difficulty;;
        }

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

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 40;
            this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 100;
        }
        else {
            this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 10;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 70;
            }
        }

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

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 90;
        }
        else {
            this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 10;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 80;
            }
        }

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

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 80;
            this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 60;
        }
        else {
            this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 10;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["assault"].lightLaserIsActiveChancePercent = 90;
            }
        }

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

        if (RaidInfoTracker.TOD === "night") {
            this.usecBase.chances.mods.mod_nvg = 15;
            this.usecBase.chances.mods.mod_flashlight = 40;
            this.usecBase.chances.mods.mod_equipment_000 = 0;
            this.usecBase.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.usecBase.chances.mods.mod_nvg = 15;
            this.usecBase.chances.mods.mod_flashlight = 40;
            this.usecBase.chances.mods.mod_equipment_000 = 10;
            this.usecBase.chances.mods.mod_equipment = 10;
        } else {
            this.usecBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.usecBase.chances.mods.mod_flashlight = 30;
                this.usecBase.chances.mods.mod_equipment_000 = 15;
                this.usecBase.chances.mods.mod_equipment = 15;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.usecBase.chances.mods.mod_flashlight = 40;
                this.usecBase.chances.mods.mod_equipment_000 = 20;
                this.usecBase.chances.mods.mod_equipment = 20;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.usecBase.chances.mods.mod_equipment_000 = 10;
                this.usecBase.chances.mods.mod_equipment = 10;
            }
        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.pmcTypeTimmy.pmcTypeDay.sptusec;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.pmcTypeTimmy.pmcTypeNight.sptusec;
            }
        }

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

        if (RaidInfoTracker.TOD === "night") {
            this.usecBase.chances.mods.mod_nvg = 25;
            this.usecBase.chances.mods.mod_flashlight = 60;
            this.usecBase.chances.mods.mod_equipment_000 = 0;
            this.usecBase.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.usecBase.chances.mods.mod_nvg = 25;
            this.usecBase.chances.mods.mod_flashlight = 60;
            this.usecBase.chances.mods.mod_equipment_000 = 10;
            this.usecBase.chances.mods.mod_equipment = 10;
        } else {
            this.usecBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_urban;
                this.usecBase.chances.mods.mod_flashlight = 40;
                this.usecBase.chances.mods.mod_equipment_000 = 20;
                this.usecBase.chances.mods.mod_equipment = 20;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_cqb;
                this.usecBase.chances.mods.mod_flashlight = 60;
                this.usecBase.chances.mods.mod_equipment_000 = 50;
                this.usecBase.chances.mods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_outdoor;
                this.usecBase.chances.mods.mod_equipment_000 = 0;
                this.usecBase.chances.mods.mod_equipment = 0;
            }
        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
            }
        }

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

        if (RaidInfoTracker.TOD === "night") {
            this.usecBase.chances.mods.mod_nvg = 50;
            this.usecBase.chances.mods.mod_flashlight = 90;
            this.usecBase.chances.mods.mod_equipment_000 = 0;
            this.usecBase.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.usecBase.chances.mods.mod_nvg = 60;
            this.usecBase.chances.mods.mod_flashlight = 100;
            this.usecBase.chances.mods.mod_equipment_000 = 20;
            this.usecBase.chances.mods.mod_equipment = 20;
        } else {
            this.usecBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_urban;
                this.usecBase.chances.mods.mod_flashlight = 80;
                this.usecBase.chances.mods.mod_equipment_000 = 50;
                this.usecBase.chances.mods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_cqb;
                this.usecBase.chances.mods.mod_flashlight = 100;
                this.usecBase.chances.mods.mod_equipment_000 = 85;
                this.usecBase.chances.mods.mod_equipment = 85;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_outdoor;
                this.usecBase.chances.mods.mod_equipment_000 = 0;
                this.usecBase.chances.mods.mod_equipment = 0;
            }
        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
            }
        }

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


        if (RaidInfoTracker.TOD === "night") {
            this.usecBase.chances.mods.mod_nvg = 70;
            this.usecBase.chances.mods.mod_flashlight = 100;
            this.usecBase.chances.mods.mod_equipment_000 = 0;
            this.usecBase.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.usecBase.chances.mods.mod_nvg = 65;
            this.usecBase.chances.mods.mod_flashlight = 100;
            this.usecBase.chances.mods.mod_equipment_000 = 20;
            this.usecBase.chances.mods.mod_equipment = 20;
        } else {
            this.usecBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_urban;
                this.usecBase.chances.mods.mod_flashlight = 100;
                this.usecBase.chances.mods.mod_equipment_000 = 60;
                this.usecBase.chances.mods.mod_equipment = 60;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_cqb;
                this.usecBase.chances.mods.mod_flashlight = 100;
                this.usecBase.chances.mods.mod_equipment_000 = 80;
                this.usecBase.chances.mods.mod_equipment = 80;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.usecBase.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_outdoor;
                this.usecBase.chances.mods.mod_equipment_000 = 25;
                this.usecBase.chances.mods.mod_equipment = 25;
            }
        }


        if (this.modConf.pmc_types == true) {

            for (let map in this.botConf.pmc.pmcType.sptusec) {
                for (let type in this.botConf.pmc.pmcType.sptusec[map]) {
                    if (type === "cursedAssault") {
                        this.botConf.pmc.pmcType.sptusec[map][type] *= 2;
                    }
                }
            }
        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes3.pmcTypeDay.sptusec;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes3.pmcTypeNight.sptusec;
            }
        }

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
        this.bearBase.appearance.voice = bearLO.LowTierVoice;

        if (RaidInfoTracker.TOD === "night") {
            this.bearBase.chances.mods.mod_nvg = 20;
            this.bearBase.chances.mods.mod_flashlight = 70;
            this.bearBase.chances.mods.mod_equipment_000 = 0;
            this.bearBase.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.bearBase.chances.mods.mod_nvg = 15;
            this.bearBase.chances.mods.mod_flashlight = 40;
            this.bearBase.chances.mods.mod_equipment_000 = 20;
            this.bearBase.chances.mods.mod_equipment = 20;

        } else {
            this.bearBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.bearBase.chances.mods.mod_equipment_000 = 35;
                this.bearBase.chances.mods.mod_equipment = 35;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.bearBase.chances.mods.mod_equipment_000 = 50;
                this.bearBase.chances.mods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.bearBase.chances.mods.mod_equipment_000 = 20;
                this.bearBase.chances.mods.mod_equipment = 20;
            }

        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.pmcTypeTimmy.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.pmcTypeTimmy.pmcTypeNight.sptbear;
            }
        }

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
        this.bearBase.appearance.voice = bearLO.LowTierVoice;

        if (RaidInfoTracker.TOD === "night") {
            this.bearBase.chances.mods.mod_nvg = 20;
            this.bearBase.chances.mods.mod_flashlight = 80;
            this.bearBase.chances.mods.mod_equipment_000 = 0;
            this.bearBase.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.bearBase.chances.mods.mod_nvg = 25;
            this.bearBase.chances.mods.mod_flashlight = 60;
            this.bearBase.chances.mods.mod_equipment_000 = 20;
            this.bearBase.chances.mods.mod_equipment = 20;
        } else {
            this.bearBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_urban;
                this.bearBase.chances.mods.mod_equipment_000 = 45;
                this.bearBase.chances.mods.mod_equipment = 45;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_cqb;
                this.bearBase.chances.mods.mod_equipment_000 = 70;
                this.bearBase.chances.mods.mod_equipment = 70;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_outdoor;
                this.bearBase.chances.mods.mod_equipment_000 = 20;
                this.bearBase.chances.mods.mod_equipment = 20;
            }

        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
            }
        }

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
        this.bearBase.appearance.voice = bearLO.HighTierVoice;

        if (RaidInfoTracker.TOD === "night") {
            this.bearBase.chances.mods.mod_nvg = 40;
            this.bearBase.chances.mods.mod_flashlight = 90;
            this.bearBase.chances.mods.mod_equipment_000 = 0;
            this.bearBase.chances.mods.mod_equipment = 0;
            this.bearBase.inventory.equipment.Headwear = bearLO.bearLO3.inventory.Headwear_night;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.bearBase.chances.mods.mod_nvg = 50;
            this.bearBase.chances.mods.mod_flashlight = 100;
            this.bearBase.chances.mods.mod_equipment_000 = 30;
            this.bearBase.chances.mods.mod_equipment = 30;
        } else {
            this.bearBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_urban;
                this.bearBase.chances.mods.mod_equipment_000 = 70;
                this.bearBase.chances.mods.mod_equipment = 70;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_cqb;
                this.bearBase.chances.mods.mod_equipment_000 = 100;
                this.bearBase.chances.mods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_outdoor;
                this.bearBase.chances.mods.mod_equipment_000 = 20;
                this.bearBase.chances.mods.mod_equipment = 20;
            }
        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
            }
        }


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
        this.bearBase.appearance.voice = bearLO.HighTierVoice;

        if (RaidInfoTracker.TOD === "night") {
            this.bearBase.chances.mods.mod_nvg = 40;
            this.bearBase.chances.mods.mod_flashlight = 100;
            this.bearBase.chances.mods.mod_equipment_000 = 0;
            this.bearBase.chances.mods.mod_equipment = 0;
            this.bearBase.inventory.equipment.Headwear = bearLO.bearLO4.inventory.Headwear_night;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.bearBase.chances.mods.mod_nvg = 50;
            this.bearBase.chances.mods.mod_flashlight = 100;
            this.bearBase.chances.mods.mod_equipment_000 = 40;
            this.bearBase.chances.mods.mod_equipment = 40;
        } else {
            this.bearBase.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_urban;
                this.bearBase.chances.mods.mod_equipment_000 = 100;
                this.bearBase.chances.mods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_cqb;
                this.bearBase.chances.mods.mod_equipment_000 = 100;
                this.bearBase.chances.mods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.bearBase.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_outdoor;
                this.bearBase.chances.mods.mod_equipment_000 = 20;
                this.bearBase.chances.mods.mod_equipment = 20;
            }
        }

        for (let map in this.botConf.pmc.pmcType.sptbear) {
            for (let type in this.botConf.pmc.pmcType.sptbear[map]) {
                if (type === "cursedAssault") {
                    this.botConf.pmc.pmcType.sptbear[map][type] *= 2;
                }
            }
        }

        if (this.modConf.pmc_types == true) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeNight.sptbear;
            }
        }


        BotTierTracker.bearTier = 4;
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad4 loaded");
        }
    }

    public raiderLoad1() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO1.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO1.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO1.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO1.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO1.chances;
        this.raiderBase.generation = raiderLO.raiderLO1.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        this.botConf.equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 40;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 50;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 70;
            this.raiderBase.chances.mods.mod_nvg = 40;
            this.raiderBase.chances.mods.mod_equipment_000 = 50;
            this.raiderBase.chances.mods.mod_equipment = 50;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 50;
        } else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_urban;
                this.raiderBase.chances.mods.mod_equipment_000 = 50;
                this.raiderBase.chances.mods.mod_equipment = 50;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_cqb;
                this.raiderBase.chances.mods.mod_equipment_000 = 80;
                this.raiderBase.chances.mods.mod_equipment = 80;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_outdoor;
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 0;
            }
        }

        BotTierTracker.raiderTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad1 loaded");
        }
    }
    public raiderLoad2() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO2.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO2.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO2.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO2.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO2.chances;
        this.raiderBase.generation = raiderLO.raiderLO2.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        this.botConf.equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 60;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 25;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 50;
            this.raiderBase.chances.mods.mod_nvg = 50;
            this.raiderBase.chances.mods.mod_equipment_000 = 50;
            this.raiderBase.chances.mods.mod_equipment = 50;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 50;
        } else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_urban;
                this.raiderBase.chances.mods.mod_equipment_000 = 70;
                this.raiderBase.chances.mods.mod_equipment = 70;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 60;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_cqb;
                this.raiderBase.chances.mods.mod_equipment_000 = 90;
                this.raiderBase.chances.mods.mod_equipment = 90;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_outdoor;
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 0;
            }
        }

        BotTierTracker.raiderTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad2 loaded");
        }
    }

    public raiderLoad3() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO3.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO3.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO3.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO3.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO3.chances;
        this.raiderBase.generation = raiderLO.raiderLO3.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        this.botConf.equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 80;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 0;
            this.raiderBase.chances.mods.mod_nvg = 50;
            this.raiderBase.chances.mods.mod_equipment_000 = 60;
            this.raiderBase.chances.mods.mod_equipment = 60;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 50;
        } else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_urban;
                this.raiderBase.chances.mods.mod_equipment_000 = 100;
                this.raiderBase.chances.mods.mod_equipment = 100;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 80;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_cqb;
                this.raiderBase.chances.mods.mod_equipment_000 = 100;
                this.raiderBase.chances.mods.mod_equipment = 100;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_outdoor;
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf.equipment["pmcbot"].lightLaserIsActiveChancePercent = 0;
            }
        }

        BotTierTracker.raiderTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad3 loaded");
        }
    }


    public rogueLoad1() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO1.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO1.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO1.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO1.inventory.mods;;
        this.rogueBase.chances = rogueLO.rogueLO1.chances;
        this.rogueBase.generation = rogueLO.rogueLO1.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 30;
            this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 30;
            this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {
                // this.rogueBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.rogueLO1.inventory.FirstPrimaryWeapon_urban;
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                // this.rogueBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.rogueLO1.inventory.FirstPrimaryWeapon_outdoor;
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 0;
            }
        }

        BotTierTracker.rogueTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad1 loaded");
        }
    }


    public rogueLoad2() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO2.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO2.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO2.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO2.inventory.mods;
        this.rogueBase.chances = rogueLO.rogueLO2.chances;
        this.rogueBase.generation = rogueLO.rogueLO2.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 40;
            this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 40;
            this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {
                // this.rogueBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.rogueLO2.inventory.FirstPrimaryWeapon_urban;
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                // this.rogueBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.rogueLO2.inventory.FirstPrimaryWeapon_outdoor;
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 0;
            }
        }

        BotTierTracker.rogueTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad2 loaded");
        }
    }

    public rogueLoad3() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO3.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO3.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO3.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO3.inventory.mods;
        this.rogueBase.chances = rogueLO.rogueLO3.chances;
        this.rogueBase.generation = rogueLO.rogueLO3.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 50;
            this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 50;
            this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {
                // this.rogueBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.rogueLO3.inventory.FirstPrimaryWeapon_urban;
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                // this.rogueBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.rogueLO3.inventory.FirstPrimaryWeapon_outdoor;
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf.equipment["exusec"].lightLaserIsActiveChancePercent = 0;
            }
        }

        BotTierTracker.rogueTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad3 loaded");
        }
    }

    public goonsLoad1() {
        this.knightBase.inventory.Ammo = knightLO.knightLO1.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO1.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO1.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO1.inventory.mods;
        this.knightBase.chances = knightLO.knightLO1.chances;
        this.knightBase.generation = knightLO.knightLO1.generation;
        this.botConf.equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.helper.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO1.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO1.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO1.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO1.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO1.chances;
        this.bigpipeBase.generation = bigpipeLO.bigpipeLO1.generation;
        this.botConf.equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO1.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO1.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO1.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO1.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO1.chances;
        this.birdeyeBase.generation = birdeyeLO.birdeyeLO1.generation;
        this.botConf.equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

        if (RaidInfoTracker.TOD === "night") {
            if (randNum >= 6) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            } else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }

            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
            this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.mapName === "factory4_night") {
            if (randNum >= 6) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            } else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }

            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 0;

            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {

                if (randNum >= 6) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                } else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }

                this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 100;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 50;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;

            }
            if (RaidInfoTracker.mapType === "outdoor") {

                if (randNum >= 8) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                } else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }

                this.knightBase.chances.mods.mod_equipment_000 = 0;
                this.knightBase.chances.mods.mod_equipment_001 *= 0.5;
                this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 0;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 0

                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            }
        }


        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_outdoor;
        }


        BotTierTracker.goonsTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("goonsLoad1 loaded");
        }
    }

    public goonsLoad2() {
        this.knightBase.inventory.Ammo = knightLO.knightLO2.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO2.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO2.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO2.inventory.mods;
        this.knightBase.chances = knightLO.knightLO2.chances;
        this.knightBase.generation = knightLO.knightLO2.generation;
        this.botConf.equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.helper.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO2.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO2.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO2.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO2.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO2.chances;
        this.bigpipeBase.generation = bigpipeLO.bigpipeLO2.generation;
        this.botConf.equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO2.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO2.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO2.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO2.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO2.chances;
        this.birdeyeBase.generation = birdeyeLO.birdeyeLO2.generation;
        this.botConf.equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

        if (RaidInfoTracker.TOD === "night") {

            if (randNum >= 4) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            } else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }

            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.mapName === "factory4_night") {

            if (randNum >= 3) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            } else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }

            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 0;

            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {

                if (randNum >= 4) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                } else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }

                this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 100;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 50;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            }
            if (RaidInfoTracker.mapType === "outdoor") {

                if (randNum >= 5) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                } else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }

                this.knightBase.chances.mods.mod_equipment_000 = 0;
                this.knightBase.chances.mods.mod_equipment_001 *= 0.5;
                this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 0;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 0;

                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_outdoor;
        }

        BotTierTracker.goonsTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("goonsLoad2 loaded");
        }
    }

    public goonsLoad3() {
        this.knightBase.inventory.Ammo = knightLO.knightLO3.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO3.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO3.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO3.inventory.mods;
        this.knightBase.chances = knightLO.knightLO3.chances;
        this.knightBase.generation = knightLO.knightLO3.generation;
        this.botConf.equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.helper.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO3.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO3.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO3.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO3.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO3.chances;
        this.bigpipeBase.generation = bigpipeLO.bigpipeLO3.generation;
        this.botConf.equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO3.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO3.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO3.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO3.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO3.chances;
        this.birdeyeBase.generation = birdeyeLO.birdeyeLO3.generation;
        this.botConf.equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

        if (RaidInfoTracker.TOD === "night") {

            if (randNum >= 3) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            } else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }

            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.mapName === "factory4_night") {

            if (randNum >= 2) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            } else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;

                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }

            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 100;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;

            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 20;
            this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {

            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChancePercent = 0;

            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {

                if (randNum >= 3) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                } else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }

                this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 100;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 100;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 80;

                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            }
            if (RaidInfoTracker.mapType === "outdoor") {

                if (randNum >= 4) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                } else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;

                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }

                this.knightBase.chances.mods.mod_equipment_000 = 0;
                this.knightBase.chances.mods.mod_equipment_001 *= 0.5;
                this.botConf.equipment["bossknight"].lightLaserIsActiveChancePercent = 0;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf.equipment["followerbigpipe"].lightLaserIsActiveChancePercent = 0

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;

                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightLaserIsActiveChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_outdoor;
        }

        BotTierTracker.goonsTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("goonsLoad3 loaded");
        }
    }

    public killaLoad1() {
        this.killaBase.inventory.Ammo = killaLO.killaLO1.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO1.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO1.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO1.inventory.mods;
        this.killaBase.chances = killaLO.killaLO1.chances;
        this.killaBase.generation = killaLO.killaLO1.generation;

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosskilla"].lightLaserIsActiveChancePercent = 100;
        }
        if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosskilla"].lightLaserIsActiveChancePercent = 0;
        }

        BotTierTracker.killaTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("killaLoad1 loaded");
        }
    }

    public killaLoad2() {
        this.killaBase.inventory.Ammo = killaLO.killaLO2.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO2.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO2.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO2.inventory.mods;
        this.killaBase.chances = killaLO.killaLO2.chances;
        this.killaBase.generation = killaLO.killaLO2.generation;

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosskilla"].lightLaserIsActiveChancePercent = 50;
        }
        if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosskilla"].lightLaserIsActiveChancePercent = 0;
        }

        BotTierTracker.killaTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("killaLoad2 loaded");
        }
    }

    public killaLoad3() {
        this.killaBase.inventory.Ammo = killaLO.killaLO3.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO3.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO3.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO3.inventory.mods;
        this.killaBase.chances = killaLO.killaLO3.chances;
        this.killaBase.generation = killaLO.killaLO3.generation;

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosskilla"].lightLaserIsActiveChancePercent = 25;
        }
        if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosskilla"].lightLaserIsActiveChancePercent = 0;
        }

        BotTierTracker.killaTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("killaLoad3 loaded");
        }
    }

    public tagillaLoad1() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO1.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO1.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO1.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO1.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO1.chances;
        this.tagillaBase.generation = tagillaLO.tagillaLO1.generation;

        const randnum = this.helper.pickRandNumOneInTen();

        if (randnum >= 8) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
        } else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 100;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 100;
        }

        BotTierTracker.tagillaTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("tagillaLoad1 loaded");
        }
    }

    public tagillaLoad2() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO2.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO2.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO2.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO2.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO2.chances;
        this.tagillaBase.generation = tagillaLO.tagillaLO2.generation;

        const randnum = this.helper.pickRandNumOneInTen();

        if (randnum >= 5) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
        } else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 50;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 100;
        }

        BotTierTracker.tagillaTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("tagillaLoad2 loaded");
        }
    }

    public tagillaLoad3() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO3.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO3.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO3.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO3.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO3.chances;
        this.tagillaBase.generation = tagillaLO.tagillaLO3.generation;

        const randnum = this.helper.pickRandNumOneInTen();

        if (randnum >= 3) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
        } else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 25;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosstagilla"].lightLaserIsActiveChancePercent = 100;
        }

        BotTierTracker.tagillaTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("tagillaLoad3 loaded");
        }
    }

    public forceBossItems() {

        this.tagillaBase.inventory.equipment.Headwear = { "60a7acf20c5cb24b01346648": 1 }
        this.tagillaBase.inventory.equipment.FaceCover = { "60a7ad2a2198820d95707a2e": 1, "60a7ad3a0c5cb24b0134664a": 1 }
        this.tagillaBase.chances.equipment.FaceCover = 100;

        this.bigpipeBase.inventory.equipment.Headwear = { "628e4dd1f477aa12234918aa": 1 }
        this.bigpipeBase.inventory.equipment.FaceCover = { "62a61bbf8ec41a51b34758d2": 1 }
        this.bigpipeBase.chances.equipment.FaceCover = 100;

        this.knightBase.inventory.equipment.Headwear = {}
        this.knightBase.chances.equipment.Headwear = 0;
        this.knightBase.chances.equipment.FaceCover = 100;
    }



}



