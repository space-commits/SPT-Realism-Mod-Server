import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILocations } from "@spt/models/spt/server/ILocations";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ModTracker, Utils } from "../utils/utils";
import { EventTracker } from "../misc/seasonalevents";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ISeasonalEventConfig } from "@spt/models/spt/config/ISeasonalEventConfig";
import { IBossLocationSpawn } from "@spt/models/eft/common/ILocationBase";
import { IGlobals } from "@spt/models/eft/common/IGlobals";


const botZones = require("../../db/maps/spawnZones.json");
const bossSpawns = require("../../db/maps/bossSpawns.json");
const spawnWaves = require("../../db/maps/spawnWaves.json");

export class Spawns {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private mapDB: ILocations, private utils: Utils) { }

    public setBossSpawnChance(level: number, databaseService: DatabaseService, seasonalEventConfig: ISeasonalEventConfig) {
        level = level <= 5 ? 0 : level;
        let levelFactor = (level * 2) / 100;
        let spawnModifier = Math.pow(levelFactor, 1.85);
        spawnModifier = this.utils.clampNumber(spawnModifier, 0, 1);
        this.bossSpawnHelper(spawnModifier, databaseService, seasonalEventConfig);
    }

    private bossSpawnHelper(chanceMulti: number, databaseService: DatabaseService, seasonalEventConfig: ISeasonalEventConfig) {
        //refresh boss spawn chances
        this.loadBossSpawnChanges();
        //if (this.modConf.realistic_zombies) this.configureZombies(databaseService, seasonalEventConfig);

        for (let i in this.mapDB) {
            let mapBase = this.mapDB[i]?.base;
            if (mapBase !== undefined && mapBase?.BossLocationSpawn !== undefined) {
                for (let k in mapBase.BossLocationSpawn) {
                    let bossSpawnLocation = mapBase.BossLocationSpawn[k];
                    let chance = 0;
                    if (i !== "lighthouse" && i !== "laboratory") {
                        if (bossSpawnLocation?.TriggerId !== undefined && bossSpawnLocation?.TriggerId !== "") {
                            chance = bossSpawnLocation.BossChance * chanceMulti * 2;
                        } else {
                            chance = bossSpawnLocation.BossChance * chanceMulti;
                        }
                        bossSpawnLocation.BossChance = Math.round(this.utils.clampNumber(chance, 0, 100));
                    }
                }
            }
        }
    }

    public loadBossSpawnChanges() {
        if (this.modConf.boss_spawns == true) {
            this.tables.locations.bigmap.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.CustomsBossLocationSpawn));
            this.tables.locations.factory4_day.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.FactoryDayBossLocationSpawn));
            this.tables.locations.factory4_night.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.FactoryNightBossLocationSpawn));
            this.tables.locations.rezervbase.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.ReserveBossLocationSpawn));
            this.tables.locations.interchange.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.InterchangeBossLocationSpawn));
            this.tables.locations.shoreline.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.ShorelineBossLocationSpawn));
            this.tables.locations.lighthouse.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.LighthouseBossLocationSpawn));
            this.tables.locations.laboratory.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.LabsBossLocationSpawn));
            this.tables.locations.woods.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.WoodsBossLocationSpawn));
            this.tables.locations.tarkovstreets.base.BossLocationSpawn = JSON.parse(JSON.stringify(bossSpawns.StreetsBossLocationSpawn));
        }
    }


    protected configureZombies(databaseService: DatabaseService, seasonalEventConfig: ISeasonalEventConfig) {
        const infectionLevel = 100;
        const chance = 5;
        const globals: IGlobals = databaseService.getGlobals();
        const infectionHalloween = globals.config.SeasonActivity.InfectionHalloween;
        const botsToAddPerMap = seasonalEventConfig.eventBossSpawns["halloweenzombies"];
        infectionHalloween.Enabled = true;
        //infectionHalloween.DisplayUIEnabled = true;
        //this.tables.locations.bigmap.base.BossLocationSpawn = [];
        //this.tables.locations.bigmap.base.waves = [];       
        const mapKeys = Object.keys(botsToAddPerMap) ?? [];
        const locations = databaseService.getLocations();
        for (const mapKey of mapKeys) {
            const bossesToAdd = botsToAddPerMap[mapKey];
            for (const boss of bossesToAdd) {
                const map = locations[mapKey].base;
                const mapBosses: IBossLocationSpawn[] = map.BossLocationSpawn;
                map.Events.Halloween2024.InfectionPercentage = infectionLevel;
                globals.LocationInfection[mapKey] = infectionLevel;
                let rnd = this.utils.pickRandNumInRange(1, 100);
                if (rnd < chance && !mapBosses.some((bossSpawn) => bossSpawn.BossName === boss.BossName)) {
                    map.BossLocationSpawn.push(...bossesToAdd);
                }
            }
        }
    }

    public loadSpawnChanges() {
        //&& ModTracker.swagPresent == false
        this.loadBossSpawnChanges();

        //SPT does its own custom PMC waves, this couble be doubling up or interfering in some way
        // if (this.modConf.spawn_waves == true && ModTracker.swagPresent == false ) { //&& ModTracker.qtbPresent == false
        //     locationConfig.customWaves.normal = {}; //get rid of the extra waves of scavs SPT adds for no good reason
        //     locationConfig.customWaves.boss = {}; //get rid of extra PMC spawns
        //     this.tables.locations.bigmap.base.waves = spawnWaves.CustomsWaves;
        //     this.tables.locations.lighthouse.base.waves = spawnWaves.LighthouseWaves;
        //     this.tables.locations.factory4_day.base.waves = spawnWaves.FactoryWaves;
        //     this.tables.locations.factory4_night.base.waves = spawnWaves.FactoryWaves;
        //     this.tables.locations.interchange.base.waves = spawnWaves.InterchangeWaves;
        //     this.tables.locations.shoreline.base.waves = spawnWaves.ShorelineWaves;
        //     this.tables.locations.rezervbase.base.waves = spawnWaves.ReserveWaves;
        //     this.tables.locations.tarkovstreets.base.waves = spawnWaves.StreetsWaves;
        //     this.tables.locations.woods.base.waves = spawnWaves.WoodsWaves;
        //     this.tables.locations.laboratory.base.waves = spawnWaves.LabsWaves;
        // }

        if (this.modConf.logEverything == true) {
            this.logger.info("Map Spawn Changes Loaded");
        }
    }

    public openZonesFix() {

        for (let location in botZones.zones) {
            this.tables.locations[location].base.OpenZones = botZones.zones[location];
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("OpenZones Fix Enabled");
        }
    }

}