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
  FlexProps,
  Select,
  Box,
  Divider,
} from "@chakra-ui/react";
import CartProducts from "./CartProducts";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

const FlexInputGroup: FlexProps = {
  gap: "1rem",
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
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormControl>
        <Flex justify={"center"} p={"3rem"} gap={"2rem"}>
          <Flex flexDir={"column"} w={"50%"} gap={"1.3rem"}>
            <Text fontSize={"1.4rem"} fontWeight={500}>
              Kontaktní informace
            </Text>
            <Input
              {...register("email")}
              placeholder="E-mail *"
              type={"email"}
              size={"lg"}
            />
            <Text fontSize={"1.4rem"} fontWeight={500} mt={"1.5rem"}>
              Platební údaje
            </Text>
            <Flex {...FlexInputGroup}>
              <Input
                {...register("firstName")}
                placeholder="Křestní jméno *"
                size={"lg"}
                required
              />
              <Input
                {...register("lastName")}
                placeholder="Příjmení *"
                size={"lg"}
              />
            </Flex>
            <Flex {...FlexInputGroup}>
              <Input
                {...register("address")}
                placeholder="Adresa *"
                size={"lg"}
              />
              <Input
                {...register("addressNumber")}
                placeholder="Číslo popisné *"
                size={"lg"}
              />
            </Flex>
            <Flex {...FlexInputGroup}>
              <Input {...register("city")} placeholder="Město *" size={"lg"} />
              <Input {...register("zip")} placeholder="PSČ *" size={"lg"} />
            </Flex>

            <Box>
              <FormLabel fontSize={"0.9rem"} mb={0}>
                Země:
              </FormLabel>
              <Select {...register("country")} size={"lg"}>
                <option>Česká republika</option>
                <option>Slovenská republika</option>
              </Select>
            </Box>
            <Input
              {...register("phoneNumber")}
              placeholder="Telefon *"
              size={"lg"}
            />

            <Box mt={"2rem"}>
              <Text fontSize={"1.2rem"} mb={"0.5rem"}>
                Poznámka k objednávce
              </Text>
              <Textarea
                {...register("message")}
                minHeight="15rem"
                placeholder="Např. poznámka ke zboží nebo k dopravě"
              />
            </Box>

            <Button
              mt="1rem"
              alignSelf={"center"}
              minW={"40%"}
              p={"1.5rem"}
              bgColor={theme.color.primary.blue}
              textColor={theme.color.text.white}
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
            <Text fontSize={"1.4rem"} fontWeight={500}>
              Vaše objednávka
            </Text>
            <Divider borderColor={"#666666"} />
            <Flex justify={"space-between"} ml={"13rem"}>
              <Text>Produkt</Text>
              <Text>Množství</Text>
              <Text mr={"3rem"}>Celkem</Text>
            </Flex>
            {cartItems.map((product: any) => (
              <CartProducts key={product.id} {...product} />
            ))}
            <Flex justify={"space-between"} fontSize={"1.2rem"}>
              <Text>Mezisoučet:</Text>
              <Text>{totalPrice} Kč</Text>
            </Flex>
            <Flex justify={"space-between"} fontSize={"1.2rem"}>
              <Text>Platba a doprava:</Text>
              <Text>99 Kč</Text>
            </Flex>
            <Divider borderColor={"#666666"} />
            <Flex
              justify={"space-between"}
              fontSize={"1.9rem"}
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
