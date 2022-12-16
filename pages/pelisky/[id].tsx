import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Img,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";

const ChooseColorBoxStyles: BoxProps = {
  borderRadius: "50%",
  w: "3rem",
  h: "3rem",
  cursor: "pointer",
  _hover: { boxShadow: "0 0 0 0.3rem #ccc", border: "0.1rem solid #fff" },
  transition: "all 0.3s ease-out",
};

type ProductTypes = {
  id: number;
  attributes: { title: string; price: number; img: string; id: number };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const data = await res.json();

  const paths = data.data.map((product: ProductTypes) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(
    "http://localhost:1337/api/products/" + id + "?populate=*"
  );
  const data = await res.json();

  return {
    props: { product: data },
  };
};

const ProductDetails = ({ product }: any) => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <Layout>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={"2rem"}
        justify={"center"}
        align={"center"}
        mt={"3rem"}
      >
        <Img
          src={`http://localhost:1337${product.data.attributes.img.data.attributes.url}`}
          w={"45rem"}
          h={"45rem"}
          objectFit={"cover"}
        />
        <Flex flexDir={"column"} gap={"0.9rem"}>
          <Heading fontWeight={"400"} fontSize={"2.7rem"}>
            {product.data.attributes.title}
          </Heading>
          <Text fontSize={"2rem"}>
            {formatCurrency(product.data.attributes.price)} Kč
          </Text>

          {/* <Box mt={"2rem"}>
            <Text fontSize={"1.6rem"} mb={"1rem"}>
              Vyberte barvu
            </Text>
            <Flex gap={"1rem"}>
              <Link href={"/pelisky/" + product.data.id}>
                <Box {...ChooseColorBoxStyles} bgColor={"red"} />
              </Link>
              <Link href={"/pelisky/" + product.data.id}>
                <Box {...ChooseColorBoxStyles} bgColor={"blue"} />
              </Link>
              <Link href={"/pelisky/4"}>
                <Box {...ChooseColorBoxStyles} bgColor={"green"} />
              </Link>
              <Box {...ChooseColorBoxStyles} bgColor={"green"} />
            </Flex>
          </Box> */}

          <Button
            alignSelf={"flex-start"}
            p={"2rem 4.3rem"}
            mt={"2rem"}
            fontSize={"1.35rem"}
            fontWeight={700}
            bgColor={theme.color.primary.blue}
            textColor={theme.color.text.white}
            _hover={{ bgColor: theme.color.hover.blue }}
            onClick={() => increaseCartQuantity(product.data.id)}
          >
            Přidat do košíku
          </Button>
          <Text
            maxWidth={"42rem"}
            fontSize={"1.3rem"}
            letterSpacing={"0.5px"}
            mt={"2rem"}
          >
            {product.data.attributes.description}
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ProductDetails;
