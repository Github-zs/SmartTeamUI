/**
 * Created Date: Tuesday, December 12th 2017, 03:41:11 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';

export class KSCMaxLengthValidator extends KSCValidatorAbstract {
    private _maxLength: number = 0;

    public get maxLength(): number {
        return this._maxLength;
    }

    public set maxLength(value: number) {
        // Force format value to number
        this._maxLength = Number.parseInt(value.toString());
    }

    constructor(maxLength?: number) {
        super();
        if (maxLength) {
            this.maxLength = maxLength;
        }
    }

    public validate(data): boolean {
        if (data.changeValue && this.maxLength > 0) {
            return  data.changeValue.toString().length > this.maxLength ? true : null;
        } else {
            return null;
        }
    }
}
