import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const nunito = Nunito({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CaseMaker",
    template: "%s | CaseMaker",
  },
  description: "Create your own custom phone case.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-secondary", nunito.className)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryProvider>
            <Navbar />
            <main className="flex min-h-[calc(100vh-56.8px-80px)] flex-col">
              {children}
            </main>
            <Footer />
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
