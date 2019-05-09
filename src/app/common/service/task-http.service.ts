import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TaskHttpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'}),
  };

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  insert(taskManagementModel): Observable<any> {
    return this.http.post('/addTask', taskManagementModel, this.httpOptions);
  }

  updateTaskExt(taskGroupExtModel): Observable<any> {
    return this.http.post('/updateTaskExt', taskGroupExtModel, this.httpOptions);
  }

  selectAllTaskUrl(): Observable<any> {
    return this.http.get('/selectAllTaskUrl', {headers: this.headers});
  }

  selectTaskById(taskId): Observable<any> {
    return this.http.get('/selectTaskById', {params: {taskId: taskId}});
  }

}
