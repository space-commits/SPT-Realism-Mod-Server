"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gear = void 0;
const enums_1 = require("./enums");
class Gear {
    constructor(arrays, tables) {
        this.arrays = arrays;
        this.tables = tables;
        this.itemDB = this.tables.templates.items;
    }
    loadGearConflicts() {
        var confMasks = this.arrays.conflMasks;
        var confHats = this.arrays.conflHats;
        var confNVG = this.arrays.conflNVGomponents;
        var armorCompArr = [];
        for (let item in this.itemDB) {
            let serverItem = this.itemDB[item];
            if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT && serverItem._props.HasHinge == true) {
                armorCompArr.push(serverItem._id);
            }
        }
        for (let nvg in confNVG) {
            for (let item in this.itemDB) {
                let serverItem = this.itemDB[item];
                if (serverItem._id === confNVG[nvg]) {
                    let confItems = serverItem._props.ConflictingItems;
                    serverItem._props.ConflictingItems = confItems.concat(armorCompArr);
                }
            }
        }
        for (let hat in confHats) {
            for (let item in this.itemDB) {
                if (this.itemDB[item]._id === confHats[hat]) {
                    let confItems = this.itemDB[item]._props.ConflictingItems;
                    this.itemDB[item]._props.ConflictingItems = confMasks.concat(confItems);
                }
            }
        }
    }
    loadHeadsetTweaks() {
        for (let item in this.itemDB) {
            let serverItem = this.itemDB[item];
            //Sordin
            if (serverItem._id === "5aa2ba71e5b5b000137b758f") {
                serverItem._props.Distortion = 0.1;
                serverItem._props.Resonance = 1;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 14;
                serverItem._props.CompressorTreshold = -30;
                serverItem._props.DryVolume = -55;
                // serverItem._props.AmbientVolume = -5;
            }
            //GSSH
            if (serverItem._id === "5b432b965acfc47a8774094e") {
                serverItem._props.Distortion = 0.3;
                serverItem._props.Resonance = 3;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 10;
                serverItem._props.CompressorTreshold = -31;
                serverItem._props.DryVolume = -58;
                // serverItem._props.AmbientVolume = -4;
            }
            //Peltor ComTac 2
            if (serverItem._id === "5645bcc04bdc2d363b8b4572") {
                serverItem._props.Distortion = 0.28;
                serverItem._props.Resonance = 2.47;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 12;
                serverItem._props.CompressorTreshold = -33;
                serverItem._props.DryVolume = -60;
                // serverItem._props.AmbientVolume = -6;
            }
            //Peltor Sport
            if (serverItem._id === "5c165d832e2216398b5a7e36") {
                serverItem._props.Distortion = 0.25;
                serverItem._props.Resonance = 0;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 10;
                serverItem._props.CompressorTreshold = -34;
                serverItem._props.DryVolume = -62;
                // serverItem._props.AmbientVolume = -7;
            }
            //Peltor ComTac 4
            if (serverItem._id === "628e4e576d783146b124c64d") {
                serverItem._props.Distortion = 0;
                serverItem._props.Resonance = 0;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 15;
                serverItem._props.CompressorTreshold = -36;
                serverItem._props.DryVolume = -65;
                // serverItem._props.AmbientVolume = -5;
            }
            //Opsmen Earmor M32
            if (serverItem._id === "6033fa48ffd42c541047f728") {
                serverItem._props.Distortion = 0.15;
                serverItem._props.Resonance = 1;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 12;
                serverItem._props.CompressorTreshold = -37;
                serverItem._props.DryVolume = -68;
                // serverItem._props.AmbientVolume = -5;
            }
            //FAST RAC
            if (serverItem._id === "5a16b9fffcdbcb0176308b34") {
                serverItem._props.Distortion = 0.1;
                serverItem._props.Resonance = 1;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 11;
                serverItem._props.CompressorTreshold = -37;
                serverItem._props.DryVolume = -68;
                // serverItem._props.AmbientVolume = -8;
            }
            //Walker Razor Digital Headset
            if (serverItem._id === "5e4d34ca86f774264f758330") {
                serverItem._props.Distortion = 0.1;
                serverItem._props.Resonance = 0;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 12;
                serverItem._props.CompressorTreshold = -39;
                serverItem._props.DryVolume = -72;
                // serverItem._props.AmbientVolume = -8;
            }
            //Walker XCEL 500BT
            if (serverItem._id === "5f60cd6cf2bcbb675b00dac6") {
                serverItem._props.Distortion = 0.1;
                serverItem._props.Resonance = 0;
                serverItem._props.CompressorAttack = 1;
                // serverItem._props.CompressorGain = 10;
                serverItem._props.CompressorTreshold = -41;
                serverItem._props.DryVolume = -75;
                // serverItem._props.AmbientVolume = -9;
            }
        }
    }
}
exports.Gear = Gear;
