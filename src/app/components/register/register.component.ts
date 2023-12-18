// Import the necessary modules
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  name: string = '';
  mobileNo: string = '';
  email: string = '';
  password: string = '';
  location: string = '';
  gender: string = '';

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient, private router: Router) { }

  // Method to handle form submission
  onSubmit() {
    // Create a payload object
    const payload = {
      name: this.name,
      mobileNo: this.mobileNo,
      email: this.email,
      password: this.password,
      location: this.location,
      gender: this.gender,
    };

    // Make a POST request to your API
    this.http.post('http://localhost:8080/users/save', payload).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.router.navigate(['/login']);
        
        // Show SweetAlert on successful registration
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
        });
      },
      (error) => {
        console.error('API Error:', error);

        // Show SweetAlert on registration error
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again later.',
        });
      }
    );
  }
}
