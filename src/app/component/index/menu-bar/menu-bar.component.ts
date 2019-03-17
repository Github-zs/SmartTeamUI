import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {CreateModalComponent} from "../../create-modal/create-modal.component";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  private createModalComponentRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  createModal() {
    this.createModalComponentRef = this.modalService.show(CreateModalComponent);
  }

}
