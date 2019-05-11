import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import {
  passwordMatcherValidator,
} from '../../../@core/eaf-components/common/form-validation/password-matcher.validator';
import {UserHttpService} from '../../../common/service/user-http.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {

  public passwordForm: FormGroup;

  private userModel: any;

  public nbToastrConfig = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    status: NbToastStatus.DANGER,
    duration: 3000,
  };

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: UserHttpService,
    private nbToastrService: NbToastrService,
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
    this.service.checkOldPassword(this.passwordForm.value.originalPassword).subscribe( data => {
      if (!data) {
        this.errorToast('旧密码输入错误，请重新输入');
      }
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

  errorToast(message) {
    this.nbToastrService.show(
      message,
      `error`,
      this.nbToastrConfig);
  }

}
