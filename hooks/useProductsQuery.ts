import { useQuery } from "react-query";

const useProductsQuery = () => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:1337/api/products?populate=*");
    const data = await res.json();
    return data;
  };

  const productsQuery = useQuery(["products"], fetchData);

  return productsQuery;
};

export default useProductsQuery;
