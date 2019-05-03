/**
 * Created Date: Sunday, December 24th 2017, 07:08 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { KSCAdvanceFormEditorOption } from '@platform/advance-components/ksc-advance-form-editor/model/ksc-advance-form-editor.option.model';
import { CommonUtils } from '@platform/common/util/common-utils';
import { KSCMaxLengthValidator } from '@platform/eaf-components/common/ksc-form-validator/ksc-maxlength.validator';
import { KSCPositiveIntegerValidator } from '@platform/eaf-components/common/ksc-form-validator/ksc-positive-integer.validator';
import { KSCRequiredValidator } from '@platform/eaf-components/common/ksc-form-validator/ksc-required.validator';
import { KSCValidatorFactory } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-factory';
import { KSCValidator } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator.interface';
import { UserProfileDesignerService } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-designer.service';
import { UserProfileContactMethodValidator } from '@platform/eaf-components/common/module/user-profile-designer/validator/user-profile-contact-method.validator';
import { UserProfileEmailUniqueValidator } from '@platform/eaf-components/common/module/user-profile-designer/validator/user-profile-email-unique.validator';
import * as _ from 'lodash';

@Component({
    selector: 'user-profile-detail',
    templateUrl: './user-profile-detail.component.html',
    styleUrls: ['./user-profile-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserProfileDetailComponent implements OnInit, OnChanges {

    public validators: {[name: string]: KSCValidator} = {
        'KSCRequiredValidator': KSCRequiredValidator,
        'KSCMaxLengthValidator': KSCMaxLengthValidator,
        'KSCPositiveIntegerValidator': KSCPositiveIntegerValidator,
        'UserProfileContactMethodValidator': UserProfileContactMethodValidator,
        'UserProfileEmailUniqueValidator': UserProfileEmailUniqueValidator
    };

    @Output() hasError = new EventEmitter();

    private _editMode: boolean = false;
    private _config: KSCAdvanceFormEditorOption;
    private _isExpand: boolean = false;
    private _entity: any;
    private copyModel: any;
    public componentAssignId: number = 0;

    public errorIds: number[] = [];

    public get entity(): any {
        return this._entity;
    }

    @Input('entity')
    public set entity(value: any) {
        this._entity = value;
    }

    public get isExpand(): boolean  {
        return this._isExpand;
    }

    @Input('isExpand')
    public set isExpand(value: boolean ) {
        this._isExpand = value;
    }

    public get editMode(): boolean  {
        return this._editMode;
    }

    @Input('editMode')
    public set editMode(value: boolean ) {
        this._editMode = value;
    }

    public get config(): KSCAdvanceFormEditorOption {
        return this._config;
    }

    public set config(value: KSCAdvanceFormEditorOption) {
        this._config = value;
    }

    constructor(
        private userProfileDesignerService: UserProfileDesignerService,
        private kscValidatorFactory: KSCValidatorFactory
    ) {}

    ngOnInit(): void {
        // Pass validators into validator factory
        this.kscValidatorFactory.validators = this.validators;
        // Get defined legal entity configuration file
        this.userProfileDesignerService.getUserProfileConfiguration().then((res: KSCAdvanceFormEditorOption) => {
            this.config = res;
            if (this.editMode) {
                this.config.blocks[2].blockName = 'Contact Methods (At least one Email Address)';
            } else {
                this.config.blocks[2].blockName = 'Contact Methods';
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        // listen the isExpand
        if (changes.isExpand
            && changes.isExpand.previousValue !== undefined
            && !_.isEqual(changes.isExpand.currentValue, changes.isExpand.previousValue)) {
            _.forEach(this.config.blocks, (item: any) => {
                item.isOpened = this.isExpand;
            });
        }
        // Listen user
        if (
            changes.entity &&
            !_.isEqual(
                changes.entity.currentValue,
                changes.entity.previousValue
            )
        ) {
            this.entity = changes.entity.currentValue;
            this.componentAssignId = 0;
            this.errorIds = [];
        }
        // linsten edit mode
        if (changes.editMode && this.config) {
            if (changes.editMode.currentValue) {
                this.config.blocks[2].blockName = 'Contact Methods (At least one Email Address)';
            } else {
                this.config.blocks[2].blockName = 'Contact Methods';
            }
        }
    }

    /**
     * onValueChange for KSC form editor
     *
     * @param {any} $event
     * @memberof UserProfileDetailComponent
     */
    public onValueChange($event): void {
        if ($event && $event.isRemove) {
            _.forEach($event.ids, (id) => {
                _.remove(this.errorIds, (errId) => {
                    return errId === id;
                });
            });
        } else {
            const component = $event.component;
            const el: ElementRef = component.el;
            $event.user = _.clone(this.entity);
            if (!_.isEmpty(component.validator) && this.editMode) {
                if (_.isUndefined(component.id)) {
                    component.id = this.componentAssignId++;
                }
                const targetNode = $(
                        el.nativeElement.querySelector('.error-area')
                    ),
                    editNode = $(el.nativeElement.querySelector('.edit-area'));
                let hasError = false,
                    errMsg = '';
                _.forEach(component.validator, value => {
                    const result: any = this.kscValidatorFactory
                        .createKSCValidator(value.validate)
                        .validate($event);
                    if (!_.isNull(result)) {
                        errMsg = CommonUtils.isValueEmpty(result.errMsg)
                            ? value.errMsg
                            : result.errMsg;
                        hasError = true;
                    }
                });
                if (hasError) {
                    if (this.errorIds.indexOf(component.id) < 0) {
                        this.errorIds.push(component.id);
                    }
                    editNode.addClass('ng-invalid');
                    targetNode.find(`#errMsg`).remove();
                    targetNode.append(`<span class="has-error" id="errMsg">${errMsg}</span>`);
                } else {
                    _.remove(this.errorIds, id => {
                        return id === component.id;
                    });
                    if (editNode.hasClass('ng-invalid')) {
                        editNode.removeClass('ng-invalid');
                    }
                    targetNode.find(`#errMsg`).remove();
                }

            }
        }
        this.hasError.emit({
            profileHasError: this.errorIds.length > 0
        });
    }
}
