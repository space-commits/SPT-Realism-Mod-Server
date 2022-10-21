import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";

export class WeaponsStats {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }


    public itemDB = this.tables.templates.items;

    public loadWepStats() {
        const _9x18AmmoArr = this.itemDB["57f4c844245977379d5c14d1"]._props.Chambers[0]._props.filters[0].Filter;
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];

            if (serverItem._id === "5c07a8770db8340023300450") {
                serverItem._props.Slots[2]._props.filters[0].Filter = this.itemDB["55d355e64bdc2d962f8b4569"]._props.Slots[2]._props.filters[0].Filter
            }

            //Kedr-B
            if (serverItem._id === "57f3c6bd24597738e730fa2f") {


                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
            //Kedr
            if (serverItem._id === "57d14d2524597714373db789") {
                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
            //Makarov
            if (serverItem._id === "5448bd6b4bdc2dfc2f8b4569") {


                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
            //Makarov threaded
            if (serverItem._id === "579204f224597773d619e051") {


                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
            //PB
            if (serverItem._id === "56e0598dd2720bb5668b45a6") {

                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
            //APS
            if (serverItem._id === "5a17f98cfcdbcb0980087290") {


                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
            //APS
            if (serverItem._id === "5abccb7dd8ce87001773e277") {


                if (this.modConf.malf_changes == true) {
                    serverItem._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapon Stats Loaded");
        }
    }

}