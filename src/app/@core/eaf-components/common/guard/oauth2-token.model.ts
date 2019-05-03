/**
 * Created Date: Saturday, July 8th 2017, 8:03:34 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { AuthTokenBaseModel } from '@platform/eaf-components/common/guard/auth-token-base.model';

/**
 * Used for persist any information for valid access token
 *
 * @export
 * @class OauthTokenModel
 */
export class Oauth2TokenModel extends AuthTokenBaseModel {
    /**
     * Constructor method, allow initial token object by pass in token or with token type
     *
     * @param {String} token
     * @param {String} [tokenType]
     * @memberof OauthTokenModel
     */
    constructor(token: String, tokenType?: String) {
        super();
        this.accessToken = token;
        this.setTokenType(tokenType);
    }
}
