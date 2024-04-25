import { SiteConfig } from "~/types"

export const siteConfig: SiteConfig = {
    name: "T3_Template",
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
        annual: '290'
    },
    subscriptionId: {
        monthly: 'monthly',
        annual: 'annual'
    },
    paths: {
        billing: '/api/stripe/portal',
        checkout: '/api/stripe/checkout'
    }
}