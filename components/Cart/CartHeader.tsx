import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { theme } from "../../styles/theme";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React from "react";

const CartHeader = () => {
  return (
    <Box bgColor={theme.color.primary.blue}>
      <Flex
        justify={"space-between"}
        maxW={"130rem"}
        m={"0 auto"}
        align={"center"}
        p={"2rem 4rem"}
        textColor={theme.color.text.white}
      >
        <Link href={"/"}>
          <Flex align={"center"} gap={1}>
            <Icon as={MdKeyboardArrowLeft} fontSize={"1.7rem"} />
            <Text fontSize={{ base: "1.1rem", sm: "1.3rem" }} fontWeight={600}>
              Zpet na obchod
            </Text>
          </Flex>
        </Link>
        <Heading>Archie</Heading>
      </Flex>
    </Box>
  );
};

export default CartHeader;
