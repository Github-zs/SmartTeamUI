/**
 * Created Date: Tuesday, October 31st 2017, 2:39:22 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { KSCBreadCrumbsModel } from '@platform/basic-components/ksc-bread-crumbs/ksc-bread-crumbs.model';

@Injectable()
export class BreadCrumbsBaseHelperService {
    private _routerMap: Map<string, KSCBreadCrumbsModel[]>;
    private _commonRouterMap: Map<string, any[]>;
    get routerMap(): Map<string, KSCBreadCrumbsModel[]> {
        return this._routerMap;
    }

    set routerMap(value: Map<string, KSCBreadCrumbsModel[]>) {
        this._routerMap = value;
    }

    get commonRouterMap(): Map<string, any[]> {
        return this._commonRouterMap;
    }

    set commonRouterMap(value: Map<string, any[]>) {
        this._commonRouterMap = value;
    }
}
