import {
  Button,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItem from "../ShoppingCart/CartItem";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";
import useProductsQuery from "../../hooks/useProductsQuery";

const Header = () => {
  const { cartItems, cartQuantity } = useShoppingCart();

  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <h1>Loading...</h1>;

  if (productsQuery.isError) {
    return <div>{JSON.stringify(productsQuery.error)}</div>;
  }

  const totalPrice = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const product = productsQuery.data.find((i: any) => i.id === cartItem.id);

      return total + (product?.attributes.price || 0) * cartItem.quantity;
    }, 0)
  );

  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      p={"2rem 4rem"}
      pos={"relative"}
      maxW={"130rem"}
      m={"0 auto"}
      zIndex={100}
    >
      <Link href={"/"}>
        <Heading>Archie's Beds</Heading>
      </Link>
      <Popover trigger="hover" placement="bottom-end">
        <PopoverTrigger>
          <Flex
            align={"center"}
            gap={"0.7rem"}
            _hover={{ bgColor: "none", textColor: theme.color.primary.blue }}
            cursor={"pointer"}
          >
            <Button
              variant={"custom"}
              w={"4rem"}
              h={"4rem"}
              pos={"relative"}
              bgColor={"transparent"}
              _hover={{ bgColor: "none" }}
            >
              <Icon
                as={FiShoppingCart}
                w={{ base: "1.7rem", md: "2rem" }}
                h={{ base: "1.7rem", md: "2rem" }}
              />
              <Flex
                borderRadius={"50%"}
                bgColor={theme.color.primary.blue}
                justify={"center"}
                align={"center"}
                color={"white"}
                w={"1.5rem"}
                h={"1.5rem"}
                pos={"absolute"}
                right={0}
                top={0}
                transform={"translate(0,25%)"}
              >
                {cartQuantity}
              </Flex>
            </Button>
            <Text fontSize={{ base: "1.2rem", md: "1.4rem" }} fontWeight={500}>
              {totalPrice} Kč
            </Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          minW={"max-content"}
          p={"0.4rem"}
          zIndex={200}
          pos={"relative"}
        >
          <PopoverBody>
            <Flex flexDir={"column"} gap={"1rem"}>
              {cartItems.map((product: any) => (
                <CartItem key={product.id} {...product} />
              ))}
              <Flex justify={"space-between"}>
                <Text fontSize={{ base: "1rem", md: "1.3rem" }}>CELKEM</Text>
                <Text fontSize={{ base: "1rem", md: "1.3rem" }}>
                  {totalPrice} Kč
                </Text>
              </Flex>
              <Link href={"/kosik"}>
                <Flex
                  justify={"center"}
                  bgColor={theme.color.primary.blue}
                  p={{ base: "0.5rem 0", md: "0.7rem 0" }}
                  fontSize={{ base: "1rem", md: "1.2rem" }}
                  fontWeight={700}
                  textColor={theme.color.text.white}
                  _hover={{ bgColor: theme.color.hover.blue }}
                >
                  Zobrazit košík
                </Flex>
              </Link>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Header;
