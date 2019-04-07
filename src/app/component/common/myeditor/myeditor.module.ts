import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyeditorComponent } from "./myeditor.component";

@NgModule({
  declarations: [MyeditorComponent],
  exports: [MyeditorComponent],
  imports: [
    CommonModule
  ]
})
export class MyeditorModule { }
