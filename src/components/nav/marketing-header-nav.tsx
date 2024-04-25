import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { Icons } from "~/components/icons/icons"
import { siteConfig } from "~/config/site"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"


export default function MarketingHeaderNav() {
    return (
        <header className="sticky top-0 w-full flex h-16 justify-between gap-4 border-b bg-background px-4 md:px-6">

            <nav className="hidden flex-col itmes-center justify-between gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link href="/" className="hidden items-center space-x-2 md:flex">
                    <Icons.logo />
                    <span className="hidden font-bold sm:inline-block">
                        {siteConfig.name}
                    </span>
                </Link>
                <Link
                    href="/#pricing"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Pricing
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Demo
                </Link>

            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">

                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Demo
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Customers
                        </Link>
                        <Link href="#" className="hover:text-foreground">
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex flex-row items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    )
}