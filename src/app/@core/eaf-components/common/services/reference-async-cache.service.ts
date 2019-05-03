/**
 * Created Date: Saturday, July 8th 2018
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { Url } from '@platform/common/constants/url.constant';
import { AsyncCacheMemRepository } from '@platform/eaf-components/common/services/async-cache-mem.repository';
import { AsyncCacheService } from '@platform/eaf-components/common/services/async-cache.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ReferenceAsyncCacheService extends AsyncCacheService {

    // cache for all reference value.
    private _all_categories: any = {};

    constructor(protected router: Router,
                protected http: HttpClient,
                @Inject('AsyncCacheMemRepository') protected cacheRepository: AsyncCacheMemRepository) {
        super();
    }
    /**
     * Used to get a list of reference data by multiple category keys
     *
     * @param categories
     * @return
     */
    public loadReferencesWithMultipleCategories(categories: string[]): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            // reference that already in cache.
            const tempExistingMap: { [category: string]: any } = {};
            // reference that need to be loaded from API
            let tempNotExistingMap: { [category: string]: any } = {};
            // the category types of all that not existing in the cache.
            const notExistingCats: string[] = [];
            // Need to get all categories.
            if (!categories || categories.length === 0) {
                this.getAllReferenceCategories().subscribe((res: any) => {
                    if (res && res.length > 0) {
                        tempNotExistingMap = this._mappingListToDictionary(res);
                        // merge new retrieved from references into cache
                        this.cacheRepository.setObject(tempNotExistingMap);
                        resolve(tempNotExistingMap);
                    }
                });

            } else {
                for (let i = 0; i < categories.length; i++) {
                    // check if existing in the cache.
                    const cat = this.cacheRepository.getObject(categories[i]);
                    if (cat && cat.length > 0 ) {
                        tempExistingMap[categories[i]] = cat;
                    } else {
                        notExistingCats.push(categories[i]);
                    }
                }
                if (notExistingCats.length > 0) {
                    this.getReferencesByMultipleCategories(notExistingCats).subscribe((res: any) => {
                        if (res && res.length > 0) {
                            tempNotExistingMap = this._mappingListToDictionary(res);
                            // merge new retrieved from references into cache
                            this.cacheRepository.setObject(tempNotExistingMap);
                        }
                        if (tempExistingMap && Object.keys(tempExistingMap).length > 0) {
                            _.assign(tempExistingMap, tempNotExistingMap);
                            resolve(tempExistingMap);
                        } else {
                            resolve(tempNotExistingMap);
                        }
                    });
                } else {
                    resolve(tempExistingMap);
                }
            }
        })
    }


    /**
     * get category by category key
     *
     * @param {string} category
     * @param {string} sortKey
     * @param {boolean} includeInactive
     * @returns {Promise<any[]>}
     */
    public getDataByKey(category: string, sortKey?: string, includeInactive?: boolean): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            if (includeInactive) {
                // if includeInactive is true and this is for reference tree, we may not need to save is to cacheRepository and get current data each time.
                this.getAllDataByCategoryKey(category, includeInactive).subscribe((res) => {
                    resolve(res);
                }, (err) => {
                    resolve([]);
                });
            } else {
                let tempArr: any[] = [];
                if (category) {
                    // get from cache.
                    tempArr = this.cacheRepository.getObject(category);
                } else {
                    resolve([]);
                }
                // if cache contains dist results.
                if (tempArr && tempArr.length > 0) {
                    resolve(tempArr);
                } else {
                    // if target not in the cache get from api
                    this.getAllDataByCategoryKey(category, includeInactive).subscribe((res) => {
                        if (res && res.length > 0) {
                            const tempNotExistingMap = this._mappingListToDictionary(res, sortKey);
                            // merge new retrieved from references into cache
                            this.cacheRepository.setObject(tempNotExistingMap);
                            tempArr = tempNotExistingMap[category];
                        }
                        resolve(tempArr);
                    }, (err) => {
                        resolve([]);
                    });
                }
            }

        });
    }
    /**
     * Mapping raw reference list data to dictionary
     *
     * @param refList
     * @param sort key
     * @returns reference data dictionary { [category: string]: any }
     */
     _mappingListToDictionary(
        refList: any, sortKey?: string
    ): { [category: string]: any } {
        // default sort by text.
        let sortBy = 'text';
        const reducedRefMap = _.reduce(
            refList,
            (result, value: any, key) => {
                // Remapping backend object to select2 element object
                value.text = value.displayKey;
                (result[value.category] || (result[value.category] = [])).push(
                    value
                );
                return result;
            },
            {}
        );

        if (sortKey) {
            sortBy = sortKey
        }
        // Sort reference data by text value
        return _.mapValues(reducedRefMap, (item: any[]) => {
            return _.orderBy(item, sortBy, 'asc');
        });
    }


    public loadUrlCategoriesConfig(): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            if (this.dataMapping) {
                resolve(_.cloneDeep(this.dataMapping));

            } else {
                this.http
                    .get('assets/url-categories-mapping.config.json')
                    .subscribe((res: any) => {
                        this.dataMapping = res;
                        resolve(_.cloneDeep(this.dataMapping));
                    })
            }
        })
    }

    /**
     * This method is used to get a list of categories.
     * 		include category model and a list of ReferenceCategoryAdditionalAttributes
     */
    public getAllReferenceCategories(): Observable<object> {
        return this.http.get('/categories');
    }

    private getAllReferenceData(): Observable<object> {
        return this.http.get('/categories/data');
    }

    /**
     * Used to get a list of reference data by multiple category keys
     *
     * @param categories
     */
    private getReferencesByMultipleCategories(categories: string[]): Observable<any> {
        return this.http.post(Url.MUL_REFERENCE_DATA, categories);
    }

    /**
     * check if reference table had been updated.
     * @returns {Observable<any>}
     */
    private getMaxIdForRefresh(): Observable<any> {
        return this.http.get('/categories/refresh', {responseType: 'text' as 'json'});
    }


    /**
     * start checking the reference every 30s.
     */
    startCheckerTimer() {
        this.checkerTimer = window.setInterval(() => {
            if (this.router.url.indexOf('/portal/') !== 0) {
                this.getMaxIdForRefresh().toPromise().then(res => {
                    if (res) {
                        const currentRefExtId = localStorage.getItem('currentRefExtId');
                        if (!currentRefExtId) {
                            localStorage.setItem('currentRefExtId', res.toString());
                        } else {
                            if (currentRefExtId !== res.toString()) {
                                this.cacheRepository.flushCache();
                                localStorage.setItem('currentRefExtId', res.toString());
                            }
                        }
                    }
                });
            }
        }, CommonConstant.REFERENCE_REFRESH_TIME);
    }


    /**
     * start checking the reference every 30s.
     */
    stopCheckerTimer() {
        window.clearInterval(this.checkerTimer);
    }


    /**
     * Flush all data and index
     *
     * @memberof ReferenceAsyncCacheService
     */
    setAllCategories(categories: any) {
        this._all_categories = categories;
    }
    /**
     * Flush all data and index
     *
     * @memberof ReferenceAsyncCacheService
     */
    getAllCategories() {
        return this._all_categories;
    }

    /**
     * Used to get a list of reference data by the category key
     * @param categoryKey
     */
    public getAllDataByCategoryKey(categoryKey: string, includeInactive): Observable<any> {
        let isActive: boolean = true;
        if (!includeInactive) {
            isActive = false;
        }
        return this.http.get(`/categories/${categoryKey}/data?includeInactive=${isActive}`);
    }

    /**
     * Init method to init reference data
     *
     * @param existingData
     */
    init() {
        this.cacheRepository.flushCache();
    }

}
