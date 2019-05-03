import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserHttpService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllUser(): Observable<any> {
    return this.http.get('userGetAll');
  }

  selectByLoginName(loginName: string): Observable<any> {
    return this.http.get('userGetByLoginName?loginName=' + loginName);
  }
}
