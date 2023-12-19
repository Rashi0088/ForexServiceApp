import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnChanges {
  @Input() fromCountry: string = '';
  @Input() toCountry: string = '';
  @Input() senderName: string = '';
  @Input() sendingCurrency: string = '';
  @Input() receivingCurrency: string = '';
  @Input() sendingAmount: number | null = null;
  @Output() popupStateChanged = new EventEmitter<boolean>();

  transaction: any = {
    receiverName: '',
    senderAccNo: null,
    receiverAccNo: null,
    transactionDate: null
  };

  ngOnChanges(changes: SimpleChanges) {
        // Update transaction object whenever input properties change
        for (const propName in changes) {
          if (changes.hasOwnProperty(propName)) {
            this.transaction[propName] = changes[propName].currentValue;
          }
        }
      }

  constructor(private http: HttpClient) { }

  submitTransaction() {
    const apiUrl = 'http://localhost:8080/transaction/save';
    this.http.post(apiUrl, this.transaction).subscribe(
      (response: any) => {
        // Handle the response here
        console.log('Transaction successful:', response);
        this.showSuccessAlert(); // Show success alert
        this.closeTransactionPopup();
      },
      (error) => {
        // Handle the error here
        console.error('Error occurred:', error);
        this.showErrorAlert(); // Show error alert
      }
    );
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Transaction Successful',
      text: 'Your transaction has been successfully submitted.',
    });
  }

  showErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Transaction Failed',
      text: 'An error occurred while processing your transaction. Please try again.',
    });
  }

  closeTransactionPopup() {
    this.popupStateChanged.emit(false);
  }
}

