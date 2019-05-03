/**
 * Created Date: Thursday, December 21st 2017, 08:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';


export class UserProfileModel {
    model: UserProfileMainModel = null;
    originalModel: UserProfileMainModel = null;
    changeType: string
    type: string = 'UserProfile';
}
