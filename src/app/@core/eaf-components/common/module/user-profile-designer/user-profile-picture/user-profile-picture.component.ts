/**
 * Created Date: Sunday, December 24th 2017, 08:06 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { CommonConstant } from '@platform/common/constants/common.constant';
import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { ToastrService } from 'ngx-toastr';
import { Component, DoCheck, Inject, Input, OnInit } from '@angular/core';
import { FileItem, FileLikeObject, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'user-profile-picture',
    templateUrl: './user-profile-picture.component.html',
    styleUrls: ['./user-profile-picture.component.scss']
})
export class UserProfilePictureComponent implements OnInit, DoCheck {

    private _user: UserProfileMainModel;
    private _editMode: boolean = false;
    // TODO need permission check;
    private _canSave: boolean = true;
    private _userFullName: string;

    @Input('canSave')
    public set canSave(value: boolean) {
        this._canSave = value;
    }

    @Input('editMode')
    public set editMode(value: boolean) {
        this._editMode = value;
    }

    @Input('user')
    public set user(value: UserProfileMainModel) {
        this._user = value;
    }

    public get canSave(): boolean {
        return this._canSave;
    }

    public get editMode(): boolean {
        return this._editMode;
    }

    public get user(): UserProfileMainModel {
        return this._user;
    }

    public get userFullName(): string {
        return this._userFullName;
    }

    public set userFullName(value: string) {
        this._userFullName = value;
    }

    // file uploader
    public uploader;

    constructor(
        private toastrService: ToastrService,
        private translate: TranslateService,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface) {
    }

    ngOnInit(): void {
        this.uploader = new FileUploader({
            url: CommonConstant.UPLOADER_PIC_URL,
            authToken: 'Bearer ' + this.storageHelperService.getItem('oauth-token'),
            queueLimit: CommonConstant.QUEUE_LIMIT,
            maxFileSize: CommonConstant.FILE_SIZE_LIMIT,
            allowedMimeType: ['image/jpeg', 'image/png', 'image/gif']
        });
        this.uploader.onErrorItem = (item, response, status, headers) =>
            this.onErrorItem(item, response, status, headers);
        this.uploader.onSuccessItem = (item, response, status, headers) =>
            this.onSuccessItem(item, response, status, headers);
        this.uploader.onAfterAddingFile = item => this.onAfterAddingFile(item);
        this.uploader.onWhenAddingFileFailed = (item, filter, options) =>
            this.onWhenAddingFileFailed(item, filter, options);
        if (this.user.userDetailModel && this.user.userDetailModel.picture) {
            this.user.fullPath = this.user.userDetailModel.picture;
        }
    }

    onAfterAddingFile(item: FileItem): any {
    }

    onSuccessItem(item: FileItem,
                  response: string,
                  status: number,
                  headers: ParsedResponseHeaders): any {
        // this gets triggered only once when first file is uploaded
        this.user.fullPath = JSON.parse(response).fullPath;
        // set picture
        this.user.userDetailModel.picture = JSON.parse(response).picture;
    }

    onErrorItem(item: FileItem,
                response: string,
                status: number,
                headers: ParsedResponseHeaders): any {
        const error = JSON.parse(response); // error server response
        this.user.fullPath = null;
        this.user.userDetailModel.picture = null;
    }

    onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
        switch (filter.name) {
            case 'fileSize':
                this.toastrService.error(
                    this.translate.instant('UPLOAD_PICTURE_SIZE_ERROR'),
                    'Error'
                );
                break;
            case 'queueLimit':
                this.toastrService.error(
                    this.translate.instant('UPLOAD_PICTURE_NUMBER_ERROR'),
                    'Error'
                );
                break;
            default:
                this.toastrService.error(
                    this.translate.instant('UPLOAD_PICTURE_TYPE_ERROR'),
                    'Error');
        }
    }

    ngDoCheck(): void {
        const fullNameArr = [];
        if (this.user.firstName) {
            fullNameArr.push(this.user.firstName);
        }
        if (this.user.lastName) {
            fullNameArr.push(this.user.lastName);
        }
        this.userFullName = fullNameArr.join(', ');
    }
}
