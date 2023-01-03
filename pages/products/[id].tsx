import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { DEFAULT_CHANNEl } from "../../constants";
import {
  FetchProductDocument,
  FetchProductQuery,
  FetchProductsDocument,
  FetchProductsQuery,
} from "../../generated/graphql";
import { apiClient } from "../../src/api/client";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await apiClient
    .query<FetchProductsQuery>(FetchProductsDocument, {
      channel: DEFAULT_CHANNEl,
    })
    .toPromise();

  console.log(error);

  return {
    paths:
      data?.products?.edges.map((edge) => ({
        params: { id: edge.node.id },
      })) ?? [],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params?.id;
  const { data } = await apiClient
    .query<FetchProductQuery>(FetchProductDocument, { id })
    .toPromise();

  return {
    props: {
      data: {
        ...data?.product,
      },
    },
    revalidate: 120,
  };
};

type ProductProps = InferGetStaticPropsType<typeof getStaticProps>;

const Product = (props: ProductProps) => {
  const firstImage = props.data.media?.[0];
  return (
    <div>
      <h2>{props.data.name}</h2>
      {firstImage && (
        <Image
          alt={firstImage.alt}
          src={firstImage.url}
          width={256}
          height={256}
        />
      )}
    </div>
  );
};

export default Product;
