
/**
 * Created Date: Monday, October 30th 2017, 3:21:30 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';

@Injectable()
export class SimpleModalService {

  /**
   * bootbox alert
   *
   * @param {string} message
   * @param {('small' | 'large')} [size]
   * @param {string} [title]
   * @memberof SimpleModalService
   */
  alert(message: string, size?: 'small' | 'large', title?: string): void {
    const dialog: JQuery = bootbox.dialog({
      size: size ? size : null,
      title: title ? title : null,
      message: message,
      buttons: {
        ok: {
          label: 'Ok',
          className: 'btn datafab-btn-primary'
        }
      }
    });
  }

  /**
   * bootbox confirm
   *
   * @param {string} message
   * @param {() => any} callback
   * @param {('small' | 'large')} [size]
   * @param {string} [title]
   * @memberof SimpleModalService
   */
  confirm(message: string, callback: () => any, size?: 'small' | 'large', title?: string): void {
    const option = {
      size: size ? size : null,
      title: title ? title : null,
      message: message,
      buttons: {
        confirm: {
          label: 'Ok',
          className: 'btn datafab-btn-primary',
          callback: callback
        },
        cancel: {
          label: 'Cancel',
          className: 'btn btn-default'
        }
      }
    };
    bootbox.dialog(option);
  }
}
