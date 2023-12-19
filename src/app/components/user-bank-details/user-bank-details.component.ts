import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState, selectUser } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { AddBankAccountComponent } from '../add-bank-account/add-bank-account.component';

@Component({
  selector: 'app-user-bank-details',
  templateUrl: './user-bank-details.component.html',
  styleUrls: ['./user-bank-details.component.css'],
})
export class UserBankDetailsComponent implements OnInit {
  private baseUrl = 'http://localhost:8080/UserBankDetails/user';
  accounts: any[] = [];
  userId = 1;
  popupState: boolean = false;

  togglePopupState() {
    this.popupState = !this.popupState;
  }

  @ViewChild(AddBankAccountComponent) addBankAccountComponent!: AddBankAccountComponent;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadBankAccounts();

    this.addBankAccountComponent.bankAccountAdded.subscribe(() => {
      this.loadBankAccounts();
    });
  }

  loadBankAccounts() {
    this.store.select(selectUser).subscribe((user) => {
      if (user && user.adminId) {
        this.userId = user.adminId
      }
      else if (user) {
        this.userId = user.usersId;
      }
    });

    this.http.get(`${this.baseUrl}/${this.userId}`).subscribe(
      (response: any) => {
        console.log('Bank account data:', response);
        this.accounts = response as any[];
      },
      (error) => {
        console.error('Error fetching bank accounts:', error);
      }
    );
  }
}
