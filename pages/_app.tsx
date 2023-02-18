import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import chakraTheme from "./../styles/theme";
import { Inter } from "@next/font/google";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

const font = Inter({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={chakraTheme}>
          <ShoppingCartProvider>
            <main className={font.className}>
              <Component {...pageProps} />
            </main>
          </ShoppingCartProvider>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
