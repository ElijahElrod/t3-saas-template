export type SiteConfig = {
    name: string
    metadata: {
        tagline: string
    }
    description: string
    url: string
    ogImage: string
    links: {
        twitter: string
        github: string
    },
    subscription: {
        monthly: string,
        annual: string
    },
    subscriptionId: {
        monthly: string,
        annual: string
    },
    paths: {
        billing: string,
        checkout: string
    },
    features: string[]
    
}
