/**
 * Created Date: Tuesday, December 12th 2017, 03:36:09 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';


export interface KSCValidator {
    new(args?): KSCValidatorAbstract
}
