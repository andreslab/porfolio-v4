import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PorfolioComponent } from './page/porfolio/porfolio.component';
import { ContactComponent } from './page/contact/contact.component';

const routes: Routes = [
  {path: '', component: PorfolioComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
