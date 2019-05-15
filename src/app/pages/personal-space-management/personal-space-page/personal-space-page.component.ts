import { Component, OnInit } from '@angular/core';
import {NoteHttpService} from '../../../common/service/note-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-personal-space-page',
  templateUrl: './personal-space-page.component.html',
  styleUrls: ['./personal-space-page.component.scss'],
})
export class PersonalSpacePageComponent implements OnInit {

  private noteList: Array<any>;
  constructor(
    private service: NoteHttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getByAuthor().subscribe( data => {
        this.noteList = data;
    });
  }

  add() {
    this.router.navigate(['/pages/personal-space-management/add-note-page']);
  }

  deleteNote(noteId) {
    this.service.delete(noteId).subscribe( data => {
      location.reload();
    });
  }

}
