import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import chakraTheme from "./../styles/theme";
import { Raleway } from "@next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ShoppingCartProvider>
        <main className={raleway.className}>
          <Component {...pageProps} />
        </main>
      </ShoppingCartProvider>
    </ChakraProvider>
  );
}
