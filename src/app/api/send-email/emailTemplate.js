export const generateEmailContent = ({ name, email, phone, message, selectedServices }) => {
    const totalPrice = selectedServices.reduce((sum, service) => 
        sum + parseInt(service.price), 0
    );

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16F4B9; border-bottom: 2px solid #16F4B9; padding-bottom: 10px;">
                New Service Inquiry
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h3 style="margin-top: 0;">Client Information:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h3 style="margin-top: 0;">Selected Services:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #16F4B9; color: #111;">
                        <th style="padding: 10px; text-align: left;">Service</th>
                        <th style="padding: 10px; text-align: left;">Package</th>
                        <th style="padding: 10px; text-align: right;">Price</th>
                    </tr>
                    ${selectedServices.map(service => `
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px;">${service.category}</td>
                            <td style="padding: 10px;">${service.package}</td>
                            <td style="padding: 10px; text-align: right;">$${service.price}</td>
                        </tr>
                    `).join('')}
                    <tr style="background-color: #f2f2f2; font-weight: bold;">
                        <td style="padding: 10px;" colspan="2">Total</td>
                        <td style="padding: 10px; text-align: right;">$${totalPrice}</td>
                    </tr>
                </table>
            </div>

            ${message ? `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="margin-top: 0;">Additional Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            ` : ''}

            <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
                <p>This is an automated email from your website's contact form.</p>
            </div>
        </div>
    `;
}; 