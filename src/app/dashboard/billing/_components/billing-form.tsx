"use client"

import { Separator } from "~/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { BadgeCheckIcon } from "lucide-react"
import { Form, FormField, FormControl, FormItem } from "~/components/ui/form"

import { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Icons } from "~/components/icons/icons"

import { Badge } from "~/components/ui/badge"
import { Switch } from "~/components/ui/switch"

import { Label } from "~/components/ui/label"
import { siteConfig } from "~/config/site"
import { zodResolver } from '@hookform/resolvers/zod'
import { CurrUser } from "~/server/queries"
import Stripe from "stripe"
import Link from "next/link"
import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"

export type BillingFormProps = {
    customer: CurrUser | null,
    subscription: Stripe.Subscription | null
};

const billingFormSchema = z.object({
    annual_plan: z.boolean().default(false),
});

const pricingFeatures: string[] = [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4"
]



const CHECKOUT_SESSION_API_ENDPOINT = siteConfig.paths.checkout;
const BILLING_PORTAL_REDIRECT_ENDPOINT = siteConfig.paths.billing;

export default function BillingForm({ customer, subscription }: BillingFormProps) {

    const isSubscribed = subscription?.status == "active";

    const billingForm = useForm<z.infer<typeof billingFormSchema>>({
        resolver: zodResolver(billingFormSchema),
        defaultValues: {
            annual_plan: false,
        },
    })



    const status = useSubscriptionStatus();
    const [annualChecked, setAnnualChecked] = useState(false);
    const dates = useMemo(() => {
        return {
            endDate: getDateFromSeconds(subscription?.current_period_end ?? 0),
            trialEndDate: getDateFromSeconds(subscription?.trial_end ?? 0),
        };
    }, [subscription]);




    if (customer) {
        return (

            <div className="space-y-6 container">
                <div>
                    <h3 className="text-lg font-medium">Billing</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your subscription here
                    </p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Subscription </CardTitle>
                            <CardDescription>
                                {status == SubscriptionStatusQueryParams.Cancel && (
                                    <Badge>
                                        {'Sorry, looks like you cancelled during checkout'}
                                    </Badge>
                                )}
                                {status == SubscriptionStatusQueryParams.Error && (
                                    <Badge>
                                        {'Looks like something went wrong, try again or contact us.'}
                                    </Badge>
                                )}
                                {status == SubscriptionStatusQueryParams.Success && (
                                    <Badge>{'Yay, your payment went through!'}</Badge>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                                {isSubscribed &&
                                    <>
                                        <div>
                                            <div className="flex flex-row align-center space-x-2"><BadgeCheckIcon /><p>Your subscription is active </p></div>
                                            <div className="text-xl font-bold">Plan Amount: ${subscription?.items.data.at(0)?.plan?.amount! / 100} / {subscription?.items.data.at(0)?.plan?.interval}</div>


                                        </div>
                                        <RenewStatusDescription
                                            dates={dates}
                                            cancelAtPeriodEnd={subscription?.cancel_at_period_end}
                                        />
                                    </>

                                }
                            </div>
                        </CardContent>


                        {isSubscribed ?

                            <form method="POST" action={BILLING_PORTAL_REDIRECT_ENDPOINT}>
                                <CardFooter>
                                    <input type={'hidden'} name={'customerId'} value={customer?.stripeCustomerId} />
                                    <Button className="w-4/5 mx-auto" variant={'outline'}>Cancel</Button>
                                </CardFooter>
                            </form>



                            :
                            <Form {...billingForm} >
                                <form

                                    action={CHECKOUT_SESSION_API_ENDPOINT}
                                    method="POST"
                                >
                                    <CardFooter className="flex flex-col space-y-4">

                                        <CheckoutFormData
                                            userId={customer.id}
                                            customerId={customer.stripeCustomerId}
                                            priceId={annualChecked
                                                ? siteConfig.subscriptionId.annual
                                                : siteConfig.subscriptionId.monthly}
                                        />



                                        <FormField
                                            control={billingForm.control}
                                            name="annual_plan"
                                            render={({ }) => (
                                                <FormItem className="flex flex-col items-center justify-between rounded-lg p-4">

                                                    <FormControl>
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
                                                                <Button className="w-4/5 mx-auto" type="submit">Subscribe</Button>
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </CardFooter>
                                </form>
                            </Form>
                        }
                    </Card>
                </div>

            </div>

        )
    } else {
        return (

            <p>Something went wrong</p>
        )
    }
}

function getReturnUrl() {
    return `https://www.${siteConfig.name.toLowerCase()}/dashboard/billing`;
}

function useSubscriptionStatus() {
    const [status, setStatus] = useState<SubscriptionStatusQueryParams>()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        const error = params.has(SubscriptionStatusQueryParams.Error)
        const canceled = params.has(SubscriptionStatusQueryParams.Cancel)
        const success = params.has(SubscriptionStatusQueryParams.Success)

        if (canceled) {
            setStatus(SubscriptionStatusQueryParams.Cancel)
        } else if (success) {
            setStatus(SubscriptionStatusQueryParams.Success)
        } else if (error) {
            setStatus(SubscriptionStatusQueryParams.Error)
        }
    }, [])

    return status
}

function getDateFromSeconds(seconds: number | null) {
    if (!seconds) {
        return '';
    }

    const endDateMs = seconds * 1000;

    return new Date(endDateMs).toDateString();
}

export function RenewStatusDescription(
    props: React.PropsWithChildren<{
        cancelAtPeriodEnd: boolean;
        dates: {
            endDate: string;
            trialEndDate: string | null;
        };
    }>
) {

    if (props.cancelAtPeriodEnd) {
        return <Badge>{'Your subscription is scheduled to be cancelled on'}  {props.dates.endDate}  </Badge>
    }
    return <Badge>{'Your subscription is scheduled to be renewed on'} {props.dates.endDate} </Badge>;
}

function CheckoutFormData(
    props: React.PropsWithChildren<{
        userId: string;
        priceId: string;
        customerId: string;

    }>
) {
    return (
        <>

            <input type="hidden" name={'returnUrl'} defaultValue={getReturnUrl()} />
            <input type="hidden" name={'priceId'} defaultValue={props.priceId} />
            <input
                type="hidden"
                name={'userId'}
                defaultValue={props.userId} />
            <input
                type="hidden"
                name={'customerId'}
                defaultValue={props.customerId}
            />


        </>
    );
}



enum SubscriptionStatusQueryParams {
    Success = 'success',
    Cancel = 'cancel',
    Error = 'error',
}