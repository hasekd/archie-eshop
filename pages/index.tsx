import { Box, Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout/Layout";
import { theme } from "../styles/theme";
import { MdOutlineBackHand, MdOutlineEco } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import NewProducts from "../components/NewProducts/NewProducts";

const HomePage = () => {
  return (
    <Layout>
      <Box pos={"relative"} textTransform={"uppercase"} textColor={"#fff"}>
        <Image
          src={"/images/header-img.jpeg"}
          alt="dog sleeping"
          width={1000}
          height={0}
          style={{
            width: "100%",
            height: "90vh",
            objectFit: "cover",
            filter: "brightness(70%)",
          }}
        />
        <Box
          textAlign={"center"}
          pos={"absolute"}
          top={"40%"}
          left={"50%"}
          transform={"translate(-50%, -40%)"}
        >
          <Text
            fontSize={{ base: "0.8rem", sm: "1.25rem", lg: "1.4rem" }}
            fontWeight={700}
            mb={"1.3rem"}
          >
            Prohlédněte si naše ručně vyrobené pelíšky
          </Text>
          <Heading
            fontSize={{ base: "2.8rem", sm: "5rem", lg: "5.5rem" }}
            letterSpacing={"1px"}
          >
            Maximální pohodlí a podpora
          </Heading>
          <Link href={"/pelisky"}>
            <Text
              display={"inline-block"}
              border={"1.5px solid white"}
              p={{
                base: "0.7rem 2rem",
                sm: "0.9rem 2.5rem",
                lg: "0.9rem 3rem",
              }}
              fontSize={{ base: "0.7rem", sm: "1rem", lg: "1.2rem" }}
              fontWeight={700}
              mt={"2rem"}
              _hover={{
                bgColor: theme.color.primary.white,
                textColor: theme.color.text.black,
              }}
              transition={"all 0.3s ease-out"}
            >
              Zobrazit pelíšky
            </Text>
          </Link>
        </Box>
      </Box>

      <NewProducts />

      <Divider borderColor={"#ccc"} />
      <Flex
        justify={"center"}
        align={"center"}
        p={"0 1rem"}
        minH={"25rem"}
        gap={{ base: "5rem", lg: "10rem" }}
        textAlign={"center"}
        flexWrap={"wrap"}
        m={"2rem auto"}
      >
        <Flex
          flexDir={"column"}
          fontSize={{ base: "1.7rem", md: "2rem" }}
          align={"center"}
          maxW={"28rem"}
        >
          <Icon as={MdOutlineBackHand} w={"3rem"} h={"3rem"} mb={"1.1rem"} />
          <Text fontWeight={600}>Ruční výroba</Text>
          <Text fontSize={{ base: "1.3rem", md: "1.4rem" }}>
            Individuálně vyrobené s péčí a smyslem pro detail
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          fontSize={{ base: "1.7rem", md: "2rem" }}
          align={"center"}
          maxW={"28rem"}
        >
          <Icon as={AiOutlineHeart} w={"3rem"} h={"3rem"} mb={"1.1rem"} />
          <Text fontWeight={600}>Vyrobeno v Česku</Text>
          <Text fontSize={{ base: "1.3rem", md: "1.4rem" }}>
            Naše produkty jsou vyráběny v České Republice
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          fontSize={{ base: "1.7rem", md: "2rem" }}
          align={"center"}
          maxW={"28rem"}
        >
          <Icon as={MdOutlineEco} w={"3.5rem"} h={"3.5rem"} mb={"1.1rem"} />
          <Text fontWeight={600}>Ekologické</Text>
          <Text fontSize={{ base: "1.3rem", md: "1.4rem" }}>
            K výrobě používáme recyklovatelný materiál
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomePage;
