import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";


const botZones = require("../db/maps/spawnZones.json");
const bossSpawns = require("../db/maps/bossSpawns.json");

export class Maps {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }


    public loadSpawnChanges() {

        this.tables.locations.bigmap.base.BossLocationSpawn = bossSpawns.CustomsBossLocationSpawn;
        this.tables.locations.factory4_day.base.BossLocationSpawn = bossSpawns.FactoryDayBossLocationSpawn;
        this.tables.locations.factory4_night.base.BossLocationSpawn = bossSpawns.FactoryNightBossLocationSpawn;
        this.tables.locations.factory4_night.base.waves = bossSpawns.FactoryWaves;
        this.tables.locations.rezervbase.base.BossLocationSpawn = bossSpawns.ReserveBossLocationSpawn;
        this.tables.locations.interchange.base.BossLocationSpawn = bossSpawns.InterchangeBossLocationSpawn;
        this.tables.locations.shoreline.base.BossLocationSpawn = bossSpawns.ShorelineBossLocationSpawn;
        this.tables.locations.lighthouse.base.BossLocationSpawn = bossSpawns.LighthouseBossLocationSpawn;
        this.tables.locations.lighthouse.base.waves = bossSpawns.LighthouseWaves;
        this.tables.locations.laboratory.base.BossLocationSpawn = bossSpawns.LabsBossLocationSpawn;
        this.tables.locations.woods.base.BossLocationSpawn = bossSpawns.WoodsBossLocationSpawn;
        this.tables.locations.tarkovstreets.base.BossLocationSpawn = bossSpawns.StreetsBossLocationSpawn;  

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