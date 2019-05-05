import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TaskHttpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'}),
  };


  constructor(
    private http: HttpClient,
  ) {}

  insert(taskManagementModel): Observable<any> {
    return this.http.post('/addTask', taskManagementModel, this.httpOptions);
  }

  updateTaskExt(taskGroupExtModel): Observable<any> {
    return this.http.post('/updateTaskExt', taskGroupExtModel, this.httpOptions);
  }

}
