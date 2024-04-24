import WithWithout from "~/components/with-without";
import { siteConfig } from "~/config/site";

const withoutClaims = ["Spend more money", "Potentially get Stripe banned", "Lose your hair from stress"];
const withClaims = ["Spend less money", "Never worry about your stripe account", "Sleep like a baby"];

export default function Features() {
    return (
        <section id="features" className="justify-center space-y-4">

            <h2 className="text-4xl font-bold justify-center">The {siteConfig.name} Difference</h2>
            <WithWithout withouts={withoutClaims} withs={withClaims} />
        </section>
    )
}