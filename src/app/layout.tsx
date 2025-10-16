import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/shared/Header";
import SideBar from "./components/sidebar/SideBar";
import Footer from "./components/shared/Footer";
import { CartProvider } from "./context/CartContext";
import NextTopLoader from "nextjs-toploader";
import AgeVarificationPopUp from "./components/shared/AgeVarificationPopUp";

const anonymousPro = localFont({
  src: [
    { path: "../app/assets/font/anonymouspro_.woff2", weight: "400", style: "normal" },
    { path: "../app/assets/font/anonymouspro_1.woff2", weight: "500", style: "normal" },
    { path: "../app/assets/font/anonymouspro_2.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-anonymous",
  display: "swap",
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
      <body className={`${anonymousPro.className} antialiased md:px-0`}>
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
