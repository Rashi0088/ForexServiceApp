import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { AddBankAccountComponent } from './components/add-bank-account/add-bank-account.component';
import { UserBankDetailsComponent } from './components/user-bank-details/user-bank-details.component';
import { AdminRateComponent } from './components/admin-rate/admin-rate.component';
import { UpdateCurrencyComponent } from './components/update-currency/update-currency.component';

const routes: Routes = [


  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admindash', component: AdminRateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: UserhomeComponent },
  { path: 'userProfile', component: UserProfileCardComponent },
  { path: 'bankDetails', component: UserBankDetailsComponent },
  { path: 'updatecurrency', component: UpdateCurrencyComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', redirectTo: '/userProfile', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
