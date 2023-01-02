import { useForm, SubmitHandler } from "react-hook-form";
import { theme } from "../../styles/theme";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Flex,
  Select,
  Box,
  Divider,
  InputProps,
} from "@chakra-ui/react";
import CartProducts from "./CartProducts";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { useRouter } from "next/router";

const InputStyles: InputProps = {
  h: "3.6rem",
  size: "lg",
};

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  addressNumber: number;
  city: string;
  zip: number;
  country: string;
  phoneNumber: string;
  message: string;
};

const UserInfoForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { cartItems } = useShoppingCart();

  const router = useRouter();

  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:1337/api/products?populate=*");
      const { data } = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const totalPrice = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const product = data.find((i: any) => i.id === cartItem.id);

      return total + (product?.attributes.price || 0) * cartItem.quantity;
    }, 0)
  );

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push("/pokladna");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormControl>
        <Flex
          flexDir={{ base: "column", lg: "unset" }}
          justify={"center"}
          p={"2rem 1rem"}
          gap={"2rem"}
        >
          <Flex
            flexDir={"column"}
            gap={"1.3rem"}
            w={"100%"}
            order={{ base: "1", lg: "0" }}
          >
            <Text fontSize={{ base: "1.4rem", lg: "1.6rem" }} fontWeight={500}>
              Kontaktní informace
            </Text>
            <Input
              {...register("email")}
              placeholder="E-mail *"
              type={"email"}
              {...InputStyles}
            />
            <Text
              fontSize={{ base: "1.4rem", lg: "1.6rem" }}
              fontWeight={500}
              mt={"1.5rem"}
            >
              Platební údaje
            </Text>
            <Flex>
              <Input
                {...register("firstName")}
                placeholder="Křestní jméno *"
                {...InputStyles}
                mr={"1rem"}
                required
              />
              <Input
                {...register("lastName")}
                placeholder="Příjmení *"
                {...InputStyles}
              />
            </Flex>
            <Flex>
              <Input
                {...register("address")}
                placeholder="Adresa *"
                mr={"1rem"}
                {...InputStyles}
              />
              <Input
                {...register("addressNumber")}
                placeholder="Číslo popisné *"
                {...InputStyles}
              />
            </Flex>
            <Flex>
              <Input
                {...register("city")}
                placeholder="Město *"
                mr={"1rem"}
                {...InputStyles}
              />
              <Input
                {...register("zip")}
                placeholder="PSČ *"
                {...InputStyles}
              />
            </Flex>

            <Box>
              <FormLabel fontSize={"1rem"} mb={0}>
                Země:
              </FormLabel>
              <Select {...register("country")} size={"lg"} h={"3.6rem"}>
                <option>Česká republika</option>
                <option>Slovenská republika</option>
              </Select>
            </Box>
            <Input
              {...register("phoneNumber")}
              placeholder="Telefon *"
              {...InputStyles}
            />

            <Box mt={"2rem"}>
              <Text fontSize={{ base: "1rem", lg: "1.2rem" }} mb={"0.5rem"}>
                Poznámka k objednávce
              </Text>
              <Textarea
                {...register("message")}
                minHeight="15rem"
                placeholder="Např. poznámka ke zboží nebo k dopravě"
                size={"lg"}
              />
            </Box>

            <Button
              mt="1rem"
              alignSelf={"center"}
              minW={"40%"}
              p={"1.5rem 2rem"}
              fontSize={"1.1rem"}
              fontWeight={700}
              bgColor={theme.color.primary.blue}
              textColor={theme.color.text.white}
              _hover={{ bgColor: theme.color.hover.blue }}
              type="submit"
            >
              Platba a doprava
            </Button>
          </Flex>
          <Flex
            flexDir={"column"}
            gap={"1rem"}
            p={"3rem"}
            bgColor={theme.color.primary.gray}
          >
            <Text fontSize={{ base: "1.4rem", lg: "1.6rem" }} fontWeight={500}>
              Vaše objednávka
            </Text>
            <Divider borderColor={"#666"} />
            <Flex justify={"space-between"}>
              <Text>Produkt</Text>
              <Text>Množství</Text>
              <Text mr={"3rem"}>Celkem</Text>
            </Flex>
            {cartItems.map((product: any) => (
              <CartProducts key={product.id} {...product} />
            ))}
            <Flex
              justify={"space-between"}
              fontSize={{ base: "1rem", lg: "1.2rem" }}
            >
              <Text>Mezisoučet:</Text>
              <Text>{totalPrice} Kč</Text>
            </Flex>
            <Flex
              justify={"space-between"}
              fontSize={{ base: "1rem", lg: "1.2rem" }}
            >
              <Text>Platba a doprava:</Text>
              <Text>99 Kč</Text>
            </Flex>
            <Divider borderColor={"#666666"} />
            <Flex
              justify={"space-between"}
              fontSize={{ base: "1.5rem", lg: "2rem" }}
              fontWeight={700}
            >
              <Text>Celkem:</Text>
              <Text>{totalPrice} Kč</Text>
            </Flex>
          </Flex>
        </Flex>
      </FormControl>
    </form>
  );
};

export default UserInfoForm;
