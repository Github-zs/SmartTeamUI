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
    return this.http.get('userGetAll', {headers: this.headers});
  }

  selectByLoginName(loginName: string): Observable<any> {
    return this.http.get('userGetByLoginName',
      {params: {loginName: loginName}, headers: {authorization : 'Bearer ' + localStorage.getItem('token')}});
  }

  getUserById(userId): Observable<any> {
    return this.http.get('getUserById', {params: {userId: userId}, headers: this.headers});
  }

  getToken(username, password): Observable<any> {
    return this.http.get(`/auth/token?username=${username}&password=${password}`);
  }

  register(userModel): Observable<any> {
    return this.http.post('/user/register', userModel);
  }

  resetPassword(userModel): Observable<any> {
    return this.http.post('/user/resetPassword', userModel, {headers: this.headers});
  }

  checkOldPassword(oldPassword): Observable<any> {
    return this.http.get('/user/checkOldPassword', {params: {oldPassword: oldPassword}, headers: this.headers});
  }
}
