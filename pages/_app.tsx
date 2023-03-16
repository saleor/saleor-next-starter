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
          <header>
            <h1>Saleor + Next = 🫶</h1>
            <span className="info">
              Saleor instance URL:{" "}
              <a
                target={"_blank"}
                href={process.env.NEXT_PUBLIC_SALEOR_INSTANCE_URI}
                rel="noreferrer"
              >
                {process.env.NEXT_PUBLIC_SALEOR_INSTANCE_URI}
              </a>
            </span>
          </header>
          <LoginForm />
          <Component {...pageProps} />
        </main>
      </Provider>
    </SaleorAuthProvider>
  );
}
