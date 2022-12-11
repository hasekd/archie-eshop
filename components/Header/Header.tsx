import {
  Box,
  Button,
  Container,
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
import { formatCurrency } from "../../utils/formatCurrency";

const Header = () => {
  const { cartItems, cartQuantity } = useShoppingCart();

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

  const totalPrice = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const product = data.find((i: any) => i.id === cartItem.id);

      return total + (product?.attributes.price || 0) * cartItem.quantity;
    }, 0)
  );

  return (
    <Flex justify={"space-between"} align={"center"} m={"0 3rem"}>
      <Heading>Archie</Heading>
      <Link href={"/store"}>Shop now</Link>
      <Popover trigger="hover" placement="bottom-end">
        <PopoverTrigger>
          <Flex
            align={"center"}
            gap={"0.7rem"}
            _hover={{ bgColor: "none", color: "red" }}
            cursor={"pointer"}
          >
            <Button
              w={"4rem"}
              h={"4rem"}
              pos={"relative"}
              bgColor={"transparent"}
              _hover={{ bgColor: "none" }}
            >
              <Icon as={FiShoppingCart} w={"2rem"} h={"2rem"} />
              <Flex
                borderRadius={"50%"}
                bgColor={"red"}
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
            <Text fontSize={"1.3rem"}>{totalPrice} Kč</Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent minW={{ base: "100%", lg: "max-content" }}>
          <PopoverBody>
            <Flex flexDir={"column"} gap={"1rem"}>
              {cartItems.map((product: any) => (
                <CartItem key={product.id} {...product} />
              ))}
              <Flex justify={"space-between"}>
                <Text>CELKEM</Text>
                <Text>{totalPrice} Kč</Text>
              </Flex>
              <Link href={"/kosik"}>
                <Flex justify={"center"} bgColor={"red"} p={"0.6rem 0"}>
                  Zobrazit kosik
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
