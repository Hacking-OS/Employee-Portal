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
            <td>{{ item.qty }}</td>
            <td>{{ item.price | currency }}</td>
            <td>{{ item.qty * item.price | currency }}</td>
          </tr>
        </tbody>
      </table>

      <h3>Total: {{ getTotal() | currency }}</h3>
    </div>

    <!-- Print Button -->
    <!-- <button class="btn btn-primary mt-3" (click)="printInvoice()">🖨️ Print Invoice</button> -->

    <button
      class="btn btn-info rounded-pill text-white"
      (click)="printInvoice()"
    >
      🖨️ Print
    </button>
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
    return this.invoiceItems.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
  }

  printInvoice() {
    const printContent = document.getElementById('print-section');

    if (printContent) {
      const printHTML = `<html>
  <head>
    <title>Print View</title>
    <style>
      body {
        margin: 0;
        padding: 40px;
        font-family: 'Segoe UI', Roboto, sans-serif;
        background-color: #f8f9fa;
        color: #212529;
      }

      .print-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 40px;
        max-width: 1000px;
        margin: auto;
      }

      h1 {
        text-align: center;
        margin-bottom: 30px;
        font-size: 28px;
        color: #343a40;
      }

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
        border-radius: 8px;
      }

      thead {
        background-color: #343a40;
        color: white;
      }

      th, td {
        padding: 16px;
        text-align: left;
        font-size: 14px;
        border-bottom: 1px solid #dee2e6;
      }

      th {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: 0.5px;
      }

      tbody tr:nth-child(odd) {
        background-color: #f1f3f5;
      }

      tbody tr:nth-child(even) {
        background-color: #ffffff;
      }

      tbody tr:hover {
        background-color: #e9ecef;
        transition: background-color 0.3s ease;
      }

      @media print {
        body {
          padding: 0;
          background-color: white;
        }

        .print-container {
          box-shadow: none;
          padding: 20px;
          border-radius: 0;
        }

        thead {
          background-color: #343a40 !important;
          -webkit-print-color-adjust: exact;
        }

        tbody tr:nth-child(odd),
        tbody tr:nth-child(even),
        tbody tr:hover {
          background-color: transparent !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="print-container">
      <h1>Product Status Report</h1>
      ${printContent.innerHTML}
    </div>

    <script>
      window.onload = function () {
        window.print();
        window.onafterprint = function () {
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
