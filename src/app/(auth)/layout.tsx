import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login page jasa marga",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <main className="w-full bg-white min-h-screen">
            {children}
        <Toaster/>
        </main>
        <div className="absolute top-0 w-full text-center h-screen bg-gray-800 flex items-center md:hidden justify-center text-white">
            Sorry, this view does not yet support mobile devices.
          </div>
      </body>
    </html>
  );
}
