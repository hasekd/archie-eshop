import { Box, Flex, Img } from "@chakra-ui/react";
import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  img: any;
};
const StoreItem = ({ id, title, price, img }: StoreItemProps) => {
  return (
    <Flex w={"30rem"} flexDir={"column"}>
      <Img
        src={`http://localhost:1337${img.data.attributes.url}`}
        height="20rem"
        width="100%"
        objectFit={"cover"}
      />
      <Flex flexDir="column" padding="1rem">
        <Flex justify={"space-between"} align={"baseline"} mb={"2rem"}>
          <Box fontSize={"2rem"}>{title}</Box>
          <Box ml={"2rem"}>{formatCurrency(price)} Kč</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StoreItem;
