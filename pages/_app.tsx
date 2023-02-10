import "@/styles/globals.css";
import "@/styles/nprogress.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";

import Drawer from "@/components/Drawer";
import Navbar from "@/components/Navbar";
import useAppLoading from "@/hooks/useAppLoading";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useAppLoading();

  NProgress.configure({
    showSpinner: false,
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        defaultTheme="system"
        themes={["ctp-latte", "ctp-mocha"]}
        value={{ light: "ctp-latte", dark: "ctp-mocha" }}
      >
        <Drawer>
          <main className={`${poppins.className} flex flex-col min-h-screen`}>
            <Navbar />
            <Component {...pageProps} />
          </main>
        </Drawer>
      </ThemeProvider>
    </SessionProvider>
  );
}
