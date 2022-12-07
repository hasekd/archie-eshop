import { Box, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React from "react";
import StoreItem from "../components/StoreItem/StoreItem";
import useFetch from "../hooks/useFetch";

const store = () => {
  const { data, error, loading } = useFetch(
    "http://localhost:1337/api/products?populate=*"
  );

  if (loading) return <Box>Loading...</Box>;

  if (error) return <Box>Error</Box>;
  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr",
        md: "1fr 1fr",
        lg: "1fr 1fr 1fr",
      }}
      justifyItems={"center"}
    >
      {data.data.map((product: any) => (
        <GridItem key={product.id}>
          <StoreItem {...product.attributes} />
        </GridItem>
      ))}
      {/* {data.data.map((product: any) => (
        <Box key={product.id}>
          <Img
            src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
          />

          <Text>{product.attributes.title}</Text>
          <Text>{product.attributes.price}</Text>
        </Box>
      ))} */}
    </Grid>
  );
};

export default store;
