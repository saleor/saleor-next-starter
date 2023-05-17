import Image from "next/image";
import Link from "next/link";
import { DEFAULT_CHANNEl } from "../constants";
import { FetchProductsDocument } from "../generated/graphql";
import { useQuery } from "urql";

export const Products = () => {
    const [{ data }] = useQuery({
    query: FetchProductsDocument,
    variables: { channel: DEFAULT_CHANNEl, first: 9 },
  })

  return (
    <section>
      <h2>Products</h2>
      <ul className="grid-list">
        {data?.products?.edges.map((edge) => {
          const firstImage = edge.node.media?.[0];

          return (
            <li key={edge.node.id}>
              <Link href={`/products/${edge.node.id}`}>
                <article className="card">
                  {firstImage && (
                    <Image
                      width={256}
                      height={256}
                      alt={firstImage.alt}
                      src={firstImage.url}
                    />
                  )}
                  <span>{edge.node.name}</span>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
