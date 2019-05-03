/**
 * Created Date: Wednesday, December 27th 2017, 08:25:16 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Injectable} from '@angular/core';
import {FormControl, ValidatorFn} from '@angular/forms';

@Injectable()
export class KSCReactiveFormCommonValidator {
    constructor() {
    }

    // number input maxError
    static max(max: number, equals?: boolean): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } | null => {

            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }
            if (!val) {
                return null;
            }
            if (equals) {
                if (val <= max) {
                    return null;
                }
            } else {
                if (val < max) {
                    return null;
                }
            }
            return {'maxError': true};
        }
    }

    // number input minError
    static min(min: number, equals?: boolean): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } | null => {

            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }
            if (val == null) {
                return null;
            }
            if (equals) {
                if (val >= min) {
                    return null;
                }
            } else {
                if (val > min) {
                    return null;
                }
            }
            return {'minError': true};
        }
    }
}
