import { formatCurrency } from './cart-utils';

interface InvoiceData {
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  createdAt: string;
}

export function generateInvoiceHTML(data: InvoiceData): string {
  const { orderId, customer, items, pricing, createdAt } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice - ${orderId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #7C3AED; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #7C3AED; margin-bottom: 10px; }
        .invoice-title { font-size: 28px; color: #333; margin-bottom: 10px; }
        .invoice-meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #7C3AED; }
        .customer-info { background: #f8f9fa; padding: 15px; border-radius: 8px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .items-table th { background: #7C3AED; color: white; font-weight: bold; }
        .items-table tr:hover { background: #f8f9fa; }
        .total-section { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .total-row.final { font-weight: bold; font-size: 18px; border-top: 2px solid #7C3AED; padding-top: 10px; margin-top: 10px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        @media print {
          body { print-color-adjust: exact; }
          .container { max-width: none; margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="logo">QueenKay Importation</div>
          <div class="invoice-title">INVOICE</div>
        </div>

        <!-- Invoice Meta -->
        <div class="invoice-meta">
          <div>
            <strong>Invoice Number:</strong> ${orderId}<br>
            <strong>Date:</strong> ${new Date(createdAt).toLocaleDateString()}
          </div>
          <div style="text-align: right;">
            <strong>Status:</strong> <span style="color: #28a745;">Paid</span>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="section">
          <div class="section-title">Bill To:</div>
          <div class="customer-info">
            <strong>${customer.firstName} ${customer.lastName}</strong><br>
            Email: ${customer.email}<br>
            ${customer.phone ? `Phone: ${customer.phone}` : ''}
          </div>
        </div>

        <!-- Items -->
        <div class="section">
          <div class="section-title">Items:</div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td style="text-align: center;">${item.qty}</td>
                  <td style="text-align: right;">${formatCurrency(item.price)}</td>
                  <td style="text-align: right;">${formatCurrency(item.price * item.qty)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div class="total-section">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>${formatCurrency(pricing.subtotal)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>${pricing.shipping === 0 ? 'Free' : formatCurrency(pricing.shipping)}</span>
          </div>
          <div class="total-row">
            <span>Tax (12.5%):</span>
            <span>${formatCurrency(pricing.tax)}</span>
          </div>
          <div class="total-row final">
            <span>Total Amount:</span>
            <span>${formatCurrency(pricing.total)}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>For questions about this invoice, contact us at support@queenkay.com</p>
          <p style="margin-top: 10px; font-size: 12px;">
            QueenKay Importation - Premium products from around the world
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function downloadInvoice(data: InvoiceData): void {
  const html = generateInvoiceHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${data.orderId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function printInvoice(data: InvoiceData): void {
  const html = generateInvoiceHTML(data);
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}