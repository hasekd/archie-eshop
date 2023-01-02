import { Box, BoxProps, Flex, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ChooseColorBoxStyles: BoxProps = {
  borderRadius: "50%",
  w: { base: "3.5rem", md: "3.8rem" },
  h: { base: "3.5rem", md: "3.8rem" },
  cursor: "pointer",
  mr: "0.7rem",
  border: "0.15rem solid #fff",
  _hover: { boxShadow: "0 0 0 0.3rem #ccc" },
  transition: "all 0.3s ease-out",
};

const ProductColor = ({ id }: any) => {
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

  return (
    <Flex>
      {data.map((product: any) => (
        <Link key={product.id} href={"/pelisky/" + product.id}>
          {product.id !== id ? (
            <Box
              {...ChooseColorBoxStyles}
              bgImage={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
              bgPosition={"center"}
              bgSize={"cover"}
            />
          ) : null}
        </Link>
      ))}
    </Flex>
  );
};

export default ProductColor;
