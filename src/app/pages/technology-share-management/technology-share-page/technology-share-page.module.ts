import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {TechnologySharePageRoutingModule} from './technology-share-page-routing.module';
import {TechnologySharePageComponent} from './technology-share-page.component';
import {NewsPostComponent} from './news-post/news-post.component';
import {NewsPostPlaceholderComponent} from './news-post-placeholder/news-post-placeholder.component';
import {NewsService} from '../services/news.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    TechnologySharePageRoutingModule,
  ],
  declarations: [
    TechnologySharePageComponent,
    NewsPostComponent,
    NewsPostPlaceholderComponent,
  ],
  providers: [NewsService],
})
export class TechnologySharePageModule {

}
