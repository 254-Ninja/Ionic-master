import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerPageRoutingModule } from './farmer-routing.module';

import { FarmerPage } from './farmer.page';
import {IonicRatingModule} from 'ionic-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FarmerPageRoutingModule,
        IonicRatingModule
    ],
  declarations: [FarmerPage]
})
export class FarmerPageModule {}
