import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';

// Initialize pdfMake with fonts
if (typeof window !== 'undefined') {
  pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;
}

const defaultFont = 'Helvetica';

// Define default fonts
const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  }
};

// Set fonts
pdfMake.fonts = fonts;

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

const getInvoiceNumber = () => {
  return `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const getCompanyAddress = () => ({
  name: 'Cargo Connect',
  address: '123 Export Street',
  city: 'Mumbai',
  country: 'India',
  email: 'support@cargoconnect.com',
  phone: '+91 123-456-7890'
});

const createInvoiceTemplate = (order, invoice) => {
  const companyAddress = getCompanyAddress();
  
  return {
    defaultStyle: {
      font: 'Helvetica'
    },
    content: [
      // Header
      {
        columns: [
          {
            stack: [
              { text: companyAddress.name, style: 'headerCompanyName' },
              { text: companyAddress.address },
              { text: `${companyAddress.city}, ${companyAddress.country}` },
              { text: companyAddress.email },
              { text: companyAddress.phone }
            ]
          },
          {
            stack: [
              { text: 'INVOICE', style: 'headerTitle' },
              { text: invoice.invoiceNumber, style: 'invoiceNumber' },
              { text: `Date: ${invoice.date}` },
              { text: `Due Date: ${invoice.dueDate}` }
            ],
            alignment: 'right'
          }
        ]
      },
      { text: '', margin: [0, 20] },
      
      // Bill To
      {
        columns: [
          {
            stack: [
              { text: 'Bill To:', style: 'subheader' },
              { text: order.customerName, style: 'customerName' },
              { text: order.destination },
              { text: `Order ID: ${order.orderId}` }
            ]
          },
          {
            stack: [
              { text: 'Ship To:', style: 'subheader' },
              { text: order.customerName },
              { text: order.destination }
            ]
          }
        ]
      },
      { text: '', margin: [0, 20] },
      
      // Items Table
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Item Description', style: 'itemsTableHeader' },
              { text: 'Quantity', style: 'itemsTableHeader' },
              { text: 'Unit Price', style: 'itemsTableHeader' },
              { text: 'Amount', style: 'itemsTableHeader' }
            ],
            ...order.items.map(item => [
              item.name,
              item.quantity.toString(),
              formatCurrency(item.price, invoice.currency),
              formatCurrency(item.quantity * item.price, invoice.currency)
            ])
          ]
        },
        style: 'itemsTable'
      },
      { text: '', margin: [0, 20] },
      
      // Summary
      {
        layout: 'noBorders',
        table: {
          widths: ['*', 'auto'],
          body: [
            [{ text: 'Subtotal:', style: 'label' }, { text: formatCurrency(invoice.subtotal, invoice.currency), style: 'value', alignment: 'right' }],
            [{ text: 'Tax (10%):', style: 'label' }, { text: formatCurrency(invoice.taxAmount, invoice.currency), style: 'value', alignment: 'right' }],
            [{ text: 'Shipping:', style: 'label' }, { text: formatCurrency(invoice.shippingCost, invoice.currency), style: 'value', alignment: 'right' }],
            [
              { text: 'Total:', style: 'totalsTable' },
              { text: formatCurrency(invoice.total, invoice.currency), style: 'totalsTable', alignment: 'right' }
            ]
          ]
        }
      },
      
      // Footer
      {
        stack: [
          { text: '', margin: [0, 20] },
          { text: 'Payment Terms', style: 'subheader' },
          { text: 'Payment is due within 30 days' },
          { text: '', margin: [0, 10] },
          { text: 'Thank you for your business!', style: 'thankYou' }
        ]
      }
    ],
    styles: {
      headerCompanyName: {
        font: defaultFont,
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      headerTitle: {
        font: defaultFont,
        fontSize: 30,
        bold: true,
        color: '#2E5B82'
      },
      invoiceNumber: {
        font: defaultFont,
        fontSize: 14,
        bold: true
      },
      label: {
        font: defaultFont,
        fontSize: 12,
        bold: true
      },
      value: {
        font: defaultFont,
        fontSize: 12
      },
      itemsTable: {
        font: defaultFont,
        fontSize: 12,
        margin: [0, 30]
      },
      itemsTableHeader: {
        font: defaultFont,
        fontSize: 12,
        bold: true,
        fillColor: '#EEEEEE'
      },
      totalsTable: {
        font: defaultFont,
        fontSize: 12,
        bold: true
      },
      thankYou: {
        font: defaultFont,
        alignment: 'center',
        italics: true,
        fontSize: 12
      }
    }
  };
};

export const generateInvoice = async (order) => {
  try {
    if (!order || !order.items || !Array.isArray(order.items)) {
      throw new Error('Invalid order data');
    }

    // Calculate invoice details
    const subtotal = order.items.reduce((sum, item) => {
      if (!item.quantity || !item.price) {
        throw new Error('Invalid item data: missing quantity or price');
      }
      return sum + (item.quantity * item.price);
    }, 0);

    const taxRate = 0.1;
    const taxAmount = subtotal * taxRate;
    const shippingCost = order.shippingCost || 0;
    const total = subtotal + taxAmount + shippingCost;

    // Create invoice data
    const invoice = {
      invoiceNumber: getInvoiceNumber(),
      date: new Date().toLocaleDateString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      currency: order.currency || 'USD',
      subtotal,
      taxAmount,
      shippingCost,
      total
    };

    // Generate PDF document
    const docDefinition = createInvoiceTemplate(order, invoice);
    const pdfDoc = pdfMake.createPdf(docDefinition);

    // Return promise that resolves with invoice data and PDF
    return new Promise((resolve, reject) => {
      try {
        pdfDoc.getBlob((blob) => {
          try {
            // Create URL for preview
            const pdfUrl = URL.createObjectURL(blob);
            
            // Save the PDF
            const fileName = `${invoice.invoiceNumber}.pdf`;
            saveAs(blob, fileName);

            // Resolve with invoice data
            resolve({
              ...invoice,
              pdfUrl,
              fileName
            });
          } catch (error) {
            reject(new Error('Failed to process PDF: ' + error.message));
          }
        });
      } catch (error) {
        reject(new Error('Failed to generate PDF: ' + error.message));
      }
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};
