import { Card, CardBody, Heading, Text, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  img: any;
  slug: string;
};

const NewProductItem = ({ id, title, price, img, slug }: StoreItemProps) => {
  const { increaseCartQuantity } = useShoppingCart();

  const srcImage = `http://localhost:1337${img.data.attributes.url}`;

  return (
    <Card w="md" _hover={{ boxShadow: theme.shadow.boxShadow }}>
      <CardBody>
        <Link href={"/pelisky/" + slug}>
          <Image
            loader={() => srcImage}
            src={srcImage}
            alt={title}
            width={0}
            height={0}
            style={{ width: "auto", height: "20rem", objectFit: "cover" }}
          />
        </Link>
        <Flex justify={"space-between"} mt={"6"} flexDir={"column"} gap={5}>
          <Flex flexDir={"column"} gap={1}>
            <Link href={"/pelisky/" + slug}>
              <Heading
                fontSize={{ base: "1.4rem", sm: "1.6rem" }}
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
            variant={"custom"}
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

export default NewProductItem;
