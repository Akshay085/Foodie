const billMail = (order) =>  {
    return `<html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
                    .header { text-align: center; font-size: 24px; font-weight: bold; }
                    .details { margin-top: 20px; }
                    .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    table, th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Order Invoice</div>
                    <div class="details">
                        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map((item) => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>₹${item.price}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                    <p><strong>Subtotal:</strong> ₹${order.subTotal}</p>
                    <p><strong>GST:</strong> ₹${order.gst}</p>
                    <p><strong>Delivery Charge:</strong> ₹${order.delCharge}</p>
                    <p><strong>Discount:</strong> -₹${order.discount}</p>
                    <p><strong>Total:</strong> ₹${order.amount}</p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                    <p><strong>Delivery Type:</strong> ${order.delType}</p>
                    <div class="footer">Thank you for your order!</div>
                </div>
            </body>
        </html>`;
};

export {billMail}