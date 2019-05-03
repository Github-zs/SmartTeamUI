/**
 * Created Date: Tuesday, December 12th 2017, 09:19:20 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { CommonConstant } from '@platform/common/constants/common.constant';
import { CommonUtils } from '@platform/common/util/common-utils';
import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';


const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEXP = /^\+?\d+$/;

export class UserProfileContactMethodValidator extends KSCValidatorAbstract {
    public validate(data) {
        const code = data.component.entity.contactMethodTypeCode;
        const value = data.changeValue;
        if (CommonUtils.isValueEmpty(code) || CommonUtils.isValueEmpty(value)) {
            return null;
        }
        switch (code.toString()) {
            case CommonConstant.CONTACT_METHOD_TYPE_REF.EMAIL_ADDRESS + '': // email
                if (!EMAIL_REGEXP.test(value)) {
                    return {
                        errMsg: 'Contact Method Value is not valid email format.'
                    };
                }
                break;
            case CommonConstant.CONTACT_METHOD_TYPE_REF.FAX_NUMBER + '':
                // fax number
                if (!PHONE_REGEXP.test(value)) {
                    return {
                        errMsg: 'Contact Method Value is not valid fax number format.'
                    };
                }
                break;
            case CommonConstant.CONTACT_METHOD_TYPE_REF.MOBILE_PHONE_NUMBER + '': // phone number
                if (!PHONE_REGEXP.test(value)) {
                    return {
                        errMsg: 'Contact Method Value is not valid phone number format.'
                    };
                }
                break;
            case CommonConstant.CONTACT_METHOD_TYPE_REF.HOME_PHONE_NUMBER + '': // phone number
                if (!PHONE_REGEXP.test(value)) {
                    return {
                        errMsg: 'Contact Method Value is not valid phone number format.'
                    };
                }
                break;
            case CommonConstant.CONTACT_METHOD_TYPE_REF.OTHER_PHONE_NUMBER + '': // phone number
                if (!PHONE_REGEXP.test(value)) {
                    return {
                        errMsg: 'Contact Method Value is not valid phone number format.'
                    };
                }
                break;
            case CommonConstant.CONTACT_METHOD_TYPE_REF.BUSINESS_PHONE_NUMBER + '': // phone number
                if (!PHONE_REGEXP.test(value)) {
                    return {
                        errMsg: 'Contact Method Value is not valid phone number format.'
                    };
                }
                break;
            default:
                return null;
        }
        return null;
    }
}
