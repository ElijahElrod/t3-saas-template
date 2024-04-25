import 'server-only';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { users } from './db/schema';
import { stripe } from '~/lib/stripe';
import Stripe from 'stripe';

/**
 * Template Query to base future queries from, 
 * uses auth check to get per-user data
 * 
 * @returns user data
 *

export async function getTemplateQuery() {

    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    const tmp = await db.query.users.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId)
    });
    return tmp;
}
*/


export type NewUser = typeof users.$inferInsert;
export type CurrUser = typeof users.$inferSelect;

export type ActiveSubscriber = {
    customer: CurrUser | null,
    subscription: Stripe.Subscription | null
};

export async function createUser(user: NewUser) {
    return await db.insert(users).values(user);
}

export async function fetchSignedInUser(): Promise<CurrUser | undefined | null> {

    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    return await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, user.userId)
    });
}

export async function fetchActiveSubscriberInfo(): Promise<ActiveSubscriber> {

    const user = await fetchSignedInUser();

    if (!user) {
        return {
            customer: null,
            subscription: null
        };
    }

    const subscriptionId = user?.stripeSubscriptionId;

    if (!subscriptionId || subscriptionId == '') {
        return {
            customer: user,
            subscription: null
        };
    }

    const currentSubscription = await stripe.subscriptions.retrieve(subscriptionId);

    return {
        customer: user,
        subscription: currentSubscription,
    }

}