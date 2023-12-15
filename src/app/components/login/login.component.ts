import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showSuccess() {
    this.toastr.success('Login Successful', 'Success');
  }

  showError() {
    this.toastr.error('Invalid credentials', 'Error');
  }

  email: string = '';
  password: string = '';
 

  ngOnInit(): void {
   
}
 // Inject HttpClient in the constructor
 constructor(private http: HttpClient,private router:Router,private toastr: ToastrService) { }

 // Method to handle form submission
 onSubmit() {
   // Create a payload object
   const payload = {
     email: this.email,
     password: this.password,
   };
console.log(payload)
   // Make a POST request to your API
   this.http.post('http://localhost:8080/auth/login', payload).subscribe(
     (response) => {
       console.log('API Response:', response);
      this.router.navigate(['/'])
     if(response){
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
