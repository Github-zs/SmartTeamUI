import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuBarComponent} from "../menu-bar/menu-bar.component";
import {MenuLeftComponent} from "../menu-left/menu-left.component";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MyeditorComponent} from "../../common/myeditor/myeditor.component";
import {CreateModalComponent} from "../../create-modal/create-modal.component";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AdminComponent,
    MenuBarComponent,
    MenuLeftComponent,
    CreateModalComponent,
    MyeditorComponent
  ],
  entryComponents: [
    CreateModalComponent
  ],
  exports: [
    AdminComponent
  ],
  providers:[HttpClient],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
