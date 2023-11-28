import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { BotTierTracker, Utils, RaidInfoTracker, ModTracker } from "../utils/utils";
import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { ILocations } from "@spt-aki/models/spt/server/ILocations";
import { EventTracker } from "../misc/seasonalevents";
import { Arrays } from "../utils/arrays";

const scavLO = require("../../db/bots/loadouts/scavs/scavLO.json");
const bearLO = require("../../db/bots/loadouts/PMCs/bearLO.json");
const usecLO = require("../../db/bots/loadouts/PMCs/usecLO.json");
const tier5LO = require("../../db/bots/loadouts/PMCs/tier5PMC.json");
const raiderLO = require("../../db/bots/loadouts/raiders_rogues/raiderLO.json");
const rogueLO = require("../../db/bots/loadouts/raiders_rogues/rogueLO.json");
const knightLO = require("../../db/bots/loadouts/bosses/goons/knightLO.json");
const bigpipeLO = require("../../db/bots/loadouts/bosses/goons/bigpipeLO.json");
const birdeyeLO = require("../../db/bots/loadouts/bosses/goons/birdeyeLO.json");
const killaLO = require("../../db/bots/loadouts/bosses/killaLO.json");
const tagillaLO = require("../../db/bots/loadouts/bosses/tagillaLO.json");
const saniLO = require("../../db/bots/loadouts/bosses/sanitar/sanitarLO.json");
const saniFollowerLO = require("../../db/bots/loadouts/bosses/sanitar/sanitarfollowerLO.json");
const reshLO = require("../../db/bots/loadouts/bosses/reshalla/reshallaLO.json");
const reshFollowerLO = require("../../db/bots/loadouts/bosses/reshalla/reshallafollowerLO.json");
const scavLootLimitCat = require("../../db/bots/loadouts/scavs/scavLootLimitCat.json");
const PMCLootLimitCat = require("../../db/bots/loadouts/PMCs/PMCLootLimitCat.json");
const botHealth = require("../../db/bots/botHealth.json");
const rmBotConfig = require("../../db/bots/botconfig.json");
const USECNames = require("../../db/bots/names/USECNames.json");
const bearNames = require("../../db/bots/names/bearNames.json");
const pmcTypes = require("../../db/bots/pmcTypes.json");
const keys = require("../../db/bots/loadouts/templates/keys.json");

export class BotLoader {

    private scavBase: IBotType;
    private usecBase: IBotType;
    private bearBase: IBotType;
    private raiderBase: IBotType;
    private rogueBase: IBotType;
    private knightBase: IBotType;
    private bigpipeBase: IBotType;
    private birdeyeBase: IBotType;
    private killaBase: IBotType;
    private tagillaBase: IBotType;
    private reshallaBase: IBotType;
    private saniBase: IBotType;
    private saniFollowerBase: IBotType;
    private reshBase: IBotType;
    private reshFollowerBase: IBotType;

    constructor(private logger: ILogger, private tables: IDatabaseTables, private configServ: ConfigServer, private modConfig, private arrays: Arrays, private utils: Utils) {
        var botDB = this.tables.bots.types;
        this.scavBase = botDB["assault"];
        this.usecBase = botDB["usec"];
        this.bearBase = botDB["bear"];
        this.raiderBase = botDB["pmcbot"];
        this.rogueBase = botDB["exusec"];
        this.knightBase = botDB["bossknight"];
        this.bigpipeBase = botDB["followerbigpipe"];
        this.birdeyeBase = botDB["followerbirdeye"];
        this.killaBase = botDB["bosskilla"];
        this.tagillaBase = botDB["bosstagilla"];
        this.reshallaBase = botDB["bossbully"];
        this.saniBase = botDB["bosssanitar"];
        this.saniFollowerBase = botDB["followersanitar"];
        this.reshBase = botDB["bossbully"];
        this.reshFollowerBase = botDB["followerbully"];
    }

    mapDB(): ILocations {
        return this.tables.locations;
    }
    botConf(): IBotConfig {
        return this.configServ.getConfig<IBotConfig>(ConfigTypes.BOT);
    }
    botConfPMC(): IPmcConfig {
        return this.configServ.getConfig<IPmcConfig>(ConfigTypes.PMC);
    }



    public loadBots() {

        if (this.modConfig.dynamic_loot_pmcs == true) {
            this.botConfPMC().looseWeaponInBackpackChancePercent = 0;
        }

        // this.setDefaultLootOdds();

        const botEquipmentTempalte = {
            "weaponModLimits": {
                "scopeLimit": 2,
                "lightLaserLimit": 2
            },
            "lightIsActiveDayChancePercent": 50,
            "lightIsActiveNightChancePercent": 50,
            "laserIsActiveChancePercent": 50,
            "faceShieldIsActiveChancePercent": 100,
            "nvgIsActiveChanceNightPercent": 50,
            "nvgIsActiveChanceDayPercent": 50,
            "weightingAdjustmentsByPlayerLevel": [],
            "weightingAdjustmentsByBotLevel": [],
            "weaponSightWhitelist": {},
            "randomisation": [],
            "clothing": [],
            "weightingAdjustments": [],
            "blacklist": [],
            "whitelist": [],
        }

        this.botConf().equipment["assault"] = botEquipmentTempalte;
        this.botConf().equipment["pmcbot"] = botEquipmentTempalte;
        this.botConf().equipment["exusec"] = botEquipmentTempalte;
        this.botConf().equipment["bossknight"] = botEquipmentTempalte;
        this.botConf().equipment["followerbigpipe"] = botEquipmentTempalte;
        this.botConf().equipment["followerbirdeye"] = botEquipmentTempalte;
        this.botConf().equipment["bosskilla"] = botEquipmentTempalte;
        this.botConf().equipment["bosstagilla"] = botEquipmentTempalte;
        this.botConf().equipment["bosssanitar"] = botEquipmentTempalte;
        this.botConf().equipment["followersanitar"] = botEquipmentTempalte;
        this.botConf().equipment["bossbully"] = botEquipmentTempalte;
        this.botConf().equipment["followerbossbully"] = botEquipmentTempalte;

        this.botConf().equipment["pmc"].weaponModLimits.scopeLimit = 100;
        this.botConf().equipment["pmc"].weaponModLimits.lightLaserLimit = 2;
        this.botConf().equipment["pmc"].randomisation = [];
        this.botConf().equipment["pmc"].blacklist = [];
        this.botConf().equipment["pmc"].weightingAdjustmentsByBotLevel = [];
        this.botConf().equipment["pmc"].weightingAdjustmentsByPlayerLevel = [];
        this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 100;

        if (this.modConfig.logEverything == true) {
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
        for (let i in this.mapDB()) {
            if (this.mapDB()[i].base?.BossLocationSpawn !== undefined) {
                for (let k in this.mapDB()[i].base.BossLocationSpawn) {
                    this.mapDB()[i].base.BossLocationSpawn[k].BossChance = 100;
                }
            }
        }
    }

    public botNames() {
        this.usecBase.firstName = USECNames.firstName;
        this.usecBase.lastName = USECNames.lastName;

        if (this.modConfig.cyrillic_bear_names == false) {
            this.bearBase.firstName = bearNames.firstName;
            this.bearBase.lastName = bearNames.lastName;
        }

        if (this.modConfig.cyrillic_bear_names == true) {
            this.bearBase.firstName = bearNames.firstNameCyr;
            this.bearBase.lastName = bearNames.lastNameCyr;
        }
        if (this.modConfig.logEverything == true) {
            this.logger.info("Bot Names Changed");
        }
    }

    public botDifficulty() {

        // if (this.modConf.pmc_difficulty == true) {
        //     this.botConfPMC().useDifficultyOverride = true;
        //     this.botConfPMC().difficulty = rmBotConfig.pmc2.difficulty;;
        // }

        if (this.modConfig.boss_difficulty == true) {
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
        this.botConf().maxBotCap = rmBotConfig.maxBotCapHigh;
        this.botConf().presetBatch = rmBotConfig.presetBatch;
    }


    public increasePerformance() {
        this.botConf().maxBotCap = rmBotConfig.maxBotCapLow;
        this.botConf().presetBatch = rmBotConfig.presetBatch;
    }

    public setDefaultLootOdds() {
        for (let b in this.arrays.botArr) {
            let bot = this.arrays.botArr[b];
            bot.generation = this.arrays.pmcLootGen;
        }
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

        if (this.modConfig.realistic_boss_health == true) {
            this.setBotHPHelper(this.arrays.bossBotArr);
            this.knightBase.health = knightLO.health;
            this.bigpipeBase.health = bigpipeLO.health;
            this.birdeyeBase.health = birdeyeLO.health;
            this.killaBase.health = killaLO.health;
            this.tagillaBase.health = tagillaLO.health;
            this.saniBase.health = saniLO.health;
            this.reshBase.health = reshLO.health;
        }

        if (this.modConfig.realistic_boss_follower_health == true) {
            this.setBotHPHelper(this.arrays.bossFollowerArr);
            this.saniFollowerBase.health = saniFollowerLO.health;
            this.reshFollowerBase.health = reshFollowerLO.health;
        }

        if (this.modConfig.realistic_raider_rogue_health == true) {
            this.setBotHPHelper(this.arrays.rogueRaiderList);
            this.raiderBase.health = raiderLO.health;
        }

        if (this.modConfig.realistic_cultist_health == true) {
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

    //this thing is demonic and cursed
    public botHpMulti() {

        this.botHPMultiHelper(this.arrays.standardBotHPArr, this.modConfig.standard_bot_hp_multi);
        this.botHPMultiHelper(this.arrays.midBotHPArr, this.modConfig.mid_bot_hp_multi);
        this.botHPMultiHelper(this.arrays.bossBotArr, this.modConfig.boss_bot_hp_multi);

        if (this.modConfig.logEverything == true) {
            this.logger.info("Killa chest health = " + this.tables.bots.types["bosskilla"].health.BodyParts[0].Chest.max);
            this.logger.info("Killa vitality = " + this.tables.bots.types["bosskilla"].skills.Common["Vitality"].min);
            this.logger.info("USEC chest health = " + this.tables.bots.types["usec"].health.BodyParts[0].Chest.min);
            this.logger.info("Bear chest health = " + this.tables.bots.types["bear"].health.BodyParts[0].Chest.min);
            this.logger.info("USEC head health = " + this.tables.bots.types["usec"].health.BodyParts[0].Head.min);
            this.logger.info("Bear head health = " + this.tables.bots.types["bear"].health.BodyParts[0].Head.min);
            this.logger.info("Bear leg health = " + this.tables.bots.types["bear"].health.BodyParts[0].LeftLeg.min);
            this.logger.info("Bear arm health = " + this.tables.bots.types["bear"].health.BodyParts[0].LeftArm.min);
            this.logger.info("Scav head health  max = " + this.tables.bots.types["assault"].health.BodyParts[0].Head.max);
            this.logger.info("Scav chest health  max = " + this.tables.bots.types["assault"].health.BodyParts[0].Chest.max);
            this.logger.info("Scav leg health max = " + this.tables.bots.types["assault"].health.BodyParts[0].LeftLeg.max);
            this.logger.info("Scav arm health  max = " + this.tables.bots.types["assault"].health.BodyParts[0].LeftArm.max);
            this.logger.info("Scav stomach health  max = " + this.tables.bots.types["assault"].health.BodyParts[0].Stomach.max);
            this.logger.info("Cultist chest health = " + this.tables.bots.types["sectantwarrior"].health.BodyParts[0].Chest.max);
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
            this.rogueLoad1();
            this.raiderLoad1();
            this.goonsLoad1();
            this.killaLoad1();
            this.tagillaLoad1();
            this.sanitarLoad1();
            this.reshallaLoad1();
            this.logger.warning(`Tier ${tier} Test Selected`);
        }

        if (tier == 2) {
            this.botConfig2();
            this.scavLoad2();
            this.rogueLoad2();
            this.raiderLoad2();
            this.goonsLoad2();
            this.killaLoad2();
            this.tagillaLoad2();
            this.sanitarLoad2();
            this.reshallaLoad2();
            this.logger.warning(`Tier ${tier} Test Selected`);
        }

        if (tier == 3) {
            this.botConfig3();
            this.scavLoad3();
            this.rogueLoad3();
            this.raiderLoad3();
            this.goonsLoad3();
            this.killaLoad3();
            this.tagillaLoad3();
            this.sanitarLoad3();
            this.reshallaLoad3();
            this.logger.warning(`Tier ${tier} Test Selected`);
        }

        if (tier == 4 || tier == 5) {
            this.botConfig3();
            this.scavLoad3();
            this.rogueLoad3();
            this.raiderLoad3();
            this.goonsLoad3();
            this.killaLoad3();
            this.tagillaLoad3();
            this.sanitarLoad3();
            this.reshallaLoad3();
            this.logger.warning(`Tier ${tier} Test Selected`);
        }


        if (this.modConfig.bot_test_weps_enabled == false) {
            this.arrays.botArr.forEach(removeWeps);
            function removeWeps(bot) {
                bot.inventory.equipment.FirstPrimaryWeapon = [];
                bot.inventory.equipment.Holster = [];
                // bot.inventory.equipment.Backpack = [];
            }

            this.botConfPMC().looseWeaponInBackpackChancePercent = 0;
        }

        if (this.modConfig.all_scavs == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.scavTest.convertIntoPmcChance
            this.logger.warning("All Scavs");
        }
        if (this.modConfig.all_PMCs == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance
            this.logger.warning("All PMCs");
        }
        if (this.modConfig.all_bear == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance
            this.botConfPMC().isUsec = 0;
            this.logger.warning("All Bear");
        }
        if (this.modConfig.all_USEC == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmcTest.convertIntoPmcChance
            this.botConfPMC().isUsec = 100;
            this.logger.warning("All USEC");
        }
    }

    private setBotTier(pmcData, bots: BotLoader, helper: Utils) {
        this.setBotTierHelper(pmcData, "scav", bots, helper);
        this.setBotTierHelper(pmcData, "raider", bots, helper);
        this.setBotTierHelper(pmcData, "rogue", bots, helper);
        this.setBotTierHelper(pmcData, "goons", bots, helper);
        this.setBotTierHelper(pmcData, "killa", bots, helper);
        this.setBotTierHelper(pmcData, "tagilla", bots, helper);
        this.setBotTierHelper(pmcData, "sanitar", bots, helper);
        this.setBotTierHelper(pmcData, "reshalla", bots, helper);
    }

    private setBotTierHelper(pmcData: IPmcData, type: string, bots: BotLoader, utils: Utils) {
        var tier = 1;
        var tierArray = [1, 2, 3];
        if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 5) {
            tier = utils.probabilityWeighter(tierArray, [100, 0, 0]);
        }
        if (pmcData.Info.Level >= 5 && pmcData.Info.Level < 10) {
            tier = utils.probabilityWeighter(tierArray, [80, 20, 0]);
        }
        if (pmcData.Info.Level >= 10 && pmcData.Info.Level < 15) {
            tier = utils.probabilityWeighter(tierArray, [70, 20, 10]);
        }
        if (pmcData.Info.Level >= 15 && pmcData.Info.Level < 20) {
            tier = utils.probabilityWeighter(tierArray, [50, 40, 10]);
        }
        if (pmcData.Info.Level >= 20 && pmcData.Info.Level < 25) {
            tier = utils.probabilityWeighter(tierArray, [40, 40, 20]);
        }
        if (pmcData.Info.Level >= 25 && pmcData.Info.Level < 30) {
            tier = utils.probabilityWeighter(tierArray, [30, 40, 30]);
        }
        if (pmcData.Info.Level >= 30 && pmcData.Info.Level < 35) {
            tier = utils.probabilityWeighter(tierArray, [20, 30, 50]);
        }
        if (pmcData.Info.Level >= 35) {
            tier = utils.probabilityWeighter(tierArray, [10, 30, 60]);
        }

        if (type === "sanitar") {
            if (tier == 1) {
                bots.reshallaLoad1();
            }
            if (tier == 2) {
                bots.reshallaLoad2();
            }
            if (tier == 3) {
                bots.reshallaLoad3();
            }
        }
        if (type === "sanitar") {
            if (tier == 1) {
                bots.sanitarLoad1();
            }
            if (tier == 2) {
                bots.sanitarLoad3();
            }
            if (tier == 3) {
                bots.sanitarLoad3();
            }
        }
        if (type === "tagilla") {
            if (tier == 1) {
                bots.tagillaLoad1();
            }
            if (tier == 2) {
                bots.tagillaLoad2();
            }
            if (tier == 3) {
                bots.tagillaLoad3();
            }
        }
        if (type === "killa") {
            if (tier == 1) {
                bots.killaLoad1();
            }
            if (tier == 2) {
                bots.killaLoad2();
            }
            if (tier == 3) {
                bots.killaLoad3();
            }
        }
        if (type === "goons") {
            if (tier == 1) {
                bots.goonsLoad1();
            }
            if (tier == 2) {
                bots.goonsLoad2();
            }
            if (tier == 3) {
                bots.goonsLoad3();
            }
        }
        if (type === "raider") {
            if (tier == 1) {
                bots.raiderLoad1();
            }
            if (tier == 2) {
                bots.raiderLoad2();
            }
            if (tier == 3) {
                bots.raiderLoad3();
            }
        }
        if (type === "rogue") {
            if (tier == 1) {
                bots.rogueLoad1();
            }
            if (tier == 2) {
                bots.rogueLoad2();
            }
            if (tier == 3) {
                bots.rogueLoad3();
            }
        }
        if (type === "scav") {
            if (tier == 1) {
                bots.scavLoad1();
            }
            if (tier == 2) {
                bots.scavLoad2();
            }
            if (tier == 3) {
                bots.scavLoad3();
            }
        }
    }

    public updateBots(pmcData: IPmcData, logger: ILogger, config, bots: BotLoader, helper: Utils) {
        var property = pmcData?.Info?.Level;
        if (property === undefined) {
            bots.botConfig1();
            bots.scavLoad1();
            bots.rogueLoad1();
            bots.raiderLoad1();
            bots.goonsLoad1();
            bots.killaLoad1();
            bots.tagillaLoad1();
            if (this.modConfig.force_boss_items == true) {
                bots.forceBossItems();
            }
            logger.info("Realism Mod: Bots Have Been Set To Default (Tier 1)");
            if (config.logEverything == true) {
                logger.info("Realism Mod: Bots Have Been Reconfigured");
            }
        }
        if (property !== undefined) {
            if (config.bot_testing == true) {
                bots.botTest(config.bot_test_tier);
                logger.warning("Realism Mod: Bots Are In Test Mode");
            }
            if (config.bot_testing == false) {
                if (pmcData.Info.Level >= 0 && pmcData.Info.Level < 15) {
                    bots.botConfig1();
                }
                if (pmcData.Info.Level >= 16 && pmcData.Info.Level < 25) {
                    bots.botConfig2();
                }
                if (pmcData.Info.Level >= 26) {
                    bots.botConfig3();
                }
                this.setBotTier(pmcData, bots, helper);
                if (config.logEverything == true) {
                    logger.info("Realism Mod: Bot Tiers Have Been Set");
                }
            }
            if (this.modConfig.force_boss_items == true) {
                bots.forceBossItems();
            }
        }
    }

    public botConfig1() {

        //Set bot armor and weapon min durability
        this.botConf().durability.pmc = rmBotConfig.durability1.pmc
        this.botConf().durability.pmcbot = rmBotConfig.durability1.pmcbot
        this.botConf().durability.boss = rmBotConfig.durability1.boss
        this.botConf().durability.follower = rmBotConfig.durability1.follower
        this.botConf().durability.assault = rmBotConfig.durability1.assault
        this.botConf().durability.cursedassault = rmBotConfig.durability1.cursedassault
        this.botConf().durability.marksman = rmBotConfig.durability1.marksman
        this.botConf().durability.exusec = rmBotConfig.durability1.exusec
        this.botConf().durability.sectantpriest = rmBotConfig.durability1.sectantpriest
        this.botConf().durability.sectantwarrior = rmBotConfig.durability1.sectantwarrior

        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC().dynamicLoot = rmBotConfig.pmc1.dynamicLoot;
        //adjust PMC max loot in rubles
        this.botConfPMC().maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        this.botConfPMC().maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        this.botConfPMC().maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC().chanceSameSideIsHostilePercent = this.modConfig.bot_hostile1;

        this.botConfPMC().looseWeaponInBackpackChancePercent = rmBotConfig.pmc1.looseWeaponInBackpackChancePercent;

        this.botConfPMC().isUsec = rmBotConfig.pmc1.isUsec;

        if(!ModTracker.qtbPresent && !ModTracker.swagPresent){
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmc1.convertIntoPmcChance;
        }

        this.botConf().lootNValue = rmBotConfig.lootNValue;
        this.botConf().lootNValue.sptusec = 3;
        this.botConf().lootNValue.sptbear = 3;

        // this.botConf().itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit1;

        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;

        this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 100;

        if (RaidInfoTracker.TOD === "night") {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 50;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 75;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 75;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 50;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 75;
        } else {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 30;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 80;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 80;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 50;
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 0;
            }
        }

        if (this.modConfig.pmc_types == true && ModTracker.sainPresent == false) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConfPMC().pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
                this.botConfPMC().pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConfPMC().pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
                this.botConfPMC().pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
            }
        }


        if (this.modConfig.logEverything == true) {
            this.logger.info("botConfig1 loaded");
        }
    }

    public botConfig2() {

        //Set bot armor and weapon min durability
        this.botConf().durability.pmc = rmBotConfig.durability2.pmc
        this.botConf().durability.pmcbot = rmBotConfig.durability2.pmcbot
        this.botConf().durability.boss = rmBotConfig.durability2.boss
        this.botConf().durability.follower = rmBotConfig.durability2.follower
        this.botConf().durability.assault = rmBotConfig.durability2.assault
        this.botConf().durability.cursedassault = rmBotConfig.durability2.cursedassault
        this.botConf().durability.marksman = rmBotConfig.durability2.marksman
        this.botConf().durability.exusec = rmBotConfig.durability2.exusec
        this.botConf().durability.sectantpriest = rmBotConfig.durability2.sectantpriest
        this.botConf().durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior

        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC().dynamicLoot = rmBotConfig.pmc2.dynamicLoot;

        //adjust PMC max loot in rubles
        this.botConfPMC().maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
        this.botConfPMC().maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
        this.botConfPMC().maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC().chanceSameSideIsHostilePercent = this.modConfig.bot_hostile2;

        this.botConfPMC().looseWeaponInBackpackChancePercent = rmBotConfig.pmc2.looseWeaponInBackpackChancePercent;

        this.botConfPMC().isUsec = rmBotConfig.pmc2.isUsec;

        if(!ModTracker.qtbPresent && !ModTracker.swagPresent){
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmc2.convertIntoPmcChance;
        }

        this.botConf().lootNValue = rmBotConfig.lootNValue;
        this.botConf().lootNValue.sptusec = 2.75;
        this.botConf().lootNValue.sptbear = 2.75;

        // this.botConf().itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;

        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;

        this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 15;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 50;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 75;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 50;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 75;
        } else {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 50;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 100;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 50;
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 0;
            }
        }

        if (this.modConfig.pmc_types == true && ModTracker.sainPresent == false) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConfPMC().pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
                this.botConfPMC().pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConfPMC().pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
                this.botConfPMC().pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
            }
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("boatConfig2 loaded");
        }

    }

    public botConfig3() {

        //Set bot armor and weapon min durability
        this.botConf().durability.pmc = rmBotConfig.durability3.pmc
        this.botConf().durability.pmcbot = rmBotConfig.durability3.pmcbot
        this.botConf().durability.boss = rmBotConfig.durability3.boss
        this.botConf().durability.follower = rmBotConfig.durability3.follower
        this.botConf().durability.assault = rmBotConfig.durability3.assault
        this.botConf().durability.cursedassault = rmBotConfig.durability3.cursedassault
        this.botConf().durability.marksman = rmBotConfig.durability3.marksman
        this.botConf().durability.exusec = rmBotConfig.durability3.exusec
        this.botConf().durability.sectantpriest = rmBotConfig.durability3.sectantpriest
        this.botConf().durability.sectantwarrior = rmBotConfig.durability3.sectantwarrior

        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC().dynamicLoot = rmBotConfig.pmc3.dynamicLoot;

        //adjust PMC max loot in rubles
        this.botConfPMC().maxBackpackLootTotalRub = rmBotConfig.pmc3.maxBackpackLootTotalRub;
        this.botConfPMC().maxPocketLootTotalRub = rmBotConfig.pmc3.maxPocketLootTotalRub;
        this.botConfPMC().maxVestLootTotalRub = rmBotConfig.pmc3.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC().chanceSameSideIsHostilePercent = this.modConfig.bot_hostile3;

        this.botConfPMC().looseWeaponInBackpackChancePercent = rmBotConfig.pmc3.looseWeaponInBackpackChancePercent;

        this.botConfPMC().isUsec = rmBotConfig.pmc3.isUsec;

        if(!ModTracker.qtbPresent && !ModTracker.swagPresent){
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmc3.convertIntoPmcChance;
        }

        this.botConf().lootNValue = rmBotConfig.lootNValue;
        this.botConf().lootNValue.sptusec = 2.5;
        this.botConf().lootNValue.sptbear = 2.5;

        // this.botConf().itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;

        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;

        this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 25;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 100;
        } else {
            this.botConf().equipment["pmc"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["pmc"].laserIsActiveChancePercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 75;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 75;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 100;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 75;
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 0;
            }
        }

        if (this.modConfig.pmc_types == true && ModTracker.sainPresent == false) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConfPMC().pmcType.sptusec = pmcTypes.BotTypes3.pmcTypeDay.sptusec;
                this.botConfPMC().pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConfPMC().pmcType.sptusec = pmcTypes.BotTypes3.pmcTypeNight.sptusec;
                this.botConfPMC().pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeNight.sptbear;
            }
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("botConfig3 loaded");
        }
    }

    public scavLoad1() {
        this.scavBase.inventory.Ammo = scavLO.scavLO1.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO1.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO1.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO1.inventory.mods;
        this.scavBase.chances = scavLO.scavLO1.chances;
        // this.scavBase.generation = this.arrays.scavLootGen;
        // this.botConf().itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit1;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 40;
            this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["assault"].laserIsActiveChancePercent = 100;
        }
        else {
            this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 10;
            this.botConf().equipment["assault"].laserIsActiveChancePercent = 10;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 70;
                this.botConf().equipment["assault"].laserIsActiveChancePercent = 70;
            }
        }

        if (this.modConfig.dynamic_loot_scavs === true) {
            this.scavBase.inventory.items = scavLO.scavLO1.inventory.dynamic_looting;
            // this.scavBase.generation.items.backpackLoot.weights = { "0": 1 };
            // this.scavBase.generation.items.vestLoot.weights = { "0": 1 };
            // this.scavBase.generation.items.pocketLoot.weights = { "0": 1 };
        }

        BotTierTracker.scavTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("scavLoad1 loaded");
        }
    }

    public scavLoad2() {
        this.scavBase.inventory.Ammo = scavLO.scavLO2.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO2.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO2.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO2.inventory.mods;
        this.scavBase.chances = scavLO.scavLO2.chances;
        // this.scavBase.generation = this.arrays.scavLootGen;
        // this.botConf().itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit2;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 60;
            this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 90;
            this.botConf().equipment["assault"].laserIsActiveChancePercent = 90;
        }
        else {
            this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 10;
            this.botConf().equipment["assault"].laserIsActiveChancePercent = 10;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 80;
                this.botConf().equipment["assault"].laserIsActiveChancePercent = 80;
            }
        }

        if (this.modConfig.dynamic_loot_scavs === true) {
            this.scavBase.inventory.items = scavLO.scavLO2.inventory.dynamic_looting;
            // this.scavBase.generation.items.backpackLoot.weights = { "0": 1 };
            // this.scavBase.generation.items.vestLoot.weights = { "0": 1 };
            // this.scavBase.generation.items.pocketLoot.weights = { "0": 1 };
        }

        BotTierTracker.scavTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("scavLoad2 loaded");
        }
    }

    public scavLoad3() {
        this.scavBase.inventory.Ammo = scavLO.scavLO3.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO3.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO3.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO3.inventory.mods;
        this.scavBase.chances = scavLO.scavLO3.chances;
        // this.scavBase.generation = this.arrays.scavLootGen;
        // this.botConf().itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit3;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 80;
            this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 60;
            this.botConf().equipment["assault"].laserIsActiveChancePercent = 60;
        }
        else {
            this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 10;
            this.botConf().equipment["assault"].laserIsActiveChancePercent = 10;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["assault"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["assault"].laserIsActiveChancePercent = 90;
            }
        }

        if (this.modConfig.dynamic_loot_scavs === true) {
            this.scavBase.inventory.items = scavLO.scavLO3.inventory.dynamic_looting;
            // this.scavBase.generation.items.backpackLoot.weights = { "0": 1 };
            // this.scavBase.generation.items.vestLoot.weights = { "0": 1 };
            // this.scavBase.generation.items.pocketLoot.weights = { "0": 1 };
        }

        BotTierTracker.scavTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("scavLoad3 loaded");
        }
    }

    public usecLoad1(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO1.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO1.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO1.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO1.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO1.chances;
        // botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = usecLO.usecLO1.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO1.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO1.experience.level;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier1_PMC_Keys);

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 20;
            botJsonTemplate.chances.mods.mod_flashlight = 40;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 25;
            botJsonTemplate.chances.mods.mod_flashlight = 40;
            botJsonTemplate.chances.mods.mod_equipment_000 = 10;
            botJsonTemplate.chances.mods.mod_equipment = 10;
        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 30;
                botJsonTemplate.chances.mods.mod_equipment_000 = 15;
                botJsonTemplate.chances.mods.mod_equipment = 15;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 40;
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 10;
                botJsonTemplate.chances.mods.mod_equipment = 10;
            }
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO1.inventory.dynamic_looting;
          //   botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad1 loaded");
        }
    }

    public usecLoad2(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO2.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO2.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO2.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO2.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO2.chances;
        // botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = usecLO.usecLO2.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO2.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO2.experience.level;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier2_PMC_Keys);

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 50;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_mount = 100;
            botJsonTemplate.chances.mods.mod_mount_000 = 100;
            botJsonTemplate.chances.mods.mod_mount_001 = 100;
            botJsonTemplate.chances.mods.mod_tactical = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 40;
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 60;
                botJsonTemplate.chances.mods.mod_equipment_000 = 50;
                botJsonTemplate.chances.mods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 0;
                botJsonTemplate.chances.mods.mod_equipment = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO2.inventory.dynamic_looting;
            // botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad2 loaded");
        }
    }

    public usecLoad3(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO3.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO3.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO3.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO3.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO3.chances;
        // botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = usecLO.usecLO3.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO3.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO3.experience.level;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier3_PMC_Keys);

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 65;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_mount = 100;
            botJsonTemplate.chances.mods.mod_mount_000 = 100;
            botJsonTemplate.chances.mods.mod_mount_001 = 100;
            botJsonTemplate.chances.mods.mod_tactical = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 100;

        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 80;
                botJsonTemplate.chances.mods.mod_equipment_000 = 50;
                botJsonTemplate.chances.mods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 100;
                botJsonTemplate.chances.mods.mod_equipment_000 = 85;
                botJsonTemplate.chances.mods.mod_equipment = 85;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 0;
                botJsonTemplate.chances.mods.mod_equipment = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.Headwear = usecLO.usecLO3.inventory.Headwear_cqb;
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO3.inventory.dynamic_looting;
            // botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad3 loaded");
        }
    }

    public usecLoad4(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO4.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO4.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO4.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO4.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO4.chances;
        // botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = usecLO.usecLO4.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO4.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO4.experience.level;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier4_PMC_Keys);

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 100;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_mount = 100;
            botJsonTemplate.chances.mods.mod_mount_000 = 100;
            botJsonTemplate.chances.mods.mod_mount_001 = 100;
            botJsonTemplate.chances.mods.mod_tactical = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 100;
                botJsonTemplate.chances.mods.mod_equipment_000 = 60;
                botJsonTemplate.chances.mods.mod_equipment = 60;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 100;
                botJsonTemplate.chances.mods.mod_equipment_000 = 80;
                botJsonTemplate.chances.mods.mod_equipment = 80;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 25;
                botJsonTemplate.chances.mods.mod_equipment = 25;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.Headwear = usecLO.usecLO4.inventory.Headwear_cqb;
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO4.inventory.dynamic_looting;
            // botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad4 loaded");
        }
    }

    public usecLoad5(botJsonTemplate: IBotType) {

        botJsonTemplate.inventory.Ammo = tier5LO.tier5LO.inventory.Ammo;
        botJsonTemplate.inventory.items = usecLO.usecLO4.inventory.items;
        botJsonTemplate.appearance.body = tier5LO.tier5LO.appearance_usec.body;
        botJsonTemplate.appearance.feet = tier5LO.tier5LO.appearance_usec.feet;

        this.tier5PMCLoad(botJsonTemplate);

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO4.inventory.dynamic_looting;
            // botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad5 loaded");
        }
    }


    public bearLoad1(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO1.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO1.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO1.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO1.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO1.chances;
        // botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = bearLO.bearLO1.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO1.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO1.experience.level;
        botJsonTemplate.appearance.voice = bearLO.LowTierVoice;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier1_PMC_Keys);

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 20;
            botJsonTemplate.chances.mods.mod_flashlight = 70;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 25;
            botJsonTemplate.chances.mods.mod_flashlight = 40;
            botJsonTemplate.chances.mods.mod_equipment_000 = 20;
            botJsonTemplate.chances.mods.mod_equipment = 20;

        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 35;
                botJsonTemplate.chances.mods.mod_equipment = 35;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 50;
                botJsonTemplate.chances.mods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO1.inventory.dynamic_looting;
            // botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
            // botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad1 loaded");
        }
    }

    public bearLoad2(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO2.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO2.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO2.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO2.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO2.chances;
        // botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = bearLO.bearLO2.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO2.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO2.experience.level;
        botJsonTemplate.appearance.voice = bearLO.LowTierVoice;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier2_PMC_Keys);

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 50;
            botJsonTemplate.chances.mods.mod_flashlight = 80;
            botJsonTemplate.chances.mods.mod_mount = 100;
            botJsonTemplate.chances.mods.mod_mount_000 = 100;
            botJsonTemplate.chances.mods.mod_mount_001 = 100;
            botJsonTemplate.chances.mods.mod_tactical = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 45;
                botJsonTemplate.chances.mods.mod_equipment = 45;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 70;
                botJsonTemplate.chances.mods.mod_equipment = 70;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO2.inventory.dynamic_looting;
          //   botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad2 loaded");
        }
    }

    public bearLoad3(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO3.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO3.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO3.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO3.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO3.chances;
      //  botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = bearLO.bearLO3.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO3.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO3.experience.level;
        botJsonTemplate.appearance.voice = bearLO.HighTierVoice;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier3_PMC_Keys);

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 65;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_mount = 100;
            botJsonTemplate.chances.mods.mod_mount_000 = 100;
            botJsonTemplate.chances.mods.mod_mount_001 = 100;
            botJsonTemplate.chances.mods.mod_tactical = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = bearLO.bearLO3.inventory.Headwear_night;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 100;

        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 70;
                botJsonTemplate.chances.mods.mod_equipment = 70;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO3.inventory.dynamic_looting;
          //   botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad3 loaded");
        }
    }

    public bearLoad4(botJsonTemplate: IBotType) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO4.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO4.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO4.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO4.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO4.chances;
      //  botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.appearance.body = bearLO.bearLO4.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO4.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO4.experience.level;
        botJsonTemplate.appearance.voice = bearLO.HighTierVoice;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier4_PMC_Keys);

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 100;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_mount = 100;
            botJsonTemplate.chances.mods.mod_mount_000 = 100;
            botJsonTemplate.chances.mods.mod_mount_001 = 100;
            botJsonTemplate.chances.mods.mod_tactical = 100;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = bearLO.bearLO4.inventory.Headwear_night;
        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO4.inventory.dynamic_looting;
          //   botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad4 loaded");
        }
    }

    public bearLoad5(botJsonTemplate: IBotType) {

        botJsonTemplate.inventory.items = bearLO.bearLO4.inventory.items;
        botJsonTemplate.appearance.body = tier5LO.tier5LO.appearance_bear.body;
        botJsonTemplate.appearance.feet = tier5LO.tier5LO.appearance_bear.feet
        botJsonTemplate.appearance.voice = bearLO.HighTierVoice;

        this.tier5PMCLoad(botJsonTemplate);

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO4.inventory.dynamic_looting;
          //   botJsonTemplate.generation.items.backpackLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.vestLoot.weights = { "0": 1 };
         //   botJsonTemplate.generation.items.pocketLoot.weights = { "0": 1 };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad5 loaded");
        }
    }

    private tier5PMCLoad(botJsonTemplate: IBotType) {

        botJsonTemplate.experience.level = tier5LO.tier5LO.experience.level;
      //  botJsonTemplate.generation = this.arrays.pmcLootGen;
        botJsonTemplate.chances = tier5LO.tier5LO.chances;
        botJsonTemplate.inventory.mods = tier5LO.tier5LO.inventory.mods;
        botJsonTemplate.inventory.Ammo = tier5LO.tier5LO.inventory.Ammo;
        botJsonTemplate.inventory.equipment = tier5LO.tier5LO.inventory.equipment;
        botJsonTemplate.inventory.items.Backpack.push(...keys.tier4_PMC_Keys);
        botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5LO.tier5LO.inventory.FirstPrimaryWeapon_urban;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = tier5LO.tier5LO.inventory.Headwear_night;
        } else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
                botJsonTemplate.inventory.equipment.Headwear = tier5LO.tier5LO.inventory.Headwear_cqb;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
                botJsonTemplate.inventory.equipment.Headwear = tier5LO.tier5LO.inventory.Headwear_cqb;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 25;
                botJsonTemplate.chances.mods.mod_equipment = 25;
            }
        }

        //don't want TOD to be a factor
        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5LO.tier5LO.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5LO.tier5LO.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5LO.tier5LO.inventory.FirstPrimaryWeapon_outdoor;
        }
    }

    public raiderLoad1() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO1.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO1.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO1.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO1.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO1.chances;
        // this.raiderBase.generation = this.arrays.pmcLootGen;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        this.botConf().equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 70;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_cqb;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 70;
            this.raiderBase.chances.mods.mod_nvg = 70;
            this.raiderBase.chances.mods.mod_equipment_000 = 50;
            this.raiderBase.chances.mods.mod_equipment = 50;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        } else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.mods.mod_equipment_000 = 50;
                this.raiderBase.chances.mods.mod_equipment = 50;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.mods.mod_equipment_000 = 80;
                this.raiderBase.chances.mods.mod_equipment = 80;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_outdoor;
        }

        BotTierTracker.raiderTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("raiderLoad1 loaded");
        }
    }
    public raiderLoad2() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO2.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO2.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO2.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO2.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO2.chances;
        // this.raiderBase.generation = this.arrays.pmcLootGen;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        this.botConf().equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 80;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_cqb;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            this.raiderBase.chances.mods.mod_nvg = 80;
            this.raiderBase.chances.mods.mod_equipment_000 = 50;
            this.raiderBase.chances.mods.mod_equipment = 50;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        } else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.mods.mod_equipment_000 = 70;
                this.raiderBase.chances.mods.mod_equipment = 70;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 60;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.mods.mod_equipment_000 = 90;
                this.raiderBase.chances.mods.mod_equipment = 90;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_outdoor;
        }

        BotTierTracker.raiderTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("raiderLoad2 loaded");
        }
    }

    public raiderLoad3() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO3.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO3.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO3.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO3.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO3.chances;
        // this.raiderBase.generation = this.arrays.pmcLootGen;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        this.botConf().equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 100;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_cqb;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            this.raiderBase.chances.mods.mod_nvg = 100;
            this.raiderBase.chances.mods.mod_equipment_000 = 60;
            this.raiderBase.chances.mods.mod_equipment = 60;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        } else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.mods.mod_equipment_000 = 100;
                this.raiderBase.chances.mods.mod_equipment = 100;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 80;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.mods.mod_equipment_000 = 100;
                this.raiderBase.chances.mods.mod_equipment = 100;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_outdoor;
        }

        BotTierTracker.raiderTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("raiderLoad3 loaded");
        }
    }


    public rogueLoad1() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO1.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO1.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO1.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO1.inventory.mods;;
        this.rogueBase.chances = rogueLO.rogueLO1.chances;
        // this.rogueBase.generation = this.arrays.pmcLootGen;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 60;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 60;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            }
        }

        BotTierTracker.rogueTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("rogueLoad1 loaded");
        }
    }


    public rogueLoad2() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO2.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO2.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO2.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO2.inventory.mods;
        this.rogueBase.chances = rogueLO.rogueLO2.chances;
        // this.rogueBase.generation = this.arrays.pmcLootGen;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 80;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 80;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            }
        }

        BotTierTracker.rogueTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("rogueLoad2 loaded");
        }
    }

    public rogueLoad3() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO3.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO3.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO3.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO3.inventory.mods;
        this.rogueBase.chances = rogueLO.rogueLO3.chances;
        // this.rogueBase.generation = this.arrays.pmcLootGen;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 100;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 100;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban" || RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            }
        }

        BotTierTracker.rogueTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("rogueLoad3 loaded");
        }
    }

    public goonsLoad1() {
        this.knightBase.inventory.Ammo = knightLO.knightLO1.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO1.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO1.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO1.inventory.mods;
        this.knightBase.chances = knightLO.knightLO1.chances;
        // this.knightBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["bossknight"].faceShieldIsActiveChancePercent = 100;

        const randNum = this.utils.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO1.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO1.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO1.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO1.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO1.chances;
        // this.bigpipeBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO1.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO1.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO1.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO1.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO1.chances;
        // this.birdeyeBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

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
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
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
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 0;

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

                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 50;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;

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
                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0

                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }


        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_urban;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_outdoor;
            this.birdeyeBase.inventory.equipment.Holster = {};
        }


        BotTierTracker.goonsTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("goonsLoad1 loaded");
        }
    }

    public goonsLoad2() {
        this.knightBase.inventory.Ammo = knightLO.knightLO2.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO2.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO2.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO2.inventory.mods;
        this.knightBase.chances = knightLO.knightLO2.chances;
        // this.knightBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO2.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO2.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO2.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO2.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO2.chances;
        // this.bigpipeBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO2.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO2.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO2.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO2.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO2.chances;
        // this.birdeyeBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

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
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
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
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 0;

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

                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 50;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
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
                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;

                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_urban;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_outdoor;
            this.birdeyeBase.inventory.equipment.Holster = {};
        }


        BotTierTracker.goonsTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("goonsLoad2 loaded");
        }
    }

    public goonsLoad3() {
        this.knightBase.inventory.Ammo = knightLO.knightLO3.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO3.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO3.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO3.inventory.mods;
        this.knightBase.chances = knightLO.knightLO3.chances;
        // this.knightBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO3.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO3.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO3.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO3.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO3.chances;
        // this.bigpipeBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO3.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO3.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO3.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO3.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO3.chances;
        // this.birdeyeBase.generation = this.arrays.bossLootGen;
        this.botConf().equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

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
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
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
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;

            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 20;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {

            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 0;

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

                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 100;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 80;

                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
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
                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;

                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;

                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_urban;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_outdoor;
            this.birdeyeBase.inventory.equipment.Holster = {};
        }

        BotTierTracker.goonsTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("goonsLoad3 loaded");
        }
    }

    public killaLoad1() {
        this.killaBase.inventory.Ammo = killaLO.killaLO1.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO1.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO1.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO1.inventory.mods;
        this.killaBase.chances = killaLO.killaLO1.chances;
        // this.killaBase.generation = this.arrays.bossLootGen;

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }
        if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }

        BotTierTracker.killaTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("killaLoad1 loaded");
        }
    }

    public killaLoad2() {
        this.killaBase.inventory.Ammo = killaLO.killaLO2.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO2.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO2.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO2.inventory.mods;
        this.killaBase.chances = killaLO.killaLO2.chances;
        // this.killaBase.generation = this.arrays.bossLootGen;

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 50;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }

        BotTierTracker.killaTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("killaLoad2 loaded");
        }
    }

    public killaLoad3() {
        this.killaBase.inventory.Ammo = killaLO.killaLO3.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO3.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO3.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO3.inventory.mods;
        this.killaBase.chances = killaLO.killaLO3.chances;
        // this.killaBase.generation = this.arrays.bossLootGen;

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 25;
        }
        if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }

        BotTierTracker.killaTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("killaLoad3 loaded");
        }
    }

    public tagillaLoad1() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO1.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO1.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO1.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO1.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO1.chances;
        // this.tagillaBase.generation = this.arrays.bossLootGen;

        if (EventTracker.isHalloween) {
            this.tagillaBase.inventory.equipment.Scabbard = { "63495c500c297e20065a08b1": 1 }
        }

        const randnum = this.utils.pickRandNumOneInTen();

        if (randnum >= 8) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
            this.tagillaBase.chances.equipment.Headwear = 100;
        } else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
            this.tagillaBase.chances.equipment.FaceCover = 100;
            this.tagillaBase.chances.equipment.Headwear = 100;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }

        BotTierTracker.tagillaTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("tagillaLoad1 loaded");
        }
    }

    public tagillaLoad2() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO2.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO2.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO2.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO2.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO2.chances;
        // this.tagillaBase.generation = this.arrays.bossLootGen;

        if (EventTracker.isHalloween) {
            this.tagillaBase.inventory.equipment.Scabbard = { "63495c500c297e20065a08b1": 1 }
        }

        const randnum = this.utils.pickRandNumOneInTen();

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
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 50;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }

        BotTierTracker.tagillaTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("tagillaLoad2 loaded");
        }
    }

    public tagillaLoad3() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO3.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO3.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO3.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO3.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO3.chances;
        // this.tagillaBase.generation = this.arrays.bossLootGen;

        if (EventTracker.isHalloween) {
            this.tagillaBase.inventory.equipment.Scabbard = { "63495c500c297e20065a08b1": 1 }
        }

        const randnum = this.utils.pickRandNumOneInTen();

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
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 25;
        }
        else if (RaidInfoTracker.mapName === "Interchange" || RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }

        BotTierTracker.tagillaTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("tagillaLoad3 loaded");
        }
    }

    public sanitarLoad1() {
        this.saniBase.inventory.Ammo = saniLO.sanitarLO1.inventory.Ammo;
        this.saniBase.inventory.equipment = saniLO.sanitarLO1.inventory.equipment;
        this.saniBase.inventory.items = saniLO.sanitarLO1.inventory.items;
        this.saniBase.inventory.mods = saniLO.sanitarLO1.inventory.mods;
        this.saniBase.chances = saniLO.sanitarLO1.chances;
        // this.saniBase.generation = this.arrays.bossLootGen;

        this.saniFollowerBase.inventory.Ammo = saniFollowerLO.sanitarfollowerLO1.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = saniFollowerLO.sanitarfollowerLO1.inventory.equipment;
        this.saniFollowerBase.inventory.items = saniFollowerLO.sanitarfollowerLO1.inventory.items;
        this.saniFollowerBase.inventory.mods = saniFollowerLO.sanitarfollowerLO1.inventory.mods;
        this.saniFollowerBase.chances = saniFollowerLO.sanitarfollowerLO1.chances;
        // this.saniFollowerBase.generation = this.arrays.pmcLootGen;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 0;
            this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 25;
            this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 25;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 90;
                this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 90;
            }
        }

        this.botConf().equipment["followersanitar"].faceShieldIsActiveChancePercent = 100;

        BotTierTracker.sanitarTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("saintarLoad1 loaded");
        }
    }

    public sanitarLoad2() {
        this.saniBase.inventory.Ammo = saniLO.sanitarLO2.inventory.Ammo;
        this.saniBase.inventory.equipment = saniLO.sanitarLO2.inventory.equipment;
        this.saniBase.inventory.items = saniLO.sanitarLO2.inventory.items;
        this.saniBase.inventory.mods = saniLO.sanitarLO2.inventory.mods;
        this.saniBase.chances = saniLO.sanitarLO2.chances;
        // this.saniBase.generation = this.arrays.bossLootGen;

        this.saniFollowerBase.inventory.Ammo = saniFollowerLO.sanitarfollowerLO2.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = saniFollowerLO.sanitarfollowerLO2.inventory.equipment;
        this.saniFollowerBase.inventory.items = saniFollowerLO.sanitarfollowerLO2.inventory.items;
        this.saniFollowerBase.inventory.mods = saniFollowerLO.sanitarfollowerLO2.inventory.mods;
        this.saniFollowerBase.chances = saniFollowerLO.sanitarfollowerLO2.chances;
        // this.saniFollowerBase.generation = this.arrays.pmcLootGen;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 0;
            this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 25;
            this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 25;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 90;
                this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 90;
            }
        }

        this.botConf().equipment["followersanitar"].faceShieldIsActiveChancePercent = 100;

        BotTierTracker.sanitarTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("saintarLoad2 loaded");
        }
    }

    public sanitarLoad3() {
        this.saniBase.inventory.Ammo = saniLO.sanitarLO3.inventory.Ammo;
        this.saniBase.inventory.equipment = saniLO.sanitarLO3.inventory.equipment;
        this.saniBase.inventory.items = saniLO.sanitarLO3.inventory.items;
        this.saniBase.inventory.mods = saniLO.sanitarLO3.inventory.mods;
        this.saniBase.chances = saniLO.sanitarLO3.chances;
        // this.saniBase.generation = this.arrays.bossLootGen;

        this.saniFollowerBase.inventory.Ammo = saniFollowerLO.sanitarfollowerLO3.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = saniFollowerLO.sanitarfollowerLO3.inventory.equipment;
        this.saniFollowerBase.inventory.items = saniFollowerLO.sanitarfollowerLO3.inventory.items;
        this.saniFollowerBase.inventory.mods = saniFollowerLO.sanitarfollowerLO3.inventory.mods;
        this.saniFollowerBase.chances = saniFollowerLO.sanitarfollowerLO3.chances;
        // this.saniFollowerBase.generation = this.arrays.pmcLootGen;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 0;
            this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 25;
            this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 25;
            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["bosssanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["bosssanitar"].laserIsActiveChancePercent = 90;
                this.botConf().equipment["followersanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf().equipment["followersanitar"].laserIsActiveChancePercent = 90;
            }
        }

        this.botConf().equipment["followersanitar"].faceShieldIsActiveChancePercent = 100;

        BotTierTracker.sanitarTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("sanitarLoad3 loaded");
        }
    }

    public reshallaLoad1() {
        this.reshBase.inventory.Ammo = reshLO.reshallaLO1.inventory.Ammo;
        this.reshBase.inventory.equipment = reshLO.reshallaLO1.inventory.equipment;
        this.reshBase.inventory.items = reshLO.reshallaLO1.inventory.items;
        this.reshBase.inventory.mods = reshLO.reshallaLO1.inventory.mods;
        this.reshBase.chances = reshLO.reshallaLO1.chances;
        // this.reshBase.generation = this.arrays.bossLootGen;

        this.reshFollowerBase.inventory.Ammo = reshFollowerLO.reshallafollowerLO1.inventory.Ammo;
        this.reshFollowerBase.inventory.equipment = reshFollowerLO.reshallafollowerLO1.inventory.equipment;
        this.reshFollowerBase.inventory.items = reshFollowerLO.reshallafollowerLO1.inventory.items;
        this.reshFollowerBase.inventory.mods = reshFollowerLO.reshallafollowerLO1.inventory.mods;
        this.reshFollowerBase.chances = reshFollowerLO.reshallafollowerLO1.chances;
        // this.reshFollowerBase.generation = this.arrays.pmcLootGen;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 25;
            this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 50;
            this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 50;
        }
        else {
            this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 25;
            this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 25;

            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 50;
                this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 50;
                this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 50;
                this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 50;
            }
        }

        this.botConf().equipment["followerbully"].faceShieldIsActiveChancePercent = 100;

        BotTierTracker.reshallaTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("reshallaLoad1 loaded");
        }
    }

    public reshallaLoad2() {
        this.reshBase.inventory.Ammo = reshLO.reshallaLO2.inventory.Ammo;
        this.reshBase.inventory.equipment = reshLO.reshallaLO2.inventory.equipment;
        this.reshBase.inventory.items = reshLO.reshallaLO2.inventory.items;
        this.reshBase.inventory.mods = reshLO.reshallaLO2.inventory.mods;
        this.reshBase.chances = reshLO.reshallaLO2.chances;
        // this.reshBase.generation = this.arrays.bossLootGen;

        this.reshFollowerBase.inventory.Ammo = reshFollowerLO.reshallafollowerLO2.inventory.Ammo;
        this.reshFollowerBase.inventory.equipment = reshFollowerLO.reshallafollowerLO2.inventory.equipment;
        this.reshFollowerBase.inventory.items = reshFollowerLO.reshallafollowerLO2.inventory.items;
        this.reshFollowerBase.inventory.mods = reshFollowerLO.reshallafollowerLO2.inventory.mods;
        this.reshFollowerBase.chances = reshFollowerLO.reshallafollowerLO2.chances;
        // this.reshFollowerBase.generation = this.arrays.pmcLootGen;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 12;
            this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 12;
            this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 25;
        }
        else {
            this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 12;
            this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 12;
            this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 25;

            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 25;
                this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 25;
                this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 75;
                this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 75;
            }
        }

        this.botConf().equipment["followerbully"].faceShieldIsActiveChancePercent = 100;

        BotTierTracker.reshallaTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("reshallaLoad2 loaded");
        }
    }

    public reshallaLoad3() {
        this.reshBase.inventory.Ammo = reshLO.reshallaLO3.inventory.Ammo;
        this.reshBase.inventory.equipment = reshLO.reshallaLO3.inventory.equipment;
        this.reshBase.inventory.items = reshLO.reshallaLO3.inventory.items;
        this.reshBase.inventory.mods = reshLO.reshallaLO3.inventory.mods;
        this.reshBase.chances = reshLO.reshallaLO3.chances;
        // this.reshBase.generation = this.arrays.bossLootGen;

        this.reshFollowerBase.inventory.Ammo = reshFollowerLO.reshallafollowerLO3.inventory.Ammo;
        this.reshFollowerBase.inventory.equipment = reshFollowerLO.reshallafollowerLO3.inventory.equipment;
        this.reshFollowerBase.inventory.items = reshFollowerLO.reshallafollowerLO3.inventory.items;
        this.reshFollowerBase.inventory.mods = reshFollowerLO.reshallafollowerLO3.inventory.mods;
        this.reshFollowerBase.chances = reshFollowerLO.reshallafollowerLO3.chances;
        // this.reshFollowerBase.generation = this.arrays.pmcLootGen;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 0;
            this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 5;
            this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 5;
        }
        else {
            this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 0;
            this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 25;

            if (RaidInfoTracker.mapType === "cqb") {
                this.botConf().equipment["bossbully"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["bossbully"].laserIsActiveChancePercent = 0;
                this.botConf().equipment["followerbully"].lightIsActiveDayChancePercent = 75;
                this.botConf().equipment["followerbully"].laserIsActiveChancePercent = 75;
            }
        }

        this.botConf().equipment["followerbully"].faceShieldIsActiveChancePercent = 100;

        BotTierTracker.reshallaTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("reshallaLoad3 loaded");
        }
    }

    public forceBossItems() {

        this.tagillaBase.inventory.equipment.Headwear = { "60a7acf20c5cb24b01346648": 1 }
        this.tagillaBase.inventory.equipment.FaceCover = { "60a7ad2a2198820d95707a2e": 1, "60a7ad3a0c5cb24b0134664a": 1 }
        this.tagillaBase.chances.equipment.FaceCover = 100;
        this.tagillaBase.chances.equipment.Headwear = 100;

        this.bigpipeBase.inventory.equipment.Headwear = { "628e4dd1f477aa12234918aa": 1 }
        this.bigpipeBase.inventory.equipment.FaceCover = { "62a61bbf8ec41a51b34758d2": 1 }
        this.bigpipeBase.chances.equipment.FaceCover = 100;

        this.knightBase.inventory.equipment.Headwear = {}
        this.knightBase.chances.equipment.Headwear = 0;
        this.knightBase.chances.equipment.FaceCover = 100;

        this.reshallaBase.inventory.equipment.SecondPrimaryWeapon = { "5b3b713c5acfc4330140bd8d": 1 }


    }



}



