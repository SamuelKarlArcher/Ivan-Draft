const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Replace this with your actual Yoco secret key
const YOCO_SECRET_KEY = 'sk_test_xxxxxxxxxxxx'; // Get this from Yoco Portal (never expose in client-side code)

app.post('/create-checkout', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        // Make the POST request to Yoco Checkout API
        const response = await axios.post(
            'https://payments.yoco.com/api/checkouts',
            {
                amount: amount, // e.g., 900 (R9.00 in cents)
                currency: currency, // e.g., "ZAR"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${YOCO_SECRET_KEY}`,
                },
            }
        );

        // Send the redirectUrl back to the client
        res.json({ redirectUrl: response.data.redirectUrl });
    } catch (error) {
        console.error('Error creating checkout:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to create checkout' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});