
import Link from "next/link";

export default function CommunityPage() {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">

            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
               Community
            </h1>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:gap-8">
                
                <Link
                    className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                    href="https://create.t3.gg/en/introduction"
                    target="_blank"
                >
                    <h3 className="text-2xl font-bold">Documentation →</h3>
                    <div className="text-lg">
                        Learn more about Create T3 App, the libraries it uses, and how to
                        deploy it.
                    </div>
                </Link>
            </div>
        </div>
    )
}