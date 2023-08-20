import React, { useEffect, useState } from "react";
import Wrapper from "../../components/dashboard/Wrapper";
import Statistics from "../../components/dashboard/Statistics";
import { TickerTape, SingleTicker } from "react-ts-tradingview-widgets";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosCard } from "react-icons/io";
// import WithAuth from "../../HOCs/WithAuth";
import { AuthContext } from "../../context/auth";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import helpers from "../../helpers";
import CryptoChartTape from "../../components/common/CryptoChartTape";

function Withdraw() {
  const [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authContext = React.useContext(AuthContext);

  const notify = (msg, type) =>
    toast(msg, {
      type,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
    });

  const formik = useFormik({
    initialValues: {
      amount: 0,
      address: "",
      method: "Bitcoin",
    },
  });

  const handleCryptoWithdrawal = () => {
    // check if the amount requested is available
    const userBalance = new Number(user.balance);
    const requestedAmount = new Number(formik.values.amount);

    console.log(userBalance);
    console.log(requestedAmount);

    const balanceIsSufficient = userBalance >= requestedAmount;
    console.log(balanceIsSufficient);

    if (balanceIsSufficient) {
      notify("Success: Withdrawal in progress", "success");
      helpers.addTransaction({ ...formik.values, from: user.firstName });
    } else {
      notify("Error: Insufficient Funds", "error");
    }
  };

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
        <ToastContainer />
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <Heading fontSize="2xl" mb={5} fontWeight="normal">
            <Text>Request for Withdrawal</Text>
          </Heading>

          <Box w={{ base: "100%" }}>
            <SingleTicker colorTheme="light"></SingleTicker>
          </Box>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 5, lg: 8 }}
            mb={10}
          >
            {/* <Stack
              spacing={4}
              //   mt={12}
              px={{ base: 2, md: 4 }}
              py={"5"}
              shadow={"xl"}
              rounded={"0"}
              bg="black"
              color="white"
              h={"fit-content"}
            >
              <Stack spacing={6}>
                <Text fontSize="lg">Via Bank Transfer</Text>
                <Flex justifyContent="space-between">
                  <Text>Minimum amount:</Text>
                  <Text>$100</Text>
                </Flex>

                <Flex justifyContent="space-between">
                  <Text>Maximum amount:</Text>
                  <Text>$100000</Text>
                </Flex>

                <Flex justifyContent="space-between">
                  <Text>Charges (Fixed):</Text>
                  <Text>$0</Text>
                </Flex>

                <Flex justifyContent="space-between">
                  <Text>Charges (%):</Text>
                  <Text>$0</Text>
                </Flex>

                <Flex justifyContent="space-between">
                  <Text>Duration:</Text>
                  <Text>Instant</Text>
                </Flex>

                <Button
                  rounded={0}
                  colorScheme={"orange"}
                  fontWeight="normal"
                  mt={6}
                  p={6}
                  onClick={onOpen}
                  // h={10}
                >
                  Request Withdrawal
                </Button>
              </Stack>
            </Stack> */}

            <Stack
              spacing={4}
              px={{ base: 2, md: 4 }}
              py={"5"}
              rounded={"0"}
              bg="black"
              color="white"
            >
              <Stack spacing={6}>
                <Text fontSize="lg">Via Crypto</Text>
                <FormControl>
                  <FormLabel>Recepient Address</FormLabel>
                  <Input
                    rounded={0}
                    p={"6"}
                    id="address"
                    name="address"
                    type="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Amount in USD</FormLabel>
                  <Input
                    rounded={0}
                    p={"6"}
                    id="amount"
                    name="amount"
                    type="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                  />
                </FormControl>

                <FormControl mb={6}>
                  <FormLabel>Select Cryptocurrency</FormLabel>
                  <Select
                    placeholder=""
                    id="method"
                    name="method"
                    onChange={formik.handleChange}
                    value={formik.values.method}
                    color="white"
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
                      value={"Shiba Inu"}
                      key={"Shiba Inu"}
                      style={{ color: "black" }}
                    >
                      Shiba Inu
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

                <Button
                  colorScheme={"orange"}
                  fontWeight="normal"
                  mt={6}
                  p={6}
                  onClick={handleCryptoWithdrawal}
                  rounded={0}
                  // h={10}
                >
                  Request Withdrawal
                </Button>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Box>
      </Wrapper>

      <CryptoChartTape />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent rounded={0}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader fontWeight="normal">Payment Portal</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id="email">
                  <Input
                    rounded={0}
                    type="text"
                    p={"6"}
                    id="amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="Enter amount here"
                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                  />
                </FormControl>

                <FormControl id="email">
                  <Input
                    rounded={0}
                    type="text"
                    p={"6"}
                    id="amount"
                    name="amount"
                    placeholder="Enter account number"
                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                  />
                </FormControl>

                <FormControl id="email">
                  <Input
                    rounded={0}
                    type="text"
                    p={"6"}
                    id="bank"
                    name="bank"
                    placeholder="Enter bank name"
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={onClose}
                colorScheme="orange"
                rounded={0}
                mr={2}
                fontWeight="normal"
                type="submit"
              >
                Continue
              </Button>
              <Button
                onClick={onClose}
                colorScheme="red"
                fontWeight="normal"
                variant={"ghost"}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Withdraw;
