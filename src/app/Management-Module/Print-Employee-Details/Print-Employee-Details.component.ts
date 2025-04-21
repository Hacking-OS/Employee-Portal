import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-print-employee-details',
  standalone: false,
  template: `
  <div id="print-section">
<!-- Your printable section -->
  <h2>Invoice #1234</h2>
  <p>Date: {{ today | date }}</p>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of invoiceItems">
        <td>{{ item.name }}</td>
        <td>{{ item.qty  }}</td>
        <td>{{ item.price | currency }}</td>
        <td>{{ item.qty * item.price | currency  }}</td>
      </tr>
    </tbody>
  </table>

  <h3>Total: {{ getTotal() | currency  }}</h3>
</div>

<!-- Print Button -->
<!-- <button class="btn btn-primary mt-3" (click)="printInvoice()">🖨️ Print Invoice</button> -->

<button class="btn btn-info rounded-pill text-white" (click)="printInvoice()">🖨️  Print</button>
  `,
  styleUrl: './Print-Employee-Details.component.css',
})
export class PrintEmployeeDetailsComponent {
  today = new Date();
  invoiceItems = [
    { name: 'Product A', qty: 2, price: 500 },
    { name: 'Product B', qty: 1, price: 1200 },
    { name: 'Product C', qty: 3, price: 300 },
  ];
  
  getTotal() {
    return this.invoiceItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  }


  printInvoice() {
    const printContent = document.getElementById('print-section');
  
    if (printContent) {
      const printHTML = `
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `;
  
      const blob = new Blob([printHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  }
  // print() {
  //   const printContents = document.getElementById('print-section')?.innerHTML;
  //   const popupWin = window.open('', '_blank', 'width=800,height=600');
  //   popupWin?.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Preview</title>
  //         <style>
  //           /* Add print-specific CSS here */
  //         </style>
  //       </head>
  //       <body onload="window.print();window.close()">
  //         ${printContents}
  //       </body>
  //     </html>`);
  //   popupWin?.document.close();
  // }

 }
