import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";

const mechGunsmith = require("../db/traders/quests/mechanic/gunsmith.json");


export class Quests {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    private questDB = this.tables.templates.quests;
    private locales = this.tables.locales.global["en"];



    public removeFIRQuestRequire() {
        for (let quest in this.questDB) {
            let availForFin = this.questDB[quest].conditions.AvailableForFinish;
            for (let requirement in availForFin) {
                if (availForFin[requirement]._props.onlyFoundInRaid) {
                    availForFin[requirement]._props.onlyFoundInRaid = false;
                }
            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("FIR Requirements Removed");
        }
    }

    public fixMechancicQuests() {

        for (let quest in this.questDB) {
            if (this.questDB[quest].QuestName.includes("Gunsmith")) {
                let conditions = this.questDB[quest].conditions.AvailableForFinish[0];
                conditions._props.ergonomics.compareMethod =">=";
                conditions._props.ergonomics.value = -100;
                conditions._props.recoil.compareMethod ="<=";
                conditions._props.recoil.value = 100000;
                conditions._props.weight.compareMethod ="<=";
                conditions._props.weight.value = 10000;
                conditions._props.width.compareMethod = ">=";
                conditions._props.width.value = 0;
                conditions._props.height.compareMethod = ">=";
                conditions._props.height.value = 0;
                conditions._props.durability.compareMethod = "<=";
                conditions._props.durability.value = 200;

                let id = this.questDB[quest]._id;

                let desc = this.locales[id +" description"];

                this.locales[id +" description"] =  `${desc}` + "\n\nDurability, Ergo, Recoil, Weight and Size Requirements Have Been Removed.";

            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Mechanic Quests Fixed");
        }
    }
}
