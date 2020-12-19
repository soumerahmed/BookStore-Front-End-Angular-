import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/customer/home/home.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';

const routes: Routes = [
  {
    path: 'customer/home',
    component: HomeComponent
  }
  ,
  {
    path: 'admin/home',
    component: AdminhomeComponent
  }
  ,
  {
    path: '',
    component: AuthentificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
