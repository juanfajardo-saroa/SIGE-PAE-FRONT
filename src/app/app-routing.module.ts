import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
{
  path: '',
  component: ThemeComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule)
    },

  ]},


{
  path: '**',
  redirectTo: '/',
}];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
