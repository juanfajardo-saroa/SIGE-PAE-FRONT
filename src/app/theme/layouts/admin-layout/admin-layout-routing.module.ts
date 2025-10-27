import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from '../../../pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    {
      path: '',
      loadChildren: () => import('../../../pages/page.module').then(m => m.PageModule)
    }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminLayoutRoutingModule {}
