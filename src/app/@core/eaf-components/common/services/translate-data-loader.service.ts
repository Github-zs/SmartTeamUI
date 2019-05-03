/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Ng4LoadingSpinnerService } from '@platform/basic-components/ng4-loading-spinner/ng4LoadingSpinner.service';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { ContentManagementHttpService } from '@platform/eaf-components/common/services/http/content-management-http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class TranslateDataloader implements TranslateLoader {
    constructor(
        private http: HttpClient,
        private _spinnerService: Ng4LoadingSpinnerService,
        public cmsService: ContentManagementHttpService
    ) {}

    getTranslation(lang: string): Observable<any> {
        let language;
        if(lang == null || _.isEmpty(lang)){
            language = _.find(CommonConstant.DATAFABRIC_CONSTANTS.LANG, {name: 'EN'});
        }else{
            language = _.find(CommonConstant.DATAFABRIC_CONSTANTS.LANG, {name: lang.toUpperCase()});
        }
        const res = JSON.parse(localStorage.getItem('dataFabricTranslates'));
        if (res) {
            return Observable.of(res);
        } else {
            // make sure oauth token is saved to local storage
            if (localStorage.getItem('oauth-token')) {
                this._spinnerService.show();
                return Observable.combineLatest(this.cmsService.getLanguage({'languageTypeCode': language.value})).map((res: any) => {
                    const language = res[0];
                    setTimeout(() => {
                        this._spinnerService.hide();
                    });
                    localStorage.setItem('dataFabricTranslates', JSON.stringify((language['sectionIndexMap']['all'])));
                    return language['sectionIndexMap']['all'];
                })
            } else {
                return Observable.of(null);
            }
        }
    }


}
