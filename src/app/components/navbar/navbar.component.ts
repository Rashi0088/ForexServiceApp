import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectIsLoggedIn } from '../../store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import * as AuthActions from 'src/app/store/actions/auth.action'; // Import the logout action
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserMenuOpen: boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/home'])
  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
