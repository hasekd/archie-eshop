import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { theme } from "../../styles/theme";
import ProductColor from "../../components/StoreItem/ProductColor";

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
  console.log(product.data.id);

  return (
    <Layout>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={"2rem"}
        justify={"center"}
        align={"center"}
        p={"3rem 1.5rem"}
      >
        <Image
          src={`http://localhost:1337${product.data.attributes.img.data.attributes.url}`}
          w={{ base: "42rem", sm: "45rem" }}
          h={{ base: "30rem", sm: "45rem" }}
          objectFit={"cover"}
        />
        <Flex flexDir={"column"} gap={"0.9rem"}>
          <Heading
            fontWeight={"400"}
            fontSize={{ base: "2.3rem", md: "2.7rem" }}
          >
            {product.data.attributes.title}
          </Heading>
          <Text fontSize={{ base: "1.8rem", md: "2rem" }}>
            {formatCurrency(product.data.attributes.price)} Kč
          </Text>

          <Box mt={"2rem"}>
            <Text
              fontSize={{ base: "1.4rem", md: "1.6rem" }}
              mb={"1rem"}
              fontWeight={500}
            >
              Vyberte barvu
            </Text>
            <ProductColor id={product.data.id} />
          </Box>

          <Button
            alignSelf={"flex-start"}
            p={{ base: "1.8rem 3.7rem", md: "2rem 4.3rem" }}
            mt={"2rem"}
            fontSize={{ base: "1.2rem", md: "1.35rem" }}
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
            fontSize={{ base: "1.2rem", md: "1.3rem" }}
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
