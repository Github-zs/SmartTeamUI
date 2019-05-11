import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DesignHttpService {

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<any> {
    return this.http.get('/design/getAll', {headers: this.headers});
  }

  insert(designModel): Observable<any> {
    return this.http.post('/design/add', designModel, {headers: this.headers});
  }

  getByAuthor(): Observable<any> {
    return this.http.get('/design/getByAuthor', {headers: this.headers});
  }

  delete(designId): Observable<any> {
    return this.http.delete('/design/delete', {params: {designId: designId}, headers: this.headers});
  }

  getById(designId): Observable<any> {
    return this.http.get('/design/getById', {params: {designId: designId}, headers: this.headers});
  }
}
