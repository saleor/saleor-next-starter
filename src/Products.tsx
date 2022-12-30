import Image from "next/image";
import Link from "next/link";
import { useQuery } from "urql";

type ProductsQuery = {
  products: {
    edges: {
      node: Product;
    }[];
  };
};

type Product = {
  name: string;
  id: string;
  media: {
    url: string;
  }[];
};

const ProductsQuery = `
    query {
        products (first: 9) {
                edges {
                    node {
                        id
                        name
                        media {
                          url
                        }
                    }
            }
        }
    }
`;

export const Products = () => {
  const [{ data, fetching, error }] = useQuery<ProductsQuery>({
    query: ProductsQuery,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <section>
      <h2>Products</h2>
      <ul className="grid-list">
        {data?.products.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link href={`/products/${edge.node.id}`}>
              <article className="card">
                <Image
                  width={256}
                  height={256}
                  alt={``}
                  src={edge.node.media?.[0].url}
                />
                <span>{edge.node.name}</span>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
