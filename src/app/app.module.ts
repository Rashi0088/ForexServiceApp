import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducer/auth.reducer';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { AddBankAccountComponent } from './components/add-bank-account/add-bank-account.component';
import { UserBankDetailsComponent } from './components/user-bank-details/user-bank-details.component';
import { popupReducer } from './store/reducer/popup.reducer';
import { AdminRateComponent } from './components/admin-rate/admin-rate.component';
import { UpdateCurrencyComponent } from './components/update-currency/update-currency.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    CurrencyConverterComponent,
    UserhomeComponent,
    UserProfileCardComponent,
    AddBankAccountComponent,
    UserBankDetailsComponent,
    AdminRateComponent,
    UpdateCurrencyComponent,
    SidebarComponent,
    TransactionFormComponent,
    GenerateReportComponent,
    AboutusComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    BrowserAnimationsModule, // required for toastr animations
    StoreModule.forRoot({ auth: authReducer, popup: popupReducer }),

    ModalModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
