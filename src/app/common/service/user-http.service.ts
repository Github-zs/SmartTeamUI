import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserHttpService {

  headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem('token')});

  constructor(
    private http: HttpClient,
  ) {}

  getAllUser(): Observable<any> {
    return this.http.get('userGetAll');
  }

  selectByLoginName(loginName: string): Observable<any> {
    return this.http.get('userGetByLoginName?loginName=' + loginName);
  }

  getUserById(userId): Observable<any> {
    return this.http.get('getUserById', {params: {userId: userId}, headers: this.headers});
  }

  getToken(username, password): Observable<any> {
    return this.http.get(`/auth/token?username=${username}&password=${password}`);
  }
}
