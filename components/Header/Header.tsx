import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <Flex justify={"space-between"} align={"center"} m={"0 3rem"}>
      <Heading>Archie</Heading>
      <Link href={"store"}>Shop now</Link>
      <Button
        w={"4rem"}
        h={"4rem"}
        pos={"relative"}
        _hover={{ bgColor: "none", color: "red" }}
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
          3
        </Flex>
      </Button>
    </Flex>
  );
};

export default Header;
