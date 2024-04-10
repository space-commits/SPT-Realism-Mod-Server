"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quests = void 0;
class Quests {
    logger;
    tables;
    modConf;
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
    }
    localesEN() {
        return this.tables.locales.global["en"];
    }
    questDB() {
        return this.tables.templates.quests;
    }
    removeFIRQuestRequire() {
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
    fixMechancicQuests() {
        for (let i in this.questDB()) {
            if (!this.questDB()[i].QuestName.includes("Gunsmith"))
                continue;
            let quest = this.questDB()[i];
            this.logger.warning("" + quest.QuestName);
            if (!quest?.conditions?.AvailableForFinish)
                continue;
            for (let j in quest.conditions.AvailableForFinish) {
                let condition = quest.conditions.AvailableForFinish[j];
                if (condition["ergonomics"]) {
                    condition["ergonomics"].value = 1;
                    condition["ergonomics"].compareMethod = ">=";
                    this.logger.warning("" + condition["ergonomics"].value);
                }
                if (condition["recoil"]) {
                    condition["recoil"].value = 1;
                    condition["recoil"].compareMethod = ">=";
                    this.logger.warning("" + condition["recoil"].value);
                }
                if (condition["weight"]) {
                    condition["weight"].value = 0;
                    condition["weight"].compareMethod = ">=";
                    this.logger.warning("" + condition["weight"].value);
                }
                if (condition["width"]) {
                    condition["width"].value = 0;
                    condition["width"].compareMethod = ">=";
                    this.logger.warning("" + condition["width"].value);
                }
                if (condition["height"]) {
                    condition["height"].value = 0;
                    condition["height"].compareMethod = ">=";
                    this.logger.warning("" + condition["height"].value);
                }
                if (condition["durability"]) {
                    condition["durability"].value = 1;
                    condition["durability"].compareMethod = ">=";
                    this.logger.warning("" + condition["durability"].value);
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
exports.Quests = Quests;
//# sourceMappingURL=quests.js.map