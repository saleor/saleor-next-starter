import { InferGetStaticPropsType } from "next";
import {
  FetchProductsDocument,
  FetchProductsQuery,
  FetchProductsQueryVariables,
} from "../generated/graphql";
import { apiClient } from "../src/api/client";
import { Products } from "../src/Products";

export const getStaticProps = async () => {
  const { data, error } = await apiClient
    .query<FetchProductsQuery>(FetchProductsDocument, {
      channel: "default-channel",
    } as FetchProductsQueryVariables)
    .toPromise();

  return {
    props: {
      ok: !error,
      data: {
        products: data?.products,
      },
    },
  };
};

export type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home = (props: HomeProps) => {
  return <Products {...props} />;
};

export default Home;
