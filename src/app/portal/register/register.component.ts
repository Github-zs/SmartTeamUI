import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatcherValidator} from '../../@core/eaf-components/common/form-validation/password-matcher.validator';
import {UserHttpService} from '../../common/service/user-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-redister',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private userForm: FormGroup;

  private userModel: any;

  constructor(
    private bsRef: BsModalRef,
    private fb: FormBuilder,
    private service: UserHttpService,
    private router: Router,
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
    this.userModel = {
      userName: this.userForm.value.username,
      loginName: this.userForm.value.loginName,
      loginPassword: this.userForm.value.newPassword,
    };
    this.service.register(this.userModel).subscribe( data => {
      this.router.navigate(['/portal/login']);
    });
  }

}
