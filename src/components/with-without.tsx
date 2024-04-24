import { siteConfig } from "~/config/site"


type WithWithoutProps = {
    withouts: string[],
    withs: string[]
}


export default function WithWithout({ withouts, withs }: WithWithoutProps) {

    return (
        <div className="grid grid-cols-2 gap-8">
            {/* Without */}
            <div className="bg-red-300 container text-background rounded-xl p-4">
                <h2 className="font-semibold">Without {siteConfig.name}</h2>
                <ul className="space-y-4 text-left">
                    {
                        withouts?.map((item, ind) => {
                            return (
                                <li key={`without-${ind}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

            {/* With */}
            <div className="bg-green-300 container text-background rounded-xl p-4">
                <h2 className="font-semibold">With {siteConfig.name}</h2>
                <ul className="space-y-4 text-left ">

                    {
                        withs?.map((item, ind) => {
                            return (
                                <li key={`with-${ind}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}