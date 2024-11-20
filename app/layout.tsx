import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: "Home Away",
  description: "Feel at home away from home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
      <body className="">
        <Providers>
          <Navbar />
          <main className='container py-10'>{children}</main>
        </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
