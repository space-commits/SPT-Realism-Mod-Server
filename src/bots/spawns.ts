import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILocations } from "@spt/models/spt/server/ILocations";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ModTracker, Utils } from "../utils/utils";
import { EventTracker } from "../misc/seasonalevents";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";


const botZones = require("../../db/maps/spawnZones.json");
const bossSpawns = require("../../db/maps/bossSpawns.json");
const spawnWaves = require("../../db/maps/spawnWaves.json");

export class Spawns {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private mapDB: ILocations, private utils: Utils) { }


    public setBossSpawnChance(level: number) {
        if (level <= 5) {
            this.bossSpawnHelper(0);
        }
        else if (level <= 10) {
            this.bossSpawnHelper(0.05);
        }
        else if (level <= 15) {
            this.bossSpawnHelper(0.1);
        }
        else if (level <= 20) {
            this.bossSpawnHelper(0.15);
        }
        else if (level <= 25) {
            this.bossSpawnHelper(0.25);
        }
        else if (level <= 30) {
            this.bossSpawnHelper(0.4);
        }
        else if (level <= 35) {
            this.bossSpawnHelper(0.6);
        }
        else if (level <= 40) {
            this.bossSpawnHelper(0.7);
        }
        else if (level <= 45) {
            this.bossSpawnHelper(0.8);
        }
        else if (level <= 50) {
            this.bossSpawnHelper(0.9);
        }
        else if (level > 50) {
            this.bossSpawnHelper(1);
        }
    }

    private bossSpawnHelper(chanceMulti: number) {

        //refresh boss spawn chances
        this.loadBossSpawnChanges();

        for (let i in this.mapDB) {
            let mapBase = this.mapDB[i]?.base;
            this.logger.warning("============="+i);
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
                    }
                    bossSpawnLocation.BossChance = Math.round(this.utils.clampNumber(chance, 0, 100));
                    this.logger.warning("name " + bossSpawnLocation.BossName);
                    this.logger.warning("chance " + bossSpawnLocation.BossChance);
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

    public loadSpawnChanges(locationConfig: ILocationConfig) {

        //&& ModTracker.swagPresent == false
        this.loadBossSpawnChanges();

        //SPT does its own custom PMC waves, this couble be doubling up or interfering in some way
        if (this.modConf.spawn_waves == true && ModTracker.swagPresent == false ) { //&& ModTracker.qtbPresent == false
            locationConfig.customWaves.normal = {}; //get rid of the extra waves of scavs SPT adds for no good reason
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