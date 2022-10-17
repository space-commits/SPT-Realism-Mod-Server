import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";

export class AttatchmentStats {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private array) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;
    public config = this.modConf;

    public loadAttStats() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            let parentArray = this.array.mod_parent_IDs;

            for(let parent in parentArray){
                if(serverItem._parent === parentArray[parent])
                {
                    if(serverItem._props.Ergonomics != null){
                        serverItem._props.Ergonomics *= 1;
                    }
                }
            }
    
        }
        if (this.config.logEverything == true) {
            this.logger.info("Attatchment Stats Loaded");
        }
    }
}