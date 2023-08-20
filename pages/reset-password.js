import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Stack,
  FormControl,
  Button,
  FormLabel,
  Input,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import helpers from "../helpers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/auth";
import Image from "next/image";
// import { logo } from "../assets/list";
import { useRouter } from "next/router";
import Navbar from "../components/common/Navbar";
import CryptoChartTape from "../components/common/CryptoChartTape";

function ResetPassword() {
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
    },

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // code goes here
        console.log(values.email);
        const res = await helpers.resetPassword(values).then((data) => {
          console.log(data);
          if (data?.name === "AxiosError") {
            notify("Error: Invalid email address", "error");
          } else {
            notify("Reset successful", "success");
            Router.push("/login");
          }
        });
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Flex w="full" h="100vh" justifyContent="center" alignItems="center">
        <Box
          w={{ base: "fit-content", md: "400px" }}
          h="fit-content"
          p={"12px 25px"}
        >
          <Stack align={"center"}>{/* <Image src={logo} alt="" /> */}</Stack>

          <Text
            textTransform="uppercase"
            letterSpacing="3px"
            color="orange.500"
            textAlign="center"
            mb={10}
          >
            Reset password
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel fontWeight="normal">Email address</FormLabel>
                <Input
                  type="email"
                  p={"6"}
                  id="email"
                  name="email"
                  rounded={0}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel fontWeight="normal">New Password</FormLabel>
                <Input
                  type="password"
                  p={"6"}
                  id="password"
                  name="password"
                  rounded={0}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel fontWeight="normal">Confirm New Password</FormLabel>
                <Input
                  p={"6"}
                  id="email"
                  name="email"
                  type="password"
                  rounded={0}
                />
              </FormControl>

              <Button
                colorScheme={"orange"}
                rounded={0}
                fontWeight="normal"
                type="submit"
                mt={6}
                p={6}
                isLoading={isLoading}
                // h={10}
              >
                Reset password
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
      <CryptoChartTape />
    </div>
  );
}

export default ResetPassword;
