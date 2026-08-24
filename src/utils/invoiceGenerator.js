import LogoImage from '../assets/logo.png';

/**
 * Formats and triggers print/download of an official Likesszon Tax Invoice
 * compact 1-page layout with brand Maroon (#8a0025) styling & contact info.
 */
export const generateAndDownloadInvoice = (order) => {
  if (!order) return;

  const invoiceNo = `INV-${order.id}`;
  const orderDate = new Date(order.date || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const customerName = order.customerName || order.name || 'Valued Customer';
  const customerEmail = order.customerEmail || order.email || 'N/A';
  const address = order.shippingDetails?.address || order.address || 'Address not specified';
  const city = order.shippingDetails?.city || order.city || '';
  const zip = order.shippingDetails?.zip || order.zip || '';
  const paymentMethod = (order.paymentMethod || 'Card').toUpperCase();
  const paymentStatus = (order.paymentStatus || 'PAID').toUpperCase();
  const items = order.items || [];

  const subtotal = items.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0) || order.total || 0;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const totalAmount = order.total || (subtotal + gstAmount);

  // Convert image URL to absolute URL if needed for iframe
  const logoSrc = LogoImage.startsWith('http') || LogoImage.startsWith('data:') 
    ? LogoImage 
    : `${window.location.origin}${LogoImage}`;

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Likesszon Tax Invoice - ${invoiceNo}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          
          * { box-sizing: border-box; margin: 0; padding: 0; }
          
          body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0f172a;
            background: #ffffff;
            padding: 16px;
            font-size: 11px;
            line-height: 1.4;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .invoice-card {
            max-width: 800px;
            margin: auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px 28px;
          }

          /* Header Section */
          .header-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 16px;
            border-bottom: 1.5px solid #fde2e4;
          }

          .brand-box {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .brand-logo {
            height: 48px;
            width: 48px;
            object-fit: contain;
            border-radius: 12px;
            background: #fdf2f4;
            padding: 3px;
            border: 1px solid #fbcacf;
          }

          .brand-name {
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #8a0025; /* Maroon Brand Color */
          }

          .brand-contact {
            font-size: 10px;
            color: #475569;
            font-weight: 500;
            margin-top: 2px;
            line-height: 1.3;
          }

          .invoice-badge-box {
            text-align: right;
          }

          .invoice-pill {
            display: inline-block;
            background: #8a0025; /* Maroon Brand Color */
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            padding: 4px 12px;
            border-radius: 50px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .invoice-no {
            font-size: 12px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 6px;
          }

          .invoice-date {
            font-size: 10px;
            color: #64748b;
            font-weight: 600;
          }

          /* Details Grid */
          .details-grid {
            display: flex;
            gap: 16px;
            margin-top: 16px;
            margin-bottom: 16px;
          }

          .info-card {
            flex: 1;
            background: #fdf2f4;
            border: 1px solid #fbcacf;
            border-radius: 14px;
            padding: 14px 16px;
          }

          .info-title {
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
            color: #8a0025;
            letter-spacing: 0.8px;
            margin-bottom: 6px;
          }

          .customer-name {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 2px;
          }

          .address-text {
            font-size: 10.5px;
            color: #334155;
            line-height: 1.5;
          }

          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
            font-size: 9.5px;
            font-weight: 800;
            padding: 2px 8px;
            border-radius: 50px;
            margin-top: 4px;
          }

          /* Table Styling */
          .items-section {
            margin-bottom: 16px;
          }

          .section-heading {
            font-size: 11px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .items-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
          }

          .items-table th {
            background: #8a0025;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 10px 16px;
            text-align: left;
            letter-spacing: 0.5px;
          }

          .items-table td {
            padding: 10px 16px;
            border-bottom: 1px solid #f1f5f9;
            color: #1e293b;
            font-size: 11px;
            vertical-align: middle;
          }

          .num-col {
            font-variant-numeric: tabular-nums;
            font-feature-settings: "tnum";
            text-align: left !important;
          }

          .text-left { text-align: left !important; }
          .font-bold { font-weight: 700; }

          .items-table tr:last-child td {
            border-bottom: none;
          }

          .product-cell {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .product-img {
            height: 32px;
            width: 32px;
            object-fit: contain;
            border-radius: 6px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 2px;
          }

          .product-title {
            font-weight: 700;
            color: #0f172a;
            font-size: 11px;
          }

          .text-right { text-align: right; }
          .text-center { text-align: center; }

          /* Calculations & Totals */
          .summary-row {
            display: flex;
            justify-content: flex-end;
          }

          .totals-card {
            width: 280px;
            background: #fdf2f4;
            border: 1px solid #fbcacf;
            border-radius: 14px;
            padding: 12px 16px;
          }

          .totals-line {
            display: flex;
            justify-content: space-between;
            font-size: 10.5px;
            color: #475569;
            padding: 3px 0;
          }

          .totals-line strong {
            color: #1e293b;
          }

          .grand-total-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 800;
            color: #8a0025;
            border-top: 1.5px dashed #fbcacf;
            margin-top: 6px;
            padding-top: 6px;
          }

          /* Footer Guarantee & Signatory */
          .footer-section {
            margin-top: 20px;
            padding-top: 14px;
            border-top: 1.5px solid #fde2e4;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }

          .guarantee-box {
            max-width: 460px;
          }

          .guarantee-title {
            font-size: 10px;
            font-weight: 800;
            color: #8a0025;
            margin-bottom: 2px;
          }

          .guarantee-desc {
            font-size: 9.5px;
            color: #64748b;
            line-height: 1.4;
          }

          .signatory-box {
            text-align: right;
          }

          .signatory-name {
            font-size: 10.5px;
            font-weight: 800;
            color: #8a0025;
          }

          .signatory-role {
            font-size: 8.5px;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 1px;
          }

          @media print {
            body { padding: 0; background: #ffffff; }
            .invoice-card { border: none; box-shadow: none; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-card">
          
          <!-- Brand & Invoice Banner -->
          <div class="header-row">
            <div class="brand-box">
              <img src="${logoSrc}" alt="Likesszon Logo" class="brand-logo" />
              <div>
                <div class="brand-name">Likesszon</div>
                <div class="brand-contact">
                  <strong>Visit Us:</strong> New Area 1St Gali Okni near Joda shiv temple ward 20, Hazaribagh, Jharkhand, 825301<br />
                  <strong>Phone / Contact:</strong> +91 9304264241 | GSTIN: 29AAAAA0000A1Z5
                </div>
              </div>
            </div>

            <div class="invoice-badge-box">
              <div class="invoice-pill">Tax Invoice</div>
              <div class="invoice-no">${invoiceNo}</div>
              <div class="invoice-date">Date: ${orderDate}</div>
            </div>
          </div>

          <!-- Customer & Order Information Grid -->
          <div class="details-grid">
            <div class="info-card">
              <div class="info-title">Billed & Delivered To</div>
              <div class="customer-name">${customerName}</div>
              <div class="address-text">
                ${address}<br />
                ${city} ${zip ? `- ${zip}` : ''}<br />
                Email: <strong>${customerEmail}</strong>
              </div>
            </div>

            <div class="info-card">
              <div class="info-title">Payment & Order Summary</div>
              <div class="address-text">
                <strong>Order ID:</strong> ${order.id}<br />
                <strong>Payment Method:</strong> ${paymentMethod}<br />
                <strong>Delivery Speed:</strong> Free Express Shipping (3-5 Days)<br />
                <span class="status-badge">✓ ${paymentStatus}</span>
              </div>
            </div>
          </div>

          <!-- Order Items Table -->
          <div class="items-section">
            <div class="section-heading">Purchased Items (${items.length})</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 40px;" class="text-center">#</th>
                  <th>Product Description</th>
                  <th class="text-left" style="width: 130px;">Unit Price</th>
                  <th class="text-center" style="width: 70px;">Qty</th>
                  <th class="text-left" style="width: 130px;">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item, idx) => {
                  const itemThumb = item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                  const itemPrice = item.price || 0;
                  const itemQty = item.quantity || 1;
                  const itemTotal = itemPrice * itemQty;
                  return `
                    <tr>
                      <td class="text-center font-bold">${idx + 1}</td>
                      <td>
                        <div class="product-cell">
                          <img src="${itemThumb}" alt="" class="product-img" />
                          <span class="product-title">${item.name}</span>
                        </div>
                      </td>
                      <td class="text-left num-col">₹${itemPrice.toFixed(2)}</td>
                      <td class="text-center font-bold">${itemQty}</td>
                      <td class="text-left num-col"><strong>₹${itemTotal.toFixed(2)}</strong></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Financial Calculation Breakdown -->
          <div class="summary-row">
            <div class="totals-card">
              <div class="totals-line">
                <span>Items Subtotal:</span>
                <strong>₹${subtotal.toFixed(2)}</strong>
              </div>
              <div class="totals-line">
                <span>GST (18% Included):</span>
                <strong>₹${gstAmount.toFixed(2)}</strong>
              </div>
              <div class="totals-line">
                <span>Shipping & Handling:</span>
                <strong style="color: #059669;">FREE</strong>
              </div>
              <div class="grand-total-line">
                <span>Grand Total:</span>
                <span>₹${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <!-- Footer Guarantees & Signatory Stamp -->
          <div class="footer-section">
            <div class="guarantee-box">
              <div class="guarantee-title">🛡️ Likesszon Purchase Protection & Guarantee</div>
              <div class="guarantee-desc">
                Valid proof of purchase for 7-day hassle-free returns & warranty. For support, call +91 9304264241 or visit New Area 1St Gali Okni near Joda shiv temple ward 20, Hazaribagh, Jharkhand, 825301.
              </div>
            </div>

            <div class="signatory-box">
              <div class="signatory-name">Likesszon Pvt Ltd</div>
              <div class="signatory-role">Authorized Signatory</div>
            </div>
          </div>

        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  // Create temporary iframe for invisible background print triggering
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  document.body.appendChild(iframe);
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(invoiceHTML);
  doc.close();

  // Cleanup after printing
  setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch (e) {
      // Ignore
    }
  }, 3000);
};
