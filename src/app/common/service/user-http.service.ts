import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserHttpService {

  authenticated = false;

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
    return this.http.get('getUserById', {params: {userId: userId}});
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
    } : {});

    this.http.get('/user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  getToken(username, password): Observable<any> {
    return this.http.get(`/auth/token?username=${username}&password=${password}`);
  }
}
