import { Box, Divider, Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout/Layout";
import { theme } from "../styles/theme";

const about = () => {
  return (
    <Layout>
      <Box maxW={"8rem"} m={"3rem auto 3rem"}>
        <Heading
          fontSize={"3rem"}
          textAlign={"center"}
          mb={"1.2rem"}
          fontWeight={600}
        >
          O nás
        </Heading>
        <Divider borderColor={theme.color.primary.blue} borderWidth={"2px"} />
      </Box>
    </Layout>
  );
};

export default about;
