import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/shared/Header";
import SideBar from "./components/sidebar/SideBar";
import Footer from "./components/shared/Footer";
import { CartProvider } from "./context/CartContext";
import NextTopLoader from "nextjs-toploader";
import AgeVarificationPopUp from "./components/shared/AgeVarificationPopUp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Divan Dione",
    default: "Divan Dione",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:px-0`}
      >
        <AgeVarificationPopUp>
          <CartProvider>
            <NextTopLoader
              color="#111"
            />
            <Header />
            {children}
            <SideBar />
            <Footer />
          </CartProvider>
        </AgeVarificationPopUp>
      </body>
    </html>
  );
}
