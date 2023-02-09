import { Box, BoxProps, Flex, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
        <Link key={product.id} href={"/pelisky/" + product.attributes.slug}>
          {product.id !== id ? (
            <Box {...ChooseColorBoxStyles}>
              <Image
                loader={() =>
                  `http://localhost:1337${product.attributes.img.data.attributes.url}`
                }
                src={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
                alt={product.attributes.title}
                width={0}
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
