import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import {
  passwordMatcherValidator,
} from '../../../@core/eaf-components/common/form-validation/password-matcher.validator';
import {UserHttpService} from '../../../common/service/user-http.service';

@Component({
  selector: 'ngx-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {

  public passwordForm: FormGroup;

  private userModel: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: UserHttpService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.fb.group({
      originalPassword: [
        '',
        [Validators.required],
      ],
      newPassword: [
        '',
        [Validators.required],
      ],
      confirmPassword: [
        '',
        [Validators.required],
      ],
    }, { validator: passwordMatcherValidator });
  }

  checkOldPassword() {
    this.service.selectByLoginName('test1').subscribe( data => {
    });
  }

  save() {
    this.userModel = {
      loginPassword: this.passwordForm.value.newPassword,
    };

    this.service.resetPassword(this.userModel).subscribe( data => {
      this.route.navigate(['/portal/login']);
    });
  }

  cancel() {
    this.route.navigate(['/pages/dashboard-management/dashboard-page']);
  }
}
