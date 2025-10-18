import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import NextTopLoader from "nextjs-toploader";
import AgeVarificationPopUp from "./components/shared/AgeVarificationPopUp";
import { ConfigProvider, ThemeConfig } from "antd";
import ReduxWrapper from "./redux/query/ReduxWrapper";

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

const themeConfig: ThemeConfig = {
  token: {
    borderRadius: 4,
    fontSize: 16,
  },
  components: {
    Button: {
      borderRadius: 0,
      colorPrimary: "rgb(222,18,151)",
    },
    Input: {
      borderRadius: 0,
    },
    Checkbox: {
      borderRadius: 0,
      colorPrimary: "rgb(222,18,151)",
      colorPrimaryActive: "rgb(222,18,151)",
      colorPrimaryHover: "rgb(222,18,151)",
    },
    Select: {
      borderRadius: 0,
      hoverBorderColor: "var(--border-color)",
      activeOutlineColor: "var(--border-color)",
      activeBorderColor: "var(--border-color)",
    },
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
        <ReduxWrapper>
          <AgeVarificationPopUp>
            <CartProvider>
              <NextTopLoader
                color="#111"
              />
              <ConfigProvider theme={themeConfig}>
                {children}
              </ConfigProvider>
            </CartProvider>
          </AgeVarificationPopUp>
        </ReduxWrapper>
      </body>
    </html>
  );
}
