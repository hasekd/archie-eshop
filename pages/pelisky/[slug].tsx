import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { theme } from "../../styles/theme";
import ProductColor from "../../components/StoreItem/ProductColor";

type ProductTypes = {
  id: number;
  attributes: {
    title: string;
    price: number;
    img: string;
    id: number;
    slug: string;
  };
};

const ProductDetails = ({ product }: any) => {
  console.log(product.attributes.slug);
  const { increaseCartQuantity } = useShoppingCart();

  const srcImage = `http://localhost:1337${product.attributes.img.data.attributes.url}`;

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
          loader={() => srcImage}
          src={srcImage}
          alt={product.attributes.title}
          width={0}
          height={0}
          style={{ width: "50rem", height: "auto" }}
        />
        <Flex flexDir={"column"} gap={"0.9rem"}>
          <Heading
            fontWeight={"400"}
            fontSize={{ base: "2.3rem", md: "2.7rem" }}
          >
            {product.attributes.title}
          </Heading>
          <Text fontSize={{ base: "1.8rem", md: "2rem" }}>
            {formatCurrency(product.attributes.price)} Kč
          </Text>

          <Box mt={"2rem"}>
            <Text
              fontSize={{ base: "1.4rem", md: "1.6rem" }}
              mb={"1rem"}
              fontWeight={500}
            >
              Vyberte barvu
            </Text>
            <ProductColor id={product.id} />
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
            onClick={() => increaseCartQuantity(product.id)}
          >
            Přidat do košíku
          </Button>
          <Text
            maxWidth={"42rem"}
            fontSize={{ base: "1.2rem", md: "1.3rem" }}
            letterSpacing={"0.5px"}
            mt={"2rem"}
          >
            {product.attributes.description}
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productName = params?.slug;
  const res = await fetch(
    "http://localhost:1337/api/products/" + productName + "?populate=*"
  );
  const data = await res.json();

  return {
    props: { product: data.data },
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const data = await res.json();

  const paths = data.data.map((product: ProductTypes) => {
    return {
      params: { slug: product.attributes.slug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export default ProductDetails;
