import { GetStaticProps } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { API_URL, DEFAULT_CHANNEl } from "../constants";
import {
  FetchProductsDocument,
  FetchProductsQuery,
  FetchProductsQueryVariables,
} from "../generated/graphql";
import { Products } from "../src/Products";

export const getStaticProps: GetStaticProps = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: API_URL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  // This query is used to populate the cache for the query
  // used on this page.
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
}))(HomePage);
