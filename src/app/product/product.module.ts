import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import {IonicRatingModule} from 'ionic-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProductPageRoutingModule,
        IonicRatingModule
    ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
