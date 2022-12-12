import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Img,
  Text,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: any) => {
  const { removeFromCart } = useShoppingCart();

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
        <Flex flexDir={"column"} gap={1}>
          <Text fontSize={"1.2rem"} letterSpacing={"0.3px"}>
            {product.attributes.title}
          </Text>
          <Flex gap={1} fontSize={"1.05rem"}>
            <Text>{quantity}x</Text>
            <Text>{formatCurrency(product.attributes.price)} Kč</Text>
          </Flex>
        </Flex>
        <Flex align={"center"}>
          <Img
            src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
            w={"5rem"}
            h={"5rem"}
            objectFit={"cover"}
          />
          <Button
            bgColor={"transparent"}
            fontSize={"1.3rem"}
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

export default CartItem;
