import AnimatedButton from "~/components/animated/button";
import TrustSignal from "~/components/trust-signal";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";


export default function Hero() {
    return (
        <section id="hero" className="bg-background container">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-16 lg:gap-32 px-8 py-12 lg:py-32">

                {/* Hero Copy, Description, Quick bullets, CTA Button, Trust Element (# of Customers) */}
                <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
                    <h1 className="font-medium text-4xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col">
                        <span>{"Don't let a "}
                            <span className="font-black italic tracking-normal">dispute</span>
                        </span>
                        <span>{"get you "}
                            <span className="font-black italic text-red-500 tracking-normal">banned</span>
                        </span>
                    </h1>
                    <div>
                        <p className="text-lg text-base-content-secondary leading-relaxed">
                            {siteConfig.description}
                        </p>
                        <ul className="hidden md:block text-base-content-secondary leading-relaxed space-y-1 mt-4">
                            <li className="flex items-center justify-center lg:justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] text-green-500">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path></svg>
                                1-minute no-code setup
                            </li>
                            <li className="flex items-center justify-center lg:justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] text-green-500">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path></svg>
                                Up to 80% less disputes
                            </li>
                            <li className="flex items-center justify-center lg:justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] text-green-500"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd">
                                </path></svg>
                                Save $15 dispute fees
                            </li>
                        </ul>

                    </div>
                    <Button className="">
                        CTA Button
                    </Button>
                    <TrustSignal />

                </div>
                {/* Image Holder */}
                <div className="relative w-full max-w-lg flex flex-col gap-16 md:gap-24 items-center mx-auto">
                    Img Or Animaton here
                </div>
            </div>
        </section>
    );

}
