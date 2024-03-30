import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";

export class EventTracker {
    static isChristmas: boolean = false;
    static isHalloween: boolean = false;
}

export class SeasonalEventsHandler {
    constructor() { }

    private christmasItems = [
        "5df8a72c86f77412640e2e83",
        "5df8a72c86f77412640e2e83",
        "5df8a72c86f77412640e2e83",
        "5df8a6a186f77412640e2e80",
        "5df8a6a186f77412640e2e80",
        "5df8a77486f77412672a1e3f"
    ];

    private halloweenPocket = [
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
    ];

    private halloweenBag = [
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
        "634959225289190e5e773b3b",
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
        "634959225289190e5e773b3b",
        "544fb6cc4bdc2d34748b456e",
        "59e3577886f774176a362503",
        "57505f6224597709a92585a9",
        "57514643245977207f2c2d09",
        "634959225289190e5e773b3b",
        "634959225289190e5e773b3b",
        "634959225289190e5e773b3b",
        "634959225289190e5e773b3b",
        "634959225289190e5e773b3b",
        "634959225289190e5e773b3b",
    ]

    //broken because SPT changed loot from array to record
    // public giveBotsChristmasPresents(botJsonTemplate: IBotType) {
    //     for (let item in this.christmasItems) {
    //         botJsonTemplate.inventory.items.Backpack.push(this.christmasItems[item]);
    //         botJsonTemplate.inventory.items.Pockets.push(this.christmasItems[item]);
    //     }

    //     botJsonTemplate.inventory.equipment.Headwear["5a43957686f7742a2c2f11b0"] = 5;
    //     botJsonTemplate.inventory.equipment.Headwear["5a43943586f77416ad2f06e2"] = 5;
    // }

    // public giveBotsHalloweenTreats(botJsonTemplate: IBotType) {
    //     for (let item in this.halloweenBag) {
    //         botJsonTemplate.inventory.items.Backpack.push(this.halloweenBag[item]);
    //     }

    //     for (let item in this.halloweenPocket) {
    //         botJsonTemplate.inventory.items.Pockets.push(this.halloweenPocket[item]);
    //         botJsonTemplate.inventory.items.TacticalVest.push(this.halloweenPocket[item]);
    //     }

    //     botJsonTemplate.inventory.equipment.Headwear["59ef13ca86f77445fd0e2483"] = 5;
    // }

}