import {
  Box,
  SimpleGrid,
  Stack,
  Heading,
  Text,
  Flex,
  List,
  ListIcon,
  ListItem,
  Center
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { Container, Button } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { TbFileSearch, TbShieldLock, TbVersions } from "react-icons/tb";
import CryptoChartTape from "../components/common/CryptoChartTape";
import { MarketOverview } from "react-ts-tradingview-widgets";
import {
  secure,
  options,
  research,
  bitcoin_network,
  mining_place,
} from "../assets/images/list";

import Footer from "../components/common/Footer";
import Hero from "../components/common/Hero";
import Navbar from "../components/common/Navbar";
import { InvestmentPlanCard } from "./dashboard/invest";

function index() {
  return (
    <div>
      <Navbar />
      <Hero />

      <Container maxW={{ md: "90%", base: "100%" }} overflow="hidden">
        <MarketOverview
          colorTheme="light"
          width="100%"
          height={800}
        ></MarketOverview>
      </Container>

      <Box p={4} mt={"36"} bg="gray.50">
        <Stack
          spacing={2}
          as={Container}
          maxW={"3xl"}
          textAlign={"center"}
          mt={10}
        >
          <Heading
            lineHeight={"110%"}
            fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
            fontWeight="bold"
            mb={3}
          >
            <Text>
              Invest in Cryptocurrency Bitcoin Mining & Easy Way to Mine Bitcoin
            </Text>
          </Heading>
          <Text mt={10}>
            Thousands of people from around the world are investing in online
            cloud mining. Some of them mine once a week, others every day, but
            they are all a part of the online Mining community.
          </Text>
        </Stack>

        <Container maxW={"6xl"} mt={10} textAlign="center">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={0}>
            <Box p={12} borderRadius={"10px"}>
              {/* <Image src={secure} alt="" /> */}
              

              <Center>
              <TbShieldLock size={40} />
              </Center>
              <Text fontWeight={600} my={"4"}>
                Secure Storage
              </Text>
              <Text mt={2}>
                We store the vast majority of the digital assets in secure
                offline storage.
              </Text>
            </Box>

            <Box p={12} borderRadius={"10px"}>
            <Center>
            <TbFileSearch size={40} />
            </Center>
              <Text fontWeight={600} my={"4"}>
                Research & Development
              </Text>
              <Text mt={2}>
                We want to transform the technology to innovation products.
              </Text>
            </Box>

            <Box p={12} borderRadius="10px">
              <Center>
            <TbVersions size={40} />
              </Center>
              <Text fontWeight={600} my={"4"}>
                Various Options
              </Text>
              <Text mt={2}>
                A wide range of models for both experienced and beginner miners.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box my={"20"}>
        <Stack spacing={4} as={Container} maxW={"6xl"} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
            <Image src={bitcoin_network} alt="" />
            <Box p={12} borderRadius={"10px"}>
              <Heading
                lineHeight={"110%"}
                fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
                fontWeight="bold"
                mb={3}
              >
                <Text>Miningplace Awesome Service that Works for You!</Text>
              </Heading>
              <Text mt={10}>
                Miningplace is an experienced bitcoin mining community dedicated
                to providing the best cloud mining experience and top-notch
                customer service. With our professionalism, sincerity, and
                efforts, we have gained trust and support from worldwide
                customers.
              </Text>

              <Text mt={10}>
                We&apos;re building miningplace that will bring anyone who believes
                in bitcoin to join the digital cryptocurrency revolution. The
                world is moving on to this revolution at an unprecedented pace.
              </Text>

              <Text mt={10}>
                Now is your time. With bit-cloudminer.co you can start mining
                bitcoin with ease, confidence and trust. Whether you&apos;re a first
                time miner or a professional has got you both covered!
              </Text>

              {/* HERE !!! */}
              <Button
                mt={10}
                colorScheme={"orange"}
                as="a"
                href="/about"
                size="lg"
                fontSize="md"
                fontWeight="normal"
                rounded={'sm'}
              >
                Learn More
              </Button>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>

      <Box mb={36} h={{ md: "2xs", base: "xl" }} id="stats">
        <Flex alignItems="center" justifyContent="center" h="inherit">
          <Container maxW={{ md: "80%", base: "90%" }}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              color="white"
            >
              <Box textAlign="center">
                <Text
                  fontWeight={600}
                  my={"2"}
                  fontSize={{ base: "4xl" }}
                  lineHeight={"110%"}
                  textAlign="center"
                >
                  6000
                </Text>
                <Text textAlign="center">Profitable trades</Text>
              </Box>

              <Box>
                <Text
                  fontWeight={600}
                  my={"2"}
                  fontSize={{ base: "4xl" }}
                  lineHeight={"110%"}
                  textAlign="center"
                >
                  $ 20M
                </Text>
                <Text textAlign="center">Quarterly volume traded</Text>
              </Box>

              <Box>
                <Text
                  fontWeight={600}
                  my={"2"}
                  fontSize={{ base: "4xl" }}
                  lineHeight={"110%"}
                  textAlign="center"
                >
                  13,000 +
                </Text>
                <Text textAlign="center">Verified users</Text>
              </Box>
            </SimpleGrid>
          </Container>
        </Flex>
      </Box>

      <Box h={{ md: "2xl", base: "fit-content" }} id="features">
        {/* <div id="overlay"></div> */}
        <Flex alignItems="center" justifyContent="center" h="inherit">
          <Container maxW={{ md: "80%", base: "90%" }}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2 }}
              spacing={10}
              color="black"
              zIndex={-1}
            >
              <Box>
                <Heading
                  lineHeight={"110%"}
                  fontSize={{ base: "2xl", sm: "4xl", md: "4xl" }}
                  fontWeight="bold"
                  mb={3}
                >
                  <Text>
                    Explore Quality <span style={{color: 'orange'}}>Mining Technology</span>
                  </Text>
                </Heading>
                <Text mt={10}>
                  We at IQ Value Investments offer you the fastest and the most legit way to
                  successfully accumulate your BTC. Our sophisticated technology
                  does all the hard work, making sure that every customer is
                  100% satisfied and that every mining goes through smoothly.
                </Text>

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 2 }}
                  spacing={10}
                  color="black"
                  zIndex={-1}
                  mt={10}
                >
                  <List spacing={3} textAlign="start">
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="orange.500" />
                      Own Data Centers
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="orange.500" />
                      24/7 Technical Support
                    </ListItem>

                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="orange.500" />
                      99.9% Uptime Guarantee
                    </ListItem>

                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="orange.500" />
                      Instant Setup
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>

              <Box>
                <Image src={mining_place} alt="" />
              </Box>
            </SimpleGrid>
          </Container>
        </Flex>
      </Box>

      {/* <Container maxW={"6xl"} mb={20}>
        <Heading
          lineHeight={"110%"}
          fontSize={{ base: "2xl", sm: "4xl", md: "4xl" }}
          fontWeight="bold"
          mb={3}
          textAlign="center"
        >
          <Text>Investment Plans</Text>
        </Heading>
        <Text fontSize="1rem" textAlign="center">
          Choose a plan that suites you
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
          mt={30}
        >
          <InvestmentPlanCard
            title={"Basic Plan"}
            priceRange={"$1,000 - $5.000"}
            minimumAmount={"1,000"}
            dailyProfit={"5.00"}
            duration={"2 Weeks"}
            minimumReturn={"2,010"}
          />
          <InvestmentPlanCard
            title={"Silver Plan"}
            priceRange={"$5,000 - $10,000"}
            minimumAmount={"5,000"}
            dailyProfit={"7.00"}
            duration={"1 Month"}
            minimumReturn={"5,560"}
          />
          <InvestmentPlanCard
            title={"Gold Plan"}
            priceRange={"$10,000 - $15,000"}
            minimumAmount={"10,000"}
            dailyProfit={"9.00"}
            duration={"3 Months"}
            minimumReturn={"9,200"}
          />
        </SimpleGrid>
      </Container> */}

      <CryptoChartTape />
      <Footer />
    </div>
  );
}

export default index;
