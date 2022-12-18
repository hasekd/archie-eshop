import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout/Layout";
import { theme } from "../styles/theme";
import { MdOutlineBackHand, MdOutlineEco } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

const HomePage = () => {
  return (
    <Layout>
      <Flex
        bgImage={
          "https://images.unsplash.com/photo-1598397678806-f5e6785369cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }
        w={"100%"}
        h={"90vh"}
        bgPosition={"center"}
        bgSize={"cover"}
        textColor={"white"}
        flexDir={"column"}
        align={"center"}
        justify={"center"}
        textTransform={"uppercase"}
      >
        <Box w={"60%"} textAlign={"center"}>
          <Text fontSize={"1.4rem"} fontWeight={700} mb={"1.3rem"}>
            Prohlédněte si naše ručně vyrobené pelíšky
          </Text>
          <Heading fontSize={"5.5rem"} letterSpacing={"1px"}>
            Maximální pohodlí a podpora
          </Heading>
        </Box>
        <Link href={"/pelisky"}>
          <Text
            border={"2px solid white"}
            p={"0.9rem 3rem"}
            fontSize={"1.2rem"}
            fontWeight={700}
            mt={"2rem"}
            _hover={{
              bgColor: theme.color.primary.white,
              textColor: theme.color.primary.blue,
            }}
            transition={"all 0.3s ease-out"}
          >
            Zobrazit pelíšky
          </Text>
        </Link>
      </Flex>
      <Flex
        justify={"center"}
        p={"4rem"}
        gap={"10rem"}
        textAlign={"center"}
        flexWrap={"wrap"}
      >
        <Flex
          flexDir={"column"}
          fontSize={"2rem"}
          align={"center"}
          maxW={"28rem"}
        >
          <Icon as={MdOutlineBackHand} w={"3rem"} h={"3rem"} mb={"1.3rem"} />
          <Text fontWeight={600}>Ruční výroba</Text>
          <Text fontSize={"1.4rem"}>
            Individuálně vyrobené s péčí a smyslem pro detail
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          fontSize={"2rem"}
          align={"center"}
          maxW={"28rem"}
        >
          <Icon as={AiOutlineHeart} w={"3rem"} h={"3rem"} mb={"1.3rem"} />
          <Text fontWeight={600}>Vyrobeno v Česku</Text>
          <Text fontSize={"1.4rem"}>
            Naše produkty jsou vyráběny v České Republice
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          fontSize={"2rem"}
          align={"center"}
          maxW={"28rem"}
        >
          <Icon as={MdOutlineEco} w={"3.5rem"} h={"3.5rem"} mb={"1.3rem"} />
          <Text fontWeight={600}>Ekologické</Text>
          <Text fontSize={"1.4rem"}>
            K výrobě používáme recyklovatelný materiál
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomePage;
