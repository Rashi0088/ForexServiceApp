import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toggleProfile = new EventEmitter<boolean>();
  @Output() toggleBankDetails = new EventEmitter<boolean>();
  @Output() toggleSendMoney = new EventEmitter<boolean>();  // New event emitter

  private isProfileVisible = false;
  private isBankDetailVisible = false;
  private isSendMoneyVisible = false;  // New property

  toggleUserProfile() {
    this.isProfileVisible = true;
    this.isBankDetailVisible = false;
    this.isSendMoneyVisible = false;
    this.emitEvents();
  }

  toggleBankDetail() {
    this.isBankDetailVisible = true;
    this.isProfileVisible = false;
    this.isSendMoneyVisible = false;
    this.emitEvents();
  }

  toggleSendMoneyFeature() {
    this.isSendMoneyVisible = true;
    this.isProfileVisible = false;
    this.isBankDetailVisible = false;
    this.emitEvents();
  }

  private emitEvents() {
    this.toggleProfile.emit(this.isProfileVisible);
    this.toggleBankDetails.emit(this.isBankDetailVisible);
    this.toggleSendMoney.emit(this.isSendMoneyVisible);
  }
}
