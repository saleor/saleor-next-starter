import { GetStaticPaths, GetStaticProps } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { API_URL, DEFAULT_CHANNEl } from "../../constants";
import {
  FetchProductDocument,
  FetchProductQuery,
  FetchProductQueryVariables,
  FetchProductsDocument,
  FetchProductsQuery,
  FetchProductsQueryVariables,
  useFetchProductQuery,
} from "../../generated/graphql";
import { apiClient } from "../../src/api/client";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apiClient
    .query<FetchProductsQuery>(FetchProductsDocument, {
      channel: DEFAULT_CHANNEl,
    } as FetchProductsQueryVariables)
    .toPromise();

  return {
    paths:
      data?.products?.edges.map((edge) => ({
        params: { id: edge.node.id },
      })) ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
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
    ?.query<FetchProductQuery>(FetchProductDocument, {
      id,
    } as FetchProductQueryVariables)
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
};

const ProductPage = () => {
  const { query } = useRouter();
  const id = (Array.isArray(query.id) ? query.id[0] : query.id) ?? "";
  const [{ data }] = useFetchProductQuery({ variables: { id } });
  const firstImage = data?.product?.media?.[0];
  return (
    <div>
      <h2>{data?.product?.name}</h2>
      {firstImage && (
        <Image
          alt={firstImage?.alt}
          src={firstImage?.url}
          width={256}
          height={256}
        />
      )}
    </div>
  );
};

export default withUrqlClient((ssr) => ({
  url: API_URL,
}))(ProductPage);
