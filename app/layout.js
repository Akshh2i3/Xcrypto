import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Header />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}

export const server = 'https://api.coingecko.com/api/v3'