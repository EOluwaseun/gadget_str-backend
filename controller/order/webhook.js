// import Stripe from 'stripe';
import stripe from '../../config/stripes.js';
import dotenv from 'dotenv';
import Order from '../../model/Order.js';
import Cart from '../../model/Cart.js';
dotenv.config();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
// console.log(endpointSecret);

async function getLineItems(lineItems) {
  let productItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      productItems.push(productData);
    }
  }
  return productItems;
}

const webhooks = async (request, response) => {
  // console.log(endpointSecret);

  // Get the signature sent by Stripe
  const signature = request.headers['stripe-signature'];

  const payloadString = JSON.stringify(request.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });
  // console.log(header);
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      // request.body,
      payloadString,
      header,
      // signature,
      endpointSecret
    );
    // console.log(event);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return response.sendStatus(400);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // console.log(session);

      // get customer details
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      // console.log(lineItems);
      // console.log(session.amount_total);
      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },

        shipping_options: session.shipping_options.map((s) => {
          return {
            ...s,
            shipping_amount: s.shipping_amount / 100,
            //this format the shipping amount
          };
        }),
        totalAmount: session.amount_total / 100,
      };

      const order = new Order(orderDetails);
      const saveOrder = await order.save();

      //remove all product from cart if it's save succesfull
      if (saveOrder) {
        const deleteCartItems = await Cart.deleteMany({
          userId: session.metadata.userId,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};
export default webhooks;
