import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class NoteHttpService {

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<any> {
    return this.http.get('/note/selectAll', {headers: this.headers});
  }

  insert(noteModel): Observable<any> {
    return this.http.post('/note/add', noteModel, {headers: this.headers});
  }

  getByAuthor(): Observable<any> {
    return this.http.get('/note/selectByAuthor', {headers: this.headers});
  }

  getById(noteId): Observable<any> {
    return this.http.get('/note/selectById', {params: {noteId: noteId}, headers: this.headers});
  }

  update(noteModel): Observable<any> {
    return this.http.post('/note/update', noteModel, {headers: this.headers});
  }

  delete(noteId): Observable<any> {
    return this.http.delete('/note/delete', {params: {noteId: noteId}, headers: this.headers});
  }
}
