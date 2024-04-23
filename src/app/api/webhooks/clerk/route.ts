import { Webhook, type WebhookUnbrandedRequiredHeaders } from 'svix';
import { buffer } from 'micro'
import { env } from '~/env';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { stripe } from '~/lib/stripe';
import { type NewUser, createUser } from '~/server/queries';

// TODO: Switch this for CLERK WEBHOOK SECRET when building
const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: any) {

    const payload = (await buffer(req)).toString();
    const headers: WebhookUnbrandedRequiredHeaders = req.headers;
    const webhook = new Webhook(secret);
    let msg;
    try {
        msg = webhook.verify(payload, headers);
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const whEvent = msg as WebhookEvent;
    switch (whEvent.type) {
        case 'user.created':
            const stripeCustomer = await stripe.customers.create({
                email: whEvent.data.email_addresses.at(0)?.email_address
            });

            const newUser: NewUser = {
                id: whEvent.data.id,
                email: stripeCustomer.email!,
                stripeCustomerId: stripeCustomer.id,
                stripeSubscriptionId: ''
            }

            await createUser(newUser);

    }
}
