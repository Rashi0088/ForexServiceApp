// currency-converter.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState, selectIsLoggedIn, selectUser } from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  popupState: boolean = false;
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
  selectedFromCountry: string = ''; // Replace with actual default value
  selectedToCountry: string = ''; // Replace with actual default value
  senderName: string = 'Your Name';
  fixedFees: { [key: string]: number } = {
    'USD': 1.00,
    'EUR': 0.50,
    'INR': 50.00,
    // Add fixed fees for other currencies as required
  };
  @ViewChild(TransactionFormComponent) transactionFormComponent!: TransactionFormComponent;

  constructor(private http: HttpClient, private store: Store<AppState>, private router: Router) {
    this.loadCurrencyList();
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe((user) => {
      this.senderName = user?.name || 'Default Name'; // Use a default name if user name is not available
    });

    // Set default countries based on default currencies
    this.selectedFromCountry = this.getCountryByCurrency(this.selectedFromCurrency);
    this.selectedToCountry = this.getCountryByCurrency(this.selectedToCurrency);
  }
  togglePopupState() {
    this.popupState = !this.popupState;
  }

  getStarted() {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // this.router.navigate(['/home']);
        console.log('check popup state', this.popupState)
        this.togglePopupState()
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  loadCurrencyList() {
    // Load your currency list here, possibly from an API or a static list
    this.currencyList = ['USD', 'EUR', 'INR']; // Example static list
  }

  onCurrencyChange() {
    if (this.amountToSend > 0) {
      this.calculate();
    }
    // Example logic to update country based on currency
    this.store.select(selectUser).subscribe((user) => {
      this.senderName = user.name;

    });
    this.selectedFromCountry = this.getCountryByCurrency(this.selectedFromCurrency);
    this.selectedToCountry = this.getCountryByCurrency(this.selectedToCurrency);
  }
  getCountryByCurrency(currency: string): string {
    switch (currency) {
      case 'USD': return 'United States';
      case 'EUR': return 'Europe';
      case 'INR': return 'India';
      // ... other cases ...
      default: return '';
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

  calculateSavings() {
    const standardRate = 85; // Placeholder for a standard rate
    const potentialSavings = (this.amountToSend * standardRate) - this.amountReceived;
    this.savings = potentialSavings > 0 ? +potentialSavings.toFixed(2) : 0;
  }
}
