import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule} from "ngx-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AdminModule } from "./component/index/admin/admin.module";

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    AdminModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
