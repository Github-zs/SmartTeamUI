/**
 * Created Date: Tuesday, December 12th 2017, 03:41:11 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { CommonUtils } from '@platform/common/util/common-utils';
import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';


export class KSCRequiredValidator extends KSCValidatorAbstract {
    public validate(data): boolean {
        return CommonUtils.isValueEmpty(data.changeValue) ? true : null;
    }
}
