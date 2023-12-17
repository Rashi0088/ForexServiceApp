import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/app/store/actions/auth.action';
import * as authActions from '../../store/actions/auth.action';
import { AppState, selectIsLoggedIn, selectUser } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSuccess() {
    this.toastr.success('Login Successful', 'Success');
  }

  showError() {
    this.toastr.error('Invalid credentials', 'Error');
  }

  email: string = '';
  password: string = '';
  role: string = '';


  ngOnInit(): void {

  }
  // Inject HttpClient in the constructor
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private store: Store<AppState>) { }

  // Method to handle form submission
  onSubmit() {
    // Create a payload object
    const payload = {
      email: this.email,
      password: this.password,
      role: this.role,
    };
    if (payload.role === 'admin') {
      console.log(payload);
      const data = {
        "adminUsername": payload.email,
        "adminPassword": payload.password,
      }
      console.log(data)
      // Make a POST request to your API
      this.http.post('http://localhost:8080/authen/admin/login', data).subscribe(
        (response) => {
          console.log('API Response:', response);
          this.router.navigate(['/home'])
          console.log('API Response:', response);
          this.store.dispatch(authActions.loginSuccess({ response: response })); // Dispatch success action
          this.showSuccess();
          if (response) {
            this.showSuccess();
          }
          this.store.select(selectUser).subscribe(user => {
            console.log(user)
          });

          // Handle the response as needed (e.g., show a success message, navigate to another page)
        },
        (error) => {
          console.error('API Error:', error);
          this.showError();
          // Handle the error as needed (e.g., show an error message to the user)
        }
      );
    } else {
      console.log(payload)
      // Make a POST request to your API
      this.http.post('http://localhost:8080/auth/login', payload).subscribe(
        (response) => {
          console.log('API Response:', response);
          this.router.navigate(['/home'])
          console.log('API Response:', response);
          this.store.dispatch(authActions.loginSuccess({ response: response })); // Dispatch success action
         
          if (response) {
            this.showSuccess();
          }

          // Handle the response as needed (e.g., show a success message, navigate to another page)
        },
        (error) => {
          console.error('API Error:', error);
          this.showError();
          // Handle the error as needed (e.g., show an error message to the user)
        }
      );
    }

  }


}
