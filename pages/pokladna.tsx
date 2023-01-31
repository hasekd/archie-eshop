import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import CartHeader from "../components/Cart/CartHeader";
import CartProducts from "../components/Cart/CartProducts";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Checkout = () => {
  const { cartItems } = useShoppingCart();

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
    <>
      <CartHeader />
      <Flex justify={"space-between"} align={"center"} p={"3rem"}>
        <Flex
          justify={"space-between"}
          minW={"40rem"}
          minH={"5rem"}
          border={"1px solid black"}
          borderRadius={"4px"}
          p={"1rem"}
          align={"center"}
        >
          <Box>
            <Text fontWeight={600} fontSize={"1.45rem"}>
              Kontakt:
            </Text>
            <Text></Text>
          </Box>
          <Link href={"/kosik"}>
            <Text fontSize={"1.2rem"} color={theme.color.primary.blue}>
              Změnit
            </Text>
          </Link>
        </Flex>
        <Flex
          flexDir={"column"}
          gap={"1rem"}
          p={"3rem"}
          bgColor={theme.color.primary.gray}
        >
          <Text fontSize={"1.6rem"} fontWeight={500}>
            Vaše objednávka
          </Text>
          <Divider borderColor={"#666"} />
          <Flex justify={"space-between"} ml={"13rem"}>
            <Text>Produkt</Text>
            <Text>Množství</Text>
            <Text mr={"3rem"}>Celkem</Text>
          </Flex>
          {cartItems.map((product: any) => (
            <CartProducts key={product.id} {...product} />
          ))}
          <Flex justify={"space-between"} fontSize={"1.2rem"}>
            <Text>Mezisoučet:</Text>
            <Text>{totalPrice} Kč</Text>
          </Flex>
          <Flex justify={"space-between"} fontSize={"1.2rem"}>
            <Text>Platba a doprava:</Text>
            <Text>99 Kč</Text>
          </Flex>
          <Divider borderColor={"#666666"} />
          <Flex justify={"space-between"} fontSize={"2rem"} fontWeight={700}>
            <Text>Celkem:</Text>
            <Text>{totalPrice} Kč</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Checkout;
