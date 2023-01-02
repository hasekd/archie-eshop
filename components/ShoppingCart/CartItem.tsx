import {
  Button,
  chakra,
  Divider,
  Flex,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
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
    return <Spinner size={"xs"} />;
  }

  const product = data.find((i: any) => i.id === id);

  if (product == null) return null;

  return (
    <>
      <Flex justify={"space-between"} align={"center"} gap={"4rem"}>
        <Flex flexDir={"column"} gap={1}>
          <Text
            fontSize={{ base: "1.1rem", md: "1.3rem" }}
            letterSpacing={"0.3px"}
          >
            {product.attributes.title}
          </Text>
          <Flex gap={1} fontSize={{ base: "1rem", md: "1.15rem" }}>
            <Text>{quantity}x</Text>
            <Text>{formatCurrency(product.attributes.price)} Kč</Text>
          </Flex>
        </Flex>
        <Flex align={"center"}>
          <Image
            src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
            alt={product.attributes.title}
            w={{ base: "3rem", sm: "5rem" }}
            h={{ base: "3rem", sm: "5rem" }}
            objectFit={"cover"}
          />
          <Button
            bgColor={"transparent"}
            fontSize={{ base: "1.4rem", sm: "1.7rem" }}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            onClick={() => removeFromCart(product.id)}
            _active={{ bgColor: "none" }}
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
