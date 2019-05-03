/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { KSCAdvanceSearchFormConditionModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form-condition.model';
import { KSCAdvanceSearchFormItemModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form-item.model';
import { KSCAdvanceSearchFormModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form.model';
import * as _ from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UrlTree } from '@angular/router/src/url_tree';

/**
 * Service for search condition form, users are able to save
 */
@Injectable()
export class SearchFormHelperService {
    constructor(protected router: Router,
                protected routeInfo: ActivatedRoute,
                protected location: Location) {

    }

    /**
     * save search form to localStorage and generate parameter key
     * @param {KSCAdvanceSearchFormModel} searchForm
     * @param domain: current search domain
     */
    saveSearchForm(searchForm: KSCAdvanceSearchFormModel, domain: string) {
        const uuid = this.guid();
        searchForm.uuid = uuid;
        localStorage.setItem(domain, JSON.stringify(searchForm));
        // copy the query param object.
        const queryParams: Params = _.cloneDeep(this.routeInfo.snapshot.queryParams);
        // reset search-form param
        queryParams['search-form'] = uuid;

        // get current url path
        const urlTree: UrlTree = this.router.parseUrl(this.router.url);
        let urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');

        // generate new url
        let newUrl: string = '';
        const keyArr = Object.keys(queryParams);
        for (let i = 0; i < keyArr.length; i++) {
            newUrl = newUrl + keyArr[i] + '=' + queryParams[keyArr[i]] + '&';
        }
        newUrl = newUrl.substring(0, newUrl.length - 1);
        urlWithoutParams = urlWithoutParams + '?' + newUrl;
        this.location.go(urlWithoutParams);

    }

    /**
     * clear form from local
     * @param {string} domain
     */
    getSearchForm(domain: string): KSCAdvanceSearchFormModel {
        const searchFormObj = new KSCAdvanceSearchFormModel();
        if (localStorage.getItem(domain)) {
            const item = JSON.parse(localStorage.getItem(domain));
            const allConditions = item.conditions;
            if (allConditions) {
                for (let i = 0; i < allConditions.length; i++) {
                    const condition = new KSCAdvanceSearchFormConditionModel();
                    condition.id = allConditions[i].config.id;
                    condition.text = allConditions[i].config.text;
                    condition.searchKey = allConditions[i].config.searchKey;
                    condition.isFilter = allConditions[i].config.isFilter;
                    condition.options = allConditions[i].config.options;
                    condition.type = allConditions[i].config.type;
                    const item = new KSCAdvanceSearchFormItemModel(condition, allConditions[i].value);
                    searchFormObj.conditions[i] = item;
                }
            }

            searchFormObj.searchValue = item.searchValue;
            searchFormObj.uuid = item.uuid;
            searchFormObj.isInactive = item.isInactive;
            searchFormObj.isClickEvent = false;
            return searchFormObj;
        } else {
            // when searching conditions can not be found, return null and not not show searching results.
            return null;
        }

    }

    /**
     * clear form from local
     * @param {string} domain
     */
    clearSearchForm(domain: string) {
        localStorage.removeItem(domain);
    }

    /**
     * generate uuid
     * @returns {string}
     */
    guid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    /**
     * generate 4 digits random number.
     * @returns {string}
     */
    private s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
