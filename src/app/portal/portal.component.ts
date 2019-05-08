import {Component} from '@angular/core';

@Component({
  selector: 'ngx-portal-management',
  template: `
    <nb-layout>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class PortalComponent {

}
