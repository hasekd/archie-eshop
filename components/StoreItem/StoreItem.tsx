import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  CardFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  img: any;
};

const StoreItem = ({ id, title, price, img }: StoreItemProps) => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <>
      <Card w="lg" _hover={{ boxShadow: theme.shadow.boxShadow }}>
        <CardBody>
          <Link href={"/pelisky/" + id}>
            <Image
              src={`http://localhost:1337${img.data.attributes.url}`}
              alt={title}
              borderRadius="lg"
              height={{ base: "25rem", sm: "32rem" }}
              w={"100%"}
              objectFit={"cover"}
            />
          </Link>
          <Flex justify={"space-between"} mt={"6"} flexDir={"column"} gap={5}>
            <Flex flexDir={"column"} gap={1}>
              <Link href={"/pelisky/" + id}>
                <Heading fontSize={"1.8rem"} fontWeight={600}>
                  {title}
                </Heading>
              </Link>
              <Text fontSize={"1.3rem"}>{formatCurrency(price)} Kč</Text>
            </Flex>

            <Button
              textColor={theme.color.text.white}
              bgColor={theme.color.primary.blue}
              fontWeight={700}
              fontSize={"1.2rem"}
              p={"1.5rem 0"}
              _hover={{ bgColor: theme.color.hover.blue }}
              onClick={() => increaseCartQuantity(id)}
            >
              Přidat do košíku
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default StoreItem;
