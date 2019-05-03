/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Observable} from 'rxjs/Observable';

export interface GroupHttpServiceInterface {

    /**
     * get all group inactive/deactive group
     * @param {string} includeInactive
     */
    getAllGroups(includeInactive: string);

    /**
     * get full group information by group's Id
     * @param id
     */
    getFullGroupById(id: any);

    /**
     * get all roles inactive/deactive roles
     * @param {string} includeInactive
     */
    getAllRoles(includeInactive: string);

    /**
     * check group information with group id.
     * @param {number} groupId
     * @returns {Observable<string>}
     */
    checkGroup(groupId: number): Observable<string>;

    /**
     * persist group object to db.
     * @param group
     * @param {number} groupId
     */
    persistFullGroup(group: any, groupId: number);

    /**
     * validate inactive users.
     * @param group
     * @returns {Observable<string>}
     */
    validateInactiveUserList(group: any): Observable<string>;
}
