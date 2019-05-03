/**
 * Created Date: Saturday, July 8th 2018
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AsyncCacheRepositoryInterface } from '@platform/eaf-components/common/services/async-cache.repository.interface';
import * as _ from 'lodash';

@Injectable()
export class AsyncCacheMemRepository implements AsyncCacheRepositoryInterface {

    // Map that contains all the Cache categories.
    private _referenceCacheMap: { [category: string]: any } = {};

    /**
     * set category map to cache.
     */
    public setObject(categoryMap: object): void {
        _.assign(this.referenceCacheMap, categoryMap);
    }

    /**
     * get category from cache by category type key
     */
    public getObject(key: string): any[] {
        if (!_.isEmpty(this.referenceCacheMap)) {
            return this.referenceCacheMap[key] ? this.referenceCacheMap[key] : [];
        } else {
            return [];
        }
    }

    /**
     * clean and reset cache.
     */
    public flushCache() {
        this.referenceCacheMap = {};
    };


    private get referenceCacheMap(): { [p: string]: any } {
        return this._referenceCacheMap;
    }

    private set referenceCacheMap(value: { [p: string]: any }) {
        this._referenceCacheMap = value;
    }
}
