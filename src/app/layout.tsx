import "~/styles/globals.css"
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import { siteConfig } from "~/config/site";
import type { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.metadata.tagline}`,
  description: `${siteConfig.description}`,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  function addWebsiteJsonLd() {
    return {
      __html: `{
        "@context": "https://www.schema.org",
        "@type": "WebSite",
        "name": ${siteConfig.name}",
        "url": "https://${siteConfig.url}",
        "description": "${siteConfig.name} | ${siteConfig.metadata.tagline}"
        }  
      `}
  }

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
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(addWebsiteJsonLd()) }}
            />
            <div className="grid h-screen grid-rows-[auto, 1fr]">
              <main>{children}</main>
            </div>

            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>

  );
}
