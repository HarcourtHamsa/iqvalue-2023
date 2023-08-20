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
import { logo } from "../assets/images/list";
import CryptoChartTape from "../components/common/CryptoChartTape";
import Navbar from "../components/common/Navbar";

function Verify() {
  return (
    <div>
      <Navbar />
      <Flex w="full" h="100vh" justifyContent="center" alignItems="center">
        <Box
          w={{ base: "90%", md: "400px" }}
          h="300px"
          p={"12px 25px"}
          bg="black"
        >
          <Stack align={"center"}>{/* <Image src={logo} alt="" /> */}</Stack>

          <Text
            my={10}
            textAlign="center"
            letterSpacing="3px"
            color="orange.400"
          >
            RESET PASSWORD
          </Text>

          <Box textAlign="center" color="white">
            <Text>
              We sent an email to you. Just click on the link in that email to
              reset your password. If you don&apos;t see it, you may need to
              check your spam folder
            </Text>
          </Box>
        </Box>
      </Flex>
      <CryptoChartTape />
    </div>
  );
}

export default Verify;
