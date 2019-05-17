import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {NbSpinnerModule} from '@nebular/theme';
import {SpinnerComponent} from './spinner.component';

@NgModule({
    imports: [
      ThemeModule,
      NbSpinnerModule,
    ],
    declarations: [SpinnerComponent],
    exports: [
      SpinnerComponent,
    ],
  },
)
export class SpinnerModule {

}
