/**
 * Created Date: Tuesday, December 12th 2017, 03:46:59 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { KSCValidatorAbstract } from './ksc-validator-abstract';
import { Injectable } from '@angular/core';
import { KSCValidator } from './ksc-validator.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class KSCValidatorFactory {
    // defined validator map.
    public validators: { [name: string]: KSCValidator };
    constructor(private translateService:TranslateService) {

    }

    createKSCValidator(
        name: string
    ): KSCValidatorAbstract {
        const params = name.split('#');
        const validatorName = params[0];
        const validator = this.validators[validatorName];
        let kscValidatorAbstractInst: KSCValidatorAbstract = null;
        if (!validator) {
            return null;
        } else {
            if (params.length > 1) {
                kscValidatorAbstractInst = new validator(params[1]);
            } else {
                kscValidatorAbstractInst = new validator();
            }

            kscValidatorAbstractInst.translate = this.translateService;

            return kscValidatorAbstractInst;
        }
    }
}
