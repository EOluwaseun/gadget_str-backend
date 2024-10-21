import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default stripe;
