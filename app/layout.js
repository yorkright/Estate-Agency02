import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ClerkProvider
} from '@clerk/nextjs'


export const metadata = {
  title: "BUY-YOUR-Dream 🏟",
  description: "-------------------",
};

export default function RootLayout({ children }) {
  return (
     <html>
      <ClerkProvider>
        <body>
          <div className="min-h-[77vh]">
            <Navbar/>
            {children}
          </div>
          <Footer/>
        </body>
      </ClerkProvider>
    </html>
  );
}
