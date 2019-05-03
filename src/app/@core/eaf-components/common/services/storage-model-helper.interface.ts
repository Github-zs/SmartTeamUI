/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {InjectionToken} from '@angular/core';

export const STORAGE_MODEL_HELPER_TOKEN = new InjectionToken<StorageModelHelperInterface>('StorageModelHelperInterface.Impl');

export interface StorageModelHelperInterface {
    /**
     * the reference of localStorage/sessionStorage
     * @memberof StorageModelHelperInterface
     */
    storageRef: Storage

    /**
     * clear all items from storage of browser.
     *
     * @memberof StorageModelHelperInterface
     */
    clear(): void;

    /**
     * get item form storage of browser.
     *
     * @memberof StorageModelHelperInterface
     */
    getItem(key: string): any | null;

    /**
     * delete item form storage of browser.
     *
     * @memberof StorageModelHelperInterface
     */
    removeItem(key: string): void;

    /**
     * set item form storage of browser.
     *
     * @memberof StorageModelHelperInterface
     */
    setItem(key: string, data: any): void;

}
