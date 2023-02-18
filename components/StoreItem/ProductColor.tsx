import { Box, BoxProps, Flex, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useProductsQuery from "../../hooks/useProductsQuery";

const ChooseColorBoxStyles: BoxProps = {
  borderRadius: "50%",
  w: "3.8rem",
  h: "3.8rem",
  cursor: "pointer",
  mr: "0.7rem",
  border: "0.15rem solid #fff",
  _hover: { boxShadow: "0 0 0 0.3rem #ccc" },
  transition: "all 0.3s ease-out",
};

const ProductColor = ({ id }: any) => {
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <h1>Loading...</h1>;

  if (productsQuery.isError) {
    return <div>{JSON.stringify(productsQuery.error)}</div>;
  }

  return (
    <Flex>
      {productsQuery.data.data.map((product: any) => (
        <Link key={product.id} href={"/pelisky/" + product.attributes.slug}>
          {product.id !== id ? (
            <Box {...ChooseColorBoxStyles}>
              <Image
                loader={() =>
                  `http://localhost:1337${product.attributes.img.data.attributes.url}`
                }
                src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
                alt={product.attributes.title}
                width={10}
                height={0}
                style={{
                  borderRadius: "50%",
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
              />
            </Box>
          ) : null}
        </Link>
      ))}
    </Flex>
  );
};

export default ProductColor;
