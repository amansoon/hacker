import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";
const inter = Space_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}
