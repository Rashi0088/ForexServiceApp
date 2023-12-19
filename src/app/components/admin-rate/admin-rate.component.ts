import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppState, selectUser } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
interface Rate {
  id: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  date: string;
  // Add any other properties that are present in the rate objects
}

@Component({
  selector: 'app-admin-rate',
  templateUrl: './admin-rate.component.html',
  styleUrls: ['./admin-rate.component.css']
})


export class AdminRateComponent implements OnInit {
  rates: any;
  currentRate: any; // Add this to hold the currently editing rate
  modalRef!: BsModalRef; // Using non-null assertion operator
  @ViewChild('editRateModal') editRateModal!: TemplateRef<any>; // Using non-null assertion operator
  newRate: any = {}; // Object for new rate
  @ViewChild('addRateModal') addRateModal!: TemplateRef<any>;
  adminId: number | null = null; // Property to hold admin ID
  sortField: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private httpClient: HttpClient, private modalService: BsModalService, private store: Store<AppState>) {
    this.retrieveAdminId();
    this.fetchExchangeRates();
  }

  ngOnInit(): void {
    this.fetchExchangeRates();
    this.retrieveAdminId();
  }

  sortRates(field: keyof Rate) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.rates.sort((a: Rate, b: Rate) => {
      if (a[field] < b[field]) return this.sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
  retrieveAdminId() {
    this.store.select(selectUser).pipe(
      map(user => {
        if (user && user.adminId) {
          this.adminId = user.adminId; // Set admin ID
        }
      })
    ).subscribe();
  }
  openEditModal(rate: any) {
    console.log('Editing rate:', rate); // Log to check if 'id' is present
    this.currentRate = { ...rate };
    this.modalRef = this.modalService.show(this.editRateModal);
  }

  closeEditModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
  updateExchangeRate() {
    this.httpClient.put('http://localhost:8080/exchangeRate/update', this.currentRate)
      .subscribe(
        (updatedRate: any) => {
          this.fetchExchangeRates(); // Refresh rates list
          this.currentRate = null; // Reset the currentRate
          this.closeEditModal(); // Close the modal
        },
        (error) => {
          console.error('Error updating exchange rate:', error);
        }
      );
  }

  fetchExchangeRates() {
    // Update 'rate/all' with the correct endpoint for your API
    this.httpClient.get('http://localhost:8080/rate/all').subscribe(
      (data: any) => {
        console.log(data)
        this.rates = data;
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  openAddRateModal() {
    this.newRate = {}; // Reset the new rate object
    this.modalRef = this.modalService.show(this.addRateModal);
  }

  addExchangeRate() {
    const payload = {
      ...this.newRate,
      adminId: this.adminId // Include admin ID
    };
    console.log(payload);
    this.httpClient.post('http://localhost:8080/rate/save', payload)
      .subscribe(
        (response) => {
          this.fetchExchangeRates(); // Refresh the rates list
          this.modalRef.hide(); // Close the modal
        },
        (error) => {
          console.error('Error adding exchange rate:', error);
        }
      );
  }

  // Remove the duplicate method openEditModal
  // Remove the openDeleteModal method if not implemented yet
}
