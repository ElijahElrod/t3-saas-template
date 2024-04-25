import { Icons } from "~/components/icons/icons";
import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

const pricingFeatures: string[] = [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4"
]


export default function Pricing() {

    const [annualChecked, setAnnualChecked] = useState(false);

    return (
        <section id="pricing" className="container flex flex-col gap-6 py-6 md:max-w-[64rem] md:py-6 lg:py-8">
            <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
                <h2 className="font-heading text-xl text-indigo-400 leading-[1.1] sm:text-xl md:text-3xl">
                    Simple pricing
                </h2>

            </div>
            <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
                <div className="grid gap-6">
                    <h3 className="text-xl font-bold sm:text-2xl">
                        What&apos;s included in your plan
                    </h3>
                    <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-1">
                        {pricingFeatures.map((feature, ind) => {
                            return (
                                <li key={`feature-${ind}`} className="flex items-center justify-center lg:justify-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] text-green-500">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path></svg>
                                    {feature}
                                </li>
                            )
                        })}


                    </ul>
                </div>
                <div className="flex flex-col gap-4 text-center">

                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            <Switch id="annual-billing" checked={annualChecked} onClick={() => setAnnualChecked(!annualChecked)} />
                            <Label htmlFor="annual-billing">Annual Plan</Label>
                        </div>
                        <h4 className="text-7xl font-bold">${annualChecked ? siteConfig.subscription.annual : siteConfig.subscription.monthly}</h4>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground ">
                                Billed {annualChecked ? 'Annually' : 'Monthly'}
                            </p>
                            <p className="text-sm font-medium text-muted-foreground ">
                                {annualChecked ? '2 Months Free!' : ''}
                            </p>
                        </div>

                    </div>
                    <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                        Get Started
                    </Link>
                </div>
            </div>

        </section>
    )
}