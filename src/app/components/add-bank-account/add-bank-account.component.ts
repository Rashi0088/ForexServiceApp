import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState, selectUser } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css']
})
export class AddBankAccountComponent {
  bankAccount = {
    userId: null,
    accountNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
    contactNumber: ''
  };

  constructor(private http: HttpClient, private store: Store<AppState>) {
    // Subscribe to the user object from the Redux store
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.bankAccount.userId = user.usersId; // or the appropriate property name for the user ID
      }
    });
  }

  addBankAccount() {
    // Ensure userID is not null or handle it accordingly
    console.log(this.bankAccount)
    if (this.bankAccount.userId) {
      this.http.post('http://localhost:8080/UserBankDetails/save', this.bankAccount)
        .subscribe(response => {
          console.log('Bank account added:', response);
          // handle response here
        }, error => {
          console.error('Error adding bank account:', error);
          // handle error here
        });
    } else {
      console.log('User ID is not available');
      // handle the scenario where userID is not available
    }
  }
}
