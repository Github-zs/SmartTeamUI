import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class NoteHttpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'}),
  };

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<any> {
    return this.http.get('/note/selectAll');
  }
}
