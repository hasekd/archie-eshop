import { Flex, Text, Img, Button, Divider, Input, Box } from "@chakra-ui/react";
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
      <Flex justify={"space-between"} align={"center"} gap={"4rem"}>
        <Flex align={"center"} gap={"1rem"}>
          <Img
            src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
            w={"8rem"}
            h={"8rem"}
            objectFit={"cover"}
          />
          <Flex flexDir={"column"} gap={1}>
            <Text fontSize={"1.7rem"} letterSpacing={"0.3px"}>
              {product.attributes.title}
            </Text>
            <Flex gap={1}>
              <Text>Velikost:</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex maxW="80px" pos={"relative"} align={"center"}>
          <Button
            bgColor={"transparent"}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            pos={"absolute"}
            zIndex={1}
            _active={{ bgColor: "none" }}
            fontSize={"1.7rem"}
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
            size={"lg"}
          />
          <Button
            bgColor={"transparent"}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            pos={"absolute"}
            right={0}
            _active={{ bgColor: "none" }}
            fontSize={"1.7rem"}
            onClick={() => increaseCartQuantity(product.id)}
          >
            +
          </Button>
        </Flex>

        <Flex align={"center"}>
          <Text fontSize={"1.4rem"}>
            {formatCurrency(product.attributes.price * quantity)} Kč
          </Text>
          <Button
            bgColor={"transparent"}
            fontSize={"2rem"}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            onClick={() => removeFromCart(product.id)}
          >
            &times;
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default CartProducts;
