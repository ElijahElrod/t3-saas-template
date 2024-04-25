

import { fetchActiveSubscriberInfo } from "~/server/queries"
import BillingForm from "./_components/billing-form"


export default async function Billing() {


    const { customer, subscription } = await fetchActiveSubscriberInfo();

    return (
        <BillingForm customer={customer} subscription={subscription} />
    )

}

