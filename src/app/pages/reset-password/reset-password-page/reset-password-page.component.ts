import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {

  public passwordForm: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
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
    });
  }

  save() {
    console.log(this.passwordForm.value);
  }

  cancel() {
    this.route.navigate(['/pages/dashboard-management/dashboard-page']);
  }
}
