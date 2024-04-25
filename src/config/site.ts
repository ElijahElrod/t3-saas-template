import { SiteConfig } from "~/types"

export const siteConfig: SiteConfig = {
    name: "OpenBookClub",
    metadata: {
        tagline: "Join or Host your book club instantly"
    },
    description:
        "An open source community app for bookworms/wyrms to join community-based book clubs or host their own with friends.",
    url: "https://openbookclub.com",
    ogImage: "https://tx.shadcn.com/og.jpg",
    links: {
        twitter: "https://twitter.com/shadcn",
        github: "https://github.com/shadcn/taxonomy",
    },
    subscription: {
        monthly: '4.99',
        annual: '3.99'
    },
    subscriptionId: {
        monthly: 'monthly',
        annual: 'annual'
    },
    paths: {
        billing: '/api/stripe/portal',
        checkout: '/api/stripe/checkout'
    },
    features: [
        "100% Ad-Free",
        "Host/Join Private Book Clubs",
        "Mod powers* (For your clubs, or by invite)",
        
    ]
}