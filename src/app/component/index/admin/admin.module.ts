import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuBarComponent} from "../menu-bar/menu-bar.component";
import {MenuLeftComponent} from "../menu-left/menu-left.component";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {CreateModalComponent} from "../../create-modal/create-modal.component";
import {HttpClient} from "@angular/common/http";
import {MyeditorModule} from "../../common/myeditor/myeditor.module";

@NgModule({
  declarations: [
    AdminComponent,
    MenuBarComponent,
    MenuLeftComponent,
    CreateModalComponent
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
    AdminRoutingModule,
    MyeditorModule
  ]
})
export class AdminModule { }
