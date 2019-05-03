/**
 * Created Date: Tuesday, December 12th 2017, 09:19:20 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';
import * as _ from 'lodash';

export class UserProfileEmailUniqueValidator extends KSCValidatorAbstract {
    public validate(data) {
        const changeValue = _.parseInt(data.changeValue);
        const contactMethodList = data.user?data.user.contactMethodList:null;
        if (
            _.isEqual(changeValue, 160001) &&
            _.isEqual(data.index, data.component.index)
        ) {
            let emailCount = 0;
            _.forEach(contactMethodList, (value, index: number) => {
                if (_.isEqual(_.parseInt(value.contactMethodTypeCode), 160001)) {
                    emailCount++;
                }
            });
            if (emailCount > 1) {
                return { errMsg: 'Only 1 Email Address is allowed.' };
            }
        }
        return null;
    }
}
