import Stripe from "stripe"

import { env } from "~/env.js"

export enum StripeWebhooks {
    AsyncPaymentSuccess = 'checkout.session.async_payment_succeeded',
    Completed = 'checkout.session.completed',
    AsyncPaymentFailed = 'checkout.session.async_payment_failed',
    SubscriptionDeleted = 'customer.subscription.deleted',
    SubscriptionUpdated = 'customer.subscription.updated',
    InvoicePaid = 'invoice.paid'
}

export interface CreateCheckoutParams {
    returnUrl: string;
    userId: string;
    priceId: string;
    customerId?: string;

}

export type StringObject = Record<string, string>


export const stripe = new Stripe(env.STRIPE_API_KEY, {
    apiVersion: "2024-04-10",
    typescript: true,
})

/**
 * @name createBillingPortalSession
 * @description Creates a Stripe Billing Portal session, and returns an Object
 * containing the session, which you can use to redirect the user to the
 * billing portal page
 * @param params
 */
export async function createBillingPortalSession(params: {
    customerId: string;
    returnUrl: string;
}) {
    return stripe.billingPortal.sessions.create({
        customer: params.customerId,
        return_url: params.returnUrl
    })
}


/**
 * @name createStripeCheckout
 * @description Creates a Stripe Checkout session, and returns an Object
 * containing the session, which you can use to redirect the user to the
 * checkout page
 * @param params
 */
export async function createStripeCheckout(params: CreateCheckoutParams) {
    const successUrl = getUrlWithParams(params.returnUrl, {
        success: 'true',
    });

    const cancelUrl = getUrlWithParams(params.returnUrl, {
        cancel: 'true',
    });


    const clientReferenceId = params.userId

    // we pass an optional customer ID, so we do not duplicate the Stripe
    // customers if an organization subscribes multiple times

    const customer = params.customerId!
    const mode: Stripe.Checkout.SessionCreateParams.Mode = 'subscription';

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        quantity: 1,
        price: params.priceId,
    };

    return stripe.checkout.sessions.create({
        mode,
        customer,
        line_items: [lineItem],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: clientReferenceId as unknown as string,
    });
}


function getUrlWithParams(origin: string, params: StringObject) {
    const url = new URL(origin);
    const returnUrl = cleanParams(url);

    for (const param in params) {
        returnUrl.searchParams.set(param, params[param]!);
    }

    return returnUrl.toString();
}

function cleanParams(returnUrl: URL) {
    returnUrl.searchParams.delete('cancel');
    returnUrl.searchParams.delete('success');
    returnUrl.searchParams.delete('error');

    return returnUrl;
}