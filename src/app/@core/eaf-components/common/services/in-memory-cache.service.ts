/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { CommonUtils } from '@platform/common/util/common-utils';
import * as _ from 'lodash';

@Injectable()
export class InMemoryCacheService<T> {
    private _data: T[] = [];

    private _indexKeys: string[] = [];

    // The map of inverted index dictionary for indexing the position of
    // user model in the real repository object with each different inverted index key
    private _invertedIndexs: {
        [invertedIndexName: string]: { [key: string]: number };
    } = {};

    constructor() {}

    /**
     * Flush all data and index
     *
     * @memberof InMemoryCacheService
     */
    public flush() {
        this._data = [];
        this._invertedIndexs = {};
    }

    public getAll() {
        return this._data;
    }

    /**
     * Build Inverted Indexs
     *
     * @private
     * @param {any[]} data
     * @param {string[]} indexKeys
     * @memberof InMemoryCacheService
     */
    public build(data: T[], indexKeys: string[]) {
        this._invertedIndexs = {};
        this._indexKeys = indexKeys;
        // Init inverted indexs
        this._indexKeys.forEach((key) => {
            this._invertedIndexs[key] = {};
        })

        this._data = [];
        _.forEach(data, (record: T) => {
            this._indexKeys.forEach((key) => {
                this._invertedIndexs[key][record[key]] = this._data.length;
            })
            this._data.push(record);
        });
    }

    /**
     * Get element by key and value combination or get all without any condition
     *
     * @param {string} [key]
     * @param {*} [value]
     * @returns {T|T[]}
     * @memberof InMemoryCacheService
     */
    public get(key?: string, value?: any): T|T[] {
        if (CommonUtils.isValueEmpty(key)) {
            return this._data;
        } else {
            return this._data[this._invertedIndexs[key][value]];
        }
    }

}
