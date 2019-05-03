/**
 * Created Date: Tuesday, December 18th 2017, 3:05:27 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
export class UserSettingModel<T> {
    id: number;
    userId: number;
    settingTypeCode: number;
    category: string;
    name: string;
    description: string;
    settingValue: T;
    transactionId: string;
    mainTransactionId: string;
}
