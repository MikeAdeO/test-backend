import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import cors from 'cors';
import express, { json } from 'express';
import { APP, PAYSTACK } from './config/variable.js';
import { validateInitializePayment } from './middleware/validate.middleware.js';

const app = express();
app.use(json());
app.use(cors());

const PAYSTACK_SECRET_KEY = PAYSTACK.SECRET_KEY;
const PAYSTACK_BASE_URL = PAYSTACK.BASE_URL;

app.post(`${APP.VERSION}initialize-payment`, validateInitializePayment, async (req, res) => {
  const { email, amount, callback_url } = req.body;

  try {

    if(!email || amount){

    }
    const amountToKobo = amount * 100;
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      { email, amount:amountToKobo, callback_url , currency: "NGN"},
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json({
        success: true,
        data: {
            url:response.data.data.authorization_url,
            reference:response.data.data.reference
        }
    });
  } catch (error) {
    console.log(123, error)
    res.status(500).json({ error: error.response?.data || 'An error occurred' });
  }
});

app.get(`${APP.VERSION}verify-payment/:reference`, async (req, res) => {
  const { reference } = req.params;
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response?.data || 'An error occurred' , success:false});
  }
});

const PORT = APP.PORT || 6898;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
