
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageHeaderComponent } from './components/front-page-header/front-page-header.component';

const routes: Routes = [
  { path: 'header', component: FrontPageHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}