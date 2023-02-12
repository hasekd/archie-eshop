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

  const [data, setData] = useState<any>();

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

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

  const cartContent: any = [];
  const invoiceCartContent: any = [];

  cartItems.forEach((item) => {
    const product = data.find((i: any) => i.id === item.id);

    cartContent.push({
      productName: product.attributes.title,
      productQuantity: item.quantity,
      productPrice: product.attributes.price,
    });
  });

  if (cartContent.lenght === 0) return null;

  cartItems.forEach((item) => {
    const product = data.find((i: any) => i.id === item.id);

    invoiceCartContent.push({
      productName: product.attributes.title,
      productPrice: product.attributes.price,
      productQuantity: item.quantity,
    });
  });

  const current = new Date();
  const orderId = parseInt(uuidv4().replace(/-/g, "").substring(0, 8), 16);

  const invoiceTotalPrice = cartItems.reduce((total, cartItem) => {
    const product = data.find((i: any) => i.id === cartItem.id);

    return total + (product?.attributes.price || 0) * cartItem.quantity;
  }, 0);

  const generateInvoice = () => {
    var docDefinition = {
      content: [
        {
          columns: [
            {
              image:
                "data:image/png;base64,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",
              width: 150,
            },
            [
              {
                text: "Faktura",
                color: "#333333",
                width: "*",
                fontSize: 28,
                bold: true,
                alignment: "right",
              },
              {
                text: "130495",
                color: "#333333",
                width: "*",
                fontSize: 20,
                bold: true,
                alignment: "right",
                margin: [0, 0, 0, 15],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: "Dodavatel",
              color: "#aaaaab",
              bold: true,
              fontSize: 14,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
            {
              text: "Zákazník",
              color: "#aaaaab",
              bold: true,
              fontSize: 14,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: "Archie",
              bold: true,
              color: "#333333",
              alignment: "left",
            },
            {
              text: formData.firstName + " " + formData.lastName,
              bold: true,
              color: "#333333",
              alignment: "left",
            },
          ],
        },
        {
          columns: [
            {
              text: "Adresa",
              color: "#aaaaab",
              bold: true,
              margin: [0, 7, 0, 3],
            },
            {
              text: "Adresa",
              color: "#aaaaab",
              bold: true,
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: "U Borského parku 2887/27 \n 30100 Plzeň",
              style: "invoiceBillingAddress",
            },
            {
              text: `${formData.address} ${formData.addressNumber} \n ${formData.zip} ${formData.city}`,
              style: "invoiceBillingAddress",
            },
          ],
        },
        "\n",
        {
          columns: [
            {
              text: "IC: 12049532 \n DIC: CZ12405012",
              style: "invoiceBillingAddress",
            },
            {
              text: "IC: 12049532 \n DIC: CZ12405012",
              style: "invoiceBillingAddress",
            },
          ],
        },
        "\n",
        {
          text: "Platba",
          color: "#aaaaab",
          bold: true,
          fontSize: 11,
          margin: [0, 7, 0, 3],
        },
        {
          columns: [
            {
              text: "Banka  \n Účet \n Variabliní symbol ",
              style: "invoiceBillingAddress",
            },
            {
              text: "ČSOB \n  8293012942/0300 \n 239492492",
            },
            {
              text: "Způsob úhrady \n  Datum vystavení \n Datum splatnosti",
            },
            {
              text: `Platební kartou \n  ${current.getDate()}.${
                current.getMonth() + 1
              }.${current.getFullYear()} \n ${current.getDate()}.${
                current.getMonth() + 1
              }.${current.getFullYear()}`,
            },
          ],
        },

        "\n\n",
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", 105],
            body: [
              [
                {
                  text: "Položka",
                  fillColor: "#eaf2f5",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: "Cena CZK",
                  fillColor: "#eaf2f5",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: "Množství",
                  fillColor: "#eaf2f5",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: "Cena celkem CZK",
                  border: [false, true, false, true],
                  fillColor: "#eaf2f5",
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        invoiceCartContent.map((item: any) => [
          {
            columns: [
              {
                text: item.productName,
                margin: [10, 3, 0, 3],
                border: [false, true, false, true],
              },
              {
                text: item.productPrice,
                margin: [20, 3, 0, 3],
              },
              {
                text: `${item.productQuantity} ks`,
                margin: [20, 3, 0, 3],
              },
              {
                text: item.productPrice * item.productQuantity,
                alignment: "right",
                margin: [0, 3, 10, 3],
              },
            ],
          },
        ]),
        "\n",
        "\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i: any, node: any) {
              return 1;
            },
            vLineWidth: function (i: any, node: any) {
              return 1;
            },
            hLineColor: function (i: any, node: any) {
              return "#eaeaea";
            },
            vLineColor: function (i: any, node: any) {
              return "#eaeaea";
            },
            hLineStyle: function (i: any, node: any) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i: any, node: any) {
              return 10;
            },
            paddingRight: function (i: any, node: any) {
              return 10;
            },
            paddingTop: function (i: any, node: any) {
              return 3;
            },
            paddingBottom: function (i: any, node: any) {
              return 3;
            },
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return "#fff";
            },
          },
          table: {
            headerRows: 1,
            widths: ["*", "auto"],
            body: [
              [
                {
                  text: "Základ DPH CZK",
                  border: [false, true, false, true],
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: invoiceTotalPrice - invoiceTotalPrice * 0.21,
                  alignment: "right",
                  fillColor: "#f5f5f5",
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: "DPH CZK",
                  border: [false, false, false, true],
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
                {
                  text: invoiceTotalPrice * 0.21,
                  border: [false, false, false, true],
                  fillColor: "#f5f5f5",
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: "Celkem CZK",
                  bold: true,
                  fontSize: 20,
                  alignment: "right",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: totalPrice,
                  bold: true,
                  fontSize: 20,
                  alignment: "right",
                  border: [false, false, false, true],
                  fillColor: "#f5f5f5",
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
      ],
    };
  };

  const submitHandler: SubmitHandler<any> = (data) => {
    setFormData(data);

    // emailjs
    //   .send(
    //     process.env.NEXT_PUBLIC_SERVICE_ID as string,
    //     process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
    //     {
    //       to_email: data.to_email,
    //       orderDate: `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`,
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
