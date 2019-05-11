import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ShareHttpService {

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<any> {
    return this.http.get('/share/getAll', {headers: this.headers});
  }

  insert(shareModel): Observable<any> {
    return this.http.post('/share/add', shareModel, {headers: this.headers});
  }

  getByAuthor(): Observable<any> {
    return this.http.get('/share/getByAuthor', {headers: this.headers});
  }

  delete(shareId): Observable<any> {
    return this.http.delete('/share/delete', {params: {shareId: shareId}, headers: this.headers});
  }

  getById(shareId): Observable<any> {
    return this.http.get('/share/getById', {params: {shareId: shareId}, headers: this.headers});
  }
}
