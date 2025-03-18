require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

app.use(express.json());

app.post('/create-checkout', async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const response = await axios.post(
            'https://payments.yoco.com/api/checkouts',
            { amount, currency },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${YOCO_SECRET_KEY}`,
                },
            }
        );
        res.json({ redirectUrl: response.data.redirectUrl });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to create checkout' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
