import {
  Box,
  BoxProps,
  Divider,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  useRangeSlider,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { theme } from "../../styles/theme";

const ChooseColorBoxStyles: BoxProps = {
  borderRadius: "50%",
  w: { base: "2rem", md: "2.5rem" },
  h: { base: "2rem", md: "2.5rem" },
  cursor: "pointer",
  mr: "0.7rem",
  border: "0.1rem solid #ccc",
  _hover: { boxShadow: "0 0 0 0.15rem #ccc" },
  transition: "all 0.3s ease-out",
};

const ChooseSizeBoxStyles: BoxProps = {
  w: { base: "2.2rem", md: "2.8rem" },
  h: { base: "2.2rem", md: "2.8rem" },
  cursor: "pointer",
  fontSize: "1.1rem",
  mr: "0.7rem",
  border: "0.1rem solid #ccc",
  _hover: { boxShadow: "0 0 0 0.15rem #ccc" },
  transition: "all 0.3s ease-out",
};

type FilterProps = {
  filteredProducts: any;
  products: any;
  selectedColor: string;
  selectedSize: string;
  selectedPrice: number[];
  onHandleColorChange: (color: string) => void;
  onHandleSizeChange: (size: string) => void;
  onHandlePriceChange: (price: number[]) => void;
  onHandleClearFilter: () => void;
};

const Filter = ({
  filteredProducts,
  products,
  selectedColor,
  selectedSize,
  selectedPrice,
  onHandleColorChange,
  onHandleSizeChange,
  onHandlePriceChange,
  onHandleClearFilter,
}: FilterProps) => {
  let data;

  data = products
    .map((product: any) => product.attributes.price)
    .sort((a: number, b: number) => a - b);

  const minPrice = data[0];
  const maxPrice = data[data.length - 1];

  const [value, setValue] = useState([minPrice, maxPrice]);
  const [defaultValue, setDefaultValue] = useState([minPrice, maxPrice]);

  useRangeSlider({
    value,
    onChange: setValue,
  });

  return (
    <Box w={"18rem"} pl={"2rem"}>
      <Text fontSize={"2rem"}>Filtrovat podle</Text>
      <Divider borderColor={"#CCCCCC"} m={"1rem 0"} />
      <Text fontSize={"1.5rem"} mb={"1rem"}>
        Cena
      </Text>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={defaultValue}
        min={minPrice}
        max={maxPrice}
        value={value}
        onChange={(price) => setValue(price)}
        onChangeEnd={(price) => onHandlePriceChange(price)}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack bg={theme.color.primary.blue} />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} boxSize={5} bg={theme.color.primary.blue} />
        <RangeSliderThumb index={1} boxSize={5} bg={theme.color.primary.blue} />
      </RangeSlider>
      <Flex justify={"space-between"} mb={"2rem"}>
        <Text fontSize={"1.1rem"} fontWeight={600}>
          {value[0]} Kč
        </Text>
        <Text fontSize={"1.1rem"} fontWeight={600}>
          {value[1]} Kč
        </Text>
      </Flex>
      <Text fontSize={"1.5rem"} mb={"1rem"}>
        Barva
      </Text>
      <Flex mb={"2rem"}>
        <Box
          {...ChooseColorBoxStyles}
          bgColor={"#000"}
          onClick={() => onHandleColorChange("Černá")}
        />
        <Box
          {...ChooseColorBoxStyles}
          bgColor={theme.color.primary.blue}
          onClick={() => onHandleColorChange("Modrá")}
        />
        <Box
          {...ChooseColorBoxStyles}
          bgColor={"#fff"}
          onClick={() => onHandleColorChange("Bílá")}
        />
      </Flex>
      <Text fontSize={"1.5rem"} mb={"1rem"}>
        Velikost
      </Text>
      <Flex mb={"2rem"}>
        <Flex
          {...ChooseSizeBoxStyles}
          justify={"center"}
          align={"center"}
          onClick={() => onHandleSizeChange("s")}
        >
          S
        </Flex>
        <Flex
          {...ChooseSizeBoxStyles}
          justify={"center"}
          align={"center"}
          onClick={() => onHandleSizeChange("m")}
        >
          M
        </Flex>
        <Flex
          {...ChooseSizeBoxStyles}
          justify={"center"}
          align={"center"}
          onClick={() => onHandleSizeChange("l")}
        >
          L
        </Flex>
      </Flex>

      {filteredProducts.length <= products.length - 1 ? (
        <>
          <Text fontSize={"1.2rem"} mb={"1rem"}>
            Aplikované filtry: {selectedColor}{" "}
            {selectedSize.toLocaleUpperCase()}
          </Text>
          <Button
            p={0}
            size={"xs"}
            fontSize={"1.1rem"}
            fontWeight={400}
            bgColor={"transparent"}
            _hover={{ bgColor: "none", color: theme.color.primary.blue }}
            _active={{ bgColor: "none" }}
            transition={"all 0.2s ease-out"}
            onClick={() => {
              setDefaultValue([0, 20000]);
              setValue([minPrice, maxPrice]);
              return onHandleClearFilter();
            }}
          >
            Smazat filtry &times;
          </Button>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Filter;
