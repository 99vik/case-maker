import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "CaseMaker",
  description: "Create your own custom case.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-secondary", roboto.className)}>
        <Navbar />
        <main className="flex min-h-[calc(100vh-56.8px-80px)] flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
