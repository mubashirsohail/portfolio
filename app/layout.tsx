import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { personal } from "@/data/personal";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageLoader } from "@/components/effects/PageLoader";
import { LOADER_KEY } from "@/lib/constants";

// Self-hosted variable fonts (Inter, Fraunces, JetBrains Mono — SIL OFL) so builds never need Google Fonts access.
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const display = localFont({ src: "./fonts/fraunces-latin-wght-normal.woff2", variable: "--font-display", display: "swap", weight: "100 900" });
const mono = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--font-mono", display: "swap", weight: "100 800" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${personal.name} — ${personal.title}`, template: `%s · ${personal.name}` },
  description: personal.siteDescription,
  openGraph: {
    title: `${personal.name} — ${personal.title}`,
    description: personal.siteDescription,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Hides the intro loader before first paint on repeat visits in the same session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("${LOADER_KEY}")==="1")document.documentElement.setAttribute("data-loader-seen","")}catch(e){}`,
          }}
        />
        <style>{`html[data-loader-seen] [data-page-loader]{display:none!important}`}</style>
      </head>
      <body className="bg-ink font-sans text-fg antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[110] rounded-md bg-gold px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <PageLoader />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
