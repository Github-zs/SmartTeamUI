/**
 * Created Date: Tuesday, December 26th 2017, 8:07:11 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import {Injectable} from '@angular/core';

@Injectable()
export class ShareObjectService {
    /**
     * Host shared obj for service
     *
     * @private
     * @memberof ShareObjectService
     */
    private _sharedObject: Map<string, any> = new Map<string, any>();

    constructor() {
    }

    private get sharedObject(): Map<string, any> {
        return this._sharedObject;
    }

    private set sharedObject(value: Map<string, any>) {
        this._sharedObject = value;
    }

    setSharedObject(key: string, object: any) {
        this.sharedObject.set(key, object);
    }

    getSharedObject(key: string): any {
        return this.sharedObject.get(key);
    }

    resetAll() {
        this.sharedObject.clear();
    }

    deleteByKey(key: string) {
        this.sharedObject.delete(key);
    }
}
