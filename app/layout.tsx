import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import PortkeyCustomProvider from "@/provider/Portkey";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portkey Dapp Example",
  description: "Powered By Portkey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <body className={inter.className}>
        <PortkeyCustomProvider>{children}</PortkeyCustomProvider>
      </body>
    </html>
  );
}
