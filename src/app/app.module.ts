import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule} from '@angular/material/grid-list' ;
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {HomeComponent} from './components/customer/home/home.component' ;
import {MatDialogModule} from '@angular/material/dialog';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { UpdateBookComponent } from './components/admin/update-book/update-book.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { BasketComponent } from './components/customer/basket/basket.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { CookieService } from 'ngx-cookie-service' ;








@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    HomeComponent,
    AdminhomeComponent,
    UpdateBookComponent,
    AddBookComponent,
    BasketComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,
    MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,

  ]
})
export class AppModule { }
