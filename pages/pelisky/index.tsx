import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Filter from "../../components/Filter/Filter";
import Layout from "../../components/Layout/Layout";
import StoreItem from "../../components/StoreItem/StoreItem";
import { theme } from "../../styles/theme";

type ProductTypes = {
  id: number;
  attributes: {
    title: string;
    price: number;
    img: string;
    slug: string;
    color: string;
    size: string;
  };
};

const fetchData = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const data = await res.json();
  return data;
};

const Pelisky = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 0]);

  const { data } = useQuery(["shop"], fetchData);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handlePriceChange = (price: number[]) => {
    setSelectedPrice(price);
  };

  const handleClearFilter = () => {
    setSelectedColor("");
    setSelectedSize("");
    setSelectedPrice([0, 0]);
  };

  const filteredProducts = data.data.filter(
    (product: ProductTypes) =>
      (product.attributes.color === selectedColor || selectedColor === "") &&
      (product.attributes.size === selectedSize || selectedSize === "") &&
      (product.attributes.price >= selectedPrice[0] ||
        selectedPrice[0] === 0) &&
      (product.attributes.price <= selectedPrice[1] || selectedPrice[1] === 0)
  );

  return (
    <Layout>
      <Box maxW={"9.8rem"} m={"3rem auto 0"}>
        <Heading
          fontSize={"3rem"}
          textAlign={"center"}
          mb={"1.2rem"}
          fontWeight={600}
        >
          Pelíšky
        </Heading>
        <Divider borderColor={theme.color.primary.blue} borderWidth={"2px"} />
      </Box>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        align={"center"}
        p={"3rem 1rem"}
        maxW={"130rem"}
        m={"0 auto"}
      >
        <Filter
          filteredProducts={filteredProducts}
          products={data.data}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          selectedPrice={selectedPrice}
          onHandleColorChange={handleColorChange}
          onHandleSizeChange={handleSizeChange}
          onHandlePriceChange={handlePriceChange}
          onHandleClearFilter={handleClearFilter}
        />
        <Flex flexWrap={"wrap"} justify={"center"} w={"100%"} gap={"1rem"}>
          {filteredProducts.map((product: ProductTypes) => (
            <StoreItem
              key={product.id}
              id={product.id}
              {...product.attributes}
            />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["shop"], fetchData);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 800,
  };
};

export default Pelisky;
