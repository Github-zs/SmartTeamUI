/**
 * Created Date: Wednesday, December 6th 2017, 12:52:57 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { HttpRequest } from '@angular/common/http';
import { AuthReceiptBaseModel } from '@platform/eaf-components/common/guard/auth-receipt-base.model';

export interface IGuardHandlerService<R extends AuthReceiptBaseModel> {

    cachedRequests: Array<HttpRequest<any>>;

    collectFailedRequest(request): void;

    retryFailedRequests(): void;

    /**
     * Force redirect to login page for authorization
     */
    forceRedirectToLogin(returnUrl?: string);

    /**
     * Perform login action with pass in user information
     * @param user
     */
    loginUrl(user: R): string;

    /**
     * Perform http request to get receipt information based on current login
     * @param username
     */
    receiptInformationUrl(username: string): string;
}
