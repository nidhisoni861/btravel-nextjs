import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Chatbot from "./components/chatbot/Chatbot";

export const metadata: Metadata = {
  title: "BeTravel - Außergewöhnliche Reisen",
  description: "Ihr Reiseexperte für außergewöhnliche Luxusreisen und unvergessliche Erlebnisse",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
