/**
 * Created Date: Friday, June 30th 2017, 12:11:57 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigNumberPipe } from '@platform/eaf-components/common/pipes/big-number.pipe';
import { DemoPipe } from '@platform/eaf-components/common/pipes/demo.pipe';
import { FormatWidgetCommonParamsPipe } from '@platform/eaf-components/common/pipes/format-widget-common-params.pipe';
import { ImagePipe } from '@platform/eaf-components/common/pipes/image-pipe';
import { IndividualColumnFilterPipe } from '@platform/eaf-components/common/pipes/individual-column-filter.pipe';
import { IndividualColumnSortPipe } from '@platform/eaf-components/common/pipes/individual-column-sort.pipe';
import { OrderByPipe } from '@platform/eaf-components/common/pipes/order-by.pipe';
import { StateProvinceFilterPipe } from '@platform/eaf-components/common/pipes/state-province-filter.pipe';
import { ToDatePipe } from '@platform/eaf-components/common/pipes/to-date.pipe';
import { ToTimePipe } from '@platform/eaf-components/common/pipes/to-time.pipe';
import { ToTimeStampPipe } from '@platform/eaf-components/common/pipes/to-timestamp.pipe';

const pipe = [
    DemoPipe,
    FormatWidgetCommonParamsPipe,
    ToDatePipe,
    ToTimeStampPipe,
    ToTimePipe,
    BigNumberPipe,
    StateProvinceFilterPipe,
    IndividualColumnFilterPipe,
    IndividualColumnSortPipe,
    ImagePipe,
    OrderByPipe
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...pipe
    ],
    exports: [
        ...pipe
    ]
})
export class SharedPipesModule {
}
