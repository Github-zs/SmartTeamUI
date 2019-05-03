/**
 * Created Date: Wednesday, December 27th 2017, 08:25:16 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';


const INTEGER_REG = /^\+?[1-9][0-9]*$/;

export class KSCPositiveIntegerValidator extends KSCValidatorAbstract {
    validate(data) {
        if (data.changeValue) {
            return INTEGER_REG.test(data.changeValue) ? null : {errMsg: this.translate.instant('NO_NEGATIVE_NUMBERS')};
        } else {
            return null;
        }
    }
}
