import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TaskHttpService {

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  insert(taskManagementModel): Observable<any> {
    return this.http.post('/addTask', taskManagementModel, {headers: this.headers});
  }

  updateTaskExt(taskGroupExtModel): Observable<any> {
    return this.http.post('/updateTaskExt', taskGroupExtModel, {headers: this.headers});
  }

  selectAllTaskUrl(): Observable<any> {
    return this.http.get('/selectAllTaskUrl', {headers: this.headers});
  }

  selectTaskById(taskId): Observable<any> {
    return this.http.get('/selectTaskById', {params: {taskId: taskId}, headers: this.headers});
  }

}
