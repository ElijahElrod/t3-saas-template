import { siteConfig } from "~/config/site"


type WithWithoutProps = {
    withouts: string[],
    withs: string[]
}


export default function WithWithout({ withouts, withs }: WithWithoutProps) {

    return (
        <div className="grid grid-cols-2 gap-8">
            {/* Without */}
            <div className="bg-red-300 container text-background rounded-xl p-4 space-y-2">
                <h2 className="font-semibold">Without {siteConfig.name}</h2>
                <ul className="space-y-4 text-left">
                    {
                        withouts?.map((item, ind) => {
                            return (
                                <li key={`without-${ind}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-700 shrink-0"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg>
                                    <span>{item}</span>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

            {/* With */}
            <div className="bg-green-300 container text-background rounded-xl p-4 space-y-2">
                <h2 className="font-semibold">With {siteConfig.name}</h2>
                <ul className="space-y-4 text-left ">
                    {
                        withs?.map((item, ind) => {
                            return (
                                <li key={`with-${ind}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
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