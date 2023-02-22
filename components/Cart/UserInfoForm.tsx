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
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import useProductsQuery from "../../hooks/useProductsQuery";
import axios from "axios";
import { docDefinition } from "./pdfFileTemplate";
import { createDate } from "./utils";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  const { cartItems, setFormData, formData } = useShoppingCart();

  const router = useRouter();

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <h1>Loading...</h1>;

  if (productsQuery.isError) {
    return <div>{JSON.stringify(productsQuery.error)}</div>;
  }

  const totalPrice = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const product = productsQuery.data.find((i: any) => i.id === cartItem.id);

      return total + (product?.attributes.price || 0) * cartItem.quantity;
    }, 0)
  );

  const cartContent: any = [];
  const invoiceCartContent: unknown[] = [];

  cartItems.forEach((item) => {
    const product = productsQuery.data.find((i: any) => i.id === item.id);

    cartContent.push({
      productName: product.attributes.title,
      productQuantity: item.quantity,
      productPrice: product.attributes.price,
    });
  });

  if (cartContent.lenght === 0) return null;

  cartItems.forEach((item) => {
    const product = productsQuery.data.find((i: any) => i.id === item.id);

    invoiceCartContent.push({
      productName: product.attributes.title,
      productPrice: product.attributes.price,
      productQuantity: item.quantity,
    });
  });

  const orderId = parseInt(uuidv4().replace(/-/g, "").substring(0, 8), 16);

  const invoiceTotalPrice = cartItems.reduce((total, cartItem) => {
    const product = productsQuery.data.find((i: any) => i.id === cartItem.id);

    return total + (product?.attributes.price || 0) * cartItem.quantity;
  }, 0);

  const generateInvoice = () => {
    const pdfDocGenerator = pdfMake.createPdf(
      docDefinition(formData, invoiceCartContent, invoiceTotalPrice, totalPrice)
    );

    pdfDocGenerator.getBlob(async (blob) => {
      const form = new FormData();
      let someData;

      form.append("files", blob, "invoice.pdf");

      try {
        const res = await axios.post("http://localhost:1337/api/upload", form);
        someData = res.data;
      } catch (error) {
        console.error(error);
      }

      const uploadedFile = await someData;
      const fileId = uploadedFile[0].id;

      try {
        const res = await axios.post("http://localhost:1337/api/client-datas", {
          data: {
            invoice: fileId,
            email: formData.to_email,
            name: formData.firstName + " " + formData.lastName,
            address:
              formData.address +
              " " +
              formData.addressNumber +
              " " +
              formData.city +
              " " +
              formData.zip,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
          },
        });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    });
  };

  const submitHandler: SubmitHandler<any> = (data) => {
    setFormData(data);

    // emailjs
    //   .send(
    //     process.env.NEXT_PUBLIC_SERVICE_ID as string,
    //     process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
    //     {
    //       to_email: data.to_email,
    //       orderDate: createDate('email'),
    //       orderId: orderId,
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       address: data.address,
    //       addressNumber: data.addressNumber,
    //       zip: data.zip,
    //       city: data.city,
    //       products: cartContent,
    //       totalPrice: totalPrice,
    //     },
    //     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    //   )
    //   .then(
    //     function (response) {
    //       console.log("SUCCESS!", response.status, response.text);
    //     },
    //     function (error) {
    //       console.log("FAILED...", error);
    //     }
    //   );

    generateInvoice();

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
              value={formData.to_email || ""}
              onChange={(e) =>
                setFormData({ ...formData, to_email: e.target.value })
              }
              required
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
                value={formData.firstName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <Input
                {...register("lastName")}
                placeholder="Příjmení *"
                name="lastName"
                value={formData.lastName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                {...InputStyles}
              />
            </Flex>
            <Flex>
              <Input
                {...register("address")}
                placeholder="Adresa *"
                mr={"1rem"}
                name="address"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                {...InputStyles}
              />
              <Input
                {...register("addressNumber")}
                placeholder="Číslo popisné *"
                name="addressNumber"
                value={formData.addressNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, addressNumber: e.target.value })
                }
                {...InputStyles}
              />
            </Flex>
            <Flex>
              <Input
                {...register("city")}
                placeholder="Město *"
                mr={"1rem"}
                name="city"
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                {...InputStyles}
              />
              <Input
                {...register("zip")}
                placeholder="PSČ *"
                name="zip"
                value={formData.zip || ""}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                {...InputStyles}
              />
            </Flex>

            <Box>
              <FormLabel fontSize={"1rem"} mb={0}>
                Země:
              </FormLabel>
              <Select
                {...register("country")}
                size={"lg"}
                h={"3.6rem"}
                value={formData.country || ""}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              >
                <option>Česká republika</option>
                <option>Slovenská republika</option>
              </Select>
            </Box>
            <Input
              {...register("phoneNumber")}
              placeholder="Telefon *"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
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
                value={formData.message || ""}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </Box>

            <Button
              variant={"custom"}
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
