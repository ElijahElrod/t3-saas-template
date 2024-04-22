import 'server-only';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';

/**
 * Template Query to base future queries from, 
 * uses auth check to get per-user data
 * 
 * @returns user data
 */
export async function getTemplateQuery() {

    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    const tmp = await db.query.posts.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId)
    });
    return tmp;

}