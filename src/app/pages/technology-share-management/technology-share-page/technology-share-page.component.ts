import { Component, OnInit } from '@angular/core';
import {NewsService} from '../services/news.service';

@Component({
  selector: 'ngx-technology-share-page',
  templateUrl: './technology-share-page.component.html',
  styleUrls: ['./technology-share-page.component.scss'],
})
export class TechnologySharePageComponent implements OnInit {

  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
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
