import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { theme } from "../../styles/theme";
import React from "react";

const Navbar = () => {
  return (
    <Flex
      gap={"2rem"}
      fontSize={"1.4rem"}
      fontWeight={"600"}
      justify={"center"}
      textColor={theme.color.text.white}
      bgColor={theme.color.primary.black}
      align={"center"}
      h={"4.9rem"}
    >
      <Link href={"/pelisky"}>PELISKY</Link>
      <Link href={"/o-nas"}>O NAS</Link>
      <Link href={"/kontakt"}>KONTAKT</Link>
    </Flex>
  );
};

export default Navbar;
