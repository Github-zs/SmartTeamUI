import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteHttpService} from '../../../common/service/note-http.service';

@Component({
  selector: 'ngx-add-note-page',
  templateUrl: './add-note-page.component.html',
  styleUrls: ['./add-note-page.component.scss'],
})
export class AddNotePageComponent implements OnInit {

  private description: string;

  private noteForm: FormGroup;

  public noteModel: any;

  public editConfig: any = {
    language: 'zh-cn',
  };
  constructor(
    private fb: FormBuilder,
    private noteService: NoteHttpService,
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
    this.noteModel = {
      noteTitle: this.noteForm.value.title,
      noteContent: this.description,
    };

    this.noteService.insert(this.noteModel).subscribe( data => {

    });
  }

  change(event) {
    this.description = event.editor._.data;
  }
}
