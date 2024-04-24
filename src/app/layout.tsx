import "~/styles/globals.css"
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import HeaderNav from "~/components/nav/authed-header-nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <body
            className={cn(
              "font-sans antialiased dark",
              fontSans.variable,
              fontSans.variable
            )}
          >
            <div className="grid h-screen grid-rows-[auto, 1fr]">
              <main className="overflow-y-scroll">{children}</main>
            </div>

            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>

  );
}
