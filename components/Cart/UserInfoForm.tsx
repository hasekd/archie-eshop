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
import { jsPDF } from "jspdf";
import emailjs from "emailjs-com";

const InputStyles: InputProps = {
  h: "3.6rem",
  size: "lg",
};

type Inputs = {
  to_email: string;
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
  let ids: any;
  let quantities: any;
  cartItems.map((item) => {
    ids = item.id;
    quantities = item.quantity;
  });

  const product = data.find((i: any) => i.id === ids);

  if (product == null) return null;

  const submitHandler: SubmitHandler<any> = (data) => {
    console.log(data);

    const doc = new jsPDF();
    console.log(product.attributes.title);

    emailjs
      .send(
        "service_y0wxym7",
        "template_f4spqmp",
        {
          to_email: data.to_email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.adress,
          addressNumber: data.adressNumber,
          zip: data.zip,
          city: data.zip,
          productName: product.attributes.title,
          productQuantity: quantities,
          productPrice: product.attributes.price,
          totalPrice: totalPrice,
        },
        "7NCrXz-AjuPOxgTyl"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );

    // doc.text("Invoice", 10, 10);
    // doc.text(`Customer Name: ${data.firstName}`, 10, 20);
    // doc.text(`Customer Email: ${data.email}`, 10, 30);

    router.push("/pokladna");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormControl maxW={"130rem"} m={"0 auto"}>
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
              {...register("to_email")}
              placeholder="E-mail *"
              type={"email"}
              name="to_email"
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
                name="firstName"
                required
              />
              <Input
                {...register("lastName")}
                placeholder="Příjmení *"
                name="lastName"
                {...InputStyles}
              />
            </Flex>
            <Flex>
              <Input
                {...register("address")}
                placeholder="Adresa *"
                mr={"1rem"}
                name="address"
                {...InputStyles}
              />
              <Input
                {...register("addressNumber")}
                placeholder="Číslo popisné *"
                name="addressNumber"
                {...InputStyles}
              />
            </Flex>
            <Flex>
              <Input
                {...register("city")}
                placeholder="Město *"
                mr={"1rem"}
                name="city"
                {...InputStyles}
              />
              <Input
                {...register("zip")}
                placeholder="PSČ *"
                name="zip"
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
