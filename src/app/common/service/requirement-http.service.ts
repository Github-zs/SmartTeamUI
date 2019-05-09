import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RequirementHttpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'}),
  };

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}
}
