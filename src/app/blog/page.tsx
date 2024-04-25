"use client";

import Link from "next/link";
import BlogCard from "~/components/marketing/blog/blog-card";
import MarketingHeaderNav from "~/components/nav/marketing-header-nav";
import { siteConfig } from "~/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `${siteConfig.name} Blog`,
    openGraph: {
        title: `${siteConfig.name} Blog`,
    }
}

export default function BlogHomePage() {
    return (
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
            <MarketingHeaderNav />
            <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
                The {siteConfig.name} Blog
            </h1>
            <p className="text-lg opacity-80 leading-relaxed"> Blog Description</p>
            <div className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
            </div>
        </div>
    );
}
