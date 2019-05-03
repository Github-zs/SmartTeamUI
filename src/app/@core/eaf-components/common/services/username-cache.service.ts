/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserNameCacheService {

    public userMap: any = {};

    constructor(private userHttpService: UserHttpService) {
    }

    /**
     * exposed to public get full user name list
     */
    getFullNames(predict, indexKey: string = 'userId'): Observable<any> {
        return new Observable((observe) => {
            if (predict && predict.length) {
                this.userHttpService.getUserListBasicInfo({userIdList: predict}).subscribe((userList) => {
                    if (_.isArray(userList)) {
                        const that = this;
                        userList.forEach(function (user) {
                            that.userMap[user.userId] = user.lastName + ', ' + user.firstName;
                        })
                    }
                    observe.next(this.userMap);
                }, (err) => {
                    observe.next(this.userMap);
                })
            } else {
                observe.next(this.userMap);
            }
        })
    }

}
