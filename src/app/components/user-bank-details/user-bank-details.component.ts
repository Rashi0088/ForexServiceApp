import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState, selectUser } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-bank-details',
  templateUrl: './user-bank-details.component.html',
  styleUrls: ['./user-bank-details.component.css']
})
export class UserBankDetailsComponent {
  private baseUrl = 'http://localhost:8080/UserBankDetails/user';
  accounts: any[] = [];
  userId = 1;
  isAddBankDetailsPopupOpen = false;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.userId = user.usersId;
      }
    });

    this.http.get(`${this.baseUrl}/${this.userId}`)
      .subscribe((response: any) => {
        console.log('Bank account data:', response);
        this.accounts = response as any[];
      }, error => {
        console.error('Error fetching bank accounts:', error);
      });
  }

  openAddBankDetailsPopup() {
    this.isAddBankDetailsPopupOpen = true;
  }

  closeAddBankDetailsPopup() {
    this.isAddBankDetailsPopupOpen = false;
  }
}
