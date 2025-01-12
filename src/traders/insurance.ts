// import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
// import { ILogger } from "../../types/models/spt/utils/ILogger";
// import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
// import { InsuranceController } from "@spt/controllers/InsuranceController";
// import { IInsurance } from "@spt/models/eft/profile/ISptProfile";
// import { container } from "tsyringe";
// import { HandbookHelper } from "@spt/helpers/HandbookHelper";
// import { IItem } from "@spt/models/eft/common/tables/IItem";


// const modConfig = require("../../config/config.json");

// const prapId = "54cb50c76803fa8b248b4571";
// const theraId = "54cb57776803fa99248b456e";

// export class InsuranceOverride extends InsuranceController {

//     public myProcessReturnByProfile(sessionID: string): void {
//         // Filter out items that don't need to be processed yet.
//         const insuranceDetails = this.filterInsuredItems(sessionID);

//         // Skip profile if no insured items to process
//         if (insuranceDetails.length === 0) {
//             return;
//         }

//         this.myProcessInsuredItems(insuranceDetails, sessionID);
//     }

//     public myProcessInsuredItems(insuranceDetails: IInsurance[], sessionID: string): void {
//         this.logger.debug(
//             `Processing ${insuranceDetails.length} insurance packages, which includes a total of ${this.countAllInsuranceItems(
//                 insuranceDetails,
//             )} items, in profile ${sessionID}`,
//         );

//         // Fetch the root Item parentId property value that should be used for insurance packages.
//         const rootItemParentID = this.insuranceService.getRootItemParentID(sessionID);

//         // Iterate over each of the insurance packages.
//         for (const insured of insuranceDetails) {
//             // Find items that should be deleted from the insured items.
//             const itemsToDelete = this.findItemsToDelete(rootItemParentID, insured);

//             // Actually remove them.
//             this.removeItemsFromInsurance(insured, itemsToDelete);

//             // Ensure that all items have a valid parent.
//             insured.items = this.itemHelper.adoptOrphanedItems(rootItemParentID, insured.items);

//             // Send the mail to the player.
//             this.mySendMail(sessionID, insured);

//             // Remove the fully processed insurance package from the profile.
//             this.removeInsurancePackageFromProfile(sessionID, insured);
//         }
//     }

//     public mySendMail(sessionID: string, insurance: Insurance): void {

//         const handbookHelper = container.resolve<HandbookHelper>("HandbookHelper");

//         const labsId = "laboratory";
//         // After all of the item filtering that we've done, if there are no items remaining, the insurance has
//         // successfully "failed" to return anything and an appropriate message should be sent to the player.
//         const traderDialogMessages = this.databaseService.getTrader(insurance.traderId).dialogue;

//         // Map is labs + insurance is disabled in base.json
//         if (
//             insurance.systemData?.location?.toLowerCase() === labsId
//             && !(this.databaseService.getLocation(labsId).base.Insurance)
//         ) {
//             // Trader has labs-specific messages
//             // Wipe out returnable items
//             if (traderDialogMessages.insuranceFailedLabs?.length > 0) {
//                 const insuranceFailedLabTemplates = traderDialogMessages.insuranceFailedLabs;
//                 insurance.messageTemplateId = this.randomUtil.getArrayValue(insuranceFailedLabTemplates);
//                 insurance.items = [];
//             }
//         }
//         else if (insurance.items.length === 0) {
//             // Not labs and no items to return
//             const insuranceFailedTemplates = traderDialogMessages.insuranceFailed;
//             insurance.messageTemplateId = this.randomUtil.getArrayValue(insuranceFailedTemplates);
//         }

//         //replace therapist insurance return with cash
//         if (insurance.traderId == theraId) {
//             let itemsToDelete: Item[] = [];
//             let totalInsurancePayout = 0;
//             let id = "";
//             let parentId = "";

//             insurance.items.forEach(item => {
//                 if (!parentId && item.slotId == "hideout") {
//                     parentId = item.parentId;
//                     id = item._id;
//                 }
//                 totalInsurancePayout += handbookHelper.getTemplatePrice(item._tpl);
//                 itemsToDelete.push(item);
//             });

//             insurance.items = insurance.items.filter(item => !itemsToDelete.includes(item));

//             let item: Item = {
//                 "_tpl": "5449016a4bdc2d6f028b456f",
//                 "_id": id,
//                 "parentId": parentId,
//                 "slotId": "hideout",
//                 "upd": {
//                     "StackObjectsCount": totalInsurancePayout
//                 }
//             }
//             insurance.items.push(item);
//         }

//         // Send the insurance message
//         this.mailSendService.sendLocalisedNpcMessageToPlayer(
//             sessionID,
//             this.traderHelper.getTraderById(insurance.traderId),
//             insurance.messageType,
//             insurance.messageTemplateId,
//             insurance.items,
//             insurance.maxStorageTime,
//             insurance.systemData,
//         );
//     }

// }
