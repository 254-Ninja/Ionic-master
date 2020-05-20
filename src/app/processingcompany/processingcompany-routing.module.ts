import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingcompanyPage } from './processingcompany.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingcompanyPageRoutingModule {}
