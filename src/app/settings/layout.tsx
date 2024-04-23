import SettingsMenu from "~/components/nav/settings-nav-menu";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function SettingsLayout({ children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <SettingsMenu />
                {children}
            </div>

        </TooltipProvider>
    )
}