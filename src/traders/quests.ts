import { IQuest } from "@spt-aki/models/eft/common/tables/IQuest";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";

const hazardQuests = require("../../db/quests/rad_treatment.json");

export class Quests {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    localesEN(): Record<string, string> {
        return this.tables.locales.global["en"];
    }
    questDB(): Record<string, IQuest> {
        return this.tables.templates.quests;
    }

    public loadHazardQuests() {

        //treatment part 1
        this.questDB()["667c643869df8111b81cb6dc"] = hazardQuests["667c643869df8111b81cb6dc"];

        for(let i in this.tables.locales.global){
            let locale = this.tables.locales.global[i];
            locale["667c643869df8111b81cb6dc acceptPlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc declinePlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc completePlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc name"] = "Emergency Treatment";
            locale["667c643869df8111b81cb6dc description"] = "Come in, young man. I understand that you've been poking around where you shouldn't be. Don't you know that radiation is bad for your health? Listen, we're in a tight spot and don't have all the supplies needed to treat you and your...acquaintance?. You'll have to find them yourself. We won't be able to treat you again for some time, so be more cautious. Your treatment is free of charge, as a favor. One that will be repaid.";
            locale["667c643869df8111b81cb6dc failMessageText"] = "";
            locale["667c643869df8111b81cb6dc successMessageText"] = "That should be your last round of treatment. How do you feel? Better? It will take some time to heal. I hope you learned your lesson. Remember that I won't be able to treat you again for quite some time. Take this Geiger counter, it seems like you'll need this. You will repay me in time.";
    
            locale["667c7ce693045db42891c99b"] = "Find medical bloodsets";
            locale["667c7cf226f52aef063b5ef7"] = "Handover medical bloodesets";
    
            locale["667c8a4f226f02988be6a482"] = "Find disposable syringes";
            locale["667c8a4420b5c29111af4bc7"] = "Handover disposable syringes";
    
            locale["667c8a41dbc6a66603768af7"] = "Find piles of meds";
            locale["667c8a3a189a9ffd2a5eea23"] = "Handover piles of meds";
        }
    }

    public resetHazardQuests(profile: IAkiProfile) {
        const pmc = profile.characters.pmc;

        //TaskConditionCounters
        //Quests
        //messages

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
            if (!this.questDB()[i].type.toLowerCase().includes("weaponassembly")) continue;
            let quest = this.questDB()[i];
            if (!quest?.conditions?.AvailableForFinish) continue;
            for (let j in quest.conditions.AvailableForFinish) {
                let condition = quest.conditions.AvailableForFinish[j];
                if (condition["ergonomics"]) {
                    condition["ergonomics"].value = 1;
                    condition["ergonomics"].compareMethod = ">=";
                }
                if (condition["recoil"]) {
                    condition["recoil"].value = 1;
                    condition["recoil"].compareMethod = ">=";
                }
                if (condition["weight"]) {
                    condition["weight"].value = 0;
                    condition["weight"].compareMethod = ">=";
                }
                if (condition["width"]) {
                    condition["width"].value = 0;
                    condition["width"].compareMethod = ">=";
                }
                if (condition["height"]) {
                    condition["height"].value = 0;
                    condition["height"].compareMethod = ">=";
                }
                if (condition["durability"]) {
                    condition["durability"].value = 1;
                    condition["durability"].compareMethod = ">=";
                }
            }

            let id = this.questDB()[i]._id;
            let desc = this.localesEN()[id + " description"];
            this.localesEN()[id + " description"] = `${desc}` + "\n\nDurability, Ergo, Recoil, Weight and Size Requirements Have Been Removed.";
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Mechanic Quests Fixed");
        }
    }
}
