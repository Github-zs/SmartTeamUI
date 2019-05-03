/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Url } from '@platform/common/constants/url.constant';
import {Observable} from 'rxjs/Observable';
import {share} from 'rxjs/operators';

@Injectable()
export class ContentManagementHttpService {

    public translationObs: any = null;
    constructor(
        private http: HttpClient
    ) {}

    getLanguage(data): Observable<object> {
        if (this.translationObs) {
            return this.translationObs;
        } else {
            this.translationObs = this.http.post(Url.LANGUAGE, data).pipe(share());
            return this.translationObs;
        }
    }
}
