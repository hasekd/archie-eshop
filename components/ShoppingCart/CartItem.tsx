import { Button, Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import useProductsQuery from "../../hooks/useProductsQuery";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <h1>Loading...</h1>;

  if (productsQuery.isError) {
    return <div>{JSON.stringify(productsQuery.error)}</div>;
  }

  const product = productsQuery.data.data.find((i: any) => i.id === id);

  if (product == null) return null;

  const srcImage = `http://localhost:1337${product.attributes.img.data.attributes.url}`;

  return (
    <>
      <Flex justify={"space-between"} align={"center"} gap={"4rem"}>
        <Flex flexDir={"column"} gap={1}>
          <Text
            fontSize={{ base: "1.1rem", md: "1.3rem" }}
            letterSpacing={"0.3px"}
          >
            {product.attributes.title}
          </Text>
          <Flex gap={1} fontSize={{ base: "1rem", md: "1.15rem" }}>
            <Text>{quantity}x</Text>
            <Text>{formatCurrency(product.attributes.price)} Kč</Text>
          </Flex>
        </Flex>
        <Flex align={"center"}>
          <Image
            loader={() => srcImage}
            src={srcImage}
            alt={product.attributes.title}
            width={0}
            height={0}
            style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
          />
          <Button
            variant={"custom"}
            bgColor={"transparent"}
            fontSize={{ base: "1.4rem", sm: "1.7rem" }}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            onClick={() => removeFromCart(product.id)}
          >
            &times;
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default CartItem;
