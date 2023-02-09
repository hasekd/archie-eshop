import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import NewProductItem from "./NewProductItem";

const NewProducts = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:1337/api/products?populate=*");
      const { data } = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const slicedProducts = data.slice(2);

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      maxW={"130rem"}
      m={"0 auto"}
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
      <Flex justify={"center"} align={"center"} gap={"1.5rem"}>
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
          p={"0.8rem 2rem"}
          textColor={"#fff"}
          transform={"translateX(-50%)"}
          fontSize={"1.3rem"}
          fontWeight={500}
          _hover={{
            bgColor: "transparent",
            boxShadow: `0 0 0 1px ${theme.color.primary.blue}`,
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
