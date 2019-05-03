/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import {HttpClient} from '@angular/common/http';
import { Url } from '@platform/common/constants/url.constant';
import { GroupHttpServiceInterface } from '@platform/eaf-components/common/services/http/group-http.service.interface';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupService implements GroupHttpServiceInterface{

    constructor(private http: HttpClient) {
    }

    public getAllGroups(includeInactive: string = '') {
        return this.http.get(Url.GROUPS + `?includeInactive=${includeInactive}`);
    }

    public getFullGroupById(id: any) {
        return this.http.get(Url.GROUPS + '/' + id)
    }

    public getAllRoles(includeInactive: string = '') {
        return this.http.get(Url.ROLES + `?includeInactive=${includeInactive}`);
    }

    public checkGroup(groupId: number): Observable<string> {
        return this.http.get<string>(Url.CHECK_GROUP + groupId, {responseType: 'text' as 'json'});
    }

    public persistFullGroup(group: any, groupId: number) {
        return this.http.post(Url.GROUPS + '/' + groupId, group);
    }

    public validateInactiveUserList(group: any): Observable<string> {
        return this.http.post<string>(Url.CHECK_GROUP_USER, group, {responseType: 'text' as 'json'});
    }
}

