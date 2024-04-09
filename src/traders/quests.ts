import { IQuest } from "@spt-aki/models/eft/common/tables/IQuest";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";

export class Quests {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    localesEN(): Record<string, string> {
        return this.tables.locales.global["en"];
    }
    questDB(): Record<string, IQuest> {
        return this.tables.templates.quests;
    }

    public removeFIRQuestRequire() {
        for (let i in this.questDB()) {
            let quest = this.questDB()[i];
            if (quest && quest.conditions && quest.conditions.AvailableForFinish) {

                let availForFin = quest.conditions.AvailableForFinish;
                for (let requirement in availForFin) {
                    if (availForFin[requirement].onlyFoundInRaid) {
                        availForFin[requirement].onlyFoundInRaid = false;
                    }
                }
            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("FIR Requirements Removed");
        }
    }

    public fixMechancicQuests() {
        for (let i in this.questDB()) {
            if (this.questDB()[i].QuestName.includes("Gunsmith")) {
                let quest = this.questDB()[i];
                if (quest && quest.conditions && quest.conditions.AvailableForFinish) {
                    quest.conditions.AvailableForFinish.forEach((condition: any) => {
                        if (condition["ergonomics"]) {
                            condition["ergonomics"].value = 0;
                            condition["ergonomics"].compareMethod = ">=";
                        }
                        if (condition["recoil"]) {
                            condition["recoil"].value = 0;
                            condition["ergonomics"].compareMethod = ">=";
                        }
                        if (condition["weight"]) {
                            condition["weight"].value = 0;
                            condition["ergonomics"].compareMethod = ">=";
                        }
                        if (condition["width"]) {
                            condition["width"].value = 0;
                            condition["ergonomics"].compareMethod = ">=";
                        }
                        if (condition["height"]) {
                            condition["height"].value = 0;
                            condition["ergonomics"].compareMethod = ">=";
                        }
                        if (condition["durability"]) {
                            condition["durability"].value = 0;
                            condition["ergonomics"].compareMethod = ">=";
                        }
                    });
                }

                let id = this.questDB()[i]._id;
                let desc = this.localesEN()[id + " description"];
                this.localesEN()[id + " description"] = `${desc}` + "\n\nDurability, Ergo, Recoil, Weight and Size Requirements Have Been Removed.";

            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Mechanic Quests Fixed");
        }
    }
}
