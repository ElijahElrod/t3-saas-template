
import AuthedHeaderNav from "~/components/nav/authed-header-nav";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function DashboardLayout({ children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <AuthedHeaderNav />
                {children}
            </div>

        </TooltipProvider>
    )
}