import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { theme } from "../styles/theme";
import CartHeader from "../components/Cart/CartHeader";

const Checkout = () => {
  return (
    <>
      <CartHeader />
      <Flex
        justify={"space-between"}
        maxW={"40rem"}
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
    </>
  );
};

export default Checkout;
