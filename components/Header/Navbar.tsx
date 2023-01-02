import { Flex, Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { theme } from "../../styles/theme";
import React from "react";

const LinkStyle: TextProps = {
  cursor: "pointer",
  textTransform: "uppercase",
  pos: "relative",
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
    bgColor: theme.color.primary.blue,
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease-out",
  },
};

const Navbar = () => {
  return (
    <Flex
      gap={"2rem"}
      fontSize={"1.5rem"}
      justify={"center"}
      textColor={theme.color.text.white}
      bgColor={theme.color.primary.black}
      align={"center"}
      h={"4.9rem"}
      fontWeight={700}
      pos={"sticky"}
      top={0}
    >
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
  );
};

export default Navbar;
