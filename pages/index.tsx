import { GetStaticProps } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { cacheExchange, fetchExchange, ssrExchange } from "urql";
import { API_URL, DEFAULT_CHANNEl } from "../constants";
import {
  FetchProductsDocument,
  FetchProductsQuery,
  FetchProductsQueryVariables,
} from "../generated/graphql";
import { Products } from "../src/Products";

const ssrCache = ssrExchange({ isClient: false });

export const getStaticProps: GetStaticProps = async () => {
  // The following content of "getStaticProps" is needed to populate the cache,
  // so you can consume the data through the "useFetchProductsQuery" hook without making an extra request.
  // Read more in urql documentation: https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#ssr-with-getstaticprops-or-getserversideprops
  const client = initUrqlClient(
    {
      url: API_URL,
      exchanges: [cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  await client
    ?.query<FetchProductsQuery>(FetchProductsDocument, {
      channel: DEFAULT_CHANNEl,
      first: 9,
    } as FetchProductsQueryVariables)
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
};

const HomePage = () => {
  return <Products />;
};

export default withUrqlClient((ssr) => ({
  url: API_URL,
  exchanges: [fetchExchange],
}))(HomePage);
