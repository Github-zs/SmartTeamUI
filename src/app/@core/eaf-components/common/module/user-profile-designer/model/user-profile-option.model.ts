/**
 * Created Date: Tuesday, December 26th 2017, 12:23 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

export class UserProfileOption {

    private _historyProfile: boolean = false;
    private _isExternalUser: boolean = false;
    private _canEdit: boolean = false;
    private _canPersistUser: boolean = false;
    private _canViewHistory: boolean = false;
    private _canEditAndSaveProfile: boolean = false;
    private _canCheckHistory: boolean = false;
    private _canPersistUI: boolean = true;
    private _canResetPassword: boolean = true;

    public get historyProfile(): boolean  {
        return this._historyProfile;
    }

    public set historyProfile(value: boolean ) {
        this._historyProfile = value;
    }

    public get isExternalUser(): boolean  {
        return this._isExternalUser;
    }

    public set isExternalUser(value: boolean ) {
        this._isExternalUser = value;
    }

    public get canEdit(): boolean  {
        return this._canEdit;
    }

    public set canEdit(value: boolean ) {
        this._canEdit = value;
    }

    public get canPersistUser(): boolean  {
        return this._canPersistUser;
    }

    public set canPersistUser(value: boolean ) {
        this._canPersistUser = value;
    }

    public get canViewHistory(): boolean  {
        return this._canViewHistory;
    }

    public set canViewHistory(value: boolean ) {
        this._canViewHistory = value;
    }

    public get canEditAndSaveProfile(): boolean  {
        return this._canEditAndSaveProfile;
    }

    public set canEditAndSaveProfile(value: boolean ) {
        this._canEditAndSaveProfile = value;
    }

    public get canCheckHistory(): boolean  {
        return this._canCheckHistory;
    }

    public set canCheckHistory(value: boolean ) {
        this._canCheckHistory = value;
    }

    public get canPersistUI(): boolean  {
        return this._canPersistUI;
    }

    public set canPersistUI(value: boolean ) {
        this._canPersistUI = value;
    }

    public get canResetPassword(): boolean  {
        return this._canResetPassword;
    }

    public set canResetPassword(value: boolean ) {
        this._canResetPassword = value;
    }
}
