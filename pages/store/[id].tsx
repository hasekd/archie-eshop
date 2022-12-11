import {
  Box,
  BoxProps,
  Button,
  Flex,
  FlexProps,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";

const ChooseSizeBoxStyles: FlexProps = {
  w: "4rem",
  h: "3.5rem",
  border: "1px solid lightgrey",
  color: "black",
  align: "center",
  justify: "center",
  cursor: "pointer",
};

const ChooseColorBoxStyles: BoxProps = {
  borderRadius: "50%",
  w: "2.5rem",
  h: "2.5rem",
  cursor: "pointer",
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

const ProductDetails = ({ id, product }: any) => {
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
          w={"42rem"}
          h={"42rem"}
          objectFit={"cover"}
        />
        <Flex flexDir={"column"} gap={"0.7rem"}>
          <Heading fontWeight={"400"} fontSize={"2.7rem"}>
            {product.data.attributes.title}
          </Heading>
          <Text fontSize={"2rem"}>
            {formatCurrency(product.data.attributes.price)} Kč
          </Text>

          <Box mt={"1.5rem"}>
            <Text fontSize={"1.5rem"} mb={"1rem"}>
              Vyberte barvu
            </Text>
            <Flex gap={"1rem"}>
              <Box {...ChooseColorBoxStyles} bgColor={"red"} />
              <Box {...ChooseColorBoxStyles} bgColor={"blue"} />
              <Box {...ChooseColorBoxStyles} bgColor={"yellow"} />
              <Box {...ChooseColorBoxStyles} bgColor={"green"} />
            </Flex>
          </Box>

          <Box mt={"1.5rem"}>
            <Text fontSize={"1.5rem"} mb={"1rem"}>
              Vyberte velikost
            </Text>
            <Flex fontSize={"1.2rem"} gap={"1rem"}>
              <Flex {...ChooseSizeBoxStyles}>S</Flex>
              <Flex {...ChooseSizeBoxStyles}>M</Flex>
              <Flex {...ChooseSizeBoxStyles}>L</Flex>
            </Flex>
          </Box>

          <Button
            alignSelf={"flex-start"}
            p={"2rem 4.3rem"}
            mt={"2rem"}
            fontSize={"1.3rem"}
            onClick={() => increaseCartQuantity(product.data.id)}
          >
            Pridat do kosiku
          </Button>
          <Text
            maxWidth={"37rem"}
            fontSize={"1.1rem"}
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
