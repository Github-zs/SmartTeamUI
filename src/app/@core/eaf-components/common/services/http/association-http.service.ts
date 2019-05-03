/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import { HttpClient } from '@angular/common/http';
import { Url } from '@platform/common/constants/url.constant';
import { GenericEdgeSearchQueryModel } from '@platform/common/model/generic-edge-search-query.model';
import { SearchLegalEntityEdgeParamModel } from '@platform/eaf-components/common/model/legal-entity/search-legal-entity-edge-param.model';
import { SearchLegalEntityNodeParamModel } from '@platform/eaf-components/common/model/legal-entity/search-legal-entity-node-param.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssociationHttpService {

    constructor(private http: HttpClient) {
    }

    public removeTempEntityToPersonAssociation(npId = '', leId = '', workflowInstId = ''): Observable<object> {
        return this.http.get(Url.REMOVE_TEMP_ENTITY_TO_PERSON_ASSOCIATIONS + `?npId=${npId}&leId=${leId}&workflowInstId=${workflowInstId}`);
    }

    public searchEntityToPersonAssociation(record: SearchLegalEntityNodeParamModel): Observable<object> {
        return this.http.post(Url.SEARCH_ENTITY_TO_PERSON_ASSOCIATION, record);
    }

    public searchEntityToEntityAssociation(record: SearchLegalEntityEdgeParamModel): Observable<object> {
        return this.http.post(Url.SEARCH_ENTITY_TO_ENTITY_ASSOCIATION, record);
    }

    public getEntityToPersonAssociationByWorkflow(npId = '', leId = '', workflowInstId = ''): Observable<object> {
        return this.http.get(Url.GET_ENTITY_TO_PERSON_ASSOCIATION_BY_WORKFLOW + `?npId=${npId}&leId=${leId}&workflowInstId=${workflowInstId}`);
    }

    public searchGenericAssociation(record: GenericEdgeSearchQueryModel): Observable<any> {
        return this.http.post(Url.GENERIC_GET_BOTH_EDGES_URL, record);
    }
}

