import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { Arrays } from "../utils/arrays";
import { ParentClasses } from "../utils/enums";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";

export class Gear {
    constructor(private arrays: Arrays, private tables: IDatabaseTables, private logger: ILogger, private modConfig: any) { }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }

    public addResourceToGasMaskFilters() {
        //gas mask filter
        this.itemDB()["590c595c86f7747884343ad7"]._props.MaxResource = 100;
        this.itemDB()["590c595c86f7747884343ad7"]._props.Resource = 100;
    }

    public loadSpecialSlotChanges() {
        this.itemDB()["627a4e6b255f7527fb05a0f6"]._props.Slots.forEach(slot => {
            slot._props.filters[0].Filter.push("5672cb724bdc2dc2088b456b", "590a3efd86f77437d351a25b");
        });
        this.itemDB()["65e080be269cbd5c5005e529"]._props.Slots.forEach(slot => {
            slot._props.filters[0].Filter.push("5672cb724bdc2dc2088b456b", "590a3efd86f77437d351a25b");
        });
    }

    public loadGearConflicts() {

        let confMasks = this.arrays.conflMasks;
        let confHats = this.arrays.conflHats;
        let confNVG = this.arrays.conflNVGomponents
        let confMaskOverlays = this.arrays.confMaskOverlays
        let armorCompArr = [];

        //remove certain helmets from GP7 conflicts
        this.itemDB()["60363c0c92ec1c31037959f5"]._props.ConflictingItems = this.itemDB()["60363c0c92ec1c31037959f5"]._props.ConflictingItems.filter(i => i !== "5e4bfc1586f774264f7582d3");

        for (let item in this.itemDB()) {
            let serverItem = this.itemDB()[item];

            if (this.modConfig.headgear_conflicts == true) {
                if (serverItem._parent === ParentClasses.HEADWEAR) {
                    for (let c in serverItem._props.ConflictingItems) {
                        let confItem = serverItem._props.ConflictingItems[c];
                        if (this.itemDB()[confItem] !== undefined && this.itemDB()[confItem]._parent === ParentClasses.HEADSET) {
                            serverItem._props.ConflictingItems[c] = "";
                        }
                    }
                }

                if (serverItem._parent === ParentClasses.ARMOREDEQUIPMENT && serverItem._props.HasHinge == true) {
                    armorCompArr.push(serverItem._id);
                }

                if (confNVG.includes(serverItem._id)) {
                    let confItems = serverItem._props.ConflictingItems;
                    serverItem._props.ConflictingItems = confItems.concat(armorCompArr)
                }

                if (confHats.includes(serverItem._id)) {
                    let confItems = this.itemDB()[item]._props.ConflictingItems;
                    this.itemDB()[item]._props.ConflictingItems = confMasks.concat(confItems);
                }
            }

            //custom mask overlays will bug out if using actual faceshield at the same time
            if ((this.modConfig.realistic_ballistics == true || this.modConfig.enable_hazard_zones == true) && serverItem._props.FaceShieldComponent == true) {
                confMaskOverlays.forEach(element => {
                    if (serverItem._id !== element) {
                        serverItem._props.ConflictingItems.push(element);
                    }
                });
            }
        }
    }

    public loadHeadsetTweaks() {
        for (let item in this.itemDB()) {
            let serverItem = this.itemDB()[item];

            //Sordin
            if (serverItem._id === "5aa2ba71e5b5b000137b758f") {
                serverItem._props.Distortion = 0.1;
                serverItem._props.Resonance = 1.5;
                serverItem._props.DryVolume = -45;
                serverItem._props.AmbientVolume = -2.25;
                serverItem._props.CompressorGain = 7;
            }

            //GSSH
            if (serverItem._id === "5b432b965acfc47a8774094e") {
                serverItem._props.Distortion = 0.31;
                serverItem._props.Resonance = 3;
                serverItem._props.DryVolume = -46;
                serverItem._props.AmbientVolume = -2.35;
                serverItem._props.CompressorGain = 6;
                serverItem._props.CompressorVolume = -4;
                serverItem._props.CompressorTreshold = -26;
            }

            //Peltor ComTac 2
            if (serverItem._id === "5645bcc04bdc2d363b8b4572") {
                serverItem._props.Distortion = 0.22;
                serverItem._props.Resonance = 2;
                serverItem._props.DryVolume = -48;
                serverItem._props.AmbientVolume = -2.45;
                serverItem._props.CompressorGain = 8;
            }

            //Peltor Sport
            if (serverItem._id === "5c165d832e2216398b5a7e36") {
                serverItem._props.Distortion = 0.28;
                serverItem._props.Resonance = 2.5;
                serverItem._props.DryVolume = -49;
                serverItem._props.AmbientVolume = -2.5;
                serverItem._props.CompressorGain = 8;
            }

            //Peltor ComTac 4
            if (serverItem._id === "628e4e576d783146b124c64d") {
                serverItem._props.Distortion = 0.05;
                serverItem._props.Resonance = 1;
                serverItem._props.DryVolume = -51;
                serverItem._props.AmbientVolume = -2.65;
                serverItem._props.CompressorGain = 10;
                serverItem._props.CompressorTreshold = -22;
            }

            //FAST RAC
            if (serverItem._id === "5a16b9fffcdbcb0176308b34") {
                serverItem._props.Distortion = 0.15;
                serverItem._props.Resonance = 1.5;
                serverItem._props.DryVolume = -52;
                serverItem._props.AmbientVolume = -2.75;
                serverItem._props.CompressorGain = 9;
                serverItem._props.CompressorTreshold = -23;
            }

            //Opsmen Earmor M32
            if (serverItem._id === "6033fa48ffd42c541047f728") {
                serverItem._props.Distortion = 0.2;
                serverItem._props.Resonance = 1.5;
                serverItem._props.DryVolume = -55;
                serverItem._props.AmbientVolume = -2.85;
                serverItem._props.CompressorGain = 9;
                serverItem._props.CompressorTreshold = -24;
            }

            //Walker Razor Digital Headset
            if (serverItem._id === "5e4d34ca86f774264f758330") {
                serverItem._props.Distortion = 0.12;
                serverItem._props.Resonance = 1.5;
                serverItem._props.DryVolume = -56;
                serverItem._props.AmbientVolume = -2.9;
                serverItem._props.CompressorGain = 10;
                serverItem._props.CompressorTreshold = -24;
            }

            //Walker XCEL 500BT
            if (serverItem._id === "5f60cd6cf2bcbb675b00dac6") {
                serverItem._props.Distortion = 0.1;
                serverItem._props.Resonance = 1.5;
                serverItem._props.DryVolume = -57;
                serverItem._props.AmbientVolume = -3;
                serverItem._props.CompressorGain = 10;
                serverItem._props.CompressorTreshold = -25;
            }
        }

    }
}