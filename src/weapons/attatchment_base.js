"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttatchmentBase = void 0;
class AttatchmentBase {
    constructor(logger, tables, arrays, modConf, utils) {
        this.logger = logger;
        this.tables = tables;
        this.arrays = arrays;
        this.modConf = modConf;
        this.utils = utils;
        this.itemDB = this.tables.templates.items;
    }
    loadAttCompat() {
        const stocksArr = [
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
        ];
        const buffertubes = [
            "5649be884bdc2d79388b4577",
            "5c0faeddd174af02a962601f",
            "5c793fb92e221644f31bfb64",
            "5c793fc42e221600114ca25d"
        ];
        const slots = [
            "mod_stock_000",
            "mod_stock_004",
            "mod_stock_002",
            "mod_stock_001",
        ];
        let stockSlot = {
            "_name": "name",
            "_id": "id",
            "_parent": "parent",
            "_props": {
                "filters": [
                    {
                        "Shift": 0,
                        "Filter": []
                    }
                ]
            },
            "_required": false,
            "_mergeSlotWithChildren": true,
            "_proto": "55d30c4c4bdc2db4468b457e"
        };
        for (let bf in buffertubes) {
            this.itemDB[buffertubes[bf]]._props.Slots = [];
            for (let slot in slots) {
                let newStockSlot = { ...stockSlot };
                newStockSlot._name = slots[slot];
                newStockSlot._id = this.utils.genId();
                newStockSlot._parent = buffertubes[bf];
                newStockSlot._props.filters[0].Filter = stocksArr;
                if (slots[slot] === "mod_stock_000") {
                    newStockSlot._mergeSlotWithChildren = true;
                }
                else {
                    newStockSlot._mergeSlotWithChildren = false;
                }
                this.itemDB[buffertubes[bf]]._props.Slots.push(newStockSlot);
            }
        }
        for (let stock in stocksArr) {
            this.itemDB[stocksArr[stock]]._props.ConflictingItems = stocksArr;
        }
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === "55818a104bdc2db9688b4569") {
                for (let slot in serverItem._props.Slots) {
                    if (serverItem._props.Slots[slot]._name === "mod_scope" || serverItem._props.Slots[slot]._name === "mod_tactical") {
                        var serverArr = serverItem._props.Slots[slot]._props.filters[0].Filter;
                        var compatMods = [
                            "57fd23e32459772d0805bcf1",
                            "544909bb4bdc2d6f028b4577",
                            "5d10b49bd7ad1a1a560708b0",
                            "5c06595c0db834001a66af6c",
                            "5a7b483fe899ef0016170d15",
                            "61605d88ffa6e502ac5e7eeb",
                            "5c5952732e2216398b5abda2"
                        ];
                        serverItem._props.Slots[slot]._props.filters[0].Filter = compatMods.concat(serverArr);
                    }
                }
            }
            if (serverItem._parent === "55818a304bdc2db5418b457d") {
                for (let slot in serverItem._props.Slots) {
                    if (serverItem._props.Slots[slot]._name === "mod_sight_rear") {
                        var serverArr = serverItem._props.Slots[slot]._props.filters[0].Filter;
                        var compatMods = ["5649a2464bdc2d91118b45a8"];
                        serverItem._props.Slots[slot]._props.filters[0].Filter = compatMods.concat(serverArr);
                    }
                }
            }
            let cantedMountConfWeaps = ["5926bb2186f7744b1c6c6e60", "5d2f0d8048f0356c925bc3b0", "5e00903ae9dc277128008b87", "5de7bd7bfd6b4e6e2276dc25"];
            for (let item in cantedMountConfWeaps) {
                if (serverItem._id === cantedMountConfWeaps[item]) {
                    serverItem._props.ConflictingItems.push("5649a2464bdc2d91118b45a8");
                }
            }
            if (serverItem._props.weapClass === "pistol") {
                serverItem._props.ConflictingItems.push("5649a2464bdc2d91118b45a8");
            }
            // if(serverItem._id === "622b3d5cf9cfc87d675d2de9"){
            //     let scopes = serverItem._props.Slots[0]._props.filters[0].Filter;
            //     for(let scope in scopes)
            //     {
            //         serverItem._props.Slots[2]._props.filters[0].Filter.push(scopes[scope]);
            //     }
            // }
        }
    }
    loadAttRequirements() {
        if (this.modConf.bot_changes == true) {
            for (let i in this.itemDB) {
                let serverItem = this.itemDB[i];
                if (serverItem._id === "5b31163c5acfc400153b71cb"
                    || serverItem._id === "58d2664f86f7747fec5834f6"
                    || serverItem._id === "5c7d55f52e221644f31bff6a"
                    || serverItem._id === "58d39d3d86f77445bb794ae7"
                    || serverItem._id === "577d128124597739d65d0e56"
                    || serverItem._id === "5a33b2c9c4a282000c5a9511"
                    || serverItem._id === "5cc70102e4a949035e43ba74"
                    || serverItem._id === "5cf7acfcd7f00c1084477cf2"
                    || serverItem._id === "5b363dea5acfc4771e1c5e7e"
                    || serverItem._id === "5b363e1b5acfc4771e1c5e80"
                    || serverItem._id === "59bffc1f86f77435b128b872"
                    || serverItem._id === "5de8f237bbaf010b10528a70"
                    || serverItem._id === "5e21ca18e4d47f0da15e77dd"
                    || serverItem._id === "5cf79389d7f00c10941a0c4d"
                    || serverItem._id === "5cf79599d7f00c10875d9212"
                    || serverItem._id === "5cf67cadd7f00c065a5abab7"
                    || serverItem._id === "5cf67a1bd7f00c06585fb6f3"
                    || serverItem._id === "615d8e9867085e45ef1409c6"
                    || serverItem._id === "5fc4b992187fea44d52edaa9"
                    || serverItem._id === "5fc4b97bab884124df0cd5e3"
                    || serverItem._id === "5c4eec9b2e2216398b5aaba2"
                    || serverItem._id === "6171407e50224f204c1da3c5"
                    || serverItem._id === "61713cc4d8e3106d9806c109"
                    || serverItem._id === "618a75c9a3884f56c957ca1b"
                    || serverItem._id === "615d8da4d3a39d50044c10e8"
                    || serverItem._id === "615d8d878004cc50514c3233"
                    || serverItem._id === "616584766ef05c2ce828ef57"
                    || serverItem._id === "616554fe50224f204c1da2aa"
                    || serverItem._id === "609a4b4fe2ff132951242d04"
                    || serverItem._id === "58d39b0386f77443380bf13c"
                    || serverItem._id === "5c7d560b2e22160bc12c6139"
                    || serverItem._id === "5c86592b2e2216000e69e77c"
                    || serverItem._id === "5c6162682e22160010261a2b"
                    || serverItem._id === "5c90c3622e221601da359851"
                    || serverItem._id === "5c61627a2e22160012542c55"
                    || serverItem._id === "5c61a40d2e2216001403158d"
                    || serverItem._id === "5bfebc5e0db834001a6694e5"
                    || serverItem._id === "5c1cdd302e221602b3137250"
                    || serverItem._id === "5c064c400db834001d23f468"
                    || serverItem._id === "5bbdb811d4351e45020113c7"
                    || serverItem._id === "5bc5a372d4351e44f824d17f"
                    || serverItem._id === "5b3f7bf05acfc433000ecf6b"
                    || serverItem._id === "5b3f7c005acfc4704b4a1de8"
                    || serverItem._id === "5b3b99265acfc4704b4a1afb"
                    || serverItem._id === "5b3b6dc75acfc47a8773fb1e"
                    || serverItem._id === "5b2389515acfc4771e1be0c0"
                    || serverItem._id === "5aa66a9be5b5b0214e506e89"
                    || serverItem._id === "5aa66c72e5b5b00016327c93"
                    || serverItem._id === "591ee00d86f774592f7b841e"
                    || serverItem._id === "5a33bab6c4a28200741e22f8"
                    || serverItem._id === "5649a2464bdc2d91118b45a8"
                    || serverItem._id === "57d17e212459775a1179a0f5"
                    || serverItem._id === "59db7eed86f77461f8380365"
                    || serverItem._id === "5a1ead28fcdbcb001912fa9f"
                    || serverItem._id === "5a32aa0cc4a28232996e405f"
                    || serverItem._id === "57acb6222459771ec34b5cb0"
                    || serverItem._id === "57acb6222459771ec34b5cb0"
                    || serverItem._id === "57c69dd424597774c03b7bbc"
                    || serverItem._id === "5a27b3d0c4a282000d721ec1"
                    || serverItem._id === "5a7ad4af51dfba0013379717"
                    || serverItem._id === "5a7ad55551dfba0015068f42"
                    || serverItem._id === "5a7b4900e899ef197b331a2a"
                    || serverItem._id === "5b3a08b25acfc4001754880c"
                    || serverItem._id === "5cc7015ae4a949001152b4c6"
                    || serverItem._id === "5cde7b43d7f00c000d36b93e"
                    || serverItem._id === "5d024f5cd7ad1a04a067e91a"
                    || serverItem._id === "5d0a29ead7ad1a0026013f27"
                    || serverItem._id === "5d0a29fed7ad1a002769ad08"
                    || serverItem._id === "5dff77c759400025ea5150cf"
                    || serverItem._id === "5d7b6bafa4b93652786f4c76"
                    || serverItem._id === "5dff8db859400025ea5150d4"
                    || serverItem._id === "5df35e970b92095fd441e4d2"
                    || serverItem._id === "5e569a0156edd02abe09f27d"
                    || serverItem._id === "5e569a2e56edd02abe09f280"
                    || serverItem._id === "5eeb2ff5ea4f8b73c827350b"
                    || serverItem._id === "5ef5d994dfbc9f3c660ded95"
                    || serverItem._id === "5ef369b08cef260c0642acaf"
                    || serverItem._id === "618b9682a3884f56c957ca78"
                    || serverItem._id === "618ba92152ecee1505530bd3"
                    || serverItem._id === "5addbfe15acfc4001a5fc58b"
                    || serverItem._id === "5a37ca54c4a282000d72296a"
                    || serverItem._id === "55d48a634bdc2d8b2f8b456a"
                    || serverItem._id === "5addbfef5acfc400185c2857"
                    || serverItem._id === "5a33b652c4a28232996e407c"
                    || serverItem._id === "5d2c770c48f0354b4a07c100"
                    || serverItem._id === "5d2c772c48f0355d95672c25"
                    || serverItem._id === "5926dad986f7741f82604363"
                    || serverItem._id === "5b7be47f5acfc400170e2dd2"
                    || serverItem._id === "5b7be4895acfc400170e2dd5"
                    || serverItem._id === "5a0abb6e1526d8000a025282"
                    || serverItem._id === "5dfe14f30b92095fd441edaf"
                    || serverItem._id === "57ffb0062459777a045af529"
                    || serverItem._id === "5f2aa49f9b44de6b1b4e68d4"
                    || serverItem._id === "5aaf8e43e5b5b00015693246"
                    || serverItem._id === "5827272a24597748c74bdeea"
                    || serverItem._id === "58272b392459774b4c7b3ccd"
                    || serverItem._id === "5a16b93dfcdbcbcae6687261"
                    || serverItem._id === "5c066ef40db834001966a595"
                    || serverItem._id === "5c11046cd174af02a012e42b"
                    || serverItem._id === "5c0695860db834001b735461"
                    || serverItem._id === "5a16b8a9fcdbcb00165aa6ca") {
                    serverItem._props.Slots[0]._botRequired = serverItem._props.Slots[0]._required;
                    serverItem._props.Slots[0]._botRequired = true;
                }
                if (serverItem._id === "5cf78496d7f00c065703d6ca"
                    || serverItem._id === "618bab21526131765025ab3f"
                    || serverItem._id === "618b9643526131765025ab35") {
                    serverItem._props.Slots[0]._botRequired = serverItem._props.Slots[0]._required;
                    serverItem._props.Slots[0]._botRequired = true;
                    serverItem._props.Slots[1]._botRequired = serverItem._props.Slots[1]._required;
                    serverItem._props.Slots[1]._botRequired = true;
                }
                if (serverItem._id === "5a71e22f8dc32e00094b97f4"
                    || serverItem._id === "5a71e4f48dc32e001207fb26") {
                    serverItem._props.Slots[2]._botRequired = serverItem._props.Slots[2]._required;
                    serverItem._props.Slots[2]._botRequired = true;
                }
                if (serverItem._id === "615d8dbd290d254f5e6b2ed6") {
                    serverItem._props.Slots[3]._botRequired = serverItem._props.Slots[3]._required;
                    serverItem._props.Slots[3]._botRequired = true;
                }
                if (serverItem._id === "5a16b93dfcdbcbcae6687261") {
                    serverItem._props.Slots[0]._botRequired = serverItem._props.Slots[0]._required;
                    serverItem._props.Slots[0]._botRequired = true;
                }
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Attatchment Base Loaded");
        }
    }
}
exports.AttatchmentBase = AttatchmentBase;
