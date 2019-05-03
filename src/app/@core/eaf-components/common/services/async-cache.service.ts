/**
 * Created Date: Saturday, July 8th 2018
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
import 'rxjs/add/operator/toPromise';

export abstract class AsyncCacheService {

    // a timer to send call to check the status of async cache.
    public checkerTimer: any;

    public dataMapping: Array<object>;

    protected constructor() {}

    /**
     * contruct origin data to mapping dictionary.
     */
    abstract _mappingListToDictionary (dataList: any, sortKey?: string);

    /**
     * get cached data by key.
     */
    abstract getDataByKey(key: string, sortKey?: string, includeInactive?: boolean): Promise<any[]>;

    /**
     * start checking the cache.
     */
    abstract startCheckerTimer();

    /**
     * stop checking the cache.
     */
    abstract stopCheckerTimer();

}
