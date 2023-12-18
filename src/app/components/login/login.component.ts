import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/app/store/actions/auth.action';
import * as authActions from '../../store/actions/auth.action';
import { AppState, selectIsLoggedIn, selectUser } from 'src/app/store/selectors/auth.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // showError() {
  //   this.toastr.error('Invalid credentials', 'Error');
  // }

  email: string = '';
  password: string = '';
  role: string = '';

  ngOnInit(): void {}

  constructor(private http: HttpClient, private router: Router,  private store: Store<AppState>) {}

  showSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'You are now logged in.',
    });
  }

  onSubmit() {
    const payload = {
      email: this.email,
      password: this.password,
      role: this.role,
    };

    if (payload.role === 'admin') {
      const data = {
        "adminUsername": payload.email,
        "adminPassword": payload.password,
      };

      this.http.post('http://localhost:8080/authen/admin/login', data).subscribe(
        (response) => {
          console.log('API Response:', response);
          this.router.navigate(['/admindash']);
          this.store.dispatch(authActions.loginSuccess({ response: response }));
          this.showSuccess();
          if (response) {
            this.showSuccess();
          }
          this.store.select(selectUser).subscribe(user => {
            console.log(user);
          });
        },
        (error) => {
          console.error('API Error:', error);
          // this.showError();
        }
      );
    } else {
      this.http.post('http://localhost:8080/auth/login', payload).subscribe(
        (response) => {
          console.log('API Response:', response);
          this.router.navigate(['/home']);
          this.store.dispatch(authActions.loginSuccess({ response: response }));
          if (response) {
            this.showSuccess();
          }
        },
        (error) => {
          console.error('API Error:', error);
          // this.showError();
        }
      );
    }
  }
}
