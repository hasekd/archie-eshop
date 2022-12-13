import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { theme } from "../../styles/theme";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React from "react";

const CartHeader = () => {
  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      p={"2rem 4rem"}
      bgColor={theme.color.primary.black}
      textColor={theme.color.text.white}
    >
      <Link href={"/"}>
        <Flex align={"center"} gap={1}>
          <Icon as={MdKeyboardArrowLeft} fontSize={"1.7rem"} />
          <Text fontSize={"1.3rem"} fontWeight={600}>
            Zpet na obchod
          </Text>
        </Flex>
      </Link>
      <Heading>Archie</Heading>
    </Flex>
  );
};

export default CartHeader;
