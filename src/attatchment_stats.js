"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttatchmentStats = void 0;
class AttatchmentStats {
    constructor(logger, tables, modConf, array) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.array = array;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.config = this.modConf;
    }
    loadAttStats() {
        const buffertubes = ["5649be884bdc2d79388b4577", "606587e18900dc2d9a55b65f", "5bb20e58d4351e00320205d7", "617153016c780c1e710c9a2f", "5c0faeddd174af02a962601f", "5afd7e095acfc40017541f61", "5c793fb92e221644f31bfb64", "5c793fc42e221600114ca25d"];
        const parentArray = this.array.mod_parent_IDs;
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === "55818a104bdc2db9688b4569") {
                for (let slot in serverItem._props.Slots) {
                    if (serverItem._props.Slots[slot]._name === "mod_scope" || serverItem._props.Slots[slot]._name === "mod_tactical") {
                        serverItem._props.Slots[slot]._props.filters[0].Filter = [
                            "5649a2464bdc2d91118b45a8",
                            "57fd23e32459772d0805bcf1",
                            "544909bb4bdc2d6f028b4577",
                            "5d10b49bd7ad1a1a560708b0",
                            "5c06595c0db834001a66af6c",
                            "5a7b483fe899ef0016170d15",
                            "61605d88ffa6e502ac5e7eeb",
                            "5c5952732e2216398b5abda2"
                        ];
                    }
                }
            }
            for (let buffer in buffertubes) {
                //not maintainable for when new stocks are added: push this instead, and make Filter = default slots Filter array
                if (serverItem._id === buffertubes[buffer]) {
                    serverItem._props.Slots =
                        [
                            {
                                "_name": "mod_stock_004",
                                "_id": "5c793fb92e2216544f31bfb66",
                                "_parent": "5c793fb92e221644f31bfb64",
                                "_props": {
                                    "filters": [
                                        {
                                            "Shift": 0,
                                            "Filter": [
                                                "5fc2369685fd526b824a5713",
                                                "606587d11246154cad35d635",
                                                "602e620f9b513876d4338d9a",
                                                "5a9eb32da2750c00171b3f9c",
                                                "5bfe86df0db834001b734685",
                                                "55d4ae6c4bdc2d8b2f8b456e",
                                                "5c87a07c2e2216001219d4a2",
                                                "5bb20e70d4351e0035629f8f",
                                                "5beec8c20db834001d2c465c",
                                                "5fbbaa86f9986c4cff3fe5f6",
                                                "5fce16961f152d4312622bc9",
                                                "5ae30c9a5acfc408fb139a03",
                                                "5d135e83d7ad1a21b83f42d8",
                                                "5d135ecbd7ad1a21c176542e",
                                                "56eabf3bd2720b75698b4569",
                                                "58d2946386f774496974c37e",
                                                "58d2946c86f7744e271174b5",
                                                "58d2947686f774485c6a1ee5",
                                                "58d2947e86f77447aa070d53",
                                                "5d44069ca4b9361ebd26fc37",
                                                "5d4406a8a4b9361e4f6eb8b7",
                                                "5947c73886f7747701588af5",
                                                "5c793fde2e221601da358614",
                                                "5b39f8db5acfc40016387a1b",
                                                "628a85ee6b1d481ff772e9d5"
                                            ]
                                        }
                                    ]
                                },
                                "_required": false,
                                "_mergeSlotWithChildren": true,
                                "_proto": "55d30c4c4bdc2db4468b457e"
                            }
                        ];
                }
            }
            for (let parent in parentArray) {
                if (serverItem._parent === parentArray[parent]) {
                    if (serverItem._props.Ergonomics != null) {
                        serverItem._props.Ergonomics *= 1;
                    }
                }
            }
        }
        if (this.config.logEverything == true) {
            this.logger.info("Attatchment Stats Loaded");
        }
    }
}
exports.AttatchmentStats = AttatchmentStats;
