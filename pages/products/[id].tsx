import { GetStaticPaths, GetStaticProps } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";
import { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";
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


const ssrCache = ssrExchange({ isClient: false });

export const apiClient = createClient({
  url: API_URL,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apiClient
    .query<FetchProductsQuery>(FetchProductsDocument, {
      channel: DEFAULT_CHANNEl,
      first: 9,
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
  // The following content of "getStaticProps" is needed to populate the cache,
  // so you can consume the data through the "useFetchProductQuery" hook without making an extra request.
  // Read more in urql documentation: https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#ssr-with-getstaticprops-or-getserversideprops
  const id = context.params?.id;

  const client = initUrqlClient(
    {
      url: API_URL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  await client
    ?.query<FetchProductQuery>(FetchProductDocument, {
      id,
      channel: DEFAULT_CHANNEl,
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
  const [{ data }] = useFetchProductQuery({
    variables: { id, channel: DEFAULT_CHANNEl },
  });

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
  exchanges: [cacheExchange, fetchExchange],
}))(ProductPage);
