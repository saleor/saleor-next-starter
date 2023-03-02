import type { AppProps } from "next/app";
import { Provider } from "urql";
import { API_URL } from "../constants";
import "../public/styles/global.css";
import { useCreateAuthedUrqlClient } from "../src/api/client";
import {
  SaleorAuthProvider,
  useAuthChange,
  useSaleorAuthClient,
} from "../src/auth";
import { LoginForm } from "../src/LoginForm";

export default function App({ Component, pageProps }: AppProps) {
  const useSaleorAuthClientProps = useSaleorAuthClient({
    saleorApiUrl: API_URL,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  const { urqlClient, resetClient } = useCreateAuthedUrqlClient({
    url: API_URL,
    fetch: useSaleorAuthClientProps.saleorAuthClient.fetchWithAuth,
  });

  useAuthChange({
    onSignedOut: () => resetClient(),
    onSignedIn: () => resetClient(),
  });

  return (
    <SaleorAuthProvider {...useSaleorAuthClientProps}>
      <Provider value={urqlClient}>
        <main className="container">
          <h1>Saleor + Next = 🫶</h1>
          <LoginForm />
          <Component {...pageProps} />
        </main>
      </Provider>
    </SaleorAuthProvider>
  );
}
