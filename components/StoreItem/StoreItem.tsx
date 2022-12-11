import { Box, Flex, Img } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  title: string;
  price: number;
  img: any;
};

const StoreItem = ({ title, price, img }: StoreItemProps) => {
  return (
    <Flex
      w={{ base: "28rem", sm: "40rem" }}
      flexDir={"column"}
      _hover={{ boxShadow: theme.shadow.boxShadow }}
    >
      <Img
        src={`http://localhost:1337${img.data.attributes.url}`}
        height={{ base: "25rem", sm: "32rem" }}
        width="100%"
        objectFit={"cover"}
      />
      <Flex flexDir="column" padding="1rem">
        <Flex justify={"space-between"} align={"baseline"} mb={"2rem"}>
          <Box fontSize={"2rem"}>{title}</Box>
          <Box ml={"2rem"} fontSize={"1.2rem"}>
            {formatCurrency(price)} Kč
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StoreItem;
