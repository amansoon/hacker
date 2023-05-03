import "@/styles/index.css";
import type { AppProps } from "next/app";
// import { Space_Grotesk } from "next/font/google";
// const inter = Space_Grotesk({ subsets: ["latin"] });
import AppProvider from "@/context/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
