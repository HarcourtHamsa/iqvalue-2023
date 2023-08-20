import React, { useContext, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CryptoChartTape from "../components/common/CryptoChartTape";

import { useRouter } from "next/router";
import { useFormik } from "formik";
import helpers from "../helpers";
import { AuthContext } from "../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import logo from "../assets/images/logo.svg";
import Link from "next/link";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const authContext = useContext(AuthContext);
  const Router = useRouter();

  const notify = (type, msg) =>
    toast(msg, { type: type, position: "top-center" });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const res = await helpers.login(values).then((data) => {
          if (data.response?.status == 401) {
            notify("error", "Your account has been disabled");
            return;
          }

          if (data.name === "AxiosError") {
            notify("error", "Wrong email or password");
          } else {
            notify("success", "Authentication successful");

            console.log(authContext);
            authContext.setUserAuthInfo(data.data.token);
            console.log("saving credentials...", data.data.data);
            authContext.setUserDetails(data.data.data);

            // redirects to dashboard
            Router.push("/dashboard");
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },

    // onSubmit: async (values) => {
    //   setIsLoading(true);
    //   try {
    //     const res = await helpers.login(values).then((data) => {
    //       if (data.name === "AxiosError") {
    //         notify("Wrong email or password", "error");
    //       } else {
    //         notify("Authentication successful!", "success");
    //         authContext.setUserAuthInfo(data.data.token);
    //         console.log("saving credentials...", data.data.data);
    //         authContext.setUserDetails(data.data.data);
    //         router.push("/app");
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // },
  });
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Flex
        w="100vw"
        h={{ md: "100vh", base: "100vh" }}
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
      >
        <div>
          <Heading fontSize="2xl" textAlign="center">
            {/* <Image src={logo} alt="" /> */}
          </Heading>
          <Box
            w={{ base: "90vw", md: "400px" }}
            h="fit-content"
            p={{ base: 0, md: 8 }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Text
                textTransform="uppercase"
                letterSpacing="3px"
                textAlign="center"
                color="orange.500"
              >
                Account Login
              </Text>
              <Stack mt={10} spacing={8}>
                <Box>
                  <FormLabel>Email Address</FormLabel>
                  <InputGroup>
                    <Input
                      type={"email"}
                      p={"6"}
                      rounded={0}
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      p={6}
                      rounded={0}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                <Button
                  p={6}
                  rounded={'sm'}
                  colorScheme="orange"
                  fontWeight="normal"
                  isLoading={isLoading}
                  type="submit"
                >
                  Log In
                </Button>
              </Stack>

              <Text mt={3} color="orange.500">
                <Link href="/forgot-password">Forgot password?</Link>
              </Text>

              <Text mt={3}>
                Don&apos;t have an account? <Link href="/register">Sign up</Link>
              </Text>
            </form>
          </Box>
        </div>
      </Flex>
      <Footer />

      <CryptoChartTape />
    </div>
  );
}

export default Login;
