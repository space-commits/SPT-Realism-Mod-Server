"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repairs = void 0;
const RepairHelper_1 = require("C:/snapshot/project/obj/helpers/RepairHelper");
class Repairs extends RepairHelper_1.RepairHelper {
    getRandomisedWeaponRepairDegredationValue(itemProps, isRepairKit, weaponMax, traderQualityMultipler) {
        const minRepairDeg = (isRepairKit)
            ? itemProps.MinRepairKitDegradation
            : itemProps.MinRepairDegradation;
        let maxRepairDeg = (isRepairKit)
            ? itemProps.MaxRepairKitDegradation
            : itemProps.MaxRepairDegradation;
        const duraLossPercent = this.randomUtil.getFloat(minRepairDeg, maxRepairDeg);
        const duraLossMultipliedByTraderMultiplier = (duraLossPercent * weaponMax) * traderQualityMultipler;
        return Number(duraLossMultipliedByTraderMultiplier.toFixed(2));
    }
}
exports.Repairs = Repairs;
