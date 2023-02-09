import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import chakraTheme from "./../styles/theme";
import { Inter } from "@next/font/google";

const font = Inter({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ShoppingCartProvider>
        <main className={font.className}>
          <Component {...pageProps} />
        </main>
      </ShoppingCartProvider>
    </ChakraProvider>
  );
}
