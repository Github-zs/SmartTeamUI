/**
 * Created Date: Wednesday, October 29th 2017, 3:49:23 am
 * Author: KSC
 * This validator is used for common naming rules validation like format, characters, length.
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {FormControl} from '@angular/forms';

const USERNAME_REGEXP = /^[0-9a-zA-Z\u4e00-\u9fa5._@]{3,50}$/;

export function userNameValidator(username: FormControl): any {
    const value = (username.value || '') + '';
    const valid = USERNAME_REGEXP.test(value);
    const msg = ' Username is only allowed to input alphabet, number, \'_\', \'.\', and \'@\'. Username must be 3~50 characters.';
    return valid ? null : {username: {description: msg}};
}
