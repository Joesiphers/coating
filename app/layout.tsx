//import AuthProvider from "./context/authContext";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
//import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
// <AuthProvider></AuthProvider>
export default function RootLayout({
  modal,
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <GoogleTagManager gtmId="GTM-M2W2BLCD" />
      <body className={inter.className}>
        <Header />
          <main className="relative min-h-[89vh] top-10 pb-8 md:mt-8 text-center block">
            {modal /*as slot*/}
            {children}
          </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-2JMP8VV00S" />
    </html>
  );
}

export const metadata = {
  title: "Nex coating",
  description: "protective Pipe internal coating",
};
