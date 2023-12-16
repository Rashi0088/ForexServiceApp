import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Country {
  name: string;
  flagUrl: string;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  countries: Country[] = [
    { name: "India", flagUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" },
    { name: "Russia", flagUrl: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg" },
    { name: "USA", flagUrl: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" },
    { name: "Australia", flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/280px-Flag_of_Australia.svg.png" },
    { name: "Canada", flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1024px-Flag_of_Canada.svg.png" },
    { name: "New Zealand", flagUrl: "https://mch.govt.nz/sites/default/files/NZ-Flag_of_New_Zealand_svg.png" },
    { name: "Thailand", flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1200px-Flag_of_Thailand.svg.png" },
    { name: "UAE", flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1280px-Flag_of_the_United_Arab_Emirates.svg.png" },
    { name: "China", flagUrl: "https://vignette.wikia.nocookie.net/cyberpunk/images/3/3e/255px-Flag_of_the_People%27s_Republic_of_China.svg.png/revision/latest?cb=20180830132455" },
    { name: "Japan", flagUrl: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" },
    

    // ...add other countries
  ];

  navigateToRegister() {
    this.router.navigate(['/register']);
}


}
