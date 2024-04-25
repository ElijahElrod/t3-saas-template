import { SiteConfig } from "~/types"

export const siteConfig: SiteConfig = {
    name: "T3_Template",
    metadata: {
        tagline: "Tagline"
    },
    description:
        "An open source application built using the new router, server components and everything new in Next.js 13.",
    url: "https://tx.shadcn.com",
    ogImage: "https://tx.shadcn.com/og.jpg",
    links: {
        twitter: "https://twitter.com/shadcn",
        github: "https://github.com/shadcn/taxonomy",
    },
    subscription: {
        monthly: '29',
        annual: '24'
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
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4"
    ]
}