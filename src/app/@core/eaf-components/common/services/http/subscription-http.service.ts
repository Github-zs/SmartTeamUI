/**
 * Created Date: Monday, December 18th 2017, 6:50:36 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubscriptionHttpService {
    constructor(private http: HttpClient) {}

    deleteUserSettingQuery(settingId: string): Observable<object> {
        return this.http.delete(`/subscriptions/${settingId}`);
    }

    getSubscriptionById(settingId: number): Observable<object> {
        return this.http.get(`/subscriptions?subscribedObjectId=${settingId}`);
    }

    persistSubscription(subscribedObjectId: number, param: any = {}): Observable<object> {
        if (!subscribedObjectId) {
            subscribedObjectId = -1;
        }
        return this.http.post(`/subscriptions/${subscribedObjectId}`, param);
    }
}
