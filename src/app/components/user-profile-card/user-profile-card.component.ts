import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, map } from 'rxjs';
import { AppState, selectUser } from 'src/app/store/selectors/auth.selectors'; // Adjust path as needed

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css']
})
export class UserProfileCardComponent implements OnInit {
  user$: Observable<any> = EMPTY;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser).pipe(
      map(user => {
        console.log(user); // Log user details if needed

        if (user && user.adminId) {
          // Set userId to adminId
          return {
            ...user,
            userId: user.adminId,
            name: user.adminName,
            email: user.adminEmail,
            gender: "Female",
            mobileNo: 7415131511,
            location: "Bangalore",
            imageUrl: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'
          };
        }
        return {
          ...user,
          imageUrl: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'
        };
      })
    );

  }
}
