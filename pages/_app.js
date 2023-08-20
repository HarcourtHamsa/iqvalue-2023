import { ChakraProvider } from "@chakra-ui/react";
import SupportBtn from "../components/common/SupportBtn";
import { AuthProvider } from "../context/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />

        {/* <SupportBtn /> */}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
