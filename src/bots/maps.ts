import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILocations } from "@spt-aki/models/spt/server/ILocations";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { EventTracker } from "../misc/seasonalevents";
import { ModTracker } from "../utils/utils";


const botZones = require("../../db/maps/spawnZones.json");
const bossSpawns = require("../../db/maps/bossSpawns.json");
const spawnWaves = require("../../db/maps/spawnWaves.json");

export class Spawns {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private mapDB: ILocations) { }


    public setBossSpawnChance(level: number) {
        if (level <= 5) {
            this.bossSpawnHelper(0.1);
        }
        else if (level <= 10) {
            this.bossSpawnHelper(0.2);
        }
        else if (level <= 15) {
            this.bossSpawnHelper(0.3);
        }
        else if (level <= 20) {
            this.bossSpawnHelper(0.5);
        }
        else if (level <= 25) {
            this.bossSpawnHelper(0.6);
        }
        else if (level <= 30) {
            this.bossSpawnHelper(0.7);
        }
        else if (level <= 35) {
            this.bossSpawnHelper(0.9);
        }
        else if (level <= 40) {
            this.bossSpawnHelper(0.95);
        }
        else if (level <= 45) {
            this.bossSpawnHelper(1);
        }
        else if (level <= 50) {
            this.bossSpawnHelper(1.05);
        }
        else if (level > 50) {
            this.bossSpawnHelper(1.1);
        }
    }

    private bossSpawnHelper(chanceMulti: number) {
        for (let i in this.mapDB) {
            if (i !== "lighthouse" && i !== "laboratory" && this.mapDB[i].base?.BossLocationSpawn !== undefined) {
                for (let k in this.mapDB[i].base.BossLocationSpawn) {
                    let chance = this.mapDB[i].base.BossLocationSpawn[k].BossChance;
                    if (this.mapDB[i].base.BossLocationSpawn[k]?.TriggerId !== undefined && this.mapDB[i].base.BossLocationSpawn[k]?.TriggerId !== "") {
                        chance = Math.round(this.mapDB[i].base.BossLocationSpawn[k].BossChance * chanceMulti * 2);
                        this.mapDB[i].base.BossLocationSpawn[k].BossChance = Math.max(10, Math.min(chance, 100));
                    }
                    else {
                        chance = Math.round(this.mapDB[i].base.BossLocationSpawn[k].BossChance * chanceMulti);
                        this.mapDB[i].base.BossLocationSpawn[k].BossChance = Math.max(1, Math.min(chance, 100));
                    }
                }
            }
        }
    }

    public loadSpawnChanges() {

        if (this.modConf.boss_spawns == true && ModTracker.swagPresent == false) {
            this.tables.locations.bigmap.base.BossLocationSpawn = bossSpawns.CustomsBossLocationSpawn;
            this.tables.locations.factory4_day.base.BossLocationSpawn = bossSpawns.FactoryDayBossLocationSpawn;
            this.tables.locations.factory4_night.base.BossLocationSpawn = bossSpawns.FactoryNightBossLocationSpawn;
            this.tables.locations.rezervbase.base.BossLocationSpawn = bossSpawns.ReserveBossLocationSpawn;
            this.tables.locations.interchange.base.BossLocationSpawn = bossSpawns.InterchangeBossLocationSpawn;
            this.tables.locations.shoreline.base.BossLocationSpawn = bossSpawns.ShorelineBossLocationSpawn;
            this.tables.locations.lighthouse.base.BossLocationSpawn = bossSpawns.LighthouseBossLocationSpawn;
            this.tables.locations.laboratory.base.BossLocationSpawn = bossSpawns.LabsBossLocationSpawn;
            this.tables.locations.woods.base.BossLocationSpawn = bossSpawns.WoodsBossLocationSpawn;
            this.tables.locations.tarkovstreets.base.BossLocationSpawn = bossSpawns.StreetsBossLocationSpawn;
        }

        if (this.modConf.spawn_waves == true && ModTracker.swagPresent == false) {
            this.tables.locations.bigmap.base.waves = spawnWaves.CustomsWaves;
            this.tables.locations.lighthouse.base.waves = spawnWaves.LighthouseWaves;
            this.tables.locations.factory4_day.base.waves = spawnWaves.FactoryWaves;
            this.tables.locations.factory4_night.base.waves = spawnWaves.FactoryWaves;
            this.tables.locations.interchange.base.waves = spawnWaves.InterchangeWaves;
            this.tables.locations.shoreline.base.waves = spawnWaves.ShorelineWaves;
            this.tables.locations.rezervbase.base.waves = spawnWaves.ReserveWaves;
            this.tables.locations.tarkovstreets.base.waves = spawnWaves.StreetsWaves;
            this.tables.locations.woods.base.waves = spawnWaves.WoodsWaves;
            this.tables.locations.laboratory.base.waves = spawnWaves.LabsWaves;
        }

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