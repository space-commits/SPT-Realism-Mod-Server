import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DependencyContainer, container } from "tsyringe";


const fs = require('fs');
const modConfig = require("../config/config.json");

export class InstanceManager {

    private constructor() {}

    private static instance: InstanceManager;
    public static getInstance(): InstanceManager {
        if (!InstanceManager.instance) InstanceManager.instance = new InstanceManager();
        return InstanceManager.instance;
    }

    public static getLoggerInstance() {
        return container.resolve<ILogger>("WinstonLogger");
    }

}

