"use client";

import Link from "next/link";
import FAQs from "~/components/marketing/landing/faq";
import Hero from "~/components/marketing/landing/hero";
import Testimonails from "~/components/marketing/landing/testimonials";
import MarketingHeaderNav from "~/components/nav/marketing-header-nav";

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4">
      <MarketingHeaderNav />
      <Hero />
      <FAQs />
      <Testimonails />
      
    </div>
  );
}
