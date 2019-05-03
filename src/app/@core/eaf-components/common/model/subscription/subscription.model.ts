/**
 * Created Date: Tuesday, December 18th 2017, 3:05:27 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
export class SubscriptionModel {
    id: number;
    subscriptionTypeCode: number;
    subscriptionObjectId: string;
    userId: number;
    effectiveStartDate: any;
    effectiveEndDate: any;
    subscriptionOptions: any;
    subscriberId: number;
    subscriberTypeCode: number;
    transactionId: string;
    mainTransactionId: string;
    subscriberModelList: Array<any>;

    constructor(subscribtionValue?: any) {
        if (subscribtionValue) {
            this.effectiveEndDate = subscribtionValue.effectiveEndDate ? subscribtionValue.effectiveEndDate : 7258032000000;
            this.effectiveStartDate = subscribtionValue.effectiveStartDate;
            this.id = subscribtionValue.id
            this.mainTransactionId = subscribtionValue.mainTransactionId
            this.subscriberId = subscribtionValue.subscriberId;
            this.subscriberTypeCode = subscribtionValue.subscriberTypeCode
            this.subscriptionObjectId = subscribtionValue.subscriptionObjectId
            this.subscriptionTypeCode = subscribtionValue.subscriptionTypeCode;
            this.userId = subscribtionValue.userId
            this.subscriberModelList = subscribtionValue.subscriberModelList;
        }
    }
}
