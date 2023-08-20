import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Tbody,
  Thead,
  Tfoot,
  Badge,
} from "@chakra-ui/react";
import { IoIosClock } from "react-icons/io";

// import WithAuth from "../../HOCs/WithAuth";
import helpers from "../../helpers";
import Wrapper from "../../components/dashboard/Wrapper";
import CryptoChartTape from "../../components/common/CryptoChartTape";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTx() {
      await helpers.getTransactions().then((data) => {
        console.log("transactions", data);
        const deposits = data.data.data.transactions;
        const withdrawals = data.data.data.withdrawals;
        setTransactions(deposits.concat(withdrawals));
      });
    }

    getTx();
  }, []);

  return (
    <div>
      <Wrapper>
        <Heading fontSize="2xl" mb={5} fontWeight="normal">
          <Text>Transactions</Text>
        </Heading>

        <Box h={"fit-content"}>
          <TableContainer>
            <Table variant="striped">
              <Thead bgColor="orange.400">
                <Tr>
                  <Th
                    textTransform="capitalize"
                    color="black"
                    fontFamily="inherit"
                    fontSize="1rem"
                    fontWeight="normal"
                  >
                    Amount
                  </Th>
                  <Th
                    textTransform="capitalize"
                    color="black"
                    fontFamily="inherit"
                    fontSize="1rem"
                    fontWeight="normal"
                  >
                    Status
                  </Th>
                  <Th
                    textTransform="capitalize"
                    color="black"
                    fontFamily="inherit"
                    fontSize="1rem"
                    fontWeight="normal"
                  >
                    {" "}
                    Payment Method
                  </Th>
                  <Th
                    textTransform="capitalize"
                    color="black"
                    fontFamily="inherit"
                    fontSize="1rem"
                    fontWeight="normal"
                  >
                    {" "}
                    Type
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((tx) => {
                  return (
                    <Tr key={Math.random()}>
                      <Td>${tx?.amount}</Td>
                      <Td>
                        <Badge
                          bg="green.400"
                          color="white"
                          rounded="full"
                          textTransform="capitalize"
                          px={2}
                          py={1}
                        >
                          Success
                        </Badge>
                      </Td>
                      <Td>{tx?.method}</Td>
                      <Td>{tx?.type}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Wrapper>

      <CryptoChartTape />
    </div>
  );
}

export default Transactions;
