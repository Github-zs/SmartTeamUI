/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthReceiptBaseModel } from '@platform/eaf-components/common/guard/auth-receipt-base.model';
import { AuthTokenBaseModel } from '@platform/eaf-components/common/guard/auth-token-base.model';
import { IGuardHandlerService } from '@platform/eaf-components/common/guard/guard-handler-service.interface';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthGuard<R extends AuthReceiptBaseModel,
    T extends AuthTokenBaseModel> implements CanActivate {
    private _fullUser: R;

    constructor(private router: Router,
                private httpClient: HttpClient,
                private guardHandlerService: IGuardHandlerService<R>,
                private translate: TranslateService,
                @Inject(STORAGE_MODEL_HELPER_TOKEN)
                private storageHelperService: StorageModelHelperInterface) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storageHelperService.getItem('oauth-token')) {
            return true;
        }
        this.guardHandlerService.forceRedirectToLogin(state.url);
        return false;
    }

    login(user: R): Observable<any> {
        return this.httpClient.post(this.guardHandlerService.loginUrl(user), user);
    }

    getUser(username: string): Observable<any> {
        return this.httpClient.get<any>(
            this.guardHandlerService.receiptInformationUrl(username)
        ).do(res => {
            this._fullUser = res;
            this.storageHelperService.setItem('user', this._fullUser);
        });
    }

    getCurrentUser(): R {
        if (!_.isEmpty(this.storageHelperService.getItem('user'))) {
            const fullUser: R = _.cloneDeep(
                this.storageHelperService.getItem('user')
            );
            fullUser['userFullName'] = fullUser['lastName'] + ', ' + fullUser['firstName'];
            return fullUser;
        } else {
            console.log('getCurrentUser: redirect to login.');
            let redirectPath = location.pathname;
            if (location.search) {
                redirectPath = location.pathname + location.search;
            }
            this.guardHandlerService.forceRedirectToLogin(redirectPath);
        }
    }

    private handleError(error: any): Promise<any> {
        console.error(this.translate.instant('AN_ERROR_OCCURRED'), error);
        return Promise.reject(error.message || error);
    }

    public token(): T {
        const tokenJsonStr: string = this.storageHelperService.getItem('oauth-token');
        if (_.isEmpty(tokenJsonStr)) {
            return null;
        }
        return JSON.parse(tokenJsonStr);
    }
}
