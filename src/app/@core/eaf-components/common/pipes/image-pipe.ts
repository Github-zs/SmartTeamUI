/**
 * Created Date: Wednesday, November 29th 2017, 02:16:16 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {

    constructor(
        private http: Http,
        private domSanitizer: DomSanitizer,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface) {
    }

    transform(url: string) {
        const token = this.storageHelperService.getItem('oauth-token');
        const tokenStr = 'Bearer ' + token;
        const headers = new Headers({'Authorization': tokenStr, 'Content-Type': 'image/*'});
        /* tell that XHR is going to receive an image as response, so it can be then converted to blob, and also provide your token in a way that your server expects */
        return this.http.get(url, new RequestOptions({headers: headers, responseType: ResponseContentType.Blob})) // specify that response should be treated as blob data
            .map(response => response.blob()) // take the blob
            .switchMap(blob => {
                // return new observable which emits a base64 string when blob is converted to base64
                return Observable.create(observer => {
                    const  reader = new FileReader();
                    reader.readAsDataURL(blob); // convert blob to base64
                    const that = this;
                    reader.onloadend = function() {
                        observer.next(that.domSanitizer.bypassSecurityTrustUrl(reader.result)); // emit the base64 string result
                    }
                });
            });
    }
}
