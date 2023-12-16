import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducer/auth.reducer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    TransactionComponent,
    NavbarComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, BrowserAnimationsModule, // required for toastr animations
    ToastrModule.forRoot({
      timeOut: 10000,       // Set the duration for which the toast will be displayed (in milliseconds)
      positionClass: 'toast-bottom-left', // Set the position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true,   // Show a progress bar in the toast
      closeButton: true,   // Show a close button in the toast
      // progressBarAnimation: 'increasing', // Set the progress bar animation style
    }),
    StoreModule.forRoot({ auth: authReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
