import React, { useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CryptoChartTape from "../components/common/CryptoChartTape";
import { useFormik } from "formik";
import helpers from "../helpers";
import { countries } from "../countries";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";

import logo from "../assets/images/logo.svg";
import Link from "next/link";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const notify = (msg, type) =>
    toast(msg, {
      type,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
    });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
    },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await helpers
          .register(values)
          .then((data) => {
            console.log(data);

            if (data.name === "AxiosError") {
              notify("Email already taken", "error");
            } else {
              notify("Account created successfully!", "success");
              Router.push("login");
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      } catch (error) {
        console.log(error);
        notify("Oops! an error occured");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div>
      <Navbar />
      <ToastContainer />

      <Flex
        w="full"
        h={{ md: "fit-content" }}
        justifyContent="center"
        alignItems="center"
        py={20}
        bg="gray.50"
      >
        <div>
          <Heading fontSize="2xl" textAlign="center">
            {/* <Image src={logo} alt="" /> */}
          </Heading>

          <Box w={{ base: "90%", md: "400px" }} m="auto" h="inherit">
            <form onSubmit={formik.handleSubmit}>
              <Text
                textTransform="uppercase"
                letterSpacing="3px"
                textAlign="center"
                color="orange.500"
                mt={5}
              >
                Create a free account
              </Text>
              <Stack mt={10} spacing={8}>
                <Box>
                  <FormLabel>First Name</FormLabel>
                  <InputGroup>
                    <Input
                      type={"text"}
                      p={"6"}
                      rounded={'sm'}
                      id="first-name"
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel>Last Name</FormLabel>
                  <InputGroup>
                    <Input
                      type={"text"}
                      p={"6"}
                      rounded={'sm'}
                      id="last-name"
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel>Country of Residence</FormLabel>
                  <Select
                    placeholder=""
                    id="country"
                    name="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                  >
                    {countries.map((country) => {
                      return (
                        <option value={country.name} key={country.code}>
                          {country.name}
                        </option>
                      );
                    })}
                  </Select>
                </Box>

                <Box>
                  <FormLabel>Email Address</FormLabel>
                  <InputGroup>
                    <Input
                      type={"email"}
                      p={"6"}
                      rounded={'sm'}
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
                      rounded={'sm'}
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
                  colorScheme={"orange"}
                  fontWeight="normal"
                  type="submit"
                  isLoading={isLoading}
                >
                  Create Free Account
                </Button>
              </Stack>

              <Text mt={6}>
                Already have an account? <Link href="/login">Log in</Link>
              </Text>
            </form>
          </Box>
        </div>
      </Flex>

      <CryptoChartTape />
      <Footer />
    </div>
  );
}

export default Register;
