import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import BreadcrumbComponent from "../../components/Breadcrumb/BreadcrumbComponent";
import Layout from "../../components/Layout/Layout";
import StoreItem from "../../components/StoreItem/StoreItem";

type ProductTypes = {
  id: number;
  attributes: { title: string; price: number; img: string };
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const data = await res.json();

  return {
    props: { products: data },
  };
};

const Pelisky = ({ products }: any) => {
  return (
    <Layout>
      <Flex flexWrap={"wrap"} justify={"center"} gap={"1rem"} p={"3rem 1rem"}>
        {products.data.map((product: ProductTypes) => (
          <StoreItem key={product.id} id={product.id} {...product.attributes} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Pelisky;
