import { stripe } from "./../../services/stripe";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { saveSubscription } from "../../pages/api/_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chuck of readable) {
    chunks.push(typeof chuck === "string" ? Buffer.from(chuck) : chuck);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const buf = await buffer(request);
    const secret = request.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return response.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );
            break;
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );
            break;

          default:
            throw new Error("Unhandled event");
        }
      } catch (err) {
        response.json({
          error: "Webhook handle failed",
        });
      }
    }

    response.json({
      received: true,
    });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
}
