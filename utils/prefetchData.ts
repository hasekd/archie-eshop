import { QueryClient } from "react-query";

export const fetchProducts = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const data = await res.json();
  return data.data;
};

export const prefetchData = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["pelisky"], fetchProducts);

  return queryClient;
};
