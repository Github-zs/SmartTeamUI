import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RequirementHttpService {

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<any> {
    return this.http.get('/requirement/getAll', {headers: this.headers});
  }

  insert(requirementModel) {
    return this.http.post('/requirement/add', requirementModel, {headers: this.headers});
  }

  getByAuthor(): Observable<any> {
    return this.http.get('/requirement/getByAuthor', {headers: this.headers});
  }

  delete(requirementId): Observable<any> {
    return this.http.delete('/requirement/delete', {params: {requirementId: requirementId}, headers: this.headers});
  }
}
