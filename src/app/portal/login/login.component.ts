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


  credentials = {username: '', password: ''};

  constructor(
    private userService: UserHttpService,
    private route: Router,
  ) {

  }

  ngOnInit() {
  }

  login() {
    this.userService.authenticate(this.credentials, (data) => {
      this.route.navigateByUrl('pages');
    });
    return false;
  }

}
