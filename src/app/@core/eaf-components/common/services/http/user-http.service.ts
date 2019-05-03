/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '@platform/common/constants/url.constant';
import { UserSettingType } from '@platform/common/constants/user-setting-type.enum';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { UserHttpServiceInterface } from '@platform/eaf-components/common/services/http/user-http.service.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserHttpService implements UserHttpServiceInterface{
    constructor(
        private http: HttpClient
    ) {}

    /**
     * Get password stratege
     *
     * @returns
     * @memberof UserServices
     */
    getPasswordStrategy() {
        return this.http.get(Url.PWD_STRATEGY);
    }

    /**
     * get user status by user name
     *
     * @param {any} userName
     * @returns
     * @memberof UserServices
     */
    getUserStatus(userName): Observable<UserModel> {
        return this.http.post<UserModel>(Url.USER_STATUS, {
            username: userName
        });
    }

    /**
     * check user status by user name
     *
     * @param {string} userName
     * @returns
     * @memberof UserServices
     */
    checkUserStatus(userName): Observable<UserModel> {
        return this.http.get<UserModel>(Url.USER_STATUS + "/" + userName);
    }

    /**
     * answerchallenge question by user name
     *
     * @param {any} userName
     * @returns
     * @memberof UserServices
     */
    answerChallengeQuestion(userModel: UserModel): Observable<boolean> {
        return this.http.post<boolean>(Url.USER_ANSWER, userModel);
    }

    /**
     * reset password
     *
     * @param {UserModel} userModel
     * @returns {Observable<UserModel>}
     * @memberof UserServices
     */
    resetUserPassword(userModel: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(Url.USER_RESET_PASSWORD, userModel);
    }

    /**
     * reset question
     *
     * @param {UserModel} userModel
     * @returns {Observable<UserModel>}
     * @memberof UserServices
     */
    resetChallengeQuestion(userModel: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(Url.USER_RESET_SECURITY_QUESTION,userModel);
    }

    /**
     * user register
     * */
    userRegister(userModel: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(Url.USER_REGISTER, userModel);
    }

    /**
     * Get Current User Info
     * @url /userAccess/getFullUserByUserName
     * @type POST
     * @author achen
     *
     */
    getFullUserByUserName(username: string): Observable<string> {
        return this.http.get<string>('/users/name/' + username);
    }

    /**
     * To retrieve a list of roles, if query parameter strIncludeInactive is
     * true, return all active roles and inactive roles, if query parameter
     * strIncludeInactive is false, only return active roles.
     * @param param,
     *            default false
     */
    getAllRoles(param?): Observable<any> {
        if (!param) {
            param = '';
        }
        return this.http.get(`${Url.ROLES}${param}`);
    }

    /**
     * To retrieve a hydrated group object with users, groups and permissions
     * assigned(only Ids) on it, as well as a main transaction id which will
     * have to be passed back when an update/persist action is taken for
     * currency check.
     * @param roleId
     *            - the primary key of a role
     */
    getFullRoleByRoleId(id): Observable<any> {
        if (!id) {
            id = '';
            return null;
        }
        // return this.http.get('/roles/' + id).map(res => res.json());
        return this.http.get('/roles/' + id);
    }

    /**
     * To retrieve a list of permissions, if query parameter strIncludeInactive is true,
     * return all active permissions and inactive permissions,
     * if query parameter strIncludeInactive is false, only return active permissions
     * @param strIncludeInactive,  default false
     */
    getAllPermissions(): Observable<any> {
        return this.http.get('/permissions');
    }

    /**
     * To persist a hydrated role. If an object doesn't exist, it will be
     * created. If it has no change, it won't be updated. Otherwise it is being
     * updated. This works for both main object and sub objects. The sub objects
     * belong to the inputed role which are not passed in but existing
     * physically in database will be deactivated.
     * @param record
     */
    persistFullRole(pdata, id): Observable<any> {
        if (!pdata) {
            pdata = {};
        }
        if (!id) {
            id = -1;
        }
        return this.http.post('/roles/' + id, pdata);
    }

    /**
     * To retrieve a list of user objects(only have Ids) within the given group.
     *
     * @param groupId - the primary key of a group
     * @return  A list of user objects(only have Ids)
     * @throws DataFabricBusinessException
     * @author Simon
     */
    getUsersByGroupId(param) {
        if (!param) {
            param = '';
        }
        return this.http.get<object>('/users/group/' + param);
    }

    /**
     * get all groups
     *
     */
    getAllGroups(param?): Observable<any> {
        if (!param) {
            param = '';
        }
        return this.http.get(`${Url.GROUPS}${param}`);
    }

    /**
     * Get all user settings by user id and type
     * @param userId
     * @param typeCode
     * @param param
     * @returns {*}
     */
    getUserSettingByUserIdAndType(
        userId: string,
        typeCode: UserSettingType,
        param: string
    ): Observable<object> {
        return this.http.get<object>(
            `/user-setting/${userId}/type/${typeCode}${param}`
        );
    }

    /**
     * persist user setting
     */
    persistUserSetting(id: number, params: any = {}): Observable<object> {
        if (!id) {
            id = -1;
        }
        return this.http.post<object>(`/user-setting/${id}`, params);
    }

    /**
     * check user setting name whether exist
     *
     * @param userId
     * @param userSettingName
     */
    checkUserSettingExistance(userSettingModel: any = {}) {
        return this.http.post('/user-setting/user-name', userSettingModel, {
            responseType: 'text' as 'json'
        })
    }

    /**
     * Get all historical transactions by user Id
     *
     * @param userId
     */
    getAllHistoricalTransactions(userId): Observable<object> {
        return this.http.get(`${Url.USERS}/${userId}/history`);
    }

    /**
     * To retrieve a historical mirror of a hydrated user closest a specific time point.
     * It is with all sub objects as well as a main transaction id which is presenting a version of the returned user will be passed back.
     *
     * @param param
     */
    getFullUserByDate(param = {}): Observable<object> {
        // Generate observable for subscribe
        const observable: Observable<any> = new Observable<any>((observable) => {
            this.http.get(`${Url.USERS}/${param['userId']}/pastVersions?date=${param['date']}`).subscribe(user => {
                if (user && !user['userDetailModel']) {
                    user['userDetailModel'] = {};
                }
                observable.next(user);
                return observable;
            })
        });
        return observable;
    }

    /**
     * Get user info by id
     *
     * @param {string} userId
     * @returns
     * @memberof UserHttpService
     */
    getUserByUserId(userId: string): Observable<any> {
        // Generate observable for subscribe
        const observable: Observable<any> = new Observable<any>((observable) => {
            this.http.get(`${Url.USERS}/${userId}`).subscribe(user => {
                if (user && !user['userDetailModel']) {
                    user['userDetailModel'] = {};
                }
                observable.next(user);
                return observable;
            })
        });
        return observable;
    }

    /**
     * get userSetting by id
     *
     * @param userSettingId
     */
    getUserSettingById(userSettingId: number): Observable<object> {
        return this.http.get(`/user-setting/${userSettingId}`);
    }

    /**
     * To retrieve a hydrated user object with groups and permissions
     * assigned(only Ids) on it, as well as a main transaction id which will
     * have to be passed back when an update/persist action is taken for
     * currency check.
     *
     * @param userId
     *            - the primary key of a user
     * @Author Simon
     */
    getFullUserByUserId(userId = ''): Observable<any> {
        // Generate observable for subscribe
        const observable: Observable<any> = new Observable<any>((observable) => {
            this.http.get(`${Url.USERS}/${userId}`).subscribe(user => {
                if (user && !user['userDetailModel']) {
                    user['userDetailModel'] = {};
                }
                observable.next(user);
                return observable;
            })
        });
        return observable;
    }

    /**
     * Providing natural person search feature with pagination information back
     * to client side. The hydrated natural person are returned. AWS search is
     * used to support this feature.
     *
     * @param param
     *            - All fields defined in SearchParametersModel passed in are
     *            mapping to deployed AWS search indexes, and are used in search
     *            criteria.
     * @Simon
     */
    searchUserManagementWithPagination(param = {}) {
        return this.http.put(Url.USER_SEARCH, param);
    }

    getPasswordExpiredDate(username: string) {
        return this.http.get<string>(Url.PASSWORD_EXPIRED_DATE + username, {responseType: 'text' as 'json'});
    }

    /**
     * Get all system user role list by given object id
     *
     * @param {string} objectId
     * @returns {Observable<Object>}
     */
    getSystemUserRoleXrefListByObjectId(objectId: string = '') {
        return this.http.get(`/user-role/objectId/${objectId}`);
    }

    /**
     * To retrieve user list by user id list. The returned object only contains
     * basec information including id, username, isActive, firstName and LastName.
     * This API is only for UI used purpose.
     *
     * @param pdata
     * @return
     * @throws DataFabricBusinessException
     */
    getUserListBasicInfo(pdata = {}) {
        return this.http.post('/users/basicInfo', pdata);
    }
}

