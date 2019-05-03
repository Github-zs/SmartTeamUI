/**
 * Created Date: Thursday, June 14th 2018, 10:38 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
import { KSCValidatorAbstract } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-abstract';
import { KSCValidator } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator.interface';


export interface KSCValidatorFactoryInterface {
  // a collection of validator
  validators: { [name: string]: KSCValidator };

  /**
   * Create a  validator by given validator name
   *
   * @param {string} name
   * @returns {KSCValidatorAbstract}
   */
  createKSCValidator(name: string): KSCValidatorAbstract;
}
