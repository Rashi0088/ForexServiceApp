import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toggleProfile = new EventEmitter<boolean>();
  @Output() toggleGenerateReport = new EventEmitter<boolean>(); // New output for generate report
  @Output() toggleBankDetails = new EventEmitter<boolean>();
  @Output() toggleSendMoney = new EventEmitter<boolean>();
  // New event emitter

  private isProfileVisible = false;
  private isBankDetailVisible = false;
  private isSendMoneyVisible = false;  // New property


  toggleUserProfile() {
    this.toggleProfile.emit(true);
    // Set other properties to false to hide other components
    this.toggleGenerateReport.emit(false);
    this.toggleBankDetails.emit(false);
    this.toggleSendMoney.emit(false);
  }
  toggleReport() {
    this.toggleGenerateReport.emit(true);
    // Set other properties to false to hide other components
    this.toggleProfile.emit(false);
    this.toggleBankDetails.emit(false);
    this.toggleSendMoney.emit(false);
  }
  toggleBankDetail() {
    this.toggleGenerateReport.emit(false);
    // Set other properties to false to hide other components
    this.toggleProfile.emit(false);
    this.toggleBankDetails.emit(true);
    this.toggleSendMoney.emit(false);
  }

  toggleSendMoneyFeature() {
    this.toggleGenerateReport.emit(false);
    // Set other properties to false to hide other components
    this.toggleProfile.emit(false);
    this.toggleBankDetails.emit(false);
    this.toggleSendMoney.emit(true);
  }

  private emitEvents() {
    this.toggleProfile.emit(this.isProfileVisible);
    this.toggleBankDetails.emit(this.isBankDetailVisible);
    this.toggleSendMoney.emit(this.isSendMoneyVisible);
  }
}
