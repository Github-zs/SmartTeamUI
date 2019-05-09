import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatcherValidator} from '../../@core/eaf-components/common/form-validation/password-matcher.validator';

@Component({
  selector: 'ngx-redister',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private bsRef: BsModalRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: [
        '',
        [Validators.required],
      ],
      loginName: [
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

  close() {
    this.bsRef.hide();
  }

  save() {

  }

}
