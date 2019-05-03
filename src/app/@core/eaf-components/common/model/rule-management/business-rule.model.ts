/**
 * Created Date: Sunday; July 16th 2017; 9:31:53 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

export class BusinessRuleModel {
    ruleDefId: string;
    ruleKey: string;
    name: string;
    description: string;
    mainTransactionId: string;
    transactionId: string;
    implRef: any;
    categoryCode: number;
    defaultErrorLevelCode: number;
    defaultMetadata: any;
    message: string;
    isConfigure: boolean;
    isActive: boolean;
    baseRuleName: string;
    baseRuleDescription: string;
    baseRuleDefId: string;
    isNew: boolean;

    constructor() {
        this.isConfigure = true;
        this.isActive = false;
        this.isNew = true;
    }
}
