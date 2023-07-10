"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quests = void 0;
class Quests {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.questDB = this.tables.templates.quests;
        this.locales = this.tables.locales.global["en"];
    }
    removeFIRQuestRequire() {
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
    changeGunsmishRequirements(conditions, num) {
        conditions[num]._props.ergonomics.compareMethod = ">=";
        conditions[num]._props.ergonomics.value = -100;
        conditions[num]._props.recoil.compareMethod = "<=";
        conditions[num]._props.recoil.value = 100000;
        conditions[num]._props.weight.compareMethod = "<=";
        conditions[num]._props.weight.value = 10000;
        conditions[num]._props.width.compareMethod = ">=";
        conditions[num]._props.width.value = 0;
        conditions[num]._props.height.compareMethod = ">=";
        conditions[num]._props.height.value = 0;
        conditions[num]._props.durability.compareMethod = "<=";
        conditions[num]._props.durability.value = 200;
    }
    fixMechancicQuests() {
        for (let quest in this.questDB) {
            if (this.questDB[quest].QuestName.includes("Gunsmith")) {
                let conditions = this.questDB[quest].conditions.AvailableForFinish;
                for (let i = 0; i < conditions.length; i++) {
                    this.changeGunsmishRequirements(conditions, i);
                }
                let id = this.questDB[quest]._id;
                let desc = this.locales[id + " description"];
                this.locales[id + " description"] = `${desc}` + "\n\nDurability, Ergo, Recoil, Weight and Size Requirements Have Been Removed.";
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Mechanic Quests Fixed");
        }
    }
}
exports.Quests = Quests;
