import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata = {
  title: "BUY-YOUR-Dream 🏟",
  description: "-------------------",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
     
      >
    <div className="min-h-[77vh]">
        <Navbar/>
        {children}
     </div>
        <Footer/>
      </body>
    </html>
  );
}


