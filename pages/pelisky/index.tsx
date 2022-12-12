import { Box, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import StoreItem from "../../components/StoreItem/StoreItem";
import { formatName } from "../../utils/formatName";

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
      <Flex flexWrap={"wrap"} justify={"center"} gap={"1rem"} mt={"3rem"}>
        {products.data.map((product: ProductTypes) => (
          <Link key={product.id} href={"/pelisky/" + product.id}>
            <StoreItem {...product.attributes} />
          </Link>
        ))}
      </Flex>
    </Layout>
  );
};

export default Pelisky;
