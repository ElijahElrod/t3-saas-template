import { z } from "zod";
import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { createStripeCheckout } from "~/lib/stripe";

function getBodySchema() {
    return z.object({
        userId: z.string(),
        priceId: z.string().min(1),
        customerId: z.string().optional(),
        returnUrl: z.string().min(1),

    });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { headers } = req;
    const bodyResult = getBodySchema().safeParse(req.body);

    const redirectToErrorPage = () => {
        const referer = getApiRefererPath(headers);
        const url = join(referer, `?error=true`);
        return res.redirect(url);
    };

    if (!bodyResult.success) {


        return redirectToErrorPage();
    }

    const { customerId, returnUrl, priceId, userId } = bodyResult.data;


    try {
        const { url } = await createStripeCheckout({
            returnUrl,
            userId,
            priceId,
            customerId,

        });

        const portalUrl = getCheckoutPortalUrl(url, returnUrl);

        // redirect user back based on the response
        res.redirect(301, portalUrl);
    } catch (e) {
        return redirectToErrorPage();
    }
}



/**
 *
 * @param portalUrl
 * @param returnUrl
 * @description return the URL of the Checkout Portal
 * if running in emulator mode and the portal URL is undefined (as
 * stripe-mock does) then return the returnUrl (i.e. it redirects back to
 * the subscriptions page)
 */
function getCheckoutPortalUrl(portalUrl: string | null, returnUrl: string) {
    if (isTestingMode() && !portalUrl) {
        return [returnUrl, 'success=true'].join('?');
    }

    return portalUrl!;
}

/**
 * @description detect if Stripe is running in emulator mode
 */
function isTestingMode() {
    const enableStripeTesting = process.env.ENABLE_STRIPE_TESTING;

    return enableStripeTesting === 'true';
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
