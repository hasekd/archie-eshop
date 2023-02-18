import { Flex, Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { theme } from "../../styles/theme";
import React, { useLayoutEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";

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
    bgColor: theme.color.primary.white,
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease-out",
  },
};

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const Navbar = () => {
  const [width, height] = useWindowSize();

  return (
    <>
      {width > 700 ? (
        <Flex
          gap={"2rem"}
          fontSize={"1.5rem"}
          justify={"center"}
          textColor={theme.color.text.white}
          bgColor={theme.color.primary.blue}
          align={"center"}
          h={"4.9rem"}
          fontWeight={700}
          pos={"sticky"}
          top={0}
          zIndex={10}
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
      ) : (
        <MobileNavbar />
      )}
    </>
  );
};

export default Navbar;
