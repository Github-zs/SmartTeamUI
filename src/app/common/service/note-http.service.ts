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
    return this.http.get('/note/selectAll');
  }

  insert(noteModel): Observable<any> {
    return this.http.post('/note/add', noteModel, {headers: this.headers});
  }
}
