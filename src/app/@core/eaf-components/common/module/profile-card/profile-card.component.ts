/**
 * Created Date: Sunday, July 16th 2017, 9:31:53 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { AdministrationService } from '@platform/eaf-components/common/services/administration.service';

@Component({
    selector: 'profile-card',
    template: `
    <style>
    .datafabric-profile-card .card-info {
        max-width: 270px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .card-pic-container{
        height: 180px;
        width: 200px;
        overflow: hidden;
    }
    .card-pic{
        max-width: 100%;
        height: auto;    
    }
    </style>
    <div *ngIf="currentHoverObj">
    <div class="row">
        <div class="col-xs-12" style="padding-left: 0; cursor: pointer"><i (click)="close()" class="pull-right fa fa-remove" aria-hidden="true"></i></div>
        <div class="col-xs-12">
            <div class="col-xs-12 pop-hover-pic card-pic-container" *ngIf="(currentHoverObj.currentHoverPerson && currentHoverObj.currentHoverPerson.fullPath)">
                <img [src]="((currentHoverObj.currentHoverPerson.fullPath | image) | async)|| ''" class="card-pic"/>
            </div>
            <div class="col-xs-12 text-center" *ngIf="!currentHoverObj.currentHoverPerson.fullPath">
                <i class="fa fa-user-circle hover-default-pic-icon"></i>
            </div>
        </div>
    </div>
    <div class="row datafabric-profile-card">
        <div class="col-xs-12">
            <div class="col-xs-12 card-info" [hidden]="!currentHoverObj.currentHoverUser.userFullName">
                <span class="datafabric-font-style" title="{{currentHoverObj.currentHoverUser.userFullName}}"> {{currentHoverObj.currentHoverUser.userFullName}}</span>
            </div>
            <div class="col-xs-12 card-info" [hidden]="!currentHoverObj.currentHoverPerson.title">
                <span class="datafabric-font-style" title="{{currentHoverObj.currentHoverPerson.title}}"> {{currentHoverObj.currentHoverPerson.title}} </span>
            </div>
            <div class="col-xs-12  card-info" [hidden]="!currentHoverObj.currentHoverUser.email">
                <span class="datafabric-font-style" title="{{currentHoverObj.currentHoverUser.email}}"> {{currentHoverObj.currentHoverUser.email}}</span>
            </div>
            <div class="col-xs-12 card-info" [hidden]="!currentHoverObj.workNumber">
                <span class="datafabric-font-style" title="{{currentHoverObj.workNumber}}"> {{currentHoverObj.workNumber}} </span>
            </div>
            <div class="col-xs-12 card-info" [hidden]="!currentHoverObj.workAddress">
                <span class="datafabric-font-style" title="{{currentHoverObj.workAddress}}"> {{currentHoverObj.workAddress}} </span>
            </div>
        </div>
    </div>
    </div>
  `,
    styles: []
})
export class ProfileCardComponent implements OnInit {
    @Input() public currentHoverObj: any;
    // @Input() public userInfo: any;
    @HostBinding('style.left')
    @Input() public positionX: string = null;
    @HostBinding('style.top')
    @Input() public positionY: string = null;

    @Output() closePopover = new EventEmitter();

    constructor(private adminService: AdministrationService) {
    }

    close() {
        this.closePopover.emit();
        this.currentHoverObj = null;
    }


    ngOnInit() {
    }
}
