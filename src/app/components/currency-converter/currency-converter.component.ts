// currency-converter.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  amountToSend: number = 0;
  exchangeRate: number = 0;
  fees: number = 0;
  amountReceived: number = 0;
  savings: number = 0; // Add this property to your class
  selectedFromCurrency: string = 'USD'; // Default selection
  selectedToCurrency: string = 'INR'; // Default selection
  currencyList: string[] = []; // Will hold the list of currencies
  baseFee: number = 0; // Base fee for the transaction
  totalFees: number = 0; // Total of all fees
  rate: number = 0; // The exchange rate used for the conversion
  deliveryDate: string = ''; // Expected delivery date
  baseFeePercent: number = 0.5; // Hypothetical percentage fee for the transaction
  fixedFee: number = 1.50;
  baseFeeRate: number = 0.01; // Example base fee rate (1%)

  fixedFees: { [key: string]: number } = {
    'USD': 1.00,
    'EUR': 0.50,
    'INR': 50.00,
    // Add fixed fees for other currencies as required
  };

  constructor(private http: HttpClient) {
    this.loadCurrencyList();
  }

  loadCurrencyList() {
    // Load your currency list here, possibly from an API or a static list
    this.currencyList = ['USD', 'EUR', 'INR']; // Example static list
  }

  onCurrencyChange() {
    if (this.amountToSend > 0) {
      this.calculate();
    }
  }

  getExchangeRate(from: string, to: string): Observable<number> {
    const url = `http://localhost:8080/exchange-rate/${from}/${to}`;
    console.log(from, to);

    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }


  // calculate() {
  //   this.getExchangeRate(this.selectedFromCurrency, this.selectedToCurrency).subscribe(
  //     rate => {
  //       this.exchangeRate = rate;
  //       console.log(rate);
  //       this.fees = this.calculateFees(this.amountToSend);
  //       const amountReceived = (this.amountToSend - this.fees) * this.exchangeRate;
  //       this.amountReceived = +amountReceived.toFixed(2);
  //       this.calculateSavings(); // Call a method to calculate savings
  //     },
  //     error => {
  //       console.error('Error fetching exchange rate', error);
  //     }
  //   );
  // }
  calculate() {
    this.getExchangeRate(this.selectedFromCurrency, this.selectedToCurrency).subscribe(
      rate => {
        this.exchangeRate = rate;
        // Calculate fees based on the exchange rate and amount
        this.baseFee = this.calculateBaseFee(this.amountToSend);
        this.fixedFee = this.fixedFees[this.selectedFromCurrency] || 0;
        this.totalFees = this.baseFee + this.fixedFee;
        // Calculate the total amount to convert and the amount the recipient will get
        this.amountReceived = (this.amountToSend - this.totalFees) * this.exchangeRate;
        // Call method to calculate savings (if applicable)
        this.calculateSavings();
      },
      error => {
        console.error('Error fetching exchange rate', error);
      }
    );
  }
  calculateBaseFee(amount: number): number {
    // Calculate the base fee as a percentage of the amount being sent
    return amount * this.baseFeeRate;
  }
  // calculateFees(amount: number): number {
  //   const key = `${this.selectedFromCurrency}-${this.selectedToCurrency}`;
  //   const feePercentage = this.feesConfig[key] || 0.01; // Default fee percentage
  //   const fees = amount * feePercentage;
  //   return +fees.toFixed(2);
  // }
  calculateSavings() {
    // Implement your logic to calculate savings here
    // For example, compare with a standard rate and determine the difference
    // This is just a placeholder logic
    const standardRate = 85; // Placeholder for a standard rate
    const potentialSavings = (this.amountToSend * standardRate) - this.amountReceived;
    this.savings = potentialSavings > 0 ? +potentialSavings.toFixed(2) : 0;
  }
}
