import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Alert,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import {
  BiCloudDownload,
  BiBox,
  BiDollarCircle,
  BiGridAlt,
  BiTime,
  BiLogOut,
} from "react-icons/bi";
import { TbChartArcs } from 'react-icons/tb'

import Logo from "../../assets/images/logo.svg";
import Image from "next/image";
import { IconType } from "react-icons";
import helpers from "../../helpers";
import { useRouter } from "next/router";
import SupportBtn from "../common/SupportBtn";

const LinkItems = [
  { name: "Dashboard", href: "/dashboard", icon: BiGridAlt },
  { name: "Deposit", href: "/dashboard/payment", icon: BiCloudDownload },
  { name: "Plans", href: "/dashboard/invest", icon: BiBox },
  { name: "Withdraw", href: "/dashboard/withdraw", icon: BiDollarCircle },
  { name: "History", href: "/dashboard/transactions", icon: BiTime },
];

export default function Wrapper({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const res = await helpers.getUserDetailsFromLocalStorage();
    setUser(res);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const Router = useRouter();

  return (
    <Box
      bg={useColorModeValue("black", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Image src={Logo} alt="" /> */}
        <TbChartArcs size={35} color="white"/>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          color="white"
          size={30}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}

      <Text
        _hover={{ cursor: "pointer", color: "orange.400" }}
        color="white"
        style={{ textDecoration: "none" }}
        p="4"
        alignItems="center"
        display="flex"
        // bg="red"
        mx="4"
        mt={30}
        onClick={() => {
          helpers.logout();
          Router.push("/");
        }}
      >
        <Icon
          mr="4"
          fontSize="25"
          _groupHover={{
            color: "white",
          }}
          as={BiLogOut}
        />
        Log out
      </Text>
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link
      href={href}
      color="white"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: "orange.400",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="25"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("black", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      {...rest}
    >
      <Image src={Logo} alt="" />
      <IconButton
        variant="ghost"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu color="white" size={30} />}
      />
    </Flex>
  );
};
