
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createBillingPortalSession } from "~/lib/stripe";
import { siteConfig } from "~/config/site";
import { join } from "path";
import type { IncomingHttpHeaders } from "http";

function getBodySchema() {
    return z.object({
        customerId: z.string(),
    });
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { headers } = req;

    const bodyResult = getBodySchema().safeParse(req.body);


    if (!bodyResult.success) {

        return redirectToErrorPage(req, res);
    }

    const { customerId } = bodyResult.data;



    try {
        const returnUrl =
            headers.referer ?? headers.origin ?? `https://www.${siteConfig.name.toLowerCase()}/dashboard/billing`;

        const { url } = await createBillingPortalSession({
            returnUrl,
            customerId,
        });

        res.redirect(301, url);
    } catch (error) {
       
        return onError(req, res);
    }

}

function redirectToErrorPage(req: NextApiRequest, res: NextApiResponse) {
    const referrerPath = getApiRefererPath(req.headers);
    const url = join(referrerPath, `?error=true`);

    return res.redirect(url);
}

function onError(req: NextApiRequest, res: NextApiResponse) {


    return redirectToErrorPage(req, res);
}

function getApiRefererPath(
    headers: IncomingHttpHeaders,
    defaultPath = '/'
) {
    const fullPath = headers.referer ?? headers.origin;

    if (!fullPath) {
        return defaultPath;
    }

    const url = new URL(fullPath);

    return url.pathname;
}