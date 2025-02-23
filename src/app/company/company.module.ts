import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPageRoutingModule } from './company-routing.module';

import { CompanyPage } from './company.page';
import {IonicRatingModule} from 'ionic-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CompanyPageRoutingModule,
        IonicRatingModule
    ],
  declarations: [CompanyPage]
})
export class CompanyPageModule {}
