import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { EventTracker } from "../misc/seasonalevents";

const treatmentQuests = require("../../db/quests/rad_treatment.json");
const exploreQuests = require("../../db/quests/zone_exploration.json");
const dynamicZoneQuests = require("../../db/quests/dynamic_zones.json");
const gasEventQuests = require("../../db/quests/gas_event.json");
const achievments = require("../../db/quests/achievements.json");

export class Quests {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    localesEN(): Record<string, string> {
        return this.tables.locales.global["en"];
    }
    questDB(): Record<string, IQuest> {
        return this.tables.templates.quests;
    }

    public pushAchievemnts() {
        achievments.forEach(a => {
            this.tables.templates.achievements.push(a);
        });

        for (let i in this.tables.locales.global) {
            let locale = this.tables.locales.global[i];
            //achievement
            locale["6705551c3d8179f4bdf93e10 name"] = "The Blue Flame";
            locale["6705551c3d8179f4bdf93e10 description"] = "Completed the Realism Mod Halloween event";
        }
    }

    //automate locales in future
    public loadHazardQuests() {

        this.pushAchievemnts();

        //Bad Omens - Part 1
        this.questDB()["6702afe9504c9aca4ed75d9a"] = gasEventQuests["6702afe9504c9aca4ed75d9a"];
        //Bad Omens - Part 2
        this.questDB()["6702b0a1b9fb4619debd0697"] = gasEventQuests["6702b0a1b9fb4619debd0697"];
        //Bad Omens - Part 3
        this.questDB()["6702b0e9601acf629d212eeb"] = gasEventQuests["6702b0e9601acf629d212eeb"];
        //Former Patients
        this.questDB()["6702b8b3c0f2f525d988e428"] = gasEventQuests["6702b8b3c0f2f525d988e428"];
        //Critical Mass
        this.questDB()["670ae811bd43cbf026768126"] = gasEventQuests["670ae811bd43cbf026768126"];
        //Do No Harm
        this.questDB()["6702b3b624c7ac4e2d3e9c37"] = gasEventQuests["6702b3b624c7ac4e2d3e9c37"];

        //treatment part 1
        this.questDB()["667c643869df8111b81cb6dc"] = treatmentQuests["667c643869df8111b81cb6dc"];
        //treatment part 2
        this.questDB()["667dbbc9c62a7c2ee8fe25b2"] = treatmentQuests["667dbbc9c62a7c2ee8fe25b2"];
        //find gas
        this.questDB()["6681c5127b9973f80c7c7d12"] = exploreQuests["6681c5127b9973f80c7c7d12"];
        //find rads
        this.questDB()["6681d150fd1d7f0b7e5ae953"] = exploreQuests["6681d150fd1d7f0b7e5ae953"];
        //find dynamic zones (triggers dynamic zones to start spawning)
        this.questDB()["66dad1a18cbba6e558486336"] = dynamicZoneQuests["66dad1a18cbba6e558486336"];

        if (EventTracker.isHalloween) {
            //Illicit Procedures
            this.questDB()["6705425a0351f9f55b7d8c61"] = treatmentQuests["6705425a0351f9f55b7d8c61"];
            //Blue Flame - Part 1
            this.questDB()["6702b3e4aff397fa3e666fa5"] = gasEventQuests["6702b3e4aff397fa3e666fa5"];
        }
        //this quest is halloween only, but is dependent on part 1, will make sure it can't be completed client side
        //Blue Flame - Part 2
        this.questDB()["6702b4a27d4a4a89fce96fbc"] = gasEventQuests["6702b4a27d4a4a89fce96fbc"];

        for (let i in this.tables.locales.global) {
            let locale = this.tables.locales.global[i];

            //if hallowen, make this quest available immediately, otherwise dependent on previous hazard quests
            //Bad Omens - Part 1
            locale["6702afe9504c9aca4ed75d9a acceptPlayerMessage"] = "";
            locale["6702afe9504c9aca4ed75d9a declinePlayerMessage"] = "";
            locale["6702afe9504c9aca4ed75d9a completePlayerMessage"] = "";
            locale["6702afe9504c9aca4ed75d9a name"] = "Bad Omens - Part 1";
            locale["6702afe9504c9aca4ed75d9a description"] = "We have a situation on our hands here. We've had an influx of new patients, more than usual, all describing respiratory distrees."
                + " They all claim that their symptoms started when a thick fog descended on their village...supersticious villager talk between you and me, an old man was ranting about dark figures lurking in the fog."
                + " Can you believe it! However, their symptoms are very real. I need you to bring us supplies for their treatment, we are running low.";
            locale["6702afe9504c9aca4ed75d9a failMessageText"] = "";
            locale["6702afe9504c9aca4ed75d9a successMessageText"] = "The patients are stable and recovering well. However I remain concerned as to the origin of their symptoms...we've seen them before. We've collected blood samples from the patients to confirm...";
            locale["6702b0062a10e8202cc9c063"] = "Handover piles of meds";
            locale["6702b00eaa02eb7ffdabab6d"] = "Handover disposable syringes";
            locale["6702b01112e0e5412edc40b2"] = "Handover silicone tubing";
            locale["6702b0159bb4fbdf2e467147"] = "Handover bottles of hydrogen peroxide";
            locale["6702b0215240c197de5026dd"] = "This quest will start a chain of events";

            //Bad Omens - Part 2
            locale["6702b0a1b9fb4619debd0697 acceptPlayerMessage"] = "";
            locale["6702b0a1b9fb4619debd0697 declinePlayerMessage"] = "";
            locale["6702b0a1b9fb4619debd0697 completePlayerMessage"] = "";
            locale["6702b0a1b9fb4619debd0697 name"] = "Bad Omens - Part 2";
            locale["6702b0a1b9fb4619debd0697 description"] = "More and more patients are coming in, all with the same symptoms as before. It doesn't matter how much supplies you bring us, this is not sustainable."
                + " I no longer doubt that this is a wide scale environmental hazard, some sort of hazardous fog is accumulating during periods of calm weather. More patients are describing auditory and visual hallucinations, I do not yet know if this is some form of mass hysteria or if the hazardous substance is neurotoxic."
                + "\n\nThe blood tests came back inconclusive as a match for the samples we've collected previously. We need to figure out the origin of this contaimination. I am giving you a GAMU device to collect readings in the field. You need to test in areas where large quantiies of toxic materials have been stored or manufactured."
                + " There's no point getting multiple readings from the same location, try different areas. Also it must be placed in araes of sufficient contamination, prioritize sources of contamination rather than just where it has accumulated."
                + "\n\nPlace the devices on the ground and activate it, then wait for them to finish processing which can take some time. These devices are unreliable, sometimes they can stall and need to be reactivated so you need to stay nearby. I do not have many of these on hand, do not lose them.";
            locale["6702b0a1b9fb4619debd0697 failMessageText"] = "";
            locale["6702b0a1b9fb4619debd0697 successMessageText"] = "Thank you, young man. This data will prove invaluable. Unfortunately this will not aid our patients in the short term. Come back to see me to discuss this. If you collect any more data, you will get a fair price for it.";
            locale["6702b0c6ef3aa9366e629f9c"] = "Handover GAMU devices with data";

            //Bad Omens - Part 3
            locale["6702b0e9601acf629d212eeb acceptPlayerMessage"] = "";
            locale["6702b0e9601acf629d212eeb declinePlayerMessage"] = "";
            locale["6702b0e9601acf629d212eeb completePlayerMessage"] = "";
            locale["6702b0e9601acf629d212eeb name"] = "Bad Omens - Part 3";
            locale["6702b0e9601acf629d212eeb description"] = "The sitatuion is critical. Forecasts suggest calm weather approaching, this means the contaminated fog can accumulate. We are being overwhelmed with patients to the point tha we've had to start tapping into our medical supply stockpiles."
                + " Instances of this contaminated fog is becoming more and more frequent. If you find yourself caught in it, find the nearest shelter and remain indoors, the concentration of the hazard will be reduced."
                + "\n\nIn order to begin effectively treating our patients we will need samples of the original hazardous substance. You will find them in areas where hazardous materials were being stored, manufactured, used or collected by my former collegues.";
            locale["6702b0e9601acf629d212eeb failMessageText"] = "";
            locale["6702b0e9601acf629d212eeb successMessageText"] = "We'll be able to reverse engineer the toxin from these samples. I suspect that you don't care for humanitarian efforts, but regardless you will benefit from this too.";
            locale["6702b0fef881e41d2b389bee"] = "Handover samples of hazardous materials";

            //Former Patients
            locale["6702b8b3c0f2f525d988e428 acceptPlayerMessage"] = "";
            locale["6702b8b3c0f2f525d988e428 declinePlayerMessage"] = "";
            locale["6702b8b3c0f2f525d988e428 completePlayerMessage"] = "";
            locale["6702b8b3c0f2f525d988e428 name"] = "Former Patients";
            locale["6702b8b3c0f2f525d988e428 description"] = "Analysis of the samples confirms that this substance is an neuro-toxic agent. It is not toxic to plant life, all animal life is affected. If you don't hear or see any birdlife, a complete silence, you know you're in the midst of it...If you are exposed to it, you cannot rely on your senses, auditory hallucinations are common. However...a patient came in hysterical over what they claim they saw in the fog."
                + " Naturally I would dismiss such claims and sedate the patient, but they had recorded them on their phone...I can't go into detail why, I'm sure you understand, but I have my suspicions as to who is behind this and who it was in that recording. I need you to confirm it."
                + "\n\nYou need to plant cameras with remote access in or near their hideouts. My personnel will put themselves at great risk to collect the data remotely, so needless to say you need to practice discretion here, do not be seen.";
            locale["6702b8b3c0f2f525d988e428 failMessageText"] = "";
            locale["6702b8b3c0f2f525d988e428 successMessageText"] = "My suspicions have been confrimed...they are behind this, unless someone else is putting them up to it...What I saw on these cameras will scar me for the rest of my life. These are sick, sick men. They weren't always like this, they were made this way. This act of terrorism may just be the beginning. They keep muttering incantaions about a 'blue flame'...I'm sure more will be revealed in time.";
            locale["6702b30d5376ef5b6f661de3"] = "Find the marked room in the Customs area";
            locale["6702b30fb8d60f93f5c6124c"] = "Plant a wi-fi camera at the marked room";
            locale["6702b3229a6adda650f9413d"] = "Find the desecrated chuch near the Shoreline resort";
            locale["6702b3258017122356622905"] = "Plant a wi-fi camera at the desecrated chuch";
            locale["6702b33092f96b8ffcc9ab37"] = "Find the marked hideout in the Tarkov apartments";
            locale["6702b332a22fc611f1c37045"] = "Plant a wi-fi camera at the marked hideout in the apartments";
            locale["6702b33e951abed9d20c2741"] = "Find the marked circle in the lost village on Woods";
            locale["6702b3402c47f1bef20161b6"] = "Plant a wi-fi camera at the marked circle in the lost village";
            locale["6702b3458ab88b3a52829046"] = "Find the marked room used for broadcasting in Reserve";
            locale["6702b34b09f951485e97945f"] = "Plant a wi-fi camera at the marked room";

            //Critical Mass
            locale["670ae811bd43cbf026768126 acceptPlayerMessage"] = "";
            locale["670ae811bd43cbf026768126 declinePlayerMessage"] = "";
            locale["670ae811bd43cbf026768126 completePlayerMessage"] = "";
            locale["670ae811bd43cbf026768126 name"] = "Critical Mass";
            locale["670ae811bd43cbf026768126 description"] = "Close the door behind you. My people have trawled through the footage we've collected so far. They communicate in coded language, in some sort of cipher. We have made preliminary attemps at decoding it. From what we've gathered, they were the ones targetting the rail networks leading out of Tarkov."
                + " There are mentions of transporting radiological materials, but we have no been able to decipher from and to where or the specific composition of these materials."
                + " I need you to find these sights and place a RAMU device to collect data. They work much the same as the GAMU devices you used before. These sights are likely to be highly radioactive, practice caution. Also do everything you can to avoid contact, we can't afford for them to know we're tracking their movements.";
            locale["670ae811bd43cbf026768126 failMessageText"] = "";
            locale["670ae811bd43cbf026768126 successMessageText"] = ".";
            locale["670ae82794523bfa0846cc5a"] = "Handover RAMU devices with data";

            //Do No Harm
            locale["6702b3b624c7ac4e2d3e9c37 acceptPlayerMessage"] = "";
            locale["6702b3b624c7ac4e2d3e9c37 declinePlayerMessage"] = "";
            locale["6702b3b624c7ac4e2d3e9c37 completePlayerMessage"] = "";
            locale["6702b3b624c7ac4e2d3e9c37 name"] = "Do No Harm";
            locale["6702b3b624c7ac4e2d3e9c37 description"] = "Come in. Sit down. If I may be frank, where the fuck did you plant those cameras? I thought this sort of work was part of your former 'employment'? Why the hell did you think planting these cameras out in the open where they can easily be discovered was a good idea?"
                + " They found them. The cameras. They're now out in force, cutting down anyone they suspect of spying on them...PMCs, civilians, it doesn't matter to them. This is on you, and you will fix it."
                + "\n\nWe do not know where they're sourcing the contaminants from. We do not know how they are distributing it over such a wide area. We do not know why they're collecting radioactive materials. What we do know is that they are planning something big, and that they need to be stopped. I didn't want any of this to happen, I didn't want any more bloodshed.";
            locale["6702b3b624c7ac4e2d3e9c37 failMessageText"] = "";
            locale["6702b3b624c7ac4e2d3e9c37 successMessageText"] = "I want you to know that this blood is on your hands. If the cameras were not discovered, all of this could have been avoided. Either way, they seem to have reduced their operations...for now. There will be less instances of contamination I suspsct, but they will be back, and we still haven't cracked their cipher.";
            locale["6702b3d010baa251b5fbb933"] = "Kill 40 Cultists";

            //Halloween only
            //Blue Flame - Part 1
            locale["6702b3e4aff397fa3e666fa5 acceptPlayerMessage"] = "";
            locale["6702b3e4aff397fa3e666fa5 declinePlayerMessage"] = "";
            locale["6702b3e4aff397fa3e666fa5 completePlayerMessage"] = "";
            locale["6702b3e4aff397fa3e666fa5 name"] = "Blue Flame - Part 1";
            locale["6702b3e4aff397fa3e666fa5 description"] = "These people, these...cultists...some of them were former patients of mine. What was done to them is not my fault, you understand? They voluntered for TerraGroup medical studies. It was my job to monitor and assess them, treat them when I was allowed..."
                + " I suppose we all have blood on our hands now, don't we? What matters is what we do to rectify our mistakes, that we end this once and for all."
                + "\n\n Their leaders, their 'priests', speak in riddles and tongues. They use coded language to communicate between cells, but I believe we've cracked their cipher based on the footage we managed to capture before the cameras were discovered."
                + " If they are planning what we suspect they are, we are all in grave danger. Whatever loyalties or enemies you have won't matter anymore. However I do not operate on assumption, I am a medical professional. I need to you to collect samples and data to confirm what they're planning. You need to go to the TerraGroup Laboratory and search for radioactive materials.";
            locale["6702b3e4aff397fa3e666fa5 failMessageText"] = "";
            locale["6702b3e4aff397fa3e666fa5 successMessageText"] = "The derailed trains, the loading and unloading sites for radioactive treatments...the EMP that knocked out the grid in the Tarkov region all that time ago...Oh my God...";
            locale["6702b4488d22a77322a28e0e"] = "Handover 3 samples of radioactive materials from Labs";
            locale["6702b44f711820e614d5b1b4"] = "Handover RAMU device with data from Labs";

            //Halloween only
            //Blue Flame - Part 2
            locale["6702b4a27d4a4a89fce96fbc acceptPlayerMessage"] = "";
            locale["6702b4a27d4a4a89fce96fbc declinePlayerMessage"] = "";
            locale["6702b4a27d4a4a89fce96fbc completePlayerMessage"] = "";
            locale["6702b4a27d4a4a89fce96fbc name"] = "Blue Flame - Part 2";
            locale["6702b4a27d4a4a89fce96fbc description"] = "It all comes down to this. If we fail, we all die. There is no way to evacuate the civilians that remain in Tarkov, Cultists are stalking the routes out of the region, and exchanging fire with UN and RUAF forces."
                + " They must know what we've disovered, that we know about their sick 'prophecy'. My usual channels of communication with the outside world have been severed, and with the increased levels of violence UN and RUAF commands are unresponsive."
                + " Whatsmore, you going to TerraGroup's facility has really stirred up the hornet's nest, Raiders are searching for you. I fear TerraGroup is still actively involved in all this in some way..."
                + "\n\nWe have only one shot at this. We have to make contact with the outside world and warn them, to ask for help. I must confess that I've had a lot more dealings with the TerraGroup corporation than I've let on, as I'm sure you've surmised. I know a lot about them, their former operations, before they left me here to rot. What I do know is that they have unauthorised Low Earth Orbit satelites."
                + " If we can find and use a powerful sateline dish to establish a comm link, my people can repurpose and hijack the satelite to establish contact outside of the Tarkov region. The next time the satelite will be overhead is October 31st at midnight and will only be available for a few days after that."
                + "\n\nThe Shoreline area has a number of satelite dishes. The dish needs to be facing south, and we also need clear skies, those nights are forecast to be clear. I will give you a device for establishing the comm link and transmiting the authorization codes. Do. Not. Lose. The. Device. I hope I do not need to remind you that if you are to fail, it's over for all of us.";
            locale["6702b4a27d4a4a89fce96fbc failMessageText"] = "";
            locale["6702b4a27d4a4a89fce96fbc successMessageText"] = "Vires in Scientia. Scientia est fortis. Et oculus spectans deus nobis.";
            locale["6702b4c1fda5e39ba46ccf35"] = "Establish a comm link with the outside world";

            //treatment part 1
            locale["667c643869df8111b81cb6dc acceptPlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc declinePlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc completePlayerMessage"] = "";
            locale["667c643869df8111b81cb6dc name"] = "Emergency Treatment - Part 1";
            locale["667c643869df8111b81cb6dc description"] = "Come in, young man. I understand that you've been poking around where you shouldn't be. Don't you know that radiation is bad for your health? Listen, we're in a tight spot and don't have all the supplies needed to treat you and your...acquaintance? You'll have to find them yourself. We won't be able to treat you again for some time, so be more cautious. Your treatment is free of charge, as a favor. One that will be repaid.";
            locale["667c643869df8111b81cb6dc failMessageText"] = "";
            locale["667c643869df8111b81cb6dc successMessageText"] = "That should be your last round of treatment. How do you feel? Better? It will take some time to heal. I hope you learned your lesson. Remember that I won't be able to treat you again for quite some time. Take these old AI-2s, they contain Potassium Iodide to treat low levels of radiation. It looks like you'll need them. You will repay me in time.";
            locale["667c7cf226f52aef063b5ef7"] = "Handover medical bloodsets";
            locale["667c8a4420b5c29111af4bc7"] = "Handover disposable syringes";
            locale["667c8a3a189a9ffd2a5eea23"] = "Handover piles of meds";
            locale["5a3fc03286f77414d64f9941"] = "This quest will reset radiation and toxicity for PMC and Scav.";

            //treatment part 2
            locale["667dbbc9c62a7c2ee8fe25b2 acceptPlayerMessage"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 declinePlayerMessage"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 completePlayerMessage"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 name"] = "Emergency Treatment - Part 2";
            locale["667dbbc9c62a7c2ee8fe25b2 description"] = "I see you didn't take my advice from the last time... no matter, we can treat you again. There's just that favour you owe me; I'll need you to bring in extra supplies for our humanitarian efforts. If you want us to treat that 'acquaintance' of yours again, you'll need to bring extra. He harassed my staff, that cannot stand. Let's take a look... your veins... what have you done to yourself? I'll need a LEDX to find where to stick the needle.";
            locale["667dbbc9c62a7c2ee8fe25b2 failMessageText"] = "";
            locale["667dbbc9c62a7c2ee8fe25b2 successMessageText"] = "That concludes your treatment. Come back with more supplies if you're thick-headed enough to fall into a reactor again. Keep the LEDX; it's contaminated. Bring it back with you if you need further treatment.";
            locale["667dbd121abe6984e4cfeb16"] = "Handover medical bloodsets";
            locale["667dbd23ef00ab79d3afb149"] = "Handover medical tools";
            locale["667dbd1bb1aeca0bfbb408a7"] = "Handover piles of meds";
            locale["667dbd2bedbb6aa6a6e862eb"] = "Handover LEDX";
            locale["66edf0495148faf0d5d3a75d"] = "This quest will reset radiation and toxicity for PMC and Scav. This Quest is repeatable.";

            //find gas
            locale["6681c5127b9973f80c7c7d12 acceptPlayerMessage"] = "";
            locale["6681c5127b9973f80c7c7d12 declinePlayerMessage"] = "";
            locale["6681c5127b9973f80c7c7d12 completePlayerMessage"] = "";
            locale["6681c5127b9973f80c7c7d12 name"] = "Safety Technician - Part 1";
            locale["6681c5127b9973f80c7c7d12 description"] = "Greetings, mercenary. I have some easy work for you. Even before the Contract Wars we've had patients coming in with respiratory distress and other strange symptoms. Fatigue, tunnel vision, and even in some cases rapid organ failure..." +
                " The mayhem you and your...company? helped inflict on the region made that a low priority, we were more concerned about patching up gunshot wounds."
                + "\n\nHowever, we've had a recent influx of patients showing those same symptoms from all that time ago; I need you to find the source of this contamination. We're unsure if this is connected to the water contamination you helped as remediate before."
                + "\n\nThere used to be a chemical plant in the factory and warehouse complex next to the Customs road, between the checkpoint and the petrol station. It was owned by TerraGroup corporation or one of its subsidiaries, I'm sure you're familiar with them. This could be one of the sources of the contamination. Their trademark is featured all over, you can't miss it. I need you to locate some of the infrastructure used to manufacture and store chemical products. I will send in my people to take samples once you've done so.";
            locale["6681c5127b9973f80c7c7d12 failMessageText"] = "";
            locale["6681c5127b9973f80c7c7d12 successMessageText"] = "Thank you mercenary. My people have confirmed the substances that were manufactured here are a match for what some of our patients have been contaminated with. This has grave implications...but that does not concern you. I may have more work for you.";
            locale["6681c60bf1e98af2b3def8cc"] = "Find the infrastructure used for manufacture";
            locale["6682854b9ad02262e978d803"] = "Find the infrastructure used for storage";

            //find rads
            locale["6681d150fd1d7f0b7e5ae953 acceptPlayerMessage"] = "";
            locale["6681d150fd1d7f0b7e5ae953 declinePlayerMessage"] = "";
            locale["6681d150fd1d7f0b7e5ae953 completePlayerMessage"] = "";
            locale["6681d150fd1d7f0b7e5ae953 name"] = "Safety Technician - Part 2";
            locale["6681d150fd1d7f0b7e5ae953 description"] = "My people found more than just a chemical manufacturing plant. Manifests found on site indicate that there was more outbound cargo, headed outside the Tarkov region. From our contacts outside, it seems that the train did not make it to its destination."
                + " We don't know which route they would have taken, the Customs area is crisscrossed by many rail lines. What we do know is that included in the cargo was not just toxic substances, but also radioactive materials. I don't dare to speculate what their intended purpose was."
                + "\n\nI need you to locate the train that was carrying this cargo, so my people can safely dispose of it before it gets into the wrong hands. In addition we heard from a reliable informant that some of the cargo was taken towards another location by some...unscrupulous locals; a large warehouse near the river. We're not sure how far they made it. The cargo will be marked as TerraGroup's property.";
            locale["6681d150fd1d7f0b7e5ae953 failMessageText"] = "";
            locale["6681d150fd1d7f0b7e5ae953 successMessageText"] = "My people will be sent to the derailment and move in to retrieve the cargo immediately. I hope you understand that this is a delicate matter and needs to be kept between us. I also hope that you wore a respirator at a minimum and didn't touch anything...";
            locale["6681d1e23a21783b8b9c14ba"] = "Find the train carrying TerraGroup cargo";
            locale["6682859c9d440e2a1e92fc89"] = "Find The stolen radioactive cargo";

            //find dynamic zones (triggers dynamic zones to start spawning)
            locale["66dad1a18cbba6e558486336 acceptPlayerMessage"] = "";
            locale["66dad1a18cbba6e558486336 declinePlayerMessage"] = "";
            locale["66dad1a18cbba6e558486336 completePlayerMessage"] = "";
            locale["66dad1a18cbba6e558486336 name"] = "Health And Safety";
            locale["66dad1a18cbba6e558486336 description"] = "I need you to listen to everything I am about to tell you very, very carefully. This is not the time to ignore what I have to say. If you don't, then whatever happens is on you."
                + "\n\nI can not tell you exaclty what we discovered at the derailment, this is too sensitive of a matter. I hope you understand, and that you know you can trust me. What I can tell you is that the train derailment was not an accident, and according to the manifest many materials are missing. There were other trains that did not make it, I don't think I need to elaborate on the implications."
                + "\n\nSomeone is hiring the locals to move these illicit materials. I need you to find the sites where they are unloading and loading these materials. We need to find out where they're being taken to. Sources tell me that these sites can disappear as quickly as they appeared. There are many different possible locations, you might have to check the same areas multiple times in order to catch them."
                + "\n\nAre you listening? Good. These materials are extremely hazardous, radioactive. There is something ...unusual about the substances invovled, almost as if the air around it is contaminated. If you are not careful and prepare accordingly, you will likely die a slow agonizing death. As a doctor I am not prone to hyperbole. We lack the resources to treat severe radiation poisoning. If you fall ill, pray that you can somehow conjure up all the supplies needed to treat you.";
            locale["66dad1a18cbba6e558486336 failMessageText"] = "";
            locale["66dad1a18cbba6e558486336 successMessageText"] = "You survived the contamination and found the sites? I was worried I would have to hire some other mercenaries to complete the task. Please take no offense, I am merely speaking pragmatically. Remain cautious, I have a suspicion you'll be encountering many more of these sites for some time to come.";
            locale["66dad1c505699b23af0ec446"] = "Find a loading site on Customs";
            locale["66dad1cb72e715b2f7ae7d0a"] = "Place marker in a loading site on Customs";
            locale["66ddb2de064eeae93da154ca"] = "Find a loading site on Shoreline";
            locale["66ddb5a5a0c634bb0c8b1b11"] = "Place marker in a loading site on Shoreline";
            locale["66ddb5cce3de442223979ac8"] = "Find a loading site on Interchange";
            locale["66ddb5d04e6c5562e560f705"] = "Place marker in a loading site on Interchange";
            locale["66edf085bc2977dd40c64c48"] = "On accepting this quest dynamic hazard zones will spawn.";

            //Illicit Procedures
            locale["6705425a0351f9f55b7d8c61 acceptPlayerMessage"] = "";
            locale["6705425a0351f9f55b7d8c61 declinePlayerMessage"] = "";
            locale["6705425a0351f9f55b7d8c61 completePlayerMessage"] = "";
            locale["6705425a0351f9f55b7d8c61 name"] = "Illicit Procedures";
            locale["6705425a0351f9f55b7d8c61 description"] = "Well, well, well...quite the situation you've created, haha! Look at you, you're all fucked up! I'd say you're lucky to have survived that, but I'm thinking you'd rather be dead right about now."
                + " Look, I've put many contingencies in place over the years, even for something like this. Don't be so hard on yourself, you and that doctor of yours got played. There are forces at play here you just don't understand."
                + " Makes no odds to me, I'm a survivor, I can thrive in any environment. If anything you did me a favor getting rid of those bottom feeders."
                + " What's that? Oh right, right the treatment! Yeah I can treat ye, but it'll cost you. Cash is still king baby, haha!";
            locale["6705425a0351f9f55b7d8c61 failMessageText"] = "";
            locale["6705425a0351f9f55b7d8c61 successMessageText"] = "Don't forget to come see me when you've irradiated your balls again haha!";
            locale["670542841b112dda237d2131"] = "Handover roubles";
            locale["670542a1b4fecacfd3a6729a"] = "This quest will reset radiation and toxicity for PMC and Scav. This Quest is repeatable.";
        }
    }

    public resetRepeatableQuests(profile: ISptProfile) {
        const questsToRepeat: string[] = ["667dbbc9c62a7c2ee8fe25b2", "6705425a0351f9f55b7d8c61"];
        questsToRepeat.forEach(qid => {
            this.resetQuestHelper(profile, qid);
        });
    }

    public resetQuestHelper(profile: ISptProfile, questId: string) {
        const pmc = profile.characters.pmc;

        let questCompleted = false;

        for (let q in pmc.Quests) {
            let quest = pmc.Quests[q];
            if (quest.qid === questId) {
                if (quest.status === 4) {
                    questCompleted = true;
                    quest.status = 2;
                    quest.completedConditions = [];
                    if (quest.statusTimers["4"]) delete quest.statusTimers["4"];
                    if (quest.statusTimers["3"]) delete quest.statusTimers["3"];
                }

                break;
            }
        }

        if (!questCompleted) return;

        //TaskConditionCounters
        for (let key in pmc.TaskConditionCounters) {
            if (pmc.TaskConditionCounters[key].sourceId === questId) {
                delete pmc.TaskConditionCounters[key];
            }
        }

    }

    public removeFIRQuestRequire() {
        for (let i in this.questDB()) {
            let quest = this.questDB()[i];
            if (quest && quest.conditions && quest.conditions.AvailableForFinish) {

                let availForFin = quest.conditions.AvailableForFinish;
                for (let requirement in availForFin) {
                    if (availForFin[requirement].onlyFoundInRaid) {
                        availForFin[requirement].onlyFoundInRaid = false;
                    }
                }
            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("FIR Requirements Removed");
        }
    }

    public fixMechancicQuests() {
        for (let i in this.questDB()) {
            if (!this.questDB()[i].type.toLowerCase().includes("weaponassembly")) continue;
            let quest = this.questDB()[i];
            if (!quest?.conditions?.AvailableForFinish) continue;
            for (let j in quest.conditions.AvailableForFinish) {
                let condition = quest.conditions.AvailableForFinish[j];
                if (condition["ergonomics"]) {
                    condition["ergonomics"].value = 1;
                    condition["ergonomics"].compareMethod = ">=";
                }
                if (condition["recoil"]) {
                    condition["recoil"].value = 1;
                    condition["recoil"].compareMethod = ">=";
                }
                if (condition["weight"]) {
                    condition["weight"].value = 0;
                    condition["weight"].compareMethod = ">=";
                }
                if (condition["width"]) {
                    condition["width"].value = 0;
                    condition["width"].compareMethod = ">=";
                }
                if (condition["height"]) {
                    condition["height"].value = 0;
                    condition["height"].compareMethod = ">=";
                }
                if (condition["durability"]) {
                    condition["durability"].value = 1;
                    condition["durability"].compareMethod = ">=";
                }
                if (condition["baseAccuracy"]) {
                    condition["baseAccuracy"].value = -1;
                    condition["baseAccuracy"].compareMethod = ">=";
                }
            }

            let id = this.questDB()[i]._id;
            let desc = this.localesEN()[id + " description"];
            this.localesEN()[id + " description"] = `${desc}` + "\n\nDurability, Ergo, Recoil, Weight and Size Requirements Have Been Removed.";
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Mechanic Quests Fixed");
        }
    }
}
