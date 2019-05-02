import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  cancel() {
    this.route.navigate(['/pages/dashboard-management/dashboard-page']);
  }
}
