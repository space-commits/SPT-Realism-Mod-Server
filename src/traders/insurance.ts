import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { InsuranceController } from "@spt/controllers/InsuranceController";
import { IInsurance } from "@spt/models/eft/profile/ISptProfile";
import { container } from "tsyringe";
import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";


const modConfig = require("../../config/config.json");

const prapId = "54cb50c76803fa8b248b4571";
const theraId = "54cb57776803fa99248b456e";

export class InsuranceOverride extends InsuranceController {

    public myProcessReturnByProfile(sessionID: string): void {
        // Filter out items that don't need to be processed yet.
        const insuranceDetails = this.filterInsuredItems(sessionID);

        // Skip profile if no insured items to process
        if (insuranceDetails.length === 0) {
            return;
        }

        this.myProcessInsuredItems(insuranceDetails, sessionID);
    }

    public myProcessInsuredItems(insuranceDetails: IInsurance[], sessionID: string): void {
        this.logger.debug(
            `Processing ${insuranceDetails.length} insurance packages, which includes a total of ${this.countAllInsuranceItems(
                insuranceDetails,
            )} items, in profile ${sessionID}`,
        );

         // Iterate over each of the insurance packages.
         for (const insured of insuranceDetails) {
            // Create a new root parent ID for the message we'll be sending the player
            const rootItemParentID = this.hashUtil.generate();

            // Update the insured items to have the new root parent ID for root/orphaned items
            insured.items = this.itemHelper.adoptOrphanedItems(rootItemParentID, insured.items);

            const simulateItemsBeingTaken = this.insuranceConfig.simulateItemsBeingTaken;
            if (insured.traderId != theraId && simulateItemsBeingTaken) {
                // Find items that could be taken by another player off the players body
                const itemsToDelete = this.findItemsToDelete(rootItemParentID, insured);

                // Actually remove them.
                this.removeItemsFromInsurance(insured, itemsToDelete);

                // There's a chance we've orphaned weapon attachments, so adopt any orphaned items again
                insured.items = this.itemHelper.adoptOrphanedItems(rootItemParentID, insured.items);
            }

            // Send the mail to the player.
            this.mySendMail(sessionID, insured);

            // Remove the fully processed insurance package from the profile.
            this.removeInsurancePackageFromProfile(sessionID, insured);
        }
    }

    public mySendMail(sessionID: string, insurance: IInsurance): void {
        const handbookHelper = container.resolve<HandbookHelper>("HandbookHelper");
        // After all of the item filtering that we've done, if there are no items remaining, the insurance has
        // successfully "failed" to return anything and an appropriate message should be sent to the player.
        const traderDialogMessages = this.databaseService.getTrader(insurance.traderId).dialogue;

        // Map is labs + insurance is disabled in base.json
        if (this.IsMapLabsAndInsuranceDisabled(insurance)) {
            // Trader has labs-specific messages
            // Wipe out returnable items
            this.handleLabsInsurance(traderDialogMessages, insurance);
        } else if (insurance.items.length === 0) {
            // Not labs and no items to return
            const insuranceFailedTemplates = traderDialogMessages.insuranceFailed;
            insurance.messageTemplateId = this.randomUtil.getArrayValue(insuranceFailedTemplates);
        }
   
        //replace therapist insurance return with cash
        if (insurance.traderId == theraId) {
            let itemsToDelete: IItem[] = [];
            let totalInsurancePayout = 0;
            let id = "";
            let parentId = "";

            insurance.items.forEach(item => {
                if (!parentId && item.slotId == "hideout") {
                    parentId = item.parentId;
                    id = item._id;
                }
                totalInsurancePayout += handbookHelper.getTemplatePrice(item._tpl);
                itemsToDelete.push(item);
            });

            insurance.items = insurance.items.filter(item => !itemsToDelete.includes(item));

            let item: IItem = {
                "_tpl": "5449016a4bdc2d6f028b456f",
                "_id": id,
                "parentId": parentId,
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": totalInsurancePayout
                }
            }
            insurance.items.push(item);
        }
    
        // Send the insurance message
        this.mailSendService.sendLocalisedNpcMessageToPlayer(
            sessionID,
            this.traderHelper.getTraderById(insurance.traderId),
            insurance.messageType,
            insurance.messageTemplateId,
            insurance.items,
            insurance.maxStorageTime,
            insurance.systemData,
        );
    }

}
