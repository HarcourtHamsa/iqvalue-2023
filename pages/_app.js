import { ChakraProvider } from "@chakra-ui/react";
import helpers from "../helpers";
import { AuthProvider } from "../context/auth";
import "../styles/globals.css";
import { useIdleTimer } from "react-idle-timer";

const FIVE_MINS = 5 * 60 * 1000;
const GENERAL_DEBOUNCE_TIME = 500;

function MyApp({ Component, pageProps }) {
  function handleOnUserIdle() {
    helpers.logout();
    Router.push("/");
  }
  useIdleTimer({
    timeout: FIVE_MINS, // time in millisecond
    onIdle: handleOnUserIdle,
    debounce: GENERAL_DEBOUNCE_TIME, // time in millisecond
  });

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
