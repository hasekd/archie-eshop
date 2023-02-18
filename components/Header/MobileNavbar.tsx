import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Text,
  TextProps,
  Heading,
  Button,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { theme } from "../../styles/theme";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./Header";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import useProductsQuery from "../../hooks/useProductsQuery";
import { formatCurrency } from "../../utils/formatCurrency";
import CartItem from "../ShoppingCart/CartItem";

const LinkStyle: TextProps = {
  textTransform: "uppercase",
  cursor: "pointer",
  pos: "relative",
  fontWeight: 600,
  _hover: {
    _after: { transform: "scaleX(1)", transformOrigin: "bottom left" },
  },
  _after: {
    content: '""',
    pos: "absolute",
    w: "100%",
    transform: "scaleX(0)",
    h: "0.15rem",
    bottom: "-0.2rem",
    left: "0",
    bgColor: theme.color.primary.white,
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease-out",
  },
};

const MobileNavbar = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <h1>Loading...</h1>;

  if (productsQuery.isError) {
    return <div>{JSON.stringify(productsQuery.error)}</div>;
  }

  const totalPrice = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const product = productsQuery.data.data.find(
        (i: any) => i.id === cartItem.id
      );

      return total + (product?.attributes.price || 0) * cartItem.quantity;
    }, 0)
  );

  return (
    <>
      <Flex
        pos={"sticky"}
        top={0}
        zIndex={10}
        align={"center"}
        justify={"space-between"}
        p={"1rem 1.5rem"}
        bgColor={theme.color.primary.blue}
      >
        <Icon
          as={RxHamburgerMenu}
          onClick={onOpen}
          cursor={"pointer"}
          w={"2.5rem"}
          h={"2.5rem"}
          color={"#fff"}
        />

        <Link href={"/"}>
          <Heading color={"#fff"}>Archie's Beds</Heading>
        </Link>

        <Popover trigger="hover" placement="bottom-end">
          <PopoverTrigger>
            <Flex
              align={"center"}
              gap={"0.7rem"}
              _hover={{
                bgColor: "none",
                textColor: theme.color.primary.white,
              }}
              cursor={"pointer"}
              color={"#fff"}
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
                  bgColor={theme.color.primary.white}
                  justify={"center"}
                  align={"center"}
                  color={theme.color.primary.blue}
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
              <Text
                fontSize={{ base: "1.2rem", md: "1.4rem" }}
                fontWeight={500}
              >
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
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            fontSize={"1.3rem"}
            p={"2rem"}
            _hover={{
              bgColor: "transparent",
              textColor: theme.color.primary.blue,
            }}
          />
          <DrawerBody pt={"4rem"} bgColor={theme.color.primary.blue}>
            <Flex
              flexDir={"column"}
              align={"center"}
              fontSize={"1.8rem"}
              gap={"3rem"}
              textColor={"#fff"}
            >
              <Link href={"/"}>
                <Text {...LinkStyle}>ÚVOD</Text>
              </Link>
              <Link href={"/pelisky"}>
                <Text {...LinkStyle}>PELÍŠKY</Text>
              </Link>
              <Link href={"/o-nas"}>
                <Text {...LinkStyle}>O NÁS</Text>
              </Link>
              <Link href={"/kontakt"}>
                <Text {...LinkStyle}>KONTAKT</Text>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
