/**
 * Created Date: Wednesday, October 25th 2017, 3:49:23 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { AbstractControl } from '@angular/forms';

export const passwordValidator = (control: AbstractControl): {[key: string]: string[]} => {
    let pwdRegexp: string[] = null;
    const password = control.value, results: string[] = [];
    if (password === null) {
        return null;
    }
    if (localStorage.getItem('pwdRegexp')) {
        if (pwdRegexp === null) {
            pwdRegexp = JSON.parse(localStorage.getItem('pwdRegexp'));
        }
    } else {
        // if local storage can not find password regexp, validate should failed.
        return {checkResults: results};
    }
    for (const key in pwdRegexp) {
        const regExp = new RegExp(key);
        if (!password.match(regExp)) {
            results.push(pwdRegexp[key]);
        }
    }
    return results.length > 0 ? {checkResults: results} : null;
}
