/**
 * Created Date: Wednesday, December 6th 2017, 1:15:05 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import * as _ from 'lodash';

export class AuthTokenBaseModel {
    tokenType: String;
    accessToken: String;

    /**
     * Set token type, this method will upper the first work for token type.
     * Like beare to Beare to match the backend validation
     *
     * @param {String} rawTokenType
     * @memberof OauthTokenModel
     */
    public setTokenType(rawTokenType: String): void {
        if (!_.isEmpty(rawTokenType)) {
            this.tokenType = _.upperFirst(rawTokenType.toString());
        }
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public toAuthorizationValue(): string {
        return this.tokenType + ' ' + this.accessToken;
    }
}
