/**
 * Created Date: Wednesday, December 6th 2017, 12:57:46 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ng4LoadingSpinnerService } from '@platform/basic-components/ng4-loading-spinner/ng4LoadingSpinner.service';
import { Url } from '@platform/common/constants/url.constant';
import { GuardHandlerService } from '@platform/eaf-components/common/services/core/guard-handler.service';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    constructor(
        protected location: Location,
        protected router: Router,
        protected routeInfo: ActivatedRoute,
        protected spinnerService: Ng4LoadingSpinnerService,
        protected _exceptionHandlerService: GuardHandlerService,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        protected storageHelperService: StorageModelHelperInterface
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let skip: boolean = false;
        Url.NO_TOKEN.forEach(url => (skip = req.url.startsWith(url) || skip));
        if (!skip) {
            // if no token, redirect to login page
            if (!this.storageHelperService.getItem('oauth-token')) {
            } else {
                // append token to request
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.storageHelperService.getItem('oauth-token')}`
                    }
                });
            }
        }
        // show loading spinner
        return next.handle(req).do(
            (event: HttpEvent<any>) => {
                return event;
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    // const loc = this.location.path(true);
                    this._exceptionHandlerService.collectFailedRequest(req);
                    // Clean up token cache since the token was invalid or permission denial
                    // here, can't clear all localStorage, because the dashboard widget information store in localStorage
                    // this.storageHelperService.clear();
                    this.storageHelperService.removeItem('oauth-token');
                    this.storageHelperService.removeItem('user');
                }
                // when error, hide spinner
                this.spinnerService.hide();
            }
        );
    }
}
