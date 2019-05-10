import { Component, OnInit } from '@angular/core';
import {NewsService} from '../services/news.service';
import {ShareHttpService} from '../../../common/service/share-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-technology-share-page',
  templateUrl: './technology-share-page.component.html',
  styleUrls: ['./technology-share-page.component.scss'],
})
export class TechnologySharePageComponent implements OnInit {

  private shareList: Array<any>;

  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  constructor(
    private newsService: NewsService,
    private shareService: ShareHttpService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.shareService.getAll().subscribe( data => {
      this.shareList = data;
    });
  }

  add() {
    this.router.navigate(['/pages/technology-share-management/add-share-page']);
  }

  loadNext(cardData) {
    if (cardData.loading) { return; }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService.load(cardData.pageToLoadNext, this.pageSize)
      .subscribe(nextNews => {
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }

}
