import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";

const treatmentQuests = require("../../db/quests/rad_treatment.json");
const exploreQuests = require("../../db/quests/zone_exploration.json");

export class Quests {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    localesEN(): Record<string, string> {
        return this.tables.locales.global["en"];
    }
    questDB(): Record<string, IQuest> {
        return this.tables.templates.quests;
    }

    //automate locales in future
    public loadHazardQuests() {

        //treatment part 1
        this.questDB()["667c643869df8111b81cb6dc"] = treatmentQuests["667c643869df8111b81cb6dc"];

        for (let i in this.tables.locales.global) {
            let locale = this.tables.locales.global[i];
            locale["667c643869df8111b81cb6dc acceptPlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc declinePlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc completePlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc name"] = "Emergency Treatment - Part 1";
            locale["667c643869df8111b81cb6dc description"] = "Come in, young man. I understand that you've been poking around where you shouldn't be. Don't you know that radiation is bad for your health? Listen, we're in a tight spot and don't have all the supplies needed to treat you and your...acquaintance? You'll have to find them yourself. We won't be able to treat you again for some time, so be more cautious. Your treatment is free of charge, as a favor. One that will be repaid.";
            locale["667c643869df8111b81cb6dc failMessageText"] = "";
            locale["667c643869df8111b81cb6dc successMessageText"] = "That should be your last round of treatment. How do you feel? Better? It will take some time to heal. I hope you learned your lesson. Remember that I won't be able to treat you again for quite some time. Take these old AI-2s, they contain Potassium Iodide to treat low levels of radiation. It looks like you'll need them. You will repay me in time.";

            locale["667c7cf226f52aef063b5ef7"] = "Handover medical bloodsets";
            locale["667c8a4420b5c29111af4bc7"] = "Handover disposable syringes";
            locale["667c8a3a189a9ffd2a5eea23"] = "Handover piles of meds";
        }

        //treatment part 2
        this.questDB()["667dbbc9c62a7c2ee8fe25b2"] = treatmentQuests["667dbbc9c62a7c2ee8fe25b2"];

        for (let i in this.tables.locales.global) {
            let locale = this.tables.locales.global[i];
            locale["667dbbc9c62a7c2ee8fe25b2 acceptPlayerMessage"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 declinePlayerMessage"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 completePlayerMessage"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 name"] = "Emergency Treatment - Part 2";
            locale["667dbbc9c62a7c2ee8fe25b2 description"] = "I see you didn't take my advice from the last time... no matter, we can treat you again. There's just that favour you owe me; I'll need you to bring in extra supplies for our humanitarian efforts. If you want us to treat that 'acquaintance' of yours again, you'll need to bring extra. He harassed my staff, that cannot stand. Let's take a look... your veins... what have you done to yourself? I'll need a LEDX to find where to stick the needle.";
            locale["667dbbc9c62a7c2ee8fe25b2 failMessageText"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 successMessageText"] = "That concludes your treatment. Come back with more supplies if you're thick-headed enough to fall into a reactor again. Keep the LEDX; it's contaminated. Bring it back with you if you need further treatment.";
            locale["667dbd121abe6984e4cfeb16"] = "Handover medical bloodsets";
            locale["667dbd23ef00ab79d3afb149"] = "Handover portable defibrillator";
            locale["667dbd1bb1aeca0bfbb408a7"] = "Handover piles of meds";
            locale["667dbd2bedbb6aa6a6e862eb"] = "Handover LEDX";
            locale["667dbd367520b900ee16550e"] = "Handover ophthalmoscope";
        }


        //find gas
        this.questDB()["6681c5127b9973f80c7c7d12"] = exploreQuests["6681c5127b9973f80c7c7d12"];
        for (let i in this.tables.locales.global) {
            let locale = this.tables.locales.global[i];
            locale["6681c5127b9973f80c7c7d12 acceptPlayerMessage"] = "";
            locale["6681c5127b9973f80c7c7d12 declinePlayerMessage"] = "";
            locale["6681c5127b9973f80c7c7d12 completePlayerMessage"] = "";
            locale["6681c5127b9973f80c7c7d12 name"] = "Safety Technician - Part 1";
            locale["6681c5127b9973f80c7c7d12 description"] = "Greetings, mercenary. I have some easy work for you. Even before the Contract Wars we've had patients coming in with respiratory distress and other strange symptoms. Fatigue, tunnel vision, and even in some cases rapid organ failure..." + 
            " The mayhem you and your...company? helped inflict on the region made that a low priority, we were more concerned about patching up gunshot wounds." + 
            "\n\nHowever, we've had a recent influx of patients showing those same symptoms from all that time ago; I need you to find the source of this contamination. We're unsure if this is connected to the water contamination you helped as remediate before."
            + "\n\nThere used to be a chemical plant in the factory and warehouse complex next to the Customs road, near the UN checkpoint. It was owned by TerraGroup corporation or one of its subsidiaries, I'm sure you're familiar with them. This could be one of the sources of the contamination. Their trademark is plastered all over, you can't miss it. I need you to locate some of the infrastructure used to manufacture and distribute chemical products. I will send in my people to take samples once you've done so.";
            locale["6681c5127b9973f80c7c7d12 failMessageText"] = "";
            locale["6681c5127b9973f80c7c7d12 successMessageText"] = "Thank you mercenary. My people have confirmed the substances that were manufactured here are a match for what some of our patients have been contaminated with. This has grave implications...but that does not concern you. I may have more work for you.";
            locale["6681c60bf1e98af2b3def8cc"] = "Find the infrastructure used for distribution";
            locale["6682854b9ad02262e978d803"] = "Find the pumping station used For manufacture";
        }

        //find rads
        this.questDB()["6681d150fd1d7f0b7e5ae953"] = exploreQuests["6681d150fd1d7f0b7e5ae953"];
        for (let i in this.tables.locales.global) {
            let locale = this.tables.locales.global[i];
            locale["6681d150fd1d7f0b7e5ae953 acceptPlayerMessage"] = "";
            locale["6681d150fd1d7f0b7e5ae953 declinePlayerMessage"] = "";
            locale["6681d150fd1d7f0b7e5ae953 completePlayerMessage"] = "";
            locale["6681d150fd1d7f0b7e5ae953 name"] = "Safety Technician - Part 2";
            locale["6681d150fd1d7f0b7e5ae953 description"] = "My people found more than just a chemical manufacturing plant. Manifests found on site indicate that there was more outbound cargo, headed outside the Tarkov region. From our contacts outside, it seems that the train did not make it to its destination."
            + " We don't know which route they would have taken, the Customs area is crisscrossed by many rail lines. What we do know is that included in the cargo was not just toxic substances, but also radioactive materials. I don't dare to speculate there intended purpose was."
            +"\n\nI need you to locate the train that was carrying this cargo, so my people can safely dispose of it before it gets into the wrong hands. In addition we heard from a reliable informant that some of the cargo was taken towards another location by some...unscrupulous locals; a large warehouse near the river. We're not sure how far they made it. The cargo will be marked as TerraGroup's property.";
            locale["6681d150fd1d7f0b7e5ae953 failMessageText"] = "";
            locale["6681d150fd1d7f0b7e5ae953 successMessageText"] = "My people will be sent to the crash site and move in to retrieve the cargo immediately. I hope you understand that this is a delicate matter and needs to be kept between us. I also hope that you wore a respirator at a minimum and didn't touch anything...";
            locale["6681d1e23a21783b8b9c14ba"] = "Find the train carrying TerraGroup cargo";
            locale["6682859c9d440e2a1e92fc89"] = "Find The stolen radioactive cargo";
        }
    }

    public resetHazardQuests(profile: ISptProfile) {
        const pmc = profile.characters.pmc;

        let questCompleted = false;

        for (let q in pmc.Quests) {
            let quest = pmc.Quests[q];
            if (quest.qid === "667dbbc9c62a7c2ee8fe25b2") {
                if (quest.status === 4) {
                    questCompleted = true;
                    quest.status = 2;
                    quest.completedConditions = [];
                    if (quest.statusTimers["4"]) delete quest.statusTimers["4"];
                    if (quest.statusTimers["3"]) delete quest.statusTimers["3"];
                }

                break;
            }
        }

        if (!questCompleted) return;

        //TaskConditionCounters
        for (let key in pmc.TaskConditionCounters) {
            if (pmc.TaskConditionCounters[key].sourceId === "667dbbc9c62a7c2ee8fe25b2") {
                delete pmc.TaskConditionCounters[key];
            }
        }

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
