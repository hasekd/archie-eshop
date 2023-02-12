import Layout from "../components/Layout/Layout";
import { theme } from "../styles/theme";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Layout>
      <Box maxW={"11rem"} m={"3rem auto 3rem"}>
        <Heading
          fontSize={"3rem"}
          textAlign={"center"}
          mb={"1.2rem"}
          fontWeight={600}
        >
          Kontakt
        </Heading>
        <Divider borderColor={theme.color.primary.blue} borderWidth={"2px"} />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl maxW={"70rem"} m={"0 auto 4rem"} p={"0 2rem"}>
          <Flex flexDir={"column"}>
            <Flex
              gap={"2rem"}
              mb={"2rem"}
              flexDir={{ base: "column", sm: "unset" }}
            >
              <Flex flexDir={"column"} w={"100%"}>
                <FormLabel fontSize={"2rem"} mb={"1rem"} textColor={"#666666"}>
                  Jméno
                </FormLabel>
                <Input
                  size={"lg"}
                  h={"4.8rem"}
                  fontSize={"1.5rem"}
                  borderColor={"black"}
                  _hover={{ borderColor: theme.color.primary.blue }}
                  {...register("name")}
                  required
                />
              </Flex>
              <Flex flexDir={"column"} w={"100%"}>
                <FormLabel fontSize={"2rem"} mb={"1rem"} textColor={"#666666"}>
                  E-mail
                </FormLabel>
                <Input
                  type={"email"}
                  size={"lg"}
                  h={"4.8rem"}
                  fontSize={"1.5rem"}
                  borderColor={"black"}
                  _hover={{ borderColor: theme.color.primary.blue }}
                  {...register("email")}
                  required
                />
              </Flex>
            </Flex>
            <FormLabel fontSize={"2rem"} mb={"1rem"} textColor={"#666666"}>
              Zpráva
            </FormLabel>
            <Textarea
              minHeight="23rem"
              fontSize={"1.5rem"}
              borderColor={"black"}
              _hover={{ borderColor: theme.color.primary.blue }}
              {...register("message")}
              required
            />
            <Button
              mt="3.5rem"
              p={{ base: "2rem 3.5rem", sm: "2.1rem 5rem" }}
              fontSize={"1.7rem"}
              bgColor={"transparent"}
              borderRadius={"0.5rem"}
              fontWeight={500}
              alignSelf={"center"}
              border={`1.5px solid ${theme.color.primary.blue}`}
              textColor={theme.color.primary.blue}
              _hover={{
                bgColor: theme.color.hover.blue,
                textColor: theme.color.text.white,
              }}
              transition={"all 0.4s ease-out"}
              type="submit"
            >
              Odeslat
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Layout>
  );
};

export default Contact;
