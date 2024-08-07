import { ToastProvider } from "../components/ToastNotification";
import "../styles/globals.css"; 
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
