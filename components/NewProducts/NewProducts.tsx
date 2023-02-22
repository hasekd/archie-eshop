import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useProductsQuery from "../../hooks/useProductsQuery";
import { theme } from "../../styles/theme";
import NewProductItem from "./NewProductItem";

const NewProducts = () => {
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <h1>Loading...</h1>;

  if (productsQuery.isError) {
    return <div>{JSON.stringify(productsQuery.error)}</div>;
  }

  const slicedProducts = productsQuery.data.slice(2);

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      maxW={"130rem"}
      m={"2rem auto"}
      minH={"50rem"}
    >
      <Text
        textAlign={"center"}
        fontSize={"2.5rem"}
        fontWeight={500}
        mb={"2rem"}
      >
        Nové produkty
      </Text>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justify={"center"}
        align={"center"}
        gap={"1.5rem"}
      >
        {slicedProducts.map((product: any) => (
          <NewProductItem
            key={product.id}
            id={product.id}
            {...product.attributes}
          />
        ))}
      </Flex>
      <Link href={"/pelisky"}>
        <Text
          textAlign={"center"}
          mt={"3.5rem"}
          bgColor={theme.color.primary.blue}
          display={"inline-block"}
          ml={"50%"}
          p={"0.9rem 2rem"}
          textColor={"#fff"}
          transform={"translateX(-50%)"}
          fontSize={"1.3rem"}
          fontWeight={500}
          _hover={{
            bgColor: "transparent",
            boxShadow: `0 0 0 1.5px ${theme.color.primary.blue}`,
            textColor: theme.color.primary.blue,
          }}
          transition={"all 0.2s ease-out"}
        >
          Zobrazit více
        </Text>
      </Link>
    </Flex>
  );
};

export default NewProducts;
