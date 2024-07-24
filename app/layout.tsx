//import AuthProvider from "./context/authContext";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import Modal from "@/components/layout/Modal";
//import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
// <AuthProvider></AuthProvider>
export default function RootLayout({modal,
  children
}: {
  children: React.ReactNode;
  modal: React.ReactNode
}) {
  return (
    <html>
      <GoogleTagManager gtmId="GTM-M2W2BLCD" />
      <body className={inter.className}>
        <Header />
        <main className="min-h-[94vh] pt-16 text-center">
          {modal}
          {children}
          
          </main>
         {/* <Modal/>*/}
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
