/**
 * Created Date: Thursday, October 26th 2017, 2:38:20 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthReceiptBaseModel } from '@platform/eaf-components/common/guard/auth-receipt-base.model';
import { IGuardHandlerService } from '@platform/eaf-components/common/guard/guard-handler-service.interface';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';

const LOGIN_URL = '/portal/login';

@Injectable()
export class GuardHandlerService implements IGuardHandlerService<AuthReceiptBaseModel> {

    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(
        public router: Router,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        protected storageHelperService: StorageModelHelperInterface) {
    }

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }

    /**
     * Force redirect to login page for authorization
     */
    public forceRedirectToLogin(returnUrl?: string) {
        this.storageHelperService.removeItem('user');
        this.storageHelperService.removeItem('oauth-token');
        if (returnUrl) {
            // keep the attempted URL for redirecting
            this.router.navigate([LOGIN_URL], {queryParams: {'target': returnUrl}})
        } else {
            // keep the attempted URL for redirecting
            this.router.navigate([LOGIN_URL]);
        }
    }

    /**
     * Perform login action with pass in user information
     * @param user
     */
    loginUrl(user: AuthReceiptBaseModel): string {
        return `/oauth/token?client_id=hub_next_user&grant_type=password&username=${user.username}&password=${encodeURIComponent(user.password)}&scope=trust`;
    }

    receiptInformationUrl(username: string): string {
        return  '/users/name/' + username;
    }
}
