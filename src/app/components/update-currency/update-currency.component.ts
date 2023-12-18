import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-update-currency',
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.css']
})
export class UpdateCurrencyComponent implements OnInit {
  rateId: string="";
  rate: any = {
    fromCurrency: '',
    toCurrency: '',
    rate: null,
    date: null
  };

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rateId = params['id'];
      this.fetchRateDetails();
    });
  }

  fetchRateDetails() {
    // Fetch rate details by ID from your API using HttpClient
    this.httpClient.get(`your_api_base_url/rate/${this.rateId}`).subscribe(
      (data: any) => {
        this.rate = data;
        // Convert date string to a JavaScript Date object
        this.rate.date = new Date(data.date);
      },
      (error) => {
        console.error('Error fetching rate details:', error);
      }
    );
  }

  updateRate() {
    // Implement logic to update the rate in your API
    // You can use this.httpClient.put or this.httpClient.patch based on your API requirements
    // and send the updated rate object to the server

    // For example, assuming you have an 'update-rate' API endpoint
    this.httpClient.put(`your_api_base_url/update-rate/${this.rateId}`, this.rate).subscribe(
      (data: any) => {
        // Handle success, such as navigating to another page
        this.router.navigate(['/admin-rates']);
      },
      (error) => {
        console.error('Error updating rate:', error);
        // Handle error if needed
      }
    );
  }
}
