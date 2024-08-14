import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../../components/dashboard/Wrapper";
import { Heading, Text, Container, Alert } from "@chakra-ui/react";
import Link from "next/link";
import Statistics from "../../components/dashboard/Statistics";
import CryptoChartTape from "../../components/common/CryptoChartTape";

import {
  AdvancedRealTimeChart,
  EconomicCalendar,
  ForexCrossRates,
  Ticker,
  MarketData,
} from "react-ts-tradingview-widgets";
import helpers from "../../helpers";
import { AiFillWarning } from "react-icons/ai";

function Dashboard() {
  const [user, setUser] = useState({});

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
        <div>
          {user?.verified && (
            <Alert mb={10} w="fit-content" rounded={10} display="flex" gap="2">
              <AiFillWarning color="#ECC94B" />
              <Text>
                Please verify your identity. Click{" "}
                <Text textDecoration="underline" display="inline-flex" mr={1}>
                  <Link
                    href="/dashboard/verify"
                    style={{ textDecoration: "underline !important" }}
                  >
                    here
                  </Link>{" "}
                </Text>
                to get started
              </Text>
            </Alert>
          )}

          <Text fontSize="2xl">Welcome {user?.firstName}</Text>
          <Statistics currency={user?.currency} />

          <Container maxW="7xl" mx={"auto"} p={0} my={6}>
            <MarketData height={400} width="100%" />
          </Container>
        </div>
      </Wrapper>

      <CryptoChartTape />
    </>
  );
}

export default Dashboard;
