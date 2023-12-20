import { Component } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  showUserProfile = true;
  showGenerateReport = false; // New property for generate report
  toggleBankDetails = false;
  showSendMoney = false;
}
