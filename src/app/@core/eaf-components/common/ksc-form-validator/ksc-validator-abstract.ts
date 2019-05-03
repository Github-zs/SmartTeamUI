/**
 * Created Date: Tuesday, December 12th 2017, 03:39:22 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { TranslateService } from '@ngx-translate/core';

export abstract class KSCValidatorAbstract {

    private _translate:TranslateService;

    public validate(args?) {}

    get translate(): TranslateService {
        return this._translate;
    }

    set translate(value: TranslateService) {
        this._translate = value;
    }
}
