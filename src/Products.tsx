import { useQuery } from "urql";

const ProductsQuery = `
    query {
        products (first: 10) {
                edges {
                    node {
                        id
                        name
                    }
            }
        }
    }
`;

export const Products = () => {
  const [{ data, fetching, error }] = useQuery({
    query: ProductsQuery,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.products.edges.map((edge: any) => (
        <li key={edge.node.id}>{edge.node.name}</li>
      ))}
    </ul>
  );
};
