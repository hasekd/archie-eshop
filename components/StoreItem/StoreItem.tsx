import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
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
    <Card w="lg" _hover={{ boxShadow: theme.shadow.boxShadow }}>
      <CardBody>
        <Link href={"/pelisky/" + id}>
          <Image
            src={`http://localhost:1337${img.data.attributes.url}`}
            alt={title}
            borderRadius="lg"
            height={{ base: "22rem", sm: "32rem" }}
            w={"100%"}
            objectFit={"cover"}
          />
        </Link>
        <Flex justify={"space-between"} mt={"6"} flexDir={"column"} gap={5}>
          <Flex flexDir={"column"} gap={1}>
            <Link href={"/pelisky/" + id}>
              <Heading
                fontSize={{ base: "1.5rem", sm: "1.8rem" }}
                fontWeight={600}
                _hover={{ textDecor: "underline" }}
              >
                {title}
              </Heading>
            </Link>
            <Text fontSize={{ base: "1.1rem", sm: "1.3rem" }}>
              {formatCurrency(price)} Kč
            </Text>
          </Flex>

          <Button
            textColor={theme.color.text.white}
            bgColor={theme.color.primary.blue}
            fontWeight={700}
            fontSize={{ base: "1.1rem", sm: "1.2rem" }}
            p={{ base: "1.3rem 0", sm: "1.5rem 0" }}
            _hover={{ bgColor: theme.color.hover.blue }}
            onClick={() => increaseCartQuantity(id)}
          >
            Přidat do košíku
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default StoreItem;
