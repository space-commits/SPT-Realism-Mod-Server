"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonalEventsHandler = void 0;
class SeasonalEventsHandler {
    constructor(logger, tables, modConf, arrays, seasonalEventsService) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.arrays = arrays;
        this.seasonalEventsService = seasonalEventsService;
        this.christmasItems = [
            "5df8a72c86f77412640e2e83",
            "5df8a72c86f77412640e2e83",
            "5df8a72c86f77412640e2e83",
            "5df8a6a186f77412640e2e80",
            "5df8a6a186f77412640e2e80",
            "5df8a77486f77412672a1e3f"
        ];
    }
    giveBotsChristmasPresents() {
        for (let bot in this.arrays.botArr) {
            if (this.arrays.botArr[bot]?.inventory?.items !== undefined) {
                let invetnory = this.arrays.botArr[bot].inventory.items;
                for (let item in this.christmasItems) {
                    invetnory.Backpack.push(this.christmasItems[item]);
                    invetnory.Pockets.push(this.christmasItems[item]);
                }
            }
        }
    }
}
exports.SeasonalEventsHandler = SeasonalEventsHandler;
