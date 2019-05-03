/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { UserSettingType } from '@platform/common/constants/user-setting-type.enum';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { Observable } from 'rxjs/Observable';

export interface UserHttpServiceInterface {

    /**
     * Get password stratege
     *
     * @returns
     * @memberof UserServices
     */
    getPasswordStrategy();

    /**
     * get user status by user name
     *
     * @param {any} userName
     * @returns
     * @memberof UserServices
     */
    getUserStatus(userName): Observable<UserModel>;

    /**
     * check user status by user name
     *
     * @param {string} userName
     * @returns
     * @memberof UserServices
     */
    checkUserStatus(userName): Observable<UserModel>;

    /**
     * answerchallenge question by user name
     *
     * @param {any} userName
     * @returns
     * @memberof UserServices
     */
    answerChallengeQuestion(userModel: UserModel): Observable<boolean>;

    /**
     * reset password
     *
     * @param {UserModel} userModel
     * @returns {Observable<UserModel>}
     * @memberof UserServices
     */
    resetUserPassword(userModel: UserModel): Observable<UserModel>;

    /**
     * reset question
     *
     * @param {UserModel} userModel
     * @returns {Observable<UserModel>}
     * @memberof UserServices
     */
    resetChallengeQuestion(userModel: UserModel): Observable<UserModel>;

    /**
     * user register
     * */
    userRegister(userModel: UserModel): Observable<UserModel>;

    /**
     * Get Current User Info
     * @url /userAccess/getFullUserByUserName
     * @type POST
     * @author achen
     *
     */
    getFullUserByUserName(username: string): Observable<string>;

    /**
     * To retrieve a list of roles, if query parameter strIncludeInactive is
     * true, return all active roles and inactive roles, if query parameter
     * strIncludeInactive is false, only return active roles.
     * @param param,
     *            default false
     */
    getAllRoles(param ?): Observable<any>;

    /**
     * To retrieve a hydrated group object with users, groups and permissions
     * assigned(only Ids) on it, as well as a main transaction id which will
     * have to be passed back when an update/persist action is taken for
     * currency check.
     * @param roleId
     *            - the primary key of a role
     */
    getFullRoleByRoleId(id): Observable<any>;

    /**
     * To retrieve a list of permissions, if query parameter strIncludeInactive is true,
     * return all active permissions and inactive permissions,
     * if query parameter strIncludeInactive is false, only return active permissions
     * @param strIncludeInactive,  default false
     */
    getAllPermissions(): Observable<any>;

    /**
     * To persist a hydrated role. If an object doesn't exist, it will be
     * created. If it has no change, it won't be updated. Otherwise it is being
     * updated. This works for both main object and sub objects. The sub objects
     * belong to the inputed role which are not passed in but existing
     * physically in database will be deactivated.
     * @param record
     */
    persistFullRole(pdata, id): Observable<any>;

    /**
     * To retrieve a list of user objects(only have Ids) within the given group.
     *
     * @param groupId - the primary key of a group
     * @return  A list of user objects(only have Ids)
     * @throws DataFabricBusinessException
     * @author Simon
     */
    getUsersByGroupId(param);

    /**
     * get all groups
     *
     */
    getAllGroups(param ?): Observable<any>;

    /**
     * Get all user settings by user id and type
     * @param userId
     * @param typeCode
     * @param param
     */
    getUserSettingByUserIdAndType(userId: string,
                                  typeCode: UserSettingType,
                                  param: string): Observable<object>;

    /**
     * persist user setting
     */
    persistUserSetting(id: number, params: any): Observable<object>;

    /**
     * check user setting name whether exist
     *
     * @param userId
     * @param userSettingModel
     */
    checkUserSettingExistance(userSettingModel: any);

    /**
     * Get all historical transactions by user Id
     *
     * @param userId
     */
    getAllHistoricalTransactions(userId): Observable<object>;

    /**
     * To retrieve a historical mirror of a hydrated user closest a specific time point.
     * It is with all sub objects as well as a main transaction id which is presenting a version of the returned user will be passed back.
     *
     * @param param
     */
    getFullUserByDate(param: any): Observable<object>;

    /**
     * Get user info by id
     *
     * @param {string} userId
     * @returns
     * @memberof UserHttpService
     */
    getUserByUserId(userId: string): Observable<any>;

    /**
     * get userSetting by id
     *
     * @param userSettingId
     */
    getUserSettingById(userSettingId: number): Observable<object>;

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
    getFullUserByUserId(userId: string): Observable<any>;

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
    searchUserManagementWithPagination(param: any);

    /**
     * get user's pass word expiration date
     * @param {string} username
     */
    getPasswordExpiredDate(username: string);

    /**
     * Get all system user role list by given object id
     *
     * @param {string} objectId
     * @returns {Observable<Object>}
     */
    getSystemUserRoleXrefListByObjectId(objectId: string);

    /**
     * To retrieve user list by user id list. The returned object only contains
     * basec information including id, username, isActive, firstName and LastName.
     * This API is only for UI used purpose.
     *
     * @param pdata
     * @return
     * @throws DataFabricBusinessException
     */
    getUserListBasicInfo(pdata: any);
}
