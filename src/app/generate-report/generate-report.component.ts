import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState, selectUser } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {
  transactions: any[] = [];
  senderName = ''; // Replace with the actual sender name

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select(selectUser).subscribe((user) => {
      this.senderName = user?.name || 'Default Name'; // Use a default name if user name is not available
    });
    this.fetchTransactions();
  }

  fetchTransactions() {
    console.log(this.senderName)
    this.http.get(`http://localhost:8080/transaction/sender/${this.senderName}`).subscribe(
      (data: any) => {
        this.transactions = data;
        console.log(this.transactions)
      },
      error => console.error(error)
    );
  }

  generatePDF(transaction: any) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('Forex Service', 105, 15, { align: 'center' }); // Centered header

    // Watermark
    doc.setFontSize(40);
    doc.setTextColor(200);
    doc.text('Forex Service', 105, 150, { align: 'center', angle: -45 }); // Semi-transparent watermark

    // Resetting font for body
    doc.setFontSize(12);
    doc.setTextColor(0);

    // const transposedData = [
    //   ['Transaction ID'],
    //   ['From Country'],
    //   ['To Country'],
    //   ['Sender Name'],
    //   ['Receiver Name'],
    //   ['Sender Account No.'],
    //   ['Receiver Account No.'],
    //   ['Sending Currency'],
    //   ['Receiving Currency'],
    //   ['Sending Amount'],
    //   ['Total Amount'],
    //   ['Transaction Date']
    // ].map((header, index) => {
    //   return [header[0], transaction[index]]; // Combine header and data
    // });
    const transposedData = Object.keys(transaction).map((key) => {
      return [key, transaction[key]]; // Combine key and value
    });

    
    autoTable(doc, {
      startY: 30,
      head: [['Attribute', 'Value']], // Updated header for transposed data
      body: transposedData,
      theme: 'grid', // or 'striped' or 'plain'
      headStyles: { fillColor: [22, 160, 133] }, // Customize header background color
      margin: { top: 30 }
    });

    // Save the PDF
    doc.save(`TransactionReport-${transaction.transactionId}.pdf`);
  }

}
