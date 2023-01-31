import {
  Box,
  Flex,
  FlexProps,
  Grid,
  Heading,
  Icon,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

const ListStyle: FlexProps = {
  flexDir: "column",
  gap: "1.5rem",
  fontSize: "1.4rem",
};

const LinkStyle: TextProps = {
  _hover: { color: theme.color.primary.blue },
  transition: "all 0.3s ease-out",
};

const Footer = () => {
  return (
    <Flex
      flexDir={"column"}
      bgColor={theme.color.primary.blue}
      color={theme.color.text.white}
    >
      <Grid
        minH={"35vh"}
        gap={"4rem"}
        gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }}
        justifyItems={{ base: "unset", sm: "center" }}
        alignItems={"center"}
        p={{ base: "4rem", sm: "2rem" }}
      >
        <Flex flexDir={"column"} gap={"2rem"}>
          <Heading>Archie</Heading>
          <Flex gap={"1.5rem"} align={"center"}>
            <Link href={"https://www.facebook.com/"} target="_blank">
              <Icon
                as={BsFacebook}
                w={"2rem"}
                h={"2rem"}
                _hover={{ color: theme.color.primary.blue }}
                transition={"all 0.2s ease-out"}
              />
            </Link>
            <Link href={"https://www.instagram.com/"} target="_blank">
              <Icon
                as={AiFillInstagram}
                w={"2.2rem"}
                h={"2.2rem"}
                _hover={{ color: theme.color.primary.blue }}
                transition={"all 0.2s ease-out"}
              />
            </Link>
          </Flex>
        </Flex>
        <Flex {...ListStyle}>
          <Text fontSize={"2rem"} mb={"1rem"}>
            Informace
          </Text>
          <Link href={"/o-nas"}>
            <Text {...LinkStyle}>O nás</Text>
          </Link>
          <Link href={"/pelisky"}>
            <Text {...LinkStyle}>Pelíšky</Text>
          </Link>
          <Link href={"/kontakt"}>
            <Text {...LinkStyle}>Kontakt</Text>
          </Link>
        </Flex>
        <Flex {...ListStyle}>
          <Text fontSize={"2rem"} mb={"1rem"}>
            Vše o nákupu
          </Text>
          <Link href={"/obchodni-podminky"}>
            <Text {...LinkStyle}>Obchodní podmínky</Text>
          </Link>
          <Link href={"/ochrana-osobnich-udaju"}>
            <Text {...LinkStyle}>Ochrana osobních údajů</Text>
          </Link>
        </Flex>
      </Grid>
      <Box alignSelf={"center"} pb={"2rem"} fontSize={"1.5rem"}>
        Made by{" "}
        <Link href={"https://danielhasek.netlify.app/"} target="_blank">
          <Text
            display={"inline"}
            _hover={{ color: theme.color.primary.blue }}
            transition={"all 0.2s ease-out"}
          >
            Daniel Hasek
          </Text>
        </Link>
      </Box>
      <Box textAlign={"center"} pb={"2rem"}>
        <Text fontSize={"1.3rem"}>
          Copyright &copy; {new Date().getFullYear()} Archie. All Rights
          Reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default Footer;
