import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout/Layout";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { theme } from "../../styles/theme";
import ProductColor from "../../components/StoreItem/ProductColor";
import { dehydrate, useQuery } from "react-query";
import { prefetchData } from "../../utils/prefetchData";
import { useRouter } from "next/router";

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

const fetchProductBySlug = async (slug: string | string[] | undefined) => {
  try {
    const res = await fetch(
      "http://localhost:1337/api/products/" + slug + "?populate=*"
    );

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const ProductDetails = () => {
  const { increaseCartQuantity } = useShoppingCart();

  const { query } = useRouter();

  const { data, isLoading, isError, error } = useQuery(
    ["pelisky", query.slug],
    () => fetchProductBySlug(query.slug)
  );

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>{JSON.stringify(error)}</Text>;

  const srcImage = `http://localhost:1337${data.attributes.img.data.attributes.url}`;

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
          alt={data.attributes.title}
          width={0}
          height={0}
          style={{ width: "50rem", height: "auto" }}
        />
        <Flex flexDir={"column"} gap={"0.9rem"}>
          <Heading
            fontWeight={"400"}
            fontSize={{ base: "2.3rem", md: "2.7rem" }}
          >
            {data.attributes.title}
          </Heading>
          <Text fontSize={{ base: "1.8rem", md: "2rem" }}>
            {formatCurrency(data.attributes.price)} Kč
          </Text>

          <Box mt={"2rem"}>
            <Text
              fontSize={{ base: "1.4rem", md: "1.6rem" }}
              mb={"1rem"}
              fontWeight={500}
            >
              Vyberte barvu
            </Text>
            <ProductColor id={data.id} />
          </Box>

          <Button
            variant={"custom"}
            alignSelf={"flex-start"}
            p={{ base: "1.8rem 3.7rem", md: "2rem 4.3rem" }}
            mt={"2rem"}
            fontSize={{ base: "1.2rem", md: "1.35rem" }}
            fontWeight={700}
            bgColor={theme.color.primary.blue}
            textColor={theme.color.text.white}
            _hover={{ bgColor: theme.color.hover.blue }}
            onClick={() => increaseCartQuantity(data.id)}
          >
            Přidat do košíku
          </Button>
          <Text
            maxWidth={"42rem"}
            fontSize={{ base: "1.2rem", md: "1.3rem" }}
            letterSpacing={"0.5px"}
            mt={"2rem"}
          >
            {data.attributes.description}
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { dehydratedState: dehydrate(await prefetchData()) },
  };
};

export default ProductDetails;
