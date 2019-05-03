/**
 * Created Date: Tuesday, October 31st 2017, 2:39:22 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from '@platform/common/constants/common.constant';

@Injectable()
export class CsvBuilderService {

    constructor(private http: HttpClient) {
    }

    downloadFile(data) {
        const blob = new Blob([CommonConstant.CSV_DOWNLOAD_SETTING.BLOB_DATA_PREFIX + data],
            {type: CommonConstant.CSV_DOWNLOAD_SETTING.BLOB_DATA_TYPE});
        const fileName = 'Results_' + new Date().getTime() + '.csv';
        // for IE/EDGE
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            const dwldLink = document.createElement(CommonConstant.CSV_DOWNLOAD_SETTING.LINK_ELEMENT);
            const url = URL.createObjectURL(blob);
            const isSafariBrowser = navigator.userAgent.indexOf(CommonConstant.CSV_DOWNLOAD_SETTING.SAFARI_BROWSER) !== -1
                && navigator.userAgent.indexOf(CommonConstant.CSV_DOWNLOAD_SETTING.CHROME_BROWSER) === -1;
            // for Safari 9+
            if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
                dwldLink.setAttribute(CommonConstant.CSV_DOWNLOAD_SETTING.LINK_HERF_KEY, 'data:application/csv;charset=utf-8,' + encodeURI(data));
                dwldLink.setAttribute(CommonConstant.CSV_DOWNLOAD_SETTING.LINK_DOWNLOAD_KEY, fileName);
                dwldLink.style.visibility = CommonConstant.CSV_DOWNLOAD_SETTING.STYLE_VISIBILITY_HIDDEN;
                document.body.appendChild(dwldLink);
                const htmlEvent = document.createEvent('HTMLEvents');
                htmlEvent.initEvent('click', true, true);
                dwldLink.dispatchEvent(htmlEvent);
                document.body.removeChild(dwldLink);
            } else {
                // for firefox/chrome
                dwldLink.setAttribute(CommonConstant.CSV_DOWNLOAD_SETTING.LINK_HERF_KEY, url);
                dwldLink.setAttribute(CommonConstant.CSV_DOWNLOAD_SETTING.LINK_DOWNLOAD_KEY, fileName);
                dwldLink.style.visibility = CommonConstant.CSV_DOWNLOAD_SETTING.STYLE_VISIBILITY_HIDDEN;
                document.body.appendChild(dwldLink);
                dwldLink.click();
                document.body.removeChild(dwldLink);
            }
        }
    }
}
