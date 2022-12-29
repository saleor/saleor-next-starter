import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";

const API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL ?? "";

const client = createClient({
  url: API_URL,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
