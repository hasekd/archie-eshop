import {
  Flex,
  Text,
  Button,
  Divider,
  Input,
  Grid,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartProducts = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

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

  const product = data.find((i: any) => i.id === id);

  if (product == null) return null;

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} justifyItems={"flex-end"}>
        <Flex align={"center"} gap={"1rem"} justifySelf={"flex-start"}>
          <Image
            src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
            alt={product.attributes.title}
            w={{ base: "2.5rem", sm: "6rem" }}
            h={{ base: "2.5rem", sm: "6rem" }}
            objectFit={"cover"}
          />
          <Flex flexDir={"column"} gap={1} w={{ base: "unset", lg: "15rem" }}>
            <Text
              fontSize={{
                base: "0.7rem",
                sm: "1.1rem",
                lg: "1.35rem",
              }}
              letterSpacing={"0.3px"}
            >
              {product.attributes.title}
            </Text>
          </Flex>
        </Flex>

        <Flex
          maxW={{ base: "5rem", sm: "8rem" }}
          pos={"relative"}
          align={"center"}
        >
          <Button
            bgColor={"transparent"}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            pos={"absolute"}
            zIndex={1}
            _active={{ bgColor: "none" }}
            fontSize={{ base: "1rem", lg: "1.3rem" }}
            onClick={() => decreaseCartQuantity(product.id)}
          >
            -
          </Button>
          <Input
            value={quantity}
            type={"number"}
            textAlign={"center"}
            _focus={{ bgColor: theme.color.primary.white }}
            onChange={(e: any) => e.target.value}
            size={{ base: "sm", sm: "md", md: "lg" }}
          />
          <Button
            bgColor={"transparent"}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            pos={"absolute"}
            right={0}
            _active={{ bgColor: "none" }}
            fontSize={{ base: "0.9rem", lg: "1.2rem" }}
            onClick={() => increaseCartQuantity(product.id)}
          >
            +
          </Button>
        </Flex>

        <Flex align={"center"} justify={"flex-end"} gap={2}>
          <Text fontSize={{ base: "0.8rem", sm: "1.1rem", lg: "1.1rem" }}>
            {formatCurrency(product.attributes.price * quantity)} Kč
          </Text>
          <Button
            bgColor={"transparent"}
            size={"xs"}
            fontSize={{ base: "1.2rem", lg: "1.6rem" }}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            onClick={() => removeFromCart(product.id)}
          >
            &times;
          </Button>
        </Flex>
      </Grid>
      <Divider />
    </>
  );
};

export default CartProducts;
