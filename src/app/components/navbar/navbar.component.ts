import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectIsLoggedIn, selectUser } from '../../store/selectors/auth.selectors';
import { Observable, Subscription, take, tap } from 'rxjs';
import * as AuthActions from 'src/app/store/actions/auth.action'; // Import the logout action
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = "";
  isUserMenuOpen: boolean = false;
  isLoggedIn$: Observable<boolean>;

  private userSubscription: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

    this.userSubscription = this.store.select(selectUser).pipe(
      tap(user => {
        if (user) { // Check if user is not null or undefined
          if (user.adminName === "Admin") {
            this.username = user.adminName;
          } else if (user.name) { // Check if name property exists
            this.username = user.name;
          }
          console.log(user);
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }
 
  changeRoute() {
    this.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      const route = !isLoggedIn ? '/' : '/home';
      this.router.navigate([route]);
    });
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/'])
  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
