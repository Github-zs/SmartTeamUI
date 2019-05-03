/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { StorageModelHelperInterface } from '@platform/eaf-components/common/services/storage-model-helper.interface';

@Injectable()
export class StorageModelHelperService implements StorageModelHelperInterface {

    // for platform the default storage strategy is localStorage.
    storageRef: Storage = localStorage;

    constructor() {
    }

    clear() {
        this.storageRef.clear();
    };

    getItem(key: string) {
        const data =  this.storageRef.getItem(key);
        return JSON.parse(data);
    };

    removeItem(key: string) {
        this.storageRef.removeItem(key);
    };

    /**
     * set item form storage of browser.
     *
     * @memberof StorageModelHelperInterface
     */
    setItem(key: string, data: any) {
        const dataStr = JSON.stringify(data);
        this.storageRef.setItem(key, dataStr);
    };

}
