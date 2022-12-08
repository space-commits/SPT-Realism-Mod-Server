import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { Arrays } from "./arrays";

export class AttatchmentStats {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private arrays: Arrays) { }

    private itemDB = this.tables.templates.items;


    public loadAttStats() {

        const parentArray = this.arrays.mod_parent_IDs;

        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];

            for (let parent in parentArray) {
                if (serverItem._parent === parentArray[parent]) {
                    if (serverItem._props.Ergonomics != null) {
                        serverItem._props.Ergonomics *= 1;
                    }
                }
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Attatchment Stats Loaded");
        }
    }
}