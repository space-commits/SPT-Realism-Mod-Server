import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { Arrays } from "./arrays";

export class SeasonalEventsHandler{
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private arrays: Arrays, private seasonalEventsService: SeasonalEventService) { }

   private  christmasItems = [
        "5df8a72c86f77412640e2e83",
        "5df8a72c86f77412640e2e83",
        "5df8a72c86f77412640e2e83",
        "5df8a6a186f77412640e2e80",
        "5df8a6a186f77412640e2e80",
        "5df8a77486f77412672a1e3f"
    ]

    public merryChristmas(){

        this.logger.warning("Merry Christmas!");

        for(let bot in this.arrays.botArr){
            if(this.arrays.botArr[bot]?.inventory?.items !== undefined){
                
                let invetnory = this.arrays.botArr[bot].inventory.items;

                for(let item in this.christmasItems){
                    invetnory.Backpack.push(this.christmasItems[item]);
                    invetnory.Pockets.push(this.christmasItems[item]);
                }
            }
        }

    }

}