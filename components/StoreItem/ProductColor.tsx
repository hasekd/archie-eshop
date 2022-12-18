import { Box, BoxProps, Flex, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type ProductTypes = {
  id: number;
  attributes: { title: string; price: number; img: string };
};

const ChooseColorBoxStyles: BoxProps = {
  borderRadius: "50%",
  w: "3rem",
  h: "3rem",
  cursor: "pointer",
  mr: "0.7rem",
  _hover: { boxShadow: "0 0 0 0.3rem #ccc", border: "0.1rem solid #fff" },
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
      {data.map((product: ProductTypes) => (
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
