/**
 * Created Date: Sunday, December 24th 2017, 08:06 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { CommonUtils } from '@platform/common/util/common-utils';
import { UserProfileCodeType } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-code-type.enum';
import { UserProfileDetailModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-detail.model';
import { UserProfileDesignerService } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-designer.service';
import * as _ from 'lodash';

@Component({
    selector: 'user-profile-preference',
    templateUrl: 'user-profile-preference.component.html',
    styleUrls: ['user-profile-preference.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserProfilePreferenceComponent implements OnInit, OnChanges {

    @Input('userDetail')
    public userDetail: UserProfileDetailModel;

    /**
     * KSC select picker option
     *
     * @type {{}}
     * @memberof UserProfilePreferenceComponent
     */
    public selectOptions: BootstrapSelectOptions = {
      liveSearch: true,
      dropdownAlignRight: true,
      noneSelectedText: 'Please select a value...',
      container: 'body',
      width: '100%'
    };

    /**
     * import UserProfileCodeType for using on page
     *
     * @memberof UserProfilePreferenceComponent
     */
    public userProfileCodeType = UserProfileCodeType;

    private _editMode: boolean = false;
    private _options: object;
    // for display readonly type text
    private _preferredLanguageText: string;
    private _preferredTimeZoneText: string;
    private _preferredCurrencyText: string;
    private _preferredPageSizeText: string;

    public get editMode(): boolean  {
        return this._editMode;
    }

    @Input('editMode')
    public set editMode(value: boolean ) {
        this._editMode = value;
    }

    public get options(): object {
        return this._options;
    }

    public set options(value: object) {
        this._options = value;
    }

    public get preferredLanguageText(): string {
        return this._preferredLanguageText;
    }

    public set preferredLanguageText(value: string) {
        this._preferredLanguageText = value;
    }

    public get preferredTimeZoneText(): string {
        return this._preferredTimeZoneText;
    }

    public set preferredTimeZoneText(value: string) {
        this._preferredTimeZoneText = value;
    }

    public get preferredCurrencyText(): string {
        return this._preferredCurrencyText;
    }

    public set preferredCurrencyText(value: string) {
        this._preferredCurrencyText = value;
    }

    public get preferredPageSizeText(): string {
        return this._preferredPageSizeText;
    }

    public set preferredPageSizeText(value: string) {
        this._preferredPageSizeText = value;
    }

    constructor(private userProfileDesignerService: UserProfileDesignerService) {
    }

    ngOnInit(): void {
        this.userProfileDesignerService.constructUserProfilePreferenceOptions().then(options => {
            this.options = options;
            this.preferredLanguageText = this.getSelectValue(this.userDetail.preferredLanguage, UserProfileCodeType.LanguageType);
            this.preferredTimeZoneText = this.getSelectValue(this.userDetail.preferredTimeZone, UserProfileCodeType.TimeZone);
            this.preferredCurrencyText = this.getSelectValue(this.userDetail.preferredCurrency, UserProfileCodeType.CurrencyType);
            this.preferredPageSizeText = this.getSelectValue(this.userDetail.preferredPageSize, UserProfileCodeType.PageSizeDefault);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.userDetail && !changes.userDetail.firstChange && this.options) {
            this.preferredLanguageText = this.getSelectValue(this.userDetail.preferredLanguage, UserProfileCodeType.LanguageType);
            this.preferredTimeZoneText = this.getSelectValue(this.userDetail.preferredTimeZone, UserProfileCodeType.TimeZone);
            this.preferredCurrencyText = this.getSelectValue(this.userDetail.preferredCurrency, UserProfileCodeType.CurrencyType);
            this.preferredPageSizeText = this.getSelectValue(this.userDetail.preferredPageSize, UserProfileCodeType.PageSizeDefault);
        }
    }
    /**
     * valueChanged
     *
     * @param {string} value
     * @param {UserProfileCodeType} type
     * @memberof UserProfilePreferenceComponent
     */
    valueChanged(value: string, type: UserProfileCodeType) {
        let numberCode;
        if (!CommonUtils.isValueEmpty(value)) {
            numberCode = _.toInteger(value);
        }
        switch (type) {
            case UserProfileCodeType.LanguageType:
                if (numberCode) {
                    this.userDetail.preferredLanguage = numberCode;
                } else {
                    delete this.userDetail.preferredLanguage;
                }
                break;
            case UserProfileCodeType.TimeZone:
                if (numberCode) {
                    this.userDetail.preferredTimeZone = numberCode;
                } else {
                    delete this.userDetail.preferredTimeZone;
                }
                break;
            case UserProfileCodeType.CurrencyType:
                if (numberCode) {
                    this.userDetail.preferredCurrency = numberCode;
                } else {
                    delete this.userDetail.preferredCurrency;
                }
                break;
            case UserProfileCodeType.PageSizeDefault:
                if (numberCode) {
                    this.userDetail.preferredPageSize = numberCode;
                } else {
                    delete this.userDetail.preferredPageSize;
                }
                break;
            default:
                break;
        }
    }

    /**
     * get text basedon code
     *
     * @param {number} code
     * @param {UserProfileCodeType} type
     * @returns
     * @memberof UserProfilePreferenceComponent
     */
    getSelectValue(code: number, type: UserProfileCodeType) {
        if (code) {
            const findResult = _.find(this.options[type], ['id', code]);
            if (findResult) {
                return findResult['text'] ? findResult['text'] : '';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
}
