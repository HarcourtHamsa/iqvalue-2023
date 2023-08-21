import {
  Heading,
  Text,
  Alert,
  Icon,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  Box,
  Select,
  FormControl,
  useColorModeValue,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import usdt from "../../assets/images/usdt.png";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import React, { useRef, useState, useEffect } from "react";
import CryptoChartTape from "../../components/common/CryptoChartTape";
import Wrapper from "../../components/dashboard/Wrapper";
import helpers from "../../helpers";

const CRYPRO_PAYMENT_DETAILS = [
  {
    id: 1,
    name: "Bitcoin",
    address: "1PqdC6vrbgSbV95sYZjr7iNYnSHTmzE8ka",
    icon: <Icon as={FaBitcoin} w={16} h={16} color="orange" />,
  },

  {
    id: 2,
    name: "Ethereum (ERC20)",
    address: "0x3228e90625cdd909ecd996f3979cc0e7122ec098",
    icon: <Icon as={FaEthereum} w={16} h={16} color="black" />,
  },
];

const Card = ({ title, text, icon, notify }) => {
  return (
    <Stack px={{ base: 2, md: 4 }} py={"5"}>
      <Flex w={16} h={16} align={"center"} justify={"center"} mb={1}>
        {icon}
      </Flex>
      <Text>{title}</Text>
      <Button
        variant="solid"
        colorScheme="orange"
        px={6}
        w="fit-content"
        fontWeight="normal"
        rounded={0}
        onClick={() => {
          navigator.clipboard.writeText(text);
          notify(`copied`);
        }}
      >
        Copy address
      </Button>
    </Stack>
  );
};

function Deposit() {
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  const form = useRef();
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [user, setUser] = useState({});
  const amount = query.amount;

  const handleImageUpload = async (values) => {
    const data = new FormData();
    const firstName = user.firstName;
    const file = values.file;

    data.append("file", values.file);
    data.append("upload_preset", "default");
    data.append("cloud_name", "dgn6edv1k");

    console.log("file.....", file);

    await axios
      .post("https://api.cloudinary.com/v1_1/dgn6edv1k/image/upload", data)
      .then(async (data) => {
        console.log(data.data.url);
        setCloudinaryUrl(data.data.url);
      })
      .then(async () => {
        const transactionDetails = {
          url: cloudinaryUrl,
          amount: amount,
          method: values.method,
          from: firstName,
        };

        console.log(transactionDetails);
        await helpers.deposit(transactionDetails);
        notify("Your payment is being reviewed.");
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
      method: "Bitcoin",
    },

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await handleImageUpload(values);
      } catch (error) {
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
    <>
      <Wrapper>
        <ToastContainer />

        <Heading fontSize="2xl" fontWeight="normal">
          <Text>Payment Information</Text>
        </Heading>
        <Alert maxW="3xl" mt={5} w="fit-content">
          Please make your payment of ${query.amount} to any of the crypto
          wallet addresses below.
        </Alert>

        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mt={10}>
          {CRYPRO_PAYMENT_DETAILS.map((crypto) => {
            return (
              <Card
                key={crypto.id}
                icon={crypto.icon}
                title={crypto.name}
                text={crypto.address}
                notify={notify}
              />
            );
          })}

          <Stack px={{ base: 2, md: 4 }} py={"5"}>
            <Flex w={16} h={16} align={"center"} justify={"center"} mb={1}>
              <Image src={usdt} alt=""/>
            </Flex>
            <Text>USDT</Text>
            <Button
              variant="solid"
              colorScheme="orange"
              px={6}
              w="fit-content"
              fontWeight="normal"
              rounded={0}
              onClick={() => {
                navigator.clipboard.writeText('TLLeuYN4n64MdKq3dSSHNyWRhKgMZ52vKK');
                notify(`copied`);
              }}
            >
              Copy address
            </Button>
          </Stack>
        </SimpleGrid>

        <Heading fontSize="2xl" mt={20} mb={5} fontWeight="normal">
          <Text mb={2}>Already Made Payment? </Text>
          <Text fontSize="1rem"> Please fill the proof of payment form </Text>
        </Heading>

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
                  <FormLabel>Select Payment Mode Used:</FormLabel>
                  <Select
                    placeholder=""
                    color="white"
                    name="method"
                    value={formik.values.method}
                    onChange={formik.handleChange}
                    rounded={0}
                  >
                    <option
                      value={"Bitcoin"}
                      key={"Bitcoin"}
                      style={{ color: "black" }}
                    >
                      Bitcoin
                    </option>

                    <option
                      value={"Ethereum"}
                      key={"Ethereum"}
                      style={{ color: "black" }}
                    >
                      Ethereum
                    </option>
                    <option
                      value={"USDT"}
                      key={"USDT"}
                      style={{ color: "black" }}
                    >
                      USDT
                    </option>
                  </Select>
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel fontWeight="normal">
                    Upload proof of payment
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
                    Submit Receipt
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </SimpleGrid>
      </Wrapper>

      <CryptoChartTape />
    </>
  );
}

export default Deposit;
