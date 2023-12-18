import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-rate',
  templateUrl: './admin-rate.component.html',
  styleUrls: ['./admin-rate.component.css']
})
export class AdminRateComponent implements OnInit {
  rates: any;

  constructor( private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    // Update 'rate/all' with the correct endpoint for your API
    this.httpClient.get('http://localhost:8080/rate/all').subscribe(
      (data: any) => {
        this.rates = data;
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  openEditModal(_t14: any) {
    // Implement your logic for opening edit modal
  }

  openDeleteModal(_t13: any) {
    // Implement your logic for opening delete modal
  }
}
