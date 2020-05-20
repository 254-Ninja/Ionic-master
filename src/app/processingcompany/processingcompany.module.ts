import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingcompanyPageRoutingModule } from './processingcompany-routing.module';

import { ProcessingcompanyPage } from './processingcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessingcompanyPageRoutingModule
  ],
  declarations: [ProcessingcompanyPage]
})
export class ProcessingcompanyPageModule {}
