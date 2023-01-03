import type { AppProps } from "next/app";
import { Provider } from "urql";
import "../public/styles/global.css";
import { apiClient } from "../src/api/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={apiClient}>
      <main className="container">
        <h1>Saleor + Next = 🫶</h1>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
