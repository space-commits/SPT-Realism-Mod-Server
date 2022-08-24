import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
// import { Arrays } from "./arrays";

export class AttatchmentBase {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private arrays, private modConf) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    // public array = new Arrays(this.tables);

    public loadAttRestrict() {
        if (this.modConf.bot_changes == true) {
            for (let i in this.itemDB) {
                let fileData = this.itemDB[i];
                if (fileData._id === "5b31163c5acfc400153b71cb"
                    || fileData._id === "58d2664f86f7747fec5834f6"
                    || fileData._id === "5c7d55f52e221644f31bff6a"
                    || fileData._id === "58d39d3d86f77445bb794ae7"
                    || fileData._id === "577d128124597739d65d0e56"
                    || fileData._id === "5a33b2c9c4a282000c5a9511"
                    || fileData._id === "5cc70102e4a949035e43ba74"
                    || fileData._id === "5cf7acfcd7f00c1084477cf2"
                    || fileData._id === "5b363dea5acfc4771e1c5e7e"
                    || fileData._id === "5b363e1b5acfc4771e1c5e80"
                    || fileData._id === "59bffc1f86f77435b128b872"
                    || fileData._id === "5de8f237bbaf010b10528a70"
                    || fileData._id === "5e21ca18e4d47f0da15e77dd"
                    || fileData._id === "5cf79389d7f00c10941a0c4d"
                    || fileData._id === "5cf79599d7f00c10875d9212"
                    || fileData._id === "5cf67cadd7f00c065a5abab7"
                    || fileData._id === "5cf67a1bd7f00c06585fb6f3"
                    || fileData._id === "615d8e9867085e45ef1409c6"
                    || fileData._id === "5fc4b992187fea44d52edaa9"
                    || fileData._id === "5fc4b97bab884124df0cd5e3"
                    || fileData._id === "5c4eec9b2e2216398b5aaba2"
                    || fileData._id === "6171407e50224f204c1da3c5"
                    || fileData._id === "61713cc4d8e3106d9806c109"
                    || fileData._id === "618a75c9a3884f56c957ca1b"
                    || fileData._id === "615d8da4d3a39d50044c10e8"
                    || fileData._id === "615d8d878004cc50514c3233"
                    || fileData._id === "616584766ef05c2ce828ef57"
                    || fileData._id === "616554fe50224f204c1da2aa"
                    || fileData._id === "609a4b4fe2ff132951242d04"
                    || fileData._id === "58d39b0386f77443380bf13c"
                    || fileData._id === "5c7d560b2e22160bc12c6139"
                    || fileData._id === "5c86592b2e2216000e69e77c"
                    || fileData._id === "5c6162682e22160010261a2b"
                    || fileData._id === "5c90c3622e221601da359851"
                    || fileData._id === "5c61627a2e22160012542c55"
                    || fileData._id === "5c61a40d2e2216001403158d"
                    || fileData._id === "5bfebc5e0db834001a6694e5"
                    || fileData._id === "5c1cdd302e221602b3137250"
                    || fileData._id === "5c064c400db834001d23f468"
                    || fileData._id === "5bbdb811d4351e45020113c7"
                    || fileData._id === "5bc5a372d4351e44f824d17f"
                    || fileData._id === "5b3f7bf05acfc433000ecf6b"
                    || fileData._id === "5b3f7c005acfc4704b4a1de8"
                    || fileData._id === "5b3b99265acfc4704b4a1afb"
                    || fileData._id === "5b3b6dc75acfc47a8773fb1e"
                    || fileData._id === "5b2389515acfc4771e1be0c0"
                    || fileData._id === "5aa66a9be5b5b0214e506e89"
                    || fileData._id === "5aa66c72e5b5b00016327c93"
                    || fileData._id === "591ee00d86f774592f7b841e"
                    || fileData._id === "5a33bab6c4a28200741e22f8"
                    || fileData._id === "5649a2464bdc2d91118b45a8"
                    || fileData._id === "57d17e212459775a1179a0f5"
                    || fileData._id === "59db7eed86f77461f8380365"
                    || fileData._id === "5a1ead28fcdbcb001912fa9f"
                    || fileData._id === "5a32aa0cc4a28232996e405f"
                    || fileData._id === "57acb6222459771ec34b5cb0"
                    || fileData._id === "57acb6222459771ec34b5cb0"
                    || fileData._id === "57c69dd424597774c03b7bbc"
                    || fileData._id === "5a27b3d0c4a282000d721ec1"
                    || fileData._id === "5a7ad4af51dfba0013379717"
                    || fileData._id === "5a7ad55551dfba0015068f42"
                    || fileData._id === "5a7b4900e899ef197b331a2a"
                    || fileData._id === "5b3a08b25acfc4001754880c"
                    || fileData._id === "5cc7015ae4a949001152b4c6"
                    || fileData._id === "5cde7b43d7f00c000d36b93e"
                    || fileData._id === "5d024f5cd7ad1a04a067e91a"
                    || fileData._id === "5d0a29ead7ad1a0026013f27"
                    || fileData._id === "5d0a29fed7ad1a002769ad08"
                    || fileData._id === "5dff77c759400025ea5150cf"
                    || fileData._id === "5d7b6bafa4b93652786f4c76"
                    || fileData._id === "5dff8db859400025ea5150d4"
                    || fileData._id === "5df35e970b92095fd441e4d2"
                    || fileData._id === "5e569a0156edd02abe09f27d"
                    || fileData._id === "5e569a2e56edd02abe09f280"
                    || fileData._id === "5eeb2ff5ea4f8b73c827350b"
                    || fileData._id === "5ef5d994dfbc9f3c660ded95"
                    || fileData._id === "5ef369b08cef260c0642acaf"
                    || fileData._id === "618b9682a3884f56c957ca78"
                    || fileData._id === "618ba92152ecee1505530bd3"
                    || fileData._id === "5addbfe15acfc4001a5fc58b"
                    || fileData._id === "5a37ca54c4a282000d72296a"
                    || fileData._id === "55d48a634bdc2d8b2f8b456a"
                    || fileData._id === "5addbfef5acfc400185c2857"
                    || fileData._id === "5a33b652c4a28232996e407c"
                    || fileData._id === "5d2c770c48f0354b4a07c100"
                    || fileData._id === "5d2c772c48f0355d95672c25"
                    || fileData._id === "5b099bb25acfc400186331e8"
                    || fileData._id === "5649af884bdc2d1b2b8b4589"
                    || fileData._id === "5926dad986f7741f82604363"
                    || fileData._id === "5b7be47f5acfc400170e2dd2"
                    || fileData._id === "5b7be4895acfc400170e2dd5"
                    || fileData._id === "5a0abb6e1526d8000a025282"
                    || fileData._id === "5dfe14f30b92095fd441edaf"
                ) {
                    fileData._props.Slots[0]._botRequired = fileData._props.Slots[0]._required;
                    fileData._props.Slots[0]._botRequired = true;
                }
                if (fileData._id === "5cf78496d7f00c065703d6ca"
                    || fileData._id === "618bab21526131765025ab3f"
                    || fileData._id === "618b9643526131765025ab35") {
                    fileData._props.Slots[0]._botRequired = fileData._props.Slots[0]._required;
                    fileData._props.Slots[0]._botRequired = true;
                    fileData._props.Slots[1]._botRequired = fileData._props.Slots[1]._required;
                    fileData._props.Slots[1]._botRequired = true;
                }
                if (fileData._id === "5a71e22f8dc32e00094b97f4"
                    || fileData._id === "5a71e4f48dc32e001207fb26") {
                    fileData._props.Slots[2]._botRequired = fileData._props.Slots[2]._required;
                    fileData._props.Slots[2]._botRequired = true;
                }
                if (fileData._id === "615d8dbd290d254f5e6b2ed6") {
                    fileData._props.Slots[3]._botRequired = fileData._props.Slots[3]._required;
                    fileData._props.Slots[3]._botRequired = true;
                }
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Attatchment Base Loaded");
        }
    }
    // public loadAttRestrict() {
    //     if (this.modConf.bot_changes == true) {
    //         for (let i in this.itemDB) {
    //             let fileData = this.itemDB[i];
    //             if (fileData._id === "5b31163c5acfc400153b71cb"
    //                 || fileData._id === "58d2664f86f7747fec5834f6"
    //                 || fileData._id === "5c7d55f52e221644f31bff6a"
    //                 || fileData._id === "58d39d3d86f77445bb794ae7"
    //                 || fileData._id === "577d128124597739d65d0e56"
    //                 || fileData._id === "5a33b2c9c4a282000c5a9511"
    //                 || fileData._id === "5cc70102e4a949035e43ba74"
    //                 || fileData._id === "5cf7acfcd7f00c1084477cf2"
    //                 || fileData._id === "5b363dea5acfc4771e1c5e7e"
    //                 || fileData._id === "5b363e1b5acfc4771e1c5e80"
    //                 || fileData._id === "59bffc1f86f77435b128b872"
    //                 || fileData._id === "5de8f237bbaf010b10528a70"
    //                 || fileData._id === "5e21ca18e4d47f0da15e77dd"
    //                 || fileData._id === "5cf79389d7f00c10941a0c4d"
    //                 || fileData._id === "5cf79599d7f00c10875d9212"
    //                 || fileData._id === "5cf67cadd7f00c065a5abab7"
    //                 || fileData._id === "5cf67a1bd7f00c06585fb6f3"
    //                 || fileData._id === "615d8e9867085e45ef1409c6"
    //                 || fileData._id === "5fc4b992187fea44d52edaa9"
    //                 || fileData._id === "5fc4b97bab884124df0cd5e3"
    //                 || fileData._id === "5c4eec9b2e2216398b5aaba2"
    //                 || fileData._id === "6171407e50224f204c1da3c5"
    //                 || fileData._id === "61713cc4d8e3106d9806c109"
    //                 || fileData._id === "618a75c9a3884f56c957ca1b"
    //                 || fileData._id === "615d8da4d3a39d50044c10e8"
    //                 || fileData._id === "615d8d878004cc50514c3233"
    //                 || fileData._id === "616584766ef05c2ce828ef57"
    //                 || fileData._id === "616554fe50224f204c1da2aa"
    //                 || fileData._id === "609a4b4fe2ff132951242d04"
    //                 || fileData._id === "58d39b0386f77443380bf13c"
    //                 || fileData._id === "5c7d560b2e22160bc12c6139"
    //                 || fileData._id === "5c86592b2e2216000e69e77c"
    //                 || fileData._id === "5c6162682e22160010261a2b"
    //                 || fileData._id === "5c90c3622e221601da359851"
    //                 || fileData._id === "5c61627a2e22160012542c55"
    //                 || fileData._id === "5c61a40d2e2216001403158d"
    //                 || fileData._id === "5bfebc5e0db834001a6694e5"
    //                 || fileData._id === "5c1cdd302e221602b3137250"
    //                 || fileData._id === "5c064c400db834001d23f468"
    //                 || fileData._id === "5bbdb811d4351e45020113c7"
    //                 || fileData._id === "5bc5a372d4351e44f824d17f"
    //                 || fileData._id === "5b3f7bf05acfc433000ecf6b"
    //                 || fileData._id === "5b3f7c005acfc4704b4a1de8"
    //                 || fileData._id === "5b3b99265acfc4704b4a1afb"
    //                 || fileData._id === "5b3b6dc75acfc47a8773fb1e"
    //                 || fileData._id === "5b2389515acfc4771e1be0c0"
    //                 || fileData._id === "5aa66a9be5b5b0214e506e89"
    //                 || fileData._id === "5aa66c72e5b5b00016327c93"
    //                 || fileData._id === "591ee00d86f774592f7b841e"
    //                 || fileData._id === "5a33bab6c4a28200741e22f8"
    //                 || fileData._id === "5649a2464bdc2d91118b45a8"
    //                 || fileData._id === "57d17e212459775a1179a0f5"
    //                 || fileData._id === "59db7eed86f77461f8380365"
    //                 || fileData._id === "5a1ead28fcdbcb001912fa9f"
    //                 || fileData._id === "5a32aa0cc4a28232996e405f"
    //                 || fileData._id === "57acb6222459771ec34b5cb0"
    //                 || fileData._id === "57acb6222459771ec34b5cb0"
    //                 || fileData._id === "57c69dd424597774c03b7bbc"
    //                 || fileData._id === "5a27b3d0c4a282000d721ec1"
    //                 || fileData._id === "5a7ad4af51dfba0013379717"
    //                 || fileData._id === "5a7ad55551dfba0015068f42"
    //                 || fileData._id === "5a7b4900e899ef197b331a2a"
    //                 || fileData._id === "5b3a08b25acfc4001754880c"
    //                 || fileData._id === "5cc7015ae4a949001152b4c6"
    //                 || fileData._id === "5cde7b43d7f00c000d36b93e"
    //                 || fileData._id === "5d024f5cd7ad1a04a067e91a"
    //                 || fileData._id === "5d0a29ead7ad1a0026013f27"
    //                 || fileData._id === "5d0a29fed7ad1a002769ad08"
    //                 || fileData._id === "5dff77c759400025ea5150cf"
    //                 || fileData._id === "5d7b6bafa4b93652786f4c76"
    //                 || fileData._id === "5dff8db859400025ea5150d4"
    //                 || fileData._id === "5df35e970b92095fd441e4d2"
    //                 || fileData._id === "5e569a0156edd02abe09f27d"
    //                 || fileData._id === "5e569a2e56edd02abe09f280"
    //                 || fileData._id === "5eeb2ff5ea4f8b73c827350b"
    //                 || fileData._id === "5ef5d994dfbc9f3c660ded95"
    //                 || fileData._id === "5ef369b08cef260c0642acaf"
    //                 || fileData._id === "618b9682a3884f56c957ca78"
    //                 || fileData._id === "618ba92152ecee1505530bd3"
    //                 || fileData._id === "5addbfe15acfc4001a5fc58b"
    //                 || fileData._id === "5a37ca54c4a282000d72296a"
    //                 || fileData._id === "55d48a634bdc2d8b2f8b456a"
    //                 || fileData._id === "5addbfef5acfc400185c2857"
    //                 || fileData._id === "5a33b652c4a28232996e407c"
    //                 || fileData._id === "5d2c770c48f0354b4a07c100"
    //                 || fileData._id === "5d2c772c48f0355d95672c25"
    //                 || fileData._id === "5b099bb25acfc400186331e8"
    //                 || fileData._id === "5649af884bdc2d1b2b8b4589"
    //                 || fileData._id === "5926dad986f7741f82604363"
    //                 || fileData._id === "5b7be47f5acfc400170e2dd2"
    //                 || fileData._id === "5b7be4895acfc400170e2dd5"
    //                 || fileData._id === "5a0abb6e1526d8000a025282"
    //                 || fileData._id === "5dfe14f30b92095fd441edaf"
    //                 || fileData._id === "5cf78496d7f00c065703d6ca"
    //                 || fileData._id === "618bab21526131765025ab3f"
    //                 || fileData._id === "618b9643526131765025ab35"
    //                 || fileData._id === "5cf78496d7f00c065703d6ca"
    //                 || fileData._id === "618bab21526131765025ab3f"
    //                 || fileData._id === "618b9643526131765025ab35"
    //                 || fileData._id === "5a71e22f8dc32e00094b97f4"
    //                 || fileData._id === "5a71e4f48dc32e001207fb26"
    //                 || fileData._id === "615d8dbd290d254f5e6b2ed6"
    //             ) {
    //                 for (let slot in fileData._props.Slots) {
    //                     for(let slotName in this.arrays.required_slots){
    //                         if(fileData._props.Slots[slot]._name === this.arrays.required_slots[slotName]){
    //                             fileData._props.Slots[slot]._botRequired = fileData._props.Slots[slot]._required;
    //                             fileData._props.Slots[slot]._botRequired = true;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     if (this.modConf.logEverything == true) {
    //         this.logger.info("Attatchment Base Loaded");
    //     }
    // }

}