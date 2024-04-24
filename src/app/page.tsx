"use client";

import Link from "next/link";
import FAQs from "~/components/marketing/landing/faq";
import Features from "~/components/marketing/landing/features";
import { SiteFooter } from "~/components/marketing/landing/footer";
import Hero from "~/components/marketing/landing/hero";
import Pricing from "~/components/marketing/landing/pricing";
import Testimonails from "~/components/marketing/landing/testimonials";
import MarketingHeaderNav from "~/components/nav/marketing-header-nav";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4">
      <MarketingHeaderNav />
      <Hero />
      <Features />
      <Pricing />
      <FAQs />
      <Testimonails />
      <SiteFooter />

    </div>
  );
}
