import type { Metadata } from "next";
import { Allura, Manrope, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SalonCraft Booking",
  description: "Frontend-only salon booking product simulation with role-based dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            className: "!rounded-xl !shadow-lg !border-[var(--border-light)]",
          }}
        />
      </body>
    </html>
  );
}
