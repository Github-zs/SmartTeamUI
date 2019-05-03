/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthGuard } from '@platform/eaf-components/common/guard/auth.guard';
import { GuardModule } from '@platform/eaf-components/common/guard/guard.module';
import { Oauth2TokenModel } from '@platform/eaf-components/common/guard/oauth2-token.model';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { GuardHandlerService } from '@platform/eaf-components/common/services/core/guard-handler.service';
import { StorageModelHelperInterface } from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { TranslateDataloader } from '@platform/eaf-components/common/services/translate-data-loader.service';


export function AuthGuardFactory(router: Router,
                                 httpClient: HttpClient,
                                 guardHandlerService: GuardHandlerService,
                                 translate: TranslateService,
                                 storageHelperService: StorageModelHelperInterface) {
    return new AuthGuard<UserModel, Oauth2TokenModel>(
        router,
        httpClient,
        guardHandlerService,
        translate,
        storageHelperService
    )
}

@NgModule({
    imports: [
        HttpClientModule,
        HttpModule,
        TranslateModule.forChild({loader: {provide: TranslateLoader, useClass: TranslateDataloader}}),
        GuardModule
    ],
    providers: []
})
export class EAFComponentsModule {
    static forRoot(GuardHandlerServiceImp, StorageModelHelperServiceImp, PermissionGuardServiceImp, BaseInterceptorImp): ModuleWithProviders {
        return {
            ngModule: EAFComponentsModule,
            providers: [
                GuardHandlerServiceImp,
                {
                    provide: 'AuthGuard',
                    useFactory: AuthGuardFactory,
                    deps: [Router, HttpClient, GuardHandlerService, TranslateService, StorageModelHelperServiceImp]
                }, {
                    provide: 'PermissionGuardService',
                    useClass: PermissionGuardServiceImp
                }, {
                    provide: LOCALE_ID, useValue: 'en-US'
                }, {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BaseInterceptorImp,
                    multi: true
                }
            ]
        }
    }
}
