
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";

export class _Items {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig) { }
    
    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;
    public config = this.modConfig

    public loadItems(){
        this.globalDB["AllowSelectEntryPoint"] = true;

        if (this.config.all_examined == true) {
            for (let i in this.itemDB) {
                let fileData = this.itemDB[i];
                fileData._props.ExaminedByDefault = true;
            }
            if (this.config.logEverything == true) {
                this.logger.info("All Items Examined");
            }
        }
        if(this.config.remove_inraid_restrictions == true){
            this.globalDB.RestrictionsInRaid = [];
            if (this.config.logEverything == true) {
                this.logger.info("In-Raid Restrictions Removed");
            }
        }
        if (this.config.logEverything == true) {
            this.logger.info("Items Loaded");
        }
    }
}