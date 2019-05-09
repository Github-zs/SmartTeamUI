import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-add-note-page',
  templateUrl: './add-note-page.component.html',
  styleUrls: ['./add-note-page.component.scss'],
})
export class AddNotePageComponent implements OnInit {

  private description: string;

  private noteForm: FormGroup;

  public editConfig: any = {
    language: 'zh-cn',
  };
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
   this.noteForm = this.fb.group({
     title: [
       '',
       [Validators.required],
     ],
   });
  }

  cancel() {
    history.back();
  }

  save() {

  }

  change(event) {
    this.description = event.editor._.data;
  }
}
