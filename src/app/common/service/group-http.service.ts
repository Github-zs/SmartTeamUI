import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class GroupHttpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'}),
  };

  constructor(
    private http: HttpClient,
  ) {}

  selectAllGroup(): Observable<any> {
    return this.http.get('selectAllGroup');
  }
}
