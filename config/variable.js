import dotenv from 'dotenv';
dotenv.config();

export const PAYSTACK = {
    BASE_URL: process.env.PAYSTACK_BASE_URL,
    SECRET_KEY :process.env.PAYSTACK_SECRET_KEY
}

export const APP = {
    VERSION: "/api/v1/",
    PORT: process.env.PORT
}