import AgeVarificationPopUp from "../components/shared/AgeVarificationPopUp";
import { CartProvider } from "../context/CartContext";
import NextTopLoader from "nextjs-toploader";
import Header from "../components/shared/Header";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  )
}
