/**
 * Created Date: Tuesday, December 18th 2017, 3:05:27 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from '@platform/basic-components/ng4-loading-spinner/ng4LoadingSpinner.service';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { Permission } from '@platform/common/constants/permissions.eum';
import { PermissionModel } from '@platform/eaf-components/common/model/common/permission.model';
import { QuerySettingModel } from '@platform/eaf-components/common/model/subscription/query-setting.model';
import { SubscriptionModel } from '@platform/eaf-components/common/model/subscription/subscription.model';
import { UserSettingModel } from '@platform/eaf-components/common/model/user-access/user-setting.model';
import { SubscriptionHttpService } from '@platform/eaf-components/common/services/http/subscription-http.service';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { PermissionGuardService } from '@platform/eaf-components/common/services/permission-guard.service';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import { STORAGE_MODEL_HELPER_TOKEN, StorageModelHelperInterface } from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { WORKFLOW_HTTP_TOKEN, WorkflowHttpServiceInterface } from '@platform/common/services/workflow-http.service.interface';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
    public userSettingModel: UserSettingModel<QuerySettingModel> = new UserSettingModel<QuerySettingModel>();
    public subscriptionModelList: Array<SubscriptionModel> = [];
    public subscriptionFormGroup: FormGroup;
    public arrayForm: FormArray;
    public recipientsList: Array<any> = [];
    public intervalList: Array<any> = [];
    public hasPermission: boolean = true;

    public subscriptionTypesList: Array<any> = [];
    public selectType: Array<string> = [];

    public workflowDefinitionsList: Array<any> = [];
    public placeholderText: string = this.translate.instant('SUBSCRIPTION_INTERVAL_PLACEHOLDER');

    public triggeredWorkflowControl: FormControl;

    public startTimeTitle: string = this.translate.instant('SUBSCRIPTION_START_TIME_PLACEHOLDER');
    public endTimeTitle: string = this.translate.instant('SUBSCRIPTION_END_TIME_PLACEHOLDER');

    public selectOptions: BootstrapSelectOptions;
    public multiple: string = CommonConstant.SELECT_TYPE.MULTIPLE;

    public clicked: Array<boolean> = [];
    public saveFlag: Array<boolean> = [];
    public isSave: boolean;

    public saveSubscriberList: Array<any> = [];
    public defaultValue: Array<any> = [];

    public originSelectData: Array<any> = [];

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        private toastrService: ToastrService,
        private subscriptionHttpService: SubscriptionHttpService,
        private userHttpService: UserHttpService,
        private permissionGuardService: PermissionGuardService,
        private spinnerService: Ng4LoadingSpinnerService,
        private translate: TranslateService,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface,
        @Inject('ReferenceAsyncCacheService')
        private referenceAsyncCacheService: ReferenceAsyncCacheService,
        @Inject(WORKFLOW_HTTP_TOKEN)
        private workflowHttpService: WorkflowHttpServiceInterface
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    /**
     * init subsricption model
     *
     * @param userSettingModel
     */
    init(userSettingModel) {
        this.spinnerService.show();
        this.userSettingModel = userSettingModel;
        const tempPersonal = {
            id: _.toString(-1),
            text: 'Personal',
            type: _.toString(CommonConstant.EMAIL_RECEPTIONS_TYPE.PERSONAL)
        }
        this.recipientsList.push(tempPersonal);
        // get recipients records
        this.userHttpService.getAllGroups().subscribe(
            res => {
                if (!_.isEmpty(res)) {
                    res = _.orderBy(res, 'groupName', 'asc');
                    res.forEach(element => {
                        const temprecipient = {
                            id: _.toString(element.groupId),
                            text: element.groupName,
                            type: _.toString(CommonConstant.EMAIL_RECEPTIONS_TYPE.GROUP)
                        }
                        this.recipientsList.push(temprecipient);
                    });
                }
            }
        );
        this.selectOptions = {
            multipleSeparator: ',',
            width: '100%',
            style: 'subscription-recipients',
            dropupAuto: false,
            noneSelectedText: this.translate.instant('SUBSCRIPTION_EMAIL_RECIPIENTS')
        }
        this.workflowHttpService.getAllWorkflowDefinitions(true).subscribe(
            (res: Array<any>) => {
                if (!_.isEmpty(res)) {
                    res = _.orderBy(res, 'name', 'asc');
                    res.forEach(element => {
                        const WorkflowType = {
                            id: _.toString(element.workflowDefId),
                            name: element.name,
                            isActive: element.isActive
                        }
                        this.workflowDefinitionsList.push(WorkflowType);
                    })
                }
            }
        );
        this.referenceAsyncCacheService.getDataByKey('SUBSCRIPTION_APPROACH_TYPE').then((reference: Array<any>) => {
            if (!_.isEmpty(reference)) {
                reference.forEach(element => {
                    const SubscriptionType = {
                        id: _.toString(element.id),
                        displayKey: element.displayKey
                    }
                    this.subscriptionTypesList.push(SubscriptionType);
                });
            }
        });
        this.subscriptionTypesList.unshift({
            id: '',
            displayKey: ''
        })
        this.workflowDefinitionsList.unshift({
            id: '',
            name: ''
        })

        // get interval records
        this.intervalList = [
            {
                displayKey: '',
                id: ''
            },
            {
                displayKey: 'Hourly',
                id: '520001'
            },
            {
                displayKey: 'Daily',
                id: '520002'
            },
            {
                displayKey: 'Weekly',
                id: '520003'
            },
            {
                displayKey: 'Monthly',
                id: '520004'
            },
            {
                displayKey: 'Yearly',
                id: '520005'
            }
        ];

        // get subscription records
        this.subscriptionHttpService.getSubscriptionById(this.userSettingModel.id).subscribe(
            (res: Array<SubscriptionModel>) => {
                setTimeout(_ => {
                    this.spinnerService.hide();
                });
                if (!_.isEmpty(res)) {
                    this.subscriptionModelList = res;
                } else {
                    const subscriptionModel: SubscriptionModel = new SubscriptionModel();
                    subscriptionModel.subscriptionObjectId = _.toString(this.userSettingModel.id);
                    subscriptionModel.userId = this.storageHelperService.getItem('user')['userId'];
                    subscriptionModel.subscriptionTypeCode = CommonConstant.SUBSCRIPTION_TYPE.SEARCH;
                    this.subscriptionModelList.push(subscriptionModel);
                }
                this.initForm();
            }
        );
    }

    /**
     * init subscription form
     */
    initForm() {
        this.arrayForm = new FormArray([]);
        if (!_.isEmpty(this.subscriptionModelList)) {
            this.subscriptionModelList.forEach((item, index) => {
                const tempArray: Array<any> = [];
                if(!_.isEmpty(item.subscriberModelList)) {
                    item.subscriberModelList.forEach(res => {
                        const tempObject = {
                            id: res.id,
                            subscriberId: res.subscriberTypeCode === CommonConstant.EMAIL_RECEPTIONS_TYPE.PERSONAL ? -1 : res.subscriberId,
                            subscriberTypeCode: res.subscriberTypeCode
                        }
                        tempArray.push(tempObject);
                    });
                }
                this.saveSubscriberList[index] = tempArray;
                this.originSelectData[index] = tempArray;
                const tempForm: FormGroup = new FormGroup({
                    id: new FormControl(item.id),
                    subscriptionTypeCode: new FormControl(item.subscriptionTypeCode),
                    subscriptionObjectId: new FormControl(item.subscriptionObjectId),
                    userId: new FormControl(this.storageHelperService.getItem('user')['userId']),
                    effectiveStartDate: new FormControl(item.effectiveStartDate, [
                        Validators.required]),
                    effectiveEndDate: new FormControl(new Date(moment(item.effectiveEndDate).toString()).getTime() === 7258032000000 ? null : item.effectiveEndDate),
                    intervalTypeCode: new FormControl(item.subscriptionOptions ? item.subscriptionOptions['intervalTypeCode'] : null, [
                        Validators.required]),
                    mainTransactionId: new FormControl(item.mainTransactionId),
                    subscriptionType: new FormControl(item.subscriptionOptions ? item.subscriptionOptions['subscriptionTypeId'] : null, [
                        Validators.required])
                }, this.effectiveDateMatcher);
                this.triggeredWorkflowControl = new FormControl(item.subscriptionOptions ? item.subscriptionOptions['triggeredWorkflow'] : null, [
                    Validators.required]);
                if (item.id) {
                    if (item.subscriptionOptions['subscriptionTypeId'] === CommonConstant.SUBSCRIPTION_APPROACH_TYPE.TRIGGERED_WORKFLOW) {
                        this.isSave = true;
                        tempForm.addControl('triggeredWorkflow', new FormControl(item.subscriptionOptions ? item.subscriptionOptions['triggeredWorkflow'] : null, [
                            Validators.required]));
                        this.triggeredWorkflowControl = new FormControl(item.subscriptionOptions ? item.subscriptionOptions['triggeredWorkflow'] : null, [
                            Validators.required]);
                    } else if (item.subscriptionOptions['subscriptionTypeId'] === CommonConstant.SUBSCRIPTION_APPROACH_TYPE.SEND_EMAIL) {
                        const subscriberIdArray: Array<string> = [];
                        tempArray.forEach(element => {
                            subscriberIdArray.push(element.subscriberId);
                        });
                        this.defaultValue[index] = subscriberIdArray;
                        if (!_.isEmpty(subscriberIdArray)) {
                            this.isSave = true;
                            this.saveFlag[index] = true;
                        }
                    }
                }
                this.arrayForm.push(tempForm);
            });
        }
        this.subscriptionFormGroup = new FormGroup({
            subscription: this.arrayForm
        });
        // handle permission
        const permissionModel: PermissionModel = new PermissionModel();
        permissionModel.permissionName = Permission.PERSIST_SUBSCRIPTION;
        if (!this.permissionGuardService.hasPermission(permissionModel)) {
            this.subscriptionFormGroup.disable();
            this.hasPermission = false;
        } else {
            this.subscriptionFormGroup.enable();
            this.hasPermission = true;
        }
    }

    /**
     * type onChange event
     *
     * @param event
     * @param index
     */
    onChangeType(event, index) {
        const controlList = this.subscriptionFormGroup.controls['subscription']['controls'];

        this.selectType[index] = event.target.value;

        switch (this.selectType[index]) {
            case CommonConstant.SUBSCRIPTION_APPROACH_TYPE.SEND_EMAIL:
                this.isSave = false;
                this.defaultValue.splice(index,1);
                this.placeholderText = this.translate.instant('SUBSCRIPTION_INTERVAL_PLACEHOLDER_EMAIL');
                if (controlList[index].controls['triggeredWorkflow']) {
                    controlList[index].controls['triggeredWorkflow'].setValue('');
                }
                controlList[index].removeControl('triggeredWorkflow');
                break;
            case CommonConstant.SUBSCRIPTION_APPROACH_TYPE.TRIGGERED_WORKFLOW:
                this.isSave = true;
                this.placeholderText = this.translate.instant('SUBSCRIPTION_INTERVAL_PLACEHOLDER_WORKFLOW');
                this.triggeredWorkflowControl.reset();
                controlList[index].addControl('triggeredWorkflow', _.cloneDeep(this.triggeredWorkflowControl));
                break;
        }
    }

    /**
     * remove subscription item
     *
     * @param item
     */
    removeSubscription(item) {
        const allSubscription = <FormArray>this.subscriptionFormGroup.controls.subscription;
        allSubscription.removeAt(item);
        this.selectType.splice(item, 1);

        this.saveFlag.splice(item,1);
        this.checkIsSave(this.saveFlag);

        this.defaultValue.splice(item,1);

        this.saveSubscriberList.splice(item,1);
        this.originSelectData.splice(item,1);

        this.clicked.splice(item,1);
    }

    /**
     * add subscription item
     */
    addSubscription() {
        this.selectType.push('');
        const allSubscription = <FormArray>this.subscriptionFormGroup.controls.subscription;
        const item: SubscriptionModel = new SubscriptionModel();
        item.subscriptionObjectId = _.toString(this.userSettingModel.id);
        item.userId = this.storageHelperService.getItem('user')['userId'];
        item.subscriptionTypeCode = CommonConstant.SUBSCRIPTION_TYPE.SEARCH;
        const tempForm: FormGroup = new FormGroup({
            id: new FormControl(item.id),
            subscriptionTypeCode: new FormControl(item.subscriptionTypeCode),
            subscriptionObjectId: new FormControl(item.subscriptionObjectId),
            userId: new FormControl(item.userId),
            effectiveStartDate: new FormControl(item.effectiveStartDate, [
                Validators.required]),
            effectiveEndDate: new FormControl(item.effectiveEndDate),
            intervalTypeCode: new FormControl(item.subscriptionOptions ? item.subscriptionOptions['intervalTypeCode'] : null,
                [Validators.required]),
            mainTransactionId: new FormControl(item.mainTransactionId),
            subscriptionType: new FormControl(item.subscriptionOptions ? item.subscriptionOptions['subscriptionTypeId'] : null, [
                Validators.required])
        }, this.effectiveDateMatcher);

        allSubscription.push(tempForm);
    }

    /**
     * close subscription dialog
     */
    close() {
        this.hideModal(false);
    }

    /**
     * save subscription list
     */
    saveSubscription() {
        this.spinnerService.show();
        const subscriptionList: Array<SubscriptionModel> = [];
        const formList = <FormArray>this.subscriptionFormGroup.controls['subscription'];
        if (!_.isEmpty(formList)) {
            formList.controls.forEach((element: FormGroup, index) => {
                let scriptionModel: SubscriptionModel = new SubscriptionModel(element.value);
                scriptionModel.subscriberModelList = this.saveSubscriberList[index];
                if (element.controls['subscriptionType'].value == CommonConstant.SUBSCRIPTION_APPROACH_TYPE.SEND_EMAIL) {
                    scriptionModel.subscriptionOptions = {
                        intervalTypeCode: element.controls['intervalTypeCode'].value,
                        intervalTypeName: _.find(this.intervalList, {id: element.controls['intervalTypeCode'].value}).displayKey,
                        subscriptionTypeId: element.controls['subscriptionType'].value,
                        subscriptionType: _.find(this.subscriptionTypesList, {id: element.controls['subscriptionType'].value}).displayKey,
                    };
                    scriptionModel.subscriberModelList.forEach(res => {
                        if (_.parseInt(res.subscriberTypeCode) === CommonConstant.EMAIL_RECEPTIONS_TYPE.PERSONAL) {
                            res.subscriberId = this.storageHelperService.getItem('user').userId;
                        }
                    });
                } else {
                    scriptionModel.subscriptionOptions = {
                        intervalTypeCode: element.controls['intervalTypeCode'].value,
                        intervalTypeName: _.find(this.intervalList, {id: element.controls['intervalTypeCode'].value}).displayKey,
                        subscriptionTypeId: element.controls['subscriptionType'].value,
                        subscriptionType: _.find(this.subscriptionTypesList, {id: element.controls['subscriptionType'].value}).displayKey,
                        triggeredWorkflow: element.controls['triggeredWorkflow'].value,
                        triggeredWorkflowName: _.find(this.workflowDefinitionsList, {id: element.controls['triggeredWorkflow'].value}).name
                    };
                }
                subscriptionList.push(scriptionModel);
            });
        }
        this.subscriptionHttpService.persistSubscription(this.userSettingModel.id, subscriptionList).subscribe(
            res => {
                setTimeout(_ => {
                    this.spinnerService.hide();
                });
                this.toastrService.success(this.translate.instant('SAVE_SUBSCRIPTION_SUCCESS'));
                this.hideModal(true);
            }, res => {
                this.toastrService.error(res.error.errorMessage, 'Error');
            }
        );
    }

    /**
     * handle close action
     *
     * @param isSave
     */
    hideModal(isSave) {
        if (isSave) {
            this.modalService.setDismissReason(JSON.stringify(this.userSettingModel));
        }
        this.bsModalRef.hide();
    }

    /**
     * validate effectivedate
     *
     * @param control
     */
    effectiveDateMatcher(control: FormControl): { [key: string]: any } {
        const fromDate = control.get('effectiveStartDate');
        const toDate = control.get('effectiveEndDate');
        if (!fromDate.value || !toDate.value) {
            return null;
        }
        return (new Date(moment(toDate.value).toString()).getTime()) >= (new Date(moment(fromDate.value).toString()).getTime()) ? null : {nomatch: true};
    };

    /**
     * selected changed event
     *
     * @param value
     * @param index
     */
    valueChanged(value: Array<string>, index) {
        if (!_.isEmpty(value)) {
            this.saveFlag[index] = true;
            const tempSubscriberList: Array<any> = [];
            tempSubscriberList.splice(0, tempSubscriberList.length);
            value.forEach(result => {
                const tempType = _.find(this.recipientsList, {id: result});
                const tempId = _.find(this.originSelectData[index], {subscriberId: _.parseInt(result)});
                const tempObject = {
                    id: tempId != null ? tempId.id : null,
                    subscriberId: result,
                    subscriberTypeCode: tempType.type
                }
                tempSubscriberList.push(tempObject);
            })
            this.saveSubscriberList[index] = tempSubscriberList;
        } else {
            this.saveFlag[index] = false;
        }
        this.checkIsSave(this.saveFlag);
    };

    /**
     * check save button
     *
     * @param isSave
     */
    checkIsSave(saveFlag: Array<boolean>) {
        const flag = _.includes(saveFlag, false);
        this.isSave = !flag;
    };

    /**
     * listen multiple select click event
     *
     * @param event
     * @param index
     */
    checkClick(event, index) {
        this.clicked[index] = true;
    };

}
