/**
 * Created Date: Friday, January 19th 2018, 01:17:26 am
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

export class AdditonalAttributeModel {
    public attributeName: string;
    public attributeType: string;
    public value: any;
    public displayValue: any;
    public options: Array<object>;
    public id: any;


    constructor(attributeName?: string, attributeType?: string, value?: any, displayValue?: any, options?: Array<object>, id?: any) {
        this.attributeName = attributeName;
        this.attributeType = attributeType;
        this.value = value;
        this.displayValue = displayValue;
        this.options = options;
        this.id = id;
    }
}
