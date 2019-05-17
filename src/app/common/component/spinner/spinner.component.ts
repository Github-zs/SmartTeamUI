import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  @Input()
  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
