import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://github.com/Github-zs" target="_blank">翟硕</a></b> 2019
    </span>
    <div class="socials">
    </div>
  `,
})
export class FooterComponent {
}
