/**
 * Created Date: Wednesday, October 25th 2017, 3:49:23 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { AbstractControl } from '@angular/forms';

export const passwordMatcherValidator = (control: AbstractControl): {[key: string]: any} => {
  const password = control.get('password').value, rpassword = control.get('rpassword').value;
  if (!password || !rpassword) {
    return null;
  }
  if (password !== rpassword) {
    control.markAsTouched();
    return {
      noMatch: true
    };
  }
  return null;
}
