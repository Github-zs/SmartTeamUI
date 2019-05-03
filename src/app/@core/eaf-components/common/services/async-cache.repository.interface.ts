/**
 * Created Date: Saturday, July 8th 2018
 * Author: KSC
 * This interface is designed to manage their reference data or low frequency updated data through whole project.
 * User can maintain an key-value object and update them regularly from API calls.
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
export interface AsyncCacheRepositoryInterface {

    /**
     * set object map to cache.
     */
    setObject(obj: object);

    /**
     * get object from cache.
     */
    getObject(key: string);

    /**
     * clean and reset cache.
     */
    flushCache();

}
