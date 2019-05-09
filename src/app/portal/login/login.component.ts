import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserHttpService} from '../../common/service/user-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-login-component',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserHttpService,
    private route: Router,
  ) {

  }

  ngOnInit() {
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
      localStorage.setItem('token', data['token']);
      this.route.navigate(['/pages']);
    });
  }

}
