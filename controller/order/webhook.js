// import Stripe from 'stripe';
import stripe from '../../config/stripes.js';
import dotenv from 'dotenv';
dotenv.config();

const endpointSecret = process.env.STRIPE_WEBHOOKSECRET_KEY;

const webhooks = async (request, response) => {
  let event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];

    const payloadString = JSON.stringify(request.body);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    try {
      event = stripe.webhooks.constructEvent(
        // request.body,
        payloadString,
        header,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      console.log(session);

      // get customer details
      const lineItems = await stripe.checkout.session.listLineItems(session.id);
      console.log(lineItems);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};
export default webhooks;
