import "../public/styles/global.css";
import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import { API_URL } from "../constants";

const client = createClient({
  url: API_URL,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <main className="container">
        <h1>Saleor + Next = 🫶</h1>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
