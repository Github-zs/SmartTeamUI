import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserHttpService} from '../../common/service/user-http.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RegisterComponent} from '../register/register.component';
import {HttpErrorResponse} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-login-component',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;

  public bsRef: BsModalRef;


  public nbToastrConfig = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    status: NbToastStatus.DANGER,
    duration: 3000,
  };

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserHttpService,
    private route: Router,
    private bsService: BsModalService,
    private nbToastrService: NbToastrService,
  ) {

  }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: [
        '',
        [Validators.required],
      ],
      password: [
        '',
        [Validators.required],
      ],
    });
  }

  back() {
    history.back();
  }

  login() {
    const userInfo = this.userForm.value;
    this.userService.getToken(userInfo.username, userInfo.password).subscribe( data => {
      // localStorage.setItem('token', data['token']);
      this.setToken(data['token']).then( (next) => {
        this.userService.selectByLoginName(userInfo.username).subscribe( res => {
          localStorage.setItem('username', res['userName']);
          this.route.navigate(['/pages/dashboard-management/dashboard-page']);
        });
      });
    }, (error: HttpErrorResponse) => {

      this.errorToast('用户名或密码错误！');
      this.userForm.controls['username'].setValue('') ;
      this.userForm.controls['password'].setValue('') ;

    });
  }

  setToken(token): Promise<any> {
    return new Promise( resolve => {
      localStorage.setItem('token', token);
      resolve('success');
    });
  }

  register() {
    this.bsRef = this.bsService.show(RegisterComponent, this.config);
  }

  errorToast(message) {
    this.nbToastrService.show(
      message,
      `error`,
      this.nbToastrConfig);
  }

}
