import 'server-only';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { users } from './db/schema';

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

export async function createUser(user: NewUser) {
    return await db.insert(users).values(user);
}