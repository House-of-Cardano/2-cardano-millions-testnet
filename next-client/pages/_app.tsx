import Script from "next/script";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Navbar, Footer } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
      <Script
        src="https://kit.fontawesome.com/5620063f29.js"
        crossOrigin="anonymous"
      />
    </ThemeProvider>
  );
}
