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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ' ', component: HomeComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transaction', component: TransactionComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to login
  // { path: '**', redirectTo: '/login' },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    TransactionComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
