import React from "react";
import { Box } from "@chakra-ui/react";
import { TickerTape } from "react-ts-tradingview-widgets";

function CryptoChartTape() {
  return (
    <Box pos="fixed" bottom="-10" left="0" right="0" zIndex="99999999">
      <TickerTape colorTheme="dark"></TickerTape>
    </Box>
  );
}

export default CryptoChartTape;
