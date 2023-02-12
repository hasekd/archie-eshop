import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import CartHeader from "../components/Cart/CartHeader";
import CartProducts from "../components/Cart/CartProducts";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Checkout = () => {
  const { cartItems, formData, setCartItems } = useShoppingCart();

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
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justify={"center"}
        gap={"1rem"}
      >
        <Flex flexDir={"column"} align={"center"} p={"2rem 1rem"} gap={"1rem"}>
          <Flex
            justify={"space-between"}
            minW={{ base: "25rem", sm: "45rem" }}
            minH={{ base: "4rem", md: "5rem" }}
            border={"1px solid black"}
            borderRadius={"4px"}
            p={"1rem"}
            align={"center"}
          >
            <Flex align={"center"} gap={"0.5rem"}>
              <Text
                fontWeight={600}
                fontSize={{ base: "1.2rem", md: "1.45rem" }}
              >
                Kontakt:
              </Text>
              <Text fontSize={{ base: "1.1rem", md: "1.3rem" }}>
                {formData.to_email}
              </Text>
            </Flex>
            <Link href={"/kosik"}>
              <Text
                fontSize={{ base: "1rem", md: "1.2rem" }}
                color={theme.color.primary.blue}
              >
                Změnit
              </Text>
            </Link>
          </Flex>

          <Flex
            justify={"space-between"}
            minW={{ base: "25rem", sm: "45rem" }}
            minH={{ base: "4rem", md: "5rem" }}
            border={"1px solid black"}
            borderRadius={"4px"}
            p={"1rem"}
            align={"center"}
          >
            <Flex align={"center"} gap={"0.5rem"}>
              <Text
                fontWeight={600}
                fontSize={{ base: "1.2rem", md: "1.45rem" }}
              >
                Doručení:
              </Text>
              <Text
                fontSize={{ base: "1.1rem", md: "1.3rem" }}
              >{`${formData.address} ${formData.addressNumber}, ${formData.city}, ${formData.zip}`}</Text>
            </Flex>
            <Link href={"/kosik"}>
              <Text
                fontSize={{ base: "1rem", md: "1.2rem" }}
                color={theme.color.primary.blue}
              >
                Změnit
              </Text>
            </Link>
          </Flex>
        </Flex>

        <Flex flexDir={"column"} gap={"1.5rem"}>
          <Flex
            flexDir={"column"}
            gap={"1rem"}
            p={"3rem"}
            bgColor={theme.color.primary.gray}
          >
            <Text fontSize={{ base: "1.4rem", lg: "1.6rem" }} fontWeight={500}>
              Vaše objednávka
            </Text>
            <Divider borderColor={"#666"} />
            <Flex justify={"space-between"}>
              <Text>Produkt</Text>
              <Text>Množství</Text>
              <Text mr={"3rem"}>Celkem</Text>
            </Flex>
            {cartItems.map((product: any) => (
              <CartProducts key={product.id} {...product} />
            ))}
            <Flex
              justify={"space-between"}
              fontSize={{ base: "1rem", lg: "1.2rem" }}
            >
              <Text>Mezisoučet:</Text>
              <Text>{totalPrice} Kč</Text>
            </Flex>
            <Flex
              justify={"space-between"}
              fontSize={{ base: "1rem", lg: "1.2rem" }}
            >
              <Text>Platba a doprava:</Text>
              <Text>99 Kč</Text>
            </Flex>
            <Divider borderColor={"#666666"} />
            <Flex
              justify={"space-between"}
              fontSize={{ base: "1.5rem", lg: "2rem" }}
              fontWeight={700}
            >
              <Text>Celkem:</Text>
              <Text>{totalPrice} Kč</Text>
            </Flex>
          </Flex>
          <Button
            variant={"custom"}
            mt="1rem"
            alignSelf={"center"}
            p={"1.5rem 2rem"}
            fontSize={"1.1rem"}
            fontWeight={700}
            bgColor={theme.color.primary.blue}
            textColor={theme.color.text.white}
            _hover={{ bgColor: theme.color.hover.blue }}
            type="submit"
            onClick={() => setCartItems([])}
          >
            Objednat
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Checkout;
