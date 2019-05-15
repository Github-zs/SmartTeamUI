import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NoteHttpService} from '../../../common/service/note-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-note-detail-page',
  templateUrl: './note-detail-page.component.html',
  styleUrls: ['./note-detail-page.component.scss'],
})
export class NoteDetailPageComponent implements OnInit {

  private noteModel: any;

  private noteId: any;

  private noteContent: any;

  private noteForm: FormGroup;

  private editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private noteService: NoteHttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.noteId = this.activeRoute.snapshot.queryParams['noteId'];
    this.getNoteDetail(this.noteId);
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: [
        this.noteModel.noteTitle,
        [Validators.required],
      ],
    });
  }

  getNoteDetail(noteId) {
    this.noteService.getById(noteId).subscribe( data => {
      this.noteModel = data;
      this.initForm();
    });
  }

  cancel() {
    history.back();
  }


  change(event) {
    this.noteContent = event.editor._.data;
  }

  save() {
    const noteModel = {
      noteId: this.noteId,
      noteTitle: this.noteForm.value.title,
      noteContent: this.noteContent,
    };
    this.noteService.update(noteModel).subscribe( data => {
      this.router.navigate(['/pages/personal-space-management/personal-space-page']);
    });
  }
}
