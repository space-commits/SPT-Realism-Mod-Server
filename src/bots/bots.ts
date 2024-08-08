import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { EquipmentFilters, IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { BotTierTracker, Utils, RaidInfoTracker, ModTracker } from "../utils/utils";
import { IBotType, Inventory } from "@spt/models/eft/common/tables/IBotType";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILocations } from "@spt/models/spt/server/ILocations";
import { EventTracker } from "../misc/seasonalevents";
import { Arrays } from "../utils/arrays";
import { IPmcData } from "@spt/models/eft/common/IPmcData";

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
const botHealth = require("../../db/bots/botHealth.json");
const rmBotConfig = require("../../db/bots/botconfig.json");
const USECNames = require("../../db/bots/names/USECNames.json");
const bearNames = require("../../db/bots/names/bearNames.json");
const pmcTypes = require("../../db/bots/pmcTypes.json");
const keys = require("../../db/bots/loadouts/templates/keys.json");
const realismAmmo = require("../../db/bots/loadouts/templates/pmc_ammo_realism.json");
const vanillaAmmo = require("../../db/bots/loadouts/templates/pmc_ammo_vanilla.json");
const lootOdds = require("../../db/bots/loadouts/templates/lootOdds.json");
const pmcLootLimits = require("../../db/bots/loadouts/PMCs/PMCLootLimitCat.json");

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
    private saniBase: IBotType;
    private saniFollowerBase: IBotType;
    private reshBase: IBotType;
    private reshFollowerBase: IBotType;

    constructor(private logger: ILogger, private tables: IDatabaseTables, private configServ: ConfigServer, private modConfig, private arrays: Arrays, private utils: Utils) {
        let botDB = this.tables.bots.types;
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

    lootBlacklist(): string[] {
        return [
            "generic_debuff",
            "performance_debuff",
            "weight_debuff",
            "clotting_debuff",
            "damage_debuff",
            "adrenal_debuff",
            "regen_debuff"
        ];
    }

    public loadBots() {

        if (this.modConfig.dynamic_loot_pmcs === true) {
            this.botConfPMC().looseWeaponInBackpackChancePercent = 0;
        }

        const botEquipmentTempalte: EquipmentFilters = {
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
            "blacklist": [],
            "whitelist": [],
            "forceStock": true,
            "filterPlatesByLevel": true,
            "weaponSlotIdsToMakeRequired": [],
            "forceOnlyArmoredRigWhenNoArmor": false,
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

        this.botConf().equipment["pmc"] = botEquipmentTempalte;
        this.botConf().equipment["pmc"].weaponModLimits.scopeLimit = 100;
        this.botConf().equipment["pmc"].weaponModLimits.lightLaserLimit = 2;
        this.botConf().equipment["pmc"].randomisation = [];
        this.botConf().equipment["pmc"].blacklist = [];
        this.botConf().itemSpawnLimits["pmc"] = pmcLootLimits.PMCLootLimit1;
        this.botConf().equipment["pmc"].weightingAdjustmentsByBotLevel = [];
        this.botConf().equipment["pmc"].weightingAdjustmentsByPlayerLevel = [];
        this.botConf().equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        this.botConf().equipment["pmc"].filterPlatesByLevel = true;
        this.botConfPMC().vestLoot.whitelist = [];
        this.botConfPMC().vestLoot.blacklist = [];
        this.botConfPMC().pocketLoot.whitelist = [];
        this.botConfPMC().pocketLoot.blacklist = [];
        this.botConfPMC().backpackLoot.whitelist = [];
        this.botConfPMC().backpackLoot.blacklist = [];

        this.botConf().playerScavBrainType = pmcTypes.playerScavBrainType;
        this.botConf().chanceAssaultScavHasPlayerScavName = 0;

        if (this.modConfig.enable_hazard_zones == true) {
            this.pushFiltersToAllBots();
        }

        // for (let i in this.lootBlacklist()) {
        //     this.botConfPMC().vestLoot.blacklist.push(this.lootBlacklist()[i]);
        //     this.botConfPMC().pocketLoot.blacklist.push(this.lootBlacklist()[i]);
        //     this.botConfPMC().backpackLoot.blacklist.push(this.lootBlacklist()[i]);
        // }


        if (this.modConfig.logEverything == true) {
            this.logger.info("Bots Loaded");
        }
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

    public bossDifficulty() {
        for (let i in this.mapDB) {
            if (this.mapDB[i].base?.BossLocationSpawn !== undefined) {
                for (let k in this.mapDB[i].base.BossLocationSpawn) {
                    this.mapDB[i].base.BossLocationSpawn[k].BossDifficult = "hard";
                    this.mapDB[i].base.BossLocationSpawn[k].BossEscortDifficult = "hard";
                }
            }
        }
    }

    public increaseBotCap() {
        this.botConf().maxBotCap = rmBotConfig.maxBotCapHigh;
        this.botConf().presetBatch = rmBotConfig.presetBatch;
    }

    public testBotCap() {
        this.botConf().maxBotCap = rmBotConfig.testBotCap;
        this.botConf().presetBatch = rmBotConfig.presetBatch;
    }

    public increasePerformance() {
        this.botConf().maxBotCap = rmBotConfig.maxBotCapLow;
        this.botConf().presetBatch = rmBotConfig.presetBatch;
    }

    //stops bots from bleeding out too often with medical changes enabled
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

    public pushFiltersToAllBots() {
        const bots = this.tables.bots.types;
        for (let i in bots) {
            this.arrays.gasMasks.forEach(g => {
                if (!bots[i].inventory.mods[g]) {
                    bots[i].inventory.mods[g] = {
                        "mod_equipment": [
                            "590c595c86f7747884343ad7"
                        ]
                    }
                }
            });
        }
    }

    private pushGasMaskFilters(inventory: Inventory) {
        this.arrays.gasMasks.forEach(g => {
            if (!inventory.mods[g]) {
                inventory.mods[g] = {
                    "mod_equipment": [
                        "590c595c86f7747884343ad7"
                    ]
                }
            }
        });
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
        let tier = 1;
        let tierArray = [1, 2, 3];

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

        if (type === "reshalla") {
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
                bots.sanitarLoad2();
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

    public updateBots(pmcData: IPmcData, logger: ILogger, config: any, bots: BotLoader, helper: Utils) {
        let property = pmcData?.Info?.Level;
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

        // //adjust PMC money stack limits and adjust PMC item spawn limits
        // this.botConfPMC().dynamicLoot = rmBotConfig.pmc1.dynamicLoot;
        // //adjust PMC max loot in rubles
        this.botConfPMC().maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        this.botConfPMC().maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        this.botConfPMC().maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC().chanceSameSideIsHostilePercent = this.modConfig.bot_hostile1;

        this.botConfPMC().looseWeaponInBackpackChancePercent = rmBotConfig.pmc1.looseWeaponInBackpackChancePercent;

        this.botConfPMC().isUsec = rmBotConfig.pmc1.isUsec;

        if (ModTracker.qtbPresent == false && ModTracker.swagPresent == false && this.modConfig.spawn_waves == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmc1.convertIntoPmcChance;
        }

        this.botConf().itemSpawnLimits.pmc = pmcLootLimits.PMCLootLimit1;

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
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 55;
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

        if (this.modConfig.pmc_types == true && ModTracker.sainPresent == false && ModTracker.swagPresent == false) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConfPMC().pmcType.pmcusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
                this.botConfPMC().pmcType.pmcbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConfPMC().pmcType.pmcusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
                this.botConfPMC().pmcType.pmcbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
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

        // //adjust PMC money stack limits and adjust PMC item spawn limits
        // this.botConfPMC().dynamicLoot = rmBotConfig.pmc2.dynamicLoot;

        // //adjust PMC max loot in rubles
        this.botConfPMC().maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
        this.botConfPMC().maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
        this.botConfPMC().maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC().chanceSameSideIsHostilePercent = this.modConfig.bot_hostile2;

        this.botConfPMC().looseWeaponInBackpackChancePercent = rmBotConfig.pmc2.looseWeaponInBackpackChancePercent;

        this.botConfPMC().isUsec = rmBotConfig.pmc2.isUsec;

        if (ModTracker.qtbPresent == false && ModTracker.swagPresent == false && this.modConfig.spawn_waves == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmc2.convertIntoPmcChance;
        }

        this.botConf().itemSpawnLimits.pmc = pmcLootLimits.PMCLootLimit2;

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
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 35;
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

        if (this.modConfig.pmc_types == true && ModTracker.sainPresent == false && ModTracker.swagPresent == false) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConfPMC().pmcType.pmcusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
                this.botConfPMC().pmcType.pmcbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConfPMC().pmcType.pmcusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
                this.botConfPMC().pmcType.pmcbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
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

        // //adjust PMC money stack limits and adjust PMC item spawn limits
        // this.botConfPMC().dynamicLoot = rmBotConfig.pmc3.dynamicLoot;

        // //adjust PMC max loot in rubles
        this.botConfPMC().maxBackpackLootTotalRub = rmBotConfig.pmc3.maxBackpackLootTotalRub;
        this.botConfPMC().maxPocketLootTotalRub = rmBotConfig.pmc3.maxPocketLootTotalRub;
        this.botConfPMC().maxVestLootTotalRub = rmBotConfig.pmc3.maxVestLootTotalRub;

        //adjust PMC hostile chance
        this.botConfPMC().chanceSameSideIsHostilePercent = this.modConfig.bot_hostile3;

        this.botConfPMC().looseWeaponInBackpackChancePercent = rmBotConfig.pmc3.looseWeaponInBackpackChancePercent;

        this.botConfPMC().isUsec = rmBotConfig.pmc3.isUsec;

        if (ModTracker.qtbPresent == false && ModTracker.swagPresent == false && this.modConfig.spawn_waves == true) {
            this.botConfPMC().convertIntoPmcChance = rmBotConfig.pmc3.convertIntoPmcChance;
        }

        this.botConf().itemSpawnLimits.pmc = pmcLootLimits.PMCLootLimit3;

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
                this.botConf().equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf().equipment["pmc"].laserIsActiveChancePercent = 15;
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

        if (this.modConfig.pmc_types == true && ModTracker.sainPresent == false && ModTracker.swagPresent == false) {
            if (RaidInfoTracker.TOD === "day") {
                this.botConfPMC().pmcType.pmcusec = pmcTypes.BotTypes3.pmcTypeDay.sptusec;
                this.botConfPMC().pmcType.pmcbear = pmcTypes.BotTypes3.pmcTypeDay.sptbear;
            }
            if (RaidInfoTracker.TOD === "night") {
                this.botConfPMC().pmcType.pmcusec = pmcTypes.BotTypes3.pmcTypeNight.sptusec;
                this.botConfPMC().pmcType.pmcbear = pmcTypes.BotTypes3.pmcTypeNight.sptbear;
            }
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("botConfig3 loaded");
        }
    }

    public scavLoad1() {

        let tier1Json = JSON.parse(JSON.stringify(scavLO.scavLO1));

        this.scavBase.inventory.Ammo = tier1Json.inventory.Ammo;
        this.scavBase.inventory.equipment = tier1Json.inventory.equipment;
        this.scavBase.inventory.mods = tier1Json.inventory.mods;
        this.scavBase.chances = tier1Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.scavBase.inventory.items = tier1Json.inventory.items;
            this.scavBase.generation = lootOdds.scav;
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.weaponMods.mod_flashlight = 40;
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

        if (this.modConfig.dynamic_loot_scavs === true && this.modConfig.bot_loot_changes === true) {
            this.scavBase.inventory.items = tier1Json.inventory.dynamic_looting;
            this.scavBase.generation.items.backpackLoot.weights = lootOdds.dynamic_scav.items.backpackLoot.weights;
            this.scavBase.generation.items.vestLoot.weights = lootOdds.dynamic_scav.items.vestLoot.weights;
            this.scavBase.generation.items.pocketLoot.weights = lootOdds.dynamic_scav.items.pocketLoot.weights;
            this.scavBase.generation.items.drink.weights = lootOdds.dynamic_scav.items.food.weights;
            this.scavBase.generation.items.food.weights = lootOdds.dynamic_scav.items.drink.weights;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.scavBase.inventory);
        }

        BotTierTracker.scavTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("scavLoad1 loaded");
        }
    }

    public scavLoad2() {

        let tier2Json = JSON.parse(JSON.stringify(scavLO.scavLO2));

        this.scavBase.inventory.Ammo = tier2Json.inventory.Ammo;
        this.scavBase.inventory.equipment = tier2Json.inventory.equipment;
        this.scavBase.inventory.mods = tier2Json.inventory.mods;
        this.scavBase.chances = tier2Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.scavBase.inventory.items = tier2Json.inventory.items;
            this.scavBase.generation = lootOdds.scav;
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.weaponMods.mod_flashlight = 60;
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

        if (this.modConfig.dynamic_loot_scavs === true && this.modConfig.bot_loot_changes === true) {
            this.scavBase.inventory.items = tier2Json.inventory.dynamic_looting;
            this.scavBase.generation.items.vestLoot.weights = lootOdds.dynamic_scav.items.vestLoot.weights;
            this.scavBase.generation.items.pocketLoot.weights = lootOdds.dynamic_scav.items.pocketLoot.weights;
            this.scavBase.generation.items.drink.weights = lootOdds.dynamic_scav.items.food.weights;
            this.scavBase.generation.items.food.weights = lootOdds.dynamic_scav.items.drink.weights;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.scavBase.inventory);
        }

        BotTierTracker.scavTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("scavLoad2 loaded");
        }
    }

    public scavLoad3() {

        let tier3Json = JSON.parse(JSON.stringify(scavLO.scavLO3));

        this.scavBase.inventory.Ammo = tier3Json.inventory.Ammo;
        this.scavBase.inventory.equipment = tier3Json.inventory.equipment;
        this.scavBase.inventory.mods = tier3Json.inventory.mods;
        this.scavBase.chances = tier3Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.scavBase.inventory.items = tier3Json.inventory.items;
            this.scavBase.generation = lootOdds.scav;
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.weaponMods.mod_flashlight = 80;
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

        if (this.modConfig.dynamic_loot_scavs === true && this.modConfig.bot_loot_changes === true) {
            this.scavBase.inventory.items = tier3Json.inventory.dynamic_looting;
            this.scavBase.generation.items.vestLoot.weights = lootOdds.dynamic_scav.items.vestLoot.weights;
            this.scavBase.generation.items.pocketLoot.weights = lootOdds.dynamic_scav.items.pocketLoot.weights;
            this.scavBase.generation.items.drink.weights = lootOdds.dynamic_scav.items.food.weights;
            this.scavBase.generation.items.food.weights = lootOdds.dynamic_scav.items.drink.weights;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.scavBase.inventory);
        }

        BotTierTracker.scavTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("scavLoad3 loaded");
        }
    }

    public usecLoad1(botJsonTemplate: IBotType) {

        let tier1Json = JSON.parse(JSON.stringify(usecLO.usecLO1));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier1USEC } : { ...vanillaAmmo.Tier1USEC };
        botJsonTemplate.inventory.equipment = tier1Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier1Json.inventory.mods;
        botJsonTemplate.chances = tier1Json.chances;
        botJsonTemplate.appearance.body = tier1Json.appearance.body;
        botJsonTemplate.appearance.feet = tier1Json.appearance.feet;
        botJsonTemplate.appearance.voice = { ...usecLO.appearance.voice };
        botJsonTemplate.experience.level = tier1Json.experience.level;

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier1Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier1 };
        }
        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier1_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 20;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 40;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 25;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 40;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 10;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 10;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 30;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 15;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 15;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 40;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 20;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 10;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 10;
            }
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier1Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...usecLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad1 loaded");
        }
    }

    public usecLoad2(botJsonTemplate: IBotType) {

        let tier2Json = JSON.parse(JSON.stringify(usecLO.usecLO2));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier2USEC } : { ...vanillaAmmo.Tier2USEC };
        botJsonTemplate.inventory.equipment = tier2Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier2Json.inventory.mods;
        botJsonTemplate.chances = tier2Json.chances;
        botJsonTemplate.appearance.body = tier2Json.appearance.body;
        botJsonTemplate.appearance.feet = tier2Json.appearance.feet;
        botJsonTemplate.appearance.voice = { ...usecLO.appearance.voice };
        botJsonTemplate.experience.level = tier2Json.experience.level;

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier2Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier2 };
        }
        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier2_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 50;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 40;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 20;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 60;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 50;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier2Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...usecLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad2 loaded");
        }
    }

    public usecLoad3(botJsonTemplate: IBotType) {

        let tier3Json = JSON.parse(JSON.stringify(usecLO.usecLO3));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier3USEC } : { ...vanillaAmmo.Tier3USEC };
        botJsonTemplate.inventory.equipment = tier3Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier3Json.inventory.mods;
        botJsonTemplate.chances = tier3Json.chances;
        botJsonTemplate.appearance.body = tier3Json.appearance.body;
        botJsonTemplate.appearance.feet = tier3Json.appearance.feet;
        botJsonTemplate.appearance.voice = { ...usecLO.appearance.voice };
        botJsonTemplate.experience.level = tier3Json.experience.level;

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier3Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier3 };
        }
        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier3_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 65;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = tier3Json.inventory.Headwear_night;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 100;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 80;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 50;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 85;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 85;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.Headwear = tier3Json.inventory.Headwear_cqb;
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier3Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...usecLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad3 loaded");
        }
    }

    public usecLoad4(botJsonTemplate: IBotType) {

        let tier4Json = JSON.parse(JSON.stringify(usecLO.usecLO4));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier4USEC } : { ...vanillaAmmo.Tier4USEC };
        botJsonTemplate.inventory.equipment = tier4Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier4Json.inventory.mods;
        botJsonTemplate.chances = tier4Json.chances;
        botJsonTemplate.appearance.body = tier4Json.appearance.body;
        botJsonTemplate.appearance.feet = tier4Json.appearance.feet;
        botJsonTemplate.appearance.voice = { ...usecLO.appearance.voice };
        botJsonTemplate.experience.level = tier4Json.experience.level;

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier4 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier4_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 100;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = tier4Json.inventory.Headwear_night;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 60;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 60;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 80;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 80;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 25;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 25;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier4Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.Headwear = tier4Json.inventory.Headwear_cqb;
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier4Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier4Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...usecLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad4 loaded");
        }
    }

    public usecLoad5(botJsonTemplate: IBotType) {
        let tier4Json = JSON.parse(JSON.stringify(usecLO.usecLO4));
        let tier5Json = JSON.parse(JSON.stringify(tier5LO.tier5LO));

        botJsonTemplate.inventory.items = tier4Json.inventory.items;
        botJsonTemplate.appearance.body = tier5Json.appearance_usec.body;
        botJsonTemplate.appearance.feet = tier5Json.appearance_usec.feet;
        botJsonTemplate.appearance.voice = { ...usecLO.appearance.voice };

        this.tier5PMCLoad(botJsonTemplate);

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier5 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier4_PMC_Keys };
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("usecLoad5 loaded");
        }
    }


    public bearLoad1(botJsonTemplate: IBotType) {

        let tier1Json = JSON.parse(JSON.stringify(bearLO.bearLO1));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier1Bear } : { ...vanillaAmmo.Tier1Bear };
        botJsonTemplate.inventory.equipment = tier1Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier1Json.inventory.mods;
        botJsonTemplate.chances = tier1Json.chances;
        botJsonTemplate.appearance.body = tier1Json.appearance.body;
        botJsonTemplate.appearance.feet = tier1Json.appearance.feet;
        botJsonTemplate.experience.level = tier1Json.experience.level;
        botJsonTemplate.appearance.voice = { ...bearLO.LowTierVoice };

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier1Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier1 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier1_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 20;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 70;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 25;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 40;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 20;

        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 35;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 35;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 50;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 50;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 20;
            }
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier1Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.inventory.equipment.FaceCover = { ...bearLO.FaceCoverLabs };
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad1 loaded");
        }
    }

    public bearLoad2(botJsonTemplate: IBotType) {

        let tier2Json = JSON.parse(JSON.stringify(bearLO.bearLO2));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier2Bear } : { ...vanillaAmmo.Tier2Bear };
        botJsonTemplate.inventory.equipment = tier2Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier2Json.inventory.mods;
        botJsonTemplate.chances = tier2Json.chances;
        botJsonTemplate.appearance.body = tier2Json.appearance.body;
        botJsonTemplate.appearance.feet = tier2Json.appearance.feet;
        botJsonTemplate.experience.level = tier2Json.experience.level;
        botJsonTemplate.appearance.voice = { ...bearLO.LowTierVoice };

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier2Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier2 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier2_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 50;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 80;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 45;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 45;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 70;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 70;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 20;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier2Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.inventory.equipment.FaceCover = { ...bearLO.FaceCoverLabs };
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad2 loaded");
        }
    }

    public bearLoad3(botJsonTemplate: IBotType) {

        let tier3Json = JSON.parse(JSON.stringify(bearLO.bearLO3));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier3Bear } : { ...vanillaAmmo.Tier3Bear };
        botJsonTemplate.inventory.equipment = tier3Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier3Json.inventory.mods;
        botJsonTemplate.chances = tier3Json.chances;
        botJsonTemplate.appearance.body = tier3Json.appearance.body;
        botJsonTemplate.appearance.feet = tier3Json.appearance.feet;
        botJsonTemplate.experience.level = tier3Json.experience.level;
        botJsonTemplate.appearance.voice = { ...bearLO.HighTierVoice };

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier3Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier3 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier3_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 65;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = tier3Json.inventory.Headwear_night;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 100;

        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 70;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 70;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 20;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier3Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...bearLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad3 loaded");
        }
    }

    public bearLoad4(botJsonTemplate: IBotType) {

        let tier4Json = JSON.parse(JSON.stringify(bearLO.bearLO4));

        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier4Bear } : { ...vanillaAmmo.Tier4Bear };
        botJsonTemplate.inventory.equipment = tier4Json.inventory.equipment;
        botJsonTemplate.inventory.mods = tier4Json.inventory.mods;
        botJsonTemplate.chances = tier4Json.chances;
        botJsonTemplate.appearance.body = tier4Json.appearance.body;
        botJsonTemplate.appearance.feet = tier4Json.appearance.feet;
        botJsonTemplate.experience.level = tier4Json.experience.level;
        botJsonTemplate.appearance.voice = { ...bearLO.HighTierVoice };

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier4 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier4_PMC_Keys };
        }

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 100;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.weaponMods.mod_mount = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_000 = 100;
            botJsonTemplate.chances.weaponMods.mod_mount_001 = 100;
            botJsonTemplate.chances.weaponMods.mod_tactical = 100;
            botJsonTemplate.chances.weaponMods.mod_flashlight = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = tier4Json.inventory.Headwear_night;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 20;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 20;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier4Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier4Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier4Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...bearLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad4 loaded");
        }
    }

    public bearLoad5(botJsonTemplate: IBotType) {

        let tier4Json = JSON.parse(JSON.stringify(bearLO.bearLO4));
        let tier5Json = JSON.parse(JSON.stringify(tier5LO.tier5LO));

        botJsonTemplate.appearance.body = tier5Json.appearance_bear.body;
        botJsonTemplate.appearance.feet = tier5Json.appearance_bear.feet
        botJsonTemplate.appearance.voice = { ...bearLO.HighTierVoice };

        if (this.modConfig.bot_loot_changes === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.items;
            botJsonTemplate.generation = { ...lootOdds.tier5 };
        }

        if (this.modConfig.add_keys === true) {
            botJsonTemplate.inventory.items.Backpack = { ...botJsonTemplate.inventory.items.Backpack, ...keys.tier4_PMC_Keys };
        }

        this.tier5PMCLoad(botJsonTemplate);

        if (this.modConfig.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = tier4Json.inventory.dynamic_looting;
            botJsonTemplate.generation.items.backpackLoot.weights = { ...lootOdds.dynamic.items.backpackLoot.weights };
            botJsonTemplate.generation.items.vestLoot.weights = { ...lootOdds.dynamic.items.vestLoot.weights };
            botJsonTemplate.generation.items.pocketLoot.weights = { ...lootOdds.dynamic.items.pocketLoot.weights };
            botJsonTemplate.generation.items.drink.weights = { ...lootOdds.dynamic.items.drink.weights };
            botJsonTemplate.generation.items.food.weights = { ...lootOdds.dynamic.items.food.weights };
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("bearLoad5 loaded");
        }
    }

    private tier5PMCLoad(botJsonTemplate: IBotType) {

        let tier5Json = JSON.parse(JSON.stringify(tier5LO.tier5LO));

        botJsonTemplate.experience.level = tier5Json.experience.level;
        botJsonTemplate.chances = tier5Json.chances;
        botJsonTemplate.inventory.mods = tier5Json.inventory.mods;
        botJsonTemplate.inventory.Ammo = this.modConfig.realistic_ballistics == true ? { ...realismAmmo.Tier5 } : { ...vanillaAmmo.Tier5 };
        botJsonTemplate.inventory.equipment = tier5Json.inventory.equipment;

        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 100;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = tier5Json.inventory.Headwear_night;
        } else {
            botJsonTemplate.chances.equipmentMods.mod_nvg = 0;
            if (RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 100;
                botJsonTemplate.inventory.equipment.Headwear = tier5Json.inventory.Headwear_cqb;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 100;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 100;
                botJsonTemplate.inventory.equipment.Headwear = tier5Json.inventory.Headwear_cqb;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 25;
                botJsonTemplate.chances.equipmentMods.mod_equipment = 25;
            }
        }

        //don't want TOD to be a factor
        if (RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = tier5Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            botJsonTemplate.chances.equipmentMods.mod_equipment = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_000 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_001 = 0;
            botJsonTemplate.chances.equipmentMods.mod_equipment_002 = 0;
            botJsonTemplate.inventory.equipment.FaceCover = { ...bearLO.FaceCoverLabs };
            botJsonTemplate.inventory.equipment.Eyewear = {};
            botJsonTemplate.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(botJsonTemplate.inventory);
        }

    }

    public raiderLoad1() {

        let tier1Json = JSON.parse(JSON.stringify(raiderLO.raiderLO1));

        this.raiderBase.inventory.Ammo = tier1Json.inventory.Ammo;
        this.raiderBase.inventory.equipment = tier1Json.inventory.equipment;
        this.raiderBase.inventory.mods = tier1Json.inventory.mods;
        this.raiderBase.chances = tier1Json.chances;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        if (this.modConfig.bot_loot_changes === true) {
            this.raiderBase.inventory.items = tier1Json.inventory.items;
            this.raiderBase.generation = lootOdds.tier4;
        }

        this.botConf().equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.equipmentMods.mod_nvg = 70;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.equipmentMods.mod_equipment *= 0.5;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier1Json.inventory.FirstPrimaryWeapon_cqb;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 70;
            this.raiderBase.chances.equipmentMods.mod_nvg = 70;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 = 50;
            this.raiderBase.chances.equipmentMods.mod_equipment = 50;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        } else {
            this.raiderBase.chances.equipmentMods.mod_nvg = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 = 50;
                this.raiderBase.chances.equipmentMods.mod_equipment = 50;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 = 80;
                this.raiderBase.chances.equipmentMods.mod_equipment = 80;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.equipmentMods.mod_equipment *= 0.5;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier1Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier1Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier1Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.enable_hazard_zones == true && (RaidInfoTracker.mapName === "laboratory" || RaidInfoTracker.mapName === "rezervbase"
            || RaidInfoTracker.mapName === "reservebase" || RaidInfoTracker.mapName === "factory4_night"
            || RaidInfoTracker.mapName === "factory4_day")) {
            this.raiderBase.chances.equipmentMods.mod_equipment = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.raiderBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 };
            this.raiderBase.inventory.equipment.Eyewear = {};
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.raiderBase.inventory);
        }

        BotTierTracker.raiderTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("raiderLoad1 loaded");
        }
    }

    public raiderLoad2() {

        let tier2Json = JSON.parse(JSON.stringify(raiderLO.raiderLO2));

        this.raiderBase.inventory.Ammo = tier2Json.inventory.Ammo;
        this.raiderBase.inventory.equipment = tier2Json.inventory.equipment;
        this.raiderBase.inventory.mods = tier2Json.inventory.mods;
        this.raiderBase.chances = tier2Json.chances;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        if (this.modConfig.bot_loot_changes === true) {
            this.raiderBase.inventory.items = tier2Json.inventory.items;
            this.raiderBase.generation = lootOdds.tier5;
        }

        this.botConf().equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.equipmentMods.mod_nvg = 80;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.equipmentMods.mod_equipment *= 0.5;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 25;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_cqb;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            this.raiderBase.chances.equipmentMods.mod_nvg = 80;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 = 50;
            this.raiderBase.chances.equipmentMods.mod_equipment = 50;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        } else {
            this.raiderBase.chances.equipmentMods.mod_nvg = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 = 70;
                this.raiderBase.chances.equipmentMods.mod_equipment = 70;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 60;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 = 90;
                this.raiderBase.chances.equipmentMods.mod_equipment = 90;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.equipmentMods.mod_equipment *= 0.5;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier2Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.enable_hazard_zones == true && (RaidInfoTracker.mapName === "laboratory" || RaidInfoTracker.mapName === "rezervbase"
            || RaidInfoTracker.mapName === "reservebase" || RaidInfoTracker.mapName === "factory4_night"
            || RaidInfoTracker.mapName === "factory4_day")) {
            this.raiderBase.chances.equipmentMods.mod_equipment = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.raiderBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 };
            this.raiderBase.inventory.equipment.Eyewear = {};
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.raiderBase.inventory);
        }

        BotTierTracker.raiderTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("raiderLoad2 loaded");
        }
    }

    public raiderLoad3() {

        let tier3Json = JSON.parse(JSON.stringify(raiderLO.raiderLO3));

        this.raiderBase.inventory.Ammo = tier3Json.inventory.Ammo;
        this.raiderBase.inventory.equipment = tier3Json.inventory.equipment;
        this.raiderBase.inventory.mods = tier3Json.inventory.mods;
        this.raiderBase.chances = tier3Json.chances;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;

        if (this.modConfig.bot_loot_changes === true) {
            this.raiderBase.inventory.items = tier3Json.inventory.items;
            this.raiderBase.generation = lootOdds.tier5;
        }

        this.botConf().equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.equipmentMods.mod_nvg = 100;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.equipmentMods.mod_equipment *= 0.5;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        } else if (RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_cqb;
            this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            this.raiderBase.chances.equipmentMods.mod_nvg = 100;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 = 60;
            this.raiderBase.chances.equipmentMods.mod_equipment = 60;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        } else {
            this.raiderBase.chances.equipmentMods.mod_nvg = 0;
            this.botConf().equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 = 100;
                this.raiderBase.chances.equipmentMods.mod_equipment = 100;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 80;
            }
            if (RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 = 100;
                this.raiderBase.chances.equipmentMods.mod_equipment = 100;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.equipmentMods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.equipmentMods.mod_equipment *= 0.5;
                this.botConf().equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_urban;
        }
        if (RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_cqb;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = tier3Json.inventory.FirstPrimaryWeapon_outdoor;
        }

        if (this.modConfig.enable_hazard_zones == true && (RaidInfoTracker.mapName === "laboratory" || RaidInfoTracker.mapName === "rezervbase"
            || RaidInfoTracker.mapName === "reservebase" || RaidInfoTracker.mapName === "factory4_night"
            || RaidInfoTracker.mapName === "factory4_day")) {
            this.raiderBase.chances.equipmentMods.mod_equipment = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.raiderBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.raiderBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 };
            this.raiderBase.inventory.equipment.Eyewear = {};
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.raiderBase.inventory);
        }

        BotTierTracker.raiderTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("raiderLoad3 loaded");
        }
    }


    public rogueLoad1() {

        let tier1Json = JSON.parse(JSON.stringify(rogueLO.rogueLO1));

        this.rogueBase.inventory.Ammo = tier1Json.inventory.Ammo;
        this.rogueBase.inventory.equipment = tier1Json.inventory.equipment;
        this.rogueBase.inventory.mods = tier1Json.inventory.mods;;
        this.rogueBase.chances = tier1Json.chances;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        if (this.modConfig.bot_loot_changes === true) {
            this.rogueBase.inventory.items = tier1Json.inventory.items;
            this.rogueBase.generation = lootOdds.tier4;
        }

        this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 60;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 60;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 0;
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

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.rogueBase.inventory);
        }

        BotTierTracker.rogueTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("rogueLoad1 loaded");
        }
    }


    public rogueLoad2() {

        let tier2Json = JSON.parse(JSON.stringify(rogueLO.rogueLO2));

        this.rogueBase.inventory.Ammo = tier2Json.inventory.Ammo;
        this.rogueBase.inventory.equipment = tier2Json.inventory.equipment;
        this.rogueBase.inventory.mods = tier2Json.inventory.mods;
        this.rogueBase.chances = tier2Json.chances;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        if (this.modConfig.bot_loot_changes === true) {
            this.rogueBase.inventory.items = tier2Json.inventory.items;
            this.rogueBase.generation = lootOdds.tier5;
        }

        this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 80;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 80;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 0;
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

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.rogueBase.inventory);
        }

        BotTierTracker.rogueTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("rogueLoad2 loaded");
        }
    }

    public rogueLoad3() {

        let tier3Json = JSON.parse(JSON.stringify(rogueLO.rogueLO3));

        this.rogueBase.inventory.Ammo = tier3Json.inventory.Ammo;
        this.rogueBase.inventory.equipment = tier3Json.inventory.equipment;
        this.rogueBase.inventory.items = tier3Json.inventory.items;
        this.rogueBase.inventory.mods = tier3Json.inventory.mods;
        this.rogueBase.chances = tier3Json.chances;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;

        if (this.modConfig.bot_loot_changes === true) {
            this.rogueBase.inventory.items = tier3Json.inventory.items;
            this.rogueBase.generation = lootOdds.tier5;
        }

        this.botConf().equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (RaidInfoTracker.TOD === "night" || RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "night" && RaidInfoTracker.mapName === "Lighthouse" || RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.equipmentMods.mod_nvg = 0;
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

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.rogueBase.inventory);
        }

        BotTierTracker.rogueTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("rogueLoad3 loaded");
        }
    }

    public goonsLoad1() {

        let knight1Json = JSON.parse(JSON.stringify(knightLO.knightLO1));
        let bird1Json = JSON.parse(JSON.stringify(birdeyeLO.birdeyeLO1));
        let pipe1Json = JSON.parse(JSON.stringify(bigpipeLO.bigpipeLO1));

        this.knightBase.inventory.Ammo = knight1Json.inventory.Ammo;
        this.knightBase.inventory.equipment = knight1Json.inventory.equipment;
        this.knightBase.inventory.mods = knight1Json.inventory.mods;
        this.knightBase.chances = knight1Json.chances;
        this.botConf().equipment["bossknight"].faceShieldIsActiveChancePercent = 100;

        const randNum = this.utils.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = pipe1Json.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = pipe1Json.inventory.equipment;
        this.bigpipeBase.inventory.mods = pipe1Json.inventory.mods;
        this.bigpipeBase.chances = pipe1Json.chances;
        this.botConf().equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = bird1Json.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = bird1Json.inventory.equipment;
        this.birdeyeBase.inventory.mods = bird1Json.inventory.mods;
        this.birdeyeBase.chances = bird1Json.chances;
        this.botConf().equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

        if (this.modConfig.bot_loot_changes === true) {
            this.knightBase.inventory.items = knight1Json.inventory.items;
            this.bigpipeBase.inventory.items = pipe1Json.inventory.items;
            this.birdeyeBase.inventory.items = bird1Json.inventory.items;
            this.knightBase.generation = lootOdds.boss;
            this.bigpipeBase.generation = lootOdds.boss;
            this.birdeyeBase.generation = lootOdds.boss;
        }

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

            this.knightBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.equipmentMods.mod_nvg = 100;
            this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 100;
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
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

            this.knightBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.equipmentMods.mod_nvg = 100;
            this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 100;
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.equipmentMods.mod_nvg = 0;
            this.bigpipeBase.chances.equipmentMods.mod_nvg = 0;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 0;
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

                this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 100;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 50;
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

                this.knightBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.knightBase.chances.equipmentMods.mod_equipment_001 *= 0.5;
                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;

                this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0

                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }


        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird1Json.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird1Json.inventory.FirstPrimaryWeapon_urban;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird1Json.inventory.FirstPrimaryWeapon_outdoor;
            this.birdeyeBase.inventory.equipment.Holster = {};
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.rogueBase.inventory);
            this.pushGasMaskFilters(this.bigpipeBase.inventory);
            this.pushGasMaskFilters(this.knightBase.inventory);
        }

        BotTierTracker.goonsTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("goonsLoad1 loaded");
        }
    }

    public goonsLoad2() {

        let knight2Json = JSON.parse(JSON.stringify(knightLO.knightLO2));
        let bird2Json = JSON.parse(JSON.stringify(birdeyeLO.birdeyeLO2));
        let pipe2Json = JSON.parse(JSON.stringify(bigpipeLO.bigpipeLO2));

        this.knightBase.inventory.Ammo = knight2Json.inventory.Ammo;
        this.knightBase.inventory.equipment = knight2Json.inventory.equipment;
        this.knightBase.inventory.mods = knight2Json.inventory.mods;
        this.knightBase.chances = knight2Json.chances;
        this.botConf().equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = pipe2Json.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = pipe2Json.inventory.equipment;
        this.bigpipeBase.inventory.mods = pipe2Json.inventory.mods;
        this.bigpipeBase.chances = pipe2Json.chances;
        this.botConf().equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = bird2Json.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = bird2Json.inventory.equipment;
        this.birdeyeBase.inventory.mods = bird2Json.inventory.mods;
        this.birdeyeBase.chances = bird2Json.chances;
        this.botConf().equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;

        if (this.modConfig.bot_loot_changes === true) {
            this.birdeyeBase.inventory.items = bird2Json.inventory.items;
            this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO2.inventory.items;
            this.knightBase.inventory.items = knight2Json.inventory.items;
            this.knightBase.generation = lootOdds.boss;
            this.bigpipeBase.generation = lootOdds.boss;
            this.birdeyeBase.generation = lootOdds.boss;
        }

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

            this.knightBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.equipmentMods.mod_nvg = 100;
            this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 100;
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
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

            this.knightBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.equipmentMods.mod_nvg = 100;
            this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 100;
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.equipmentMods.mod_nvg = 0;
            this.bigpipeBase.chances.equipmentMods.mod_nvg = 0;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 0;
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

                this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 100;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 50;
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

                this.knightBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.knightBase.chances.equipmentMods.mod_equipment_001 *= 0.5;
                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;

                this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;

                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird2Json.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird2Json.inventory.FirstPrimaryWeapon_urban;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird2Json.inventory.FirstPrimaryWeapon_outdoor;
            this.birdeyeBase.inventory.equipment.Holster = {};
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.rogueBase.inventory);
            this.pushGasMaskFilters(this.bigpipeBase.inventory);
            this.pushGasMaskFilters(this.knightBase.inventory);
        }

        BotTierTracker.goonsTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("goonsLoad2 loaded");
        }
    }

    public goonsLoad3() {

        let knight3Json = JSON.parse(JSON.stringify(knightLO.knightLO3));
        let bird3Json = JSON.parse(JSON.stringify(birdeyeLO.birdeyeLO3));
        let pipe3Json = JSON.parse(JSON.stringify(bigpipeLO.bigpipeLO3));

        this.knightBase.inventory.Ammo = knight3Json.inventory.Ammo;
        this.knightBase.inventory.equipment = knight3Json.inventory.equipment;
        this.knightBase.inventory.mods = knight3Json.inventory.mods;
        this.knightBase.chances = knight3Json.chances;
        this.botConf().equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();

        this.bigpipeBase.inventory.Ammo = pipe3Json.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = pipe3Json.inventory.equipment;
        this.bigpipeBase.inventory.mods = pipe3Json.inventory.mods;
        this.bigpipeBase.chances = pipe3Json.chances;
        this.botConf().equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;

        this.birdeyeBase.inventory.Ammo = bird3Json.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = bird3Json.inventory.equipment;
        this.birdeyeBase.inventory.mods = bird3Json.inventory.mods;
        this.birdeyeBase.chances = bird3Json.chances;
        this.botConf().equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;


        if (this.modConfig.bot_loot_changes === true) {
            this.birdeyeBase.inventory.items = bird3Json.inventory.items;
            this.bigpipeBase.inventory.items = pipe3Json.inventory.items;
            this.knightBase.inventory.items = knight3Json.inventory.items;
            this.knightBase.generation = lootOdds.boss;
            this.bigpipeBase.generation = lootOdds.boss;
            this.birdeyeBase.generation = lootOdds.boss;
        }

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

            this.knightBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.equipmentMods.mod_nvg = 100;
            this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 100;
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
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

            this.knightBase.chances.equipmentMods.mod_nvg = 100;
            this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;

            this.bigpipeBase.chances.equipmentMods.mod_nvg = 100;
            this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf().equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;

            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 100;
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;

            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 20;
            this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf().equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (RaidInfoTracker.TOD === "day") {

            this.knightBase.chances.equipmentMods.mod_nvg = 0;
            this.bigpipeBase.chances.equipmentMods.mod_nvg = 0;
            this.birdeyeBase.chances.equipmentMods.mod_nvg = 0;
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

                this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 100;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;

                this.birdeyeBase.chances.equipment.Headwear = 100;
                this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 80;

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

                this.knightBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.knightBase.chances.equipmentMods.mod_equipment_001 *= 0.5;
                this.botConf().equipment["bossknight"].lightIsActiveDayChancePercent = 0;

                this.bigpipeBase.chances.equipmentMods.mod_equipment_000 = 0;
                this.botConf().equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0

                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;

                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf().equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }

        if (RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird3Json.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird3Json.inventory.FirstPrimaryWeapon_urban;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
            this.birdeyeBase.chances.equipmentMods.mod_equipment_000 = 0;
        }
        if (RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = bird3Json.inventory.FirstPrimaryWeapon_outdoor;
            this.birdeyeBase.inventory.equipment.Holster = {};
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.rogueBase.inventory);
            this.pushGasMaskFilters(this.bigpipeBase.inventory);
            this.pushGasMaskFilters(this.knightBase.inventory);
        }

        BotTierTracker.goonsTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("goonsLoad3 loaded");
        }
    }

    public killaLoad1() {

        let killa1Json = JSON.parse(JSON.stringify(killaLO.killaLO1));

        this.killaBase.inventory.Ammo = killa1Json.inventory.Ammo;
        this.killaBase.inventory.equipment = killa1Json.inventory.equipment;
        this.killaBase.inventory.mods = killa1Json.inventory.mods;
        this.killaBase.chances = killa1Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.killaBase.inventory.items = killa1Json.inventory.items;
            this.killaBase.generation = lootOdds.boss;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.weaponMods.mod_flashlight = 60;
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }
        if (RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.killaBase.chances.equipmentMods.mod_equipment = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.killaBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 };
            this.killaBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.killaBase.inventory);
        }

        BotTierTracker.killaTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("killaLoad1 loaded");
        }
    }

    public killaLoad2() {

        let killa2Json = JSON.parse(JSON.stringify(killaLO.killaLO2));

        this.killaBase.inventory.Ammo = killa2Json.inventory.Ammo;
        this.killaBase.inventory.equipment = killa2Json.inventory.equipment;
        this.killaBase.inventory.mods = killa2Json.inventory.mods;
        this.killaBase.chances = killa2Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.killaBase.inventory.items = killa2Json.inventory.items;
            this.killaBase.generation = lootOdds.boss;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.weaponMods.mod_flashlight = 60;
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 50;
        }
        else if (RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.killaBase.chances.equipmentMods.mod_equipment = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.killaBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.killaBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.killaBase.inventory);
        }

        BotTierTracker.killaTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("killaLoad2 loaded");
        }
    }

    public killaLoad3() {

        let killa3Json = JSON.parse(JSON.stringify(killaLO.killaLO3));

        this.killaBase.inventory.Ammo = killa3Json.inventory.Ammo;
        this.killaBase.inventory.equipment = killa3Json.inventory.equipment;
        this.killaBase.inventory.mods = killa3Json.inventory.mods;
        this.killaBase.chances = killa3Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.killaBase.inventory.items = killa3Json.inventory.items;
            this.killaBase.generation = lootOdds.boss;
        }

        if (RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.weaponMods.mod_flashlight = 60;
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 25;
        }
        if (RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.killaBase.chances.equipmentMods.mod_equipment = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.killaBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.killaBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.killaBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.killaBase.inventory);
        }

        BotTierTracker.killaTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("killaLoad3 loaded");
        }
    }

    public tagillaLoad1() {

        let tagilla1Json = JSON.parse(JSON.stringify(tagillaLO.tagillaLO1));

        this.tagillaBase.inventory.Ammo = tagilla1Json.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagilla1Json.inventory.equipment;
        this.tagillaBase.inventory.mods = tagilla1Json.inventory.mods;
        this.tagillaBase.chances = tagilla1Json.chances;

        if (EventTracker.isHalloween) {
            this.tagillaBase.inventory.equipment.Scabbard = { "63495c500c297e20065a08b1": 1 }
        }

        if (this.modConfig.bot_loot_changes === true) {
            this.tagillaBase.inventory.items = tagilla1Json.inventory.items;
            this.tagillaBase.generation = lootOdds.boss;
        }

        const randnum = this.utils.pickRandNumOneInTen();
        if (randnum >= 9) {
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
            this.tagillaBase.chances.weaponMods.mod_flashlight = 60;
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }
        else if (RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.tagillaBase.chances.equipmentMods.mod_equipment = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.tagillaBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.tagillaBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.tagillaBase.inventory);
        }

        BotTierTracker.tagillaTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("tagillaLoad1 loaded");
        }
    }

    public tagillaLoad2() {

        let tagilla2Json = JSON.parse(JSON.stringify(tagillaLO.tagillaLO2));

        this.tagillaBase.inventory.Ammo = tagilla2Json.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagilla2Json.inventory.equipment;
        this.tagillaBase.inventory.mods = tagilla2Json.inventory.mods;
        this.tagillaBase.chances = tagilla2Json.chances;

        if (EventTracker.isHalloween) {
            this.tagillaBase.inventory.equipment.Scabbard = { "63495c500c297e20065a08b1": 1 }
        }

        if (this.modConfig.bot_loot_changes === true) {
            this.tagillaBase.inventory.items = tagilla2Json.inventory.items;
            this.tagillaBase.generation = lootOdds.boss;
        }

        const randnum = this.utils.pickRandNumOneInTen();
        if (randnum >= 7) {
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
            this.tagillaBase.chances.weaponMods.mod_flashlight = 60;
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 50;
        }
        else if (RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.tagillaBase.chances.equipmentMods.mod_equipment = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.tagillaBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.tagillaBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.tagillaBase.inventory);
        }

        BotTierTracker.tagillaTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("tagillaLoad2 loaded");
        }
    }

    public tagillaLoad3() {

        let tagilla3Json = JSON.parse(JSON.stringify(tagillaLO.tagillaLO3));

        this.tagillaBase.inventory.Ammo = tagilla3Json.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagilla3Json.inventory.equipment;
        this.tagillaBase.inventory.mods = tagilla3Json.inventory.mods;
        this.tagillaBase.chances = tagilla3Json.chances;

        if (EventTracker.isHalloween) {
            this.tagillaBase.inventory.equipment.Scabbard = { "63495c500c297e20065a08b1": 1 }
        }

        if (this.modConfig.bot_loot_changes === true) {
            this.tagillaBase.inventory.items = tagilla3Json.inventory.items;
            this.tagillaBase.generation = lootOdds.boss;
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
            this.tagillaBase.chances.weaponMods.mod_flashlight = 60;
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 25;
        }
        else if (RaidInfoTracker.mapName === "interchange") {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf().equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.tagillaBase.chances.equipmentMods.mod_equipment = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.tagillaBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.tagillaBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.tagillaBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.tagillaBase.inventory);
        }

        BotTierTracker.tagillaTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("tagillaLoad3 loaded");
        }
    }

    public sanitarLoad1() {

        let sanitar1Json = JSON.parse(JSON.stringify(saniLO.sanitarLO1));
        let follower1Json = JSON.parse(JSON.stringify(saniFollowerLO.sanitarfollowerLO1));

        this.saniBase.inventory.Ammo = sanitar1Json.inventory.Ammo;
        this.saniBase.inventory.equipment = sanitar1Json.inventory.equipment;
        this.saniBase.inventory.mods = sanitar1Json.inventory.mods;
        this.saniBase.chances = sanitar1Json.chances;

        this.saniFollowerBase.inventory.Ammo = follower1Json.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = follower1Json.inventory.equipment;
        this.saniFollowerBase.inventory.mods = follower1Json.inventory.mods;
        this.saniFollowerBase.chances = follower1Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.saniBase.inventory.items = sanitar1Json.inventory.items;
            this.saniFollowerBase.inventory.items = follower1Json.inventory.items;
            this.saniBase.generation = lootOdds.boss;
            this.saniFollowerBase.generation = lootOdds.tier4;
        }

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

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.saniBase.chances.equipmentMods.mod_equipment = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.saniBase.inventory.equipment.Headwear = {}
            this.saniBase.inventory.equipment.Eyewear = {}
            this.saniBase.chances.equipment.FaceCover = 100;

            this.saniFollowerBase.chances.equipmentMods.mod_equipment = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniFollowerBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.saniFollowerBase.inventory.equipment.Eyewear = {}
            this.saniFollowerBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.saniFollowerBase.inventory);
            this.pushGasMaskFilters(this.saniBase.inventory);
        }

        BotTierTracker.sanitarTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("saintarLoad1 loaded");
        }
    }

    public sanitarLoad2() {

        let sanitar2Json = JSON.parse(JSON.stringify(saniLO.sanitarLO2));
        let follower2Json = JSON.parse(JSON.stringify(saniFollowerLO.sanitarfollowerLO2));

        this.saniBase.inventory.Ammo = sanitar2Json.inventory.Ammo;
        this.saniBase.inventory.equipment = sanitar2Json.inventory.equipment;
        this.saniBase.inventory.mods = sanitar2Json.inventory.mods;
        this.saniBase.chances = sanitar2Json.chances;

        this.saniFollowerBase.inventory.Ammo = follower2Json.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = follower2Json.inventory.equipment;
        this.saniFollowerBase.inventory.mods = follower2Json.inventory.mods;
        this.saniFollowerBase.chances = follower2Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.saniBase.inventory.items = sanitar2Json.inventory.items;
            this.saniFollowerBase.inventory.items = follower2Json.inventory.items;
            this.saniBase.generation = lootOdds.boss;
            this.saniFollowerBase.generation = lootOdds.tier4;
        }

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

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.saniBase.chances.equipmentMods.mod_equipment = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.saniBase.inventory.equipment.Headwear = {}
            this.saniBase.inventory.equipment.Eyewear = {}
            this.saniBase.chances.equipment.FaceCover = 100;

            this.saniFollowerBase.chances.equipmentMods.mod_equipment = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniFollowerBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.saniFollowerBase.inventory.equipment.Eyewear = {}
            this.saniFollowerBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.saniFollowerBase.inventory);
            this.pushGasMaskFilters(this.saniBase.inventory);
        }

        BotTierTracker.sanitarTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("saintarLoad2 loaded");
        }
    }

    public sanitarLoad3() {

        let sanitar3Json = JSON.parse(JSON.stringify(saniLO.sanitarLO3));
        let follower3Json = JSON.parse(JSON.stringify(saniFollowerLO.sanitarfollowerLO3));

        this.saniBase.inventory.Ammo = sanitar3Json.inventory.Ammo;
        this.saniBase.inventory.equipment = sanitar3Json.inventory.equipment;
        this.saniBase.inventory.mods = sanitar3Json.inventory.mods;
        this.saniBase.chances = sanitar3Json.chances;

        this.saniFollowerBase.inventory.Ammo = follower3Json.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = follower3Json.inventory.equipment;
        this.saniFollowerBase.inventory.mods = follower3Json.inventory.mods;
        this.saniFollowerBase.chances = follower3Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.saniBase.inventory.items = sanitar3Json.inventory.items;
            this.saniFollowerBase.inventory.items = follower3Json.inventory.items;
            this.saniBase.generation = lootOdds.boss;
            this.saniFollowerBase.generation = lootOdds.tier5;
        }

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

        if (this.modConfig.enable_hazard_zones == true && RaidInfoTracker.mapName === "laboratory") {
            this.saniBase.chances.equipmentMods.mod_equipment = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.saniBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.saniBase.inventory.equipment.Headwear = {}
            this.saniBase.inventory.equipment.Eyewear = {}
            this.saniBase.chances.equipment.FaceCover = 100;

            this.saniFollowerBase.chances.equipmentMods.mod_equipment = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_001 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_002 = 0;
            this.saniFollowerBase.chances.equipmentMods.mod_equipment_000 = 0;
            this.saniFollowerBase.inventory.equipment.FaceCover = { "60363c0c92ec1c31037959f5": 1 }
            this.saniFollowerBase.inventory.equipment.Eyewear = {}
            this.saniFollowerBase.chances.equipment.FaceCover = 100;
        }

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.saniFollowerBase.inventory);
            this.pushGasMaskFilters(this.saniBase.inventory);
        }

        BotTierTracker.sanitarTier = 3;
        if (this.modConfig.logEverything == true) {
            this.logger.info("sanitarLoad3 loaded");
        }
    }

    public reshallaLoad1() {

        let resh1Json = JSON.parse(JSON.stringify(reshLO.reshallaLO1));
        let follower1Json = JSON.parse(JSON.stringify(reshFollowerLO.reshallafollowerLO1));

        this.reshBase.inventory.Ammo = resh1Json.inventory.Ammo;
        this.reshBase.inventory.equipment = resh1Json.inventory.equipment;
        this.reshBase.inventory.mods = resh1Json.inventory.mods;
        this.reshBase.chances = resh1Json.chances;
        this.reshFollowerBase.inventory.Ammo = follower1Json.inventory.Ammo;
        this.reshFollowerBase.inventory.equipment = follower1Json.inventory.equipment;
        this.reshFollowerBase.inventory.mods = follower1Json.inventory.mods;
        this.reshFollowerBase.chances = follower1Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.reshBase.inventory.items = resh1Json.inventory.items;
            this.reshFollowerBase.inventory.items = follower1Json.inventory.items;
            this.reshBase.generation = lootOdds.boss;
            this.reshFollowerBase.generation = lootOdds.tier3;
        }

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

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.reshFollowerBase.inventory);
            this.pushGasMaskFilters(this.reshBase.inventory);
        }

        BotTierTracker.reshallaTier = 1;
        if (this.modConfig.logEverything == true) {
            this.logger.info("reshallaLoad1 loaded");
        }
    }

    public reshallaLoad2() {

        let resh2Json = JSON.parse(JSON.stringify(reshLO.reshallaLO2));
        let follower2Json = JSON.parse(JSON.stringify(reshFollowerLO.reshallafollowerLO2));

        this.reshBase.inventory.Ammo = resh2Json.inventory.Ammo;
        this.reshBase.inventory.equipment = resh2Json.inventory.equipment;
        this.reshBase.inventory.mods = resh2Json.inventory.mods;
        this.reshBase.chances = resh2Json.chances;

        this.reshFollowerBase.inventory.Ammo = follower2Json.inventory.Ammo;
        this.reshFollowerBase.inventory.equipment = follower2Json.inventory.equipment;
        this.reshFollowerBase.inventory.mods = follower2Json.inventory.mods;
        this.reshFollowerBase.chances = follower2Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.reshBase.inventory.items = resh2Json.inventory.items;
            this.reshFollowerBase.inventory.items = follower2Json.inventory.items;
            this.reshBase.generation = lootOdds.boss;
            this.reshFollowerBase.generation = lootOdds.tier4;
        }

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

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.reshFollowerBase.inventory);
            this.pushGasMaskFilters(this.reshBase.inventory);
        }

        BotTierTracker.reshallaTier = 2;
        if (this.modConfig.logEverything == true) {
            this.logger.info("reshallaLoad2 loaded");
        }
    }

    public reshallaLoad3() {

        let resh3Json = JSON.parse(JSON.stringify(reshLO.reshallaLO3));
        let follower3Json = JSON.parse(JSON.stringify(reshFollowerLO.reshallafollowerLO3));

        this.reshBase.inventory.Ammo = resh3Json.inventory.Ammo;
        this.reshBase.inventory.equipment = resh3Json.inventory.equipment;
        this.reshBase.inventory.mods = resh3Json.inventory.mods;
        this.reshBase.chances = resh3Json.chances;

        this.reshFollowerBase.inventory.Ammo = follower3Json.inventory.Ammo;
        this.reshFollowerBase.inventory.equipment = follower3Json.inventory.equipment;
        this.reshFollowerBase.inventory.mods = follower3Json.inventory.mods;
        this.reshFollowerBase.chances = follower3Json.chances;

        if (this.modConfig.bot_loot_changes === true) {
            this.reshBase.inventory.items = resh3Json.inventory.items;
            this.reshFollowerBase.inventory.items = follower3Json.inventory.items;
            this.reshBase.generation = lootOdds.boss;
            this.reshFollowerBase.generation = lootOdds.tier5;
        }

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

        if (this.modConfig.enable_hazard_zones) {
            this.pushGasMaskFilters(this.reshFollowerBase.inventory);
            this.pushGasMaskFilters(this.reshBase.inventory);
        }

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

        this.reshBase.inventory.equipment.SecondPrimaryWeapon = { "5b3b713c5acfc4330140bd8d": 1 }
    }

}



