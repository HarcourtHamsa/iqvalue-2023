import React, { useState, useRef, useEffect, useContext } from "react";
import Wrapper from "../../components/dashboard/Wrapper";
import {
  Heading,
  Text,
  Box,
  FormControl,
  Button,
  FormLabel,
  Stack,
  Input,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CryptoChartTape from "../../components/common/CryptoChartTape";
import helpers from "../../helpers";
import { AuthContext } from "../../context/auth";

function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [user, setUser] = useState({});
  const authContext = useContext(AuthContext);
  const form = useRef();

  const handleImageUpload = async (values) => {
    const data = new FormData();
    const firstName = user.firstName;
    const file = values.file;

    data.append("file", values.file);
    data.append("upload_preset", "default");
    data.append("cloud_name", "dgn6edv1k");

    await axios
      .post("https://api.cloudinary.com/v1_1/dgn6edv1k/image/upload", data)
      .then(async (data) => {
        console.log(data.data.url);
        setCloudinaryUrl(data.data.url);
      })
      .then(async () => {
        const data = {
          url: cloudinaryUrl,
          from: firstName,
        };

        await helpers.verifyUser(data);

        notify("Success: Verification Successful");
      })
      .catch((error) => console.log("error uploading file...", error));
  };

  const notify = (msg) =>
    toast(msg, {
      type: "success",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      theme: "light",
    });

  const formik = useFormik({
    initialValues: {
      method: "driversLicense",
    },

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        // code goes here
        console.log(values);
        await handleImageUpload(values);
        let v = { ...user, verified: true };
        authContext.setUserDetails(v);
      } catch (error) {
        // code goes here
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  async function fetchUser() {
    const res = await helpers.getUserDetailsFromLocalStorage();
    setUser(res);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Wrapper>
        <Heading fontSize="2xl" mb={5} fontWeight="normal">
          <Text>Verify Identity</Text>
          <Text fontSize="small">
            Verify your identity to unlock various features on IQ Value Investments.
          </Text>
        </Heading>

        <ToastContainer />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={20}>
          <Box
            // boxShadow={"lg"}
            w={{ base: "100%" }}
            p={8}
            borderColor={useColorModeValue("gray.500", "gray.500")}
            bg="black"
            color="white"
            fontSize="sm"
            h="fit-content"
          >
            <form ref={form} onSubmit={formik.handleSubmit}>
              <Stack spacing={6}>
                <FormControl mb={6} isRequired>
                  <FormLabel>Select Any Government Issued ID:</FormLabel>
                  <Select
                    placeholder=""
                    color="white"
                    name="method"
                    value={formik.values.method}
                    onChange={formik.handleChange}
                    rounded={0}
                  >
                    <option
                      value={"driversLicense"}
                      key={"driversLicense"}
                      style={{ color: "black" }}
                    >
                      Driver&apos;s License
                    </option>

                    <option
                      value={"socialSecurityCard"}
                      key={"socialSecurityCard"}
                      style={{ color: "black" }}
                    >
                      Social Security Card
                    </option>
                  </Select>
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel fontWeight="normal">
                    Upload A Picture Of Your Selected ID
                  </FormLabel>
                  <Input
                    type="file"
                    p={"6"}
                    name="image"
                    rounded={0}
                    // value={formik.values.image}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    colorScheme="orange"
                    fontWeight="normal"
                    type="submit"
                    mt={6}
                    p={6}
                    rounded={0}
                    isLoading={isLoading}
                  >
                    Verify My Account
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </SimpleGrid>
      </Wrapper>

      <CryptoChartTape />
    </div>
  );
}

export default Verify;
