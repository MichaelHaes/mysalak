import React from "react";
import { Tabs, TabList, Tab, Box, Flex } from "@chakra-ui/react";
import { GoHomeFill } from "react-icons/go";
import { useHama } from "../state";
import { IoBug, IoScan } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { resetDetail } = useHama();
  const navigate = useNavigate();
  const url = useLocation().pathname;

  const navItems = [
    {
      route: "/",
      a_logo: <GoHomeFill size={"auto"} />,
    },
    {
      route: "/persebaran-hama",
      a_logo: <FaMapMarkedAlt size={"auto"} />,
    },
    {
      route: "/kamera",
      a_logo: <IoScan size={"auto"} />,
      custom: true,
    },
    {
      route: "/manajemen-hama",
      a_logo: <IoBug size={"auto"} />,
    },
    {
      route: "/prediksi",
      a_logo: <MdArticle size={"auto"} />,
    },
  ];

  const IconActive = () => {
    return (
      <Box
        height={".4vh"}
        bgColor={"black"}
        width={"45%"}
        borderRadius={"2px"}
        mt={1}
      ></Box>
    );
  };

  return (
    <Tabs
      position={"fixed"}
      zIndex={10}
      bg={"white"}
      bottom={0}
      width={"inherit"}
      variant={"unstyled"}
      h={"6.5vh"}
      w={"inherit"}
    >
      <TabList
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"start"}
        paddingX={"5%"}
        w={"100%"}
      >
        {navItems.map((item) => (
          <Tab
            onClick={() => {
              // Page.setPage(item.route);
              navigate(item.route);
              resetDetail();
            }}
            w={item.custom ? "25%" : "15.5%"}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justify={"center"}
              borderRadius={"full"}
              h={"100%"}
              w={"100%"}
              bg={
                item.custom
                  ? "linear-gradient(to top, #6BBA5E, #2C3631)"
                  : "transparent"
              }
              p={item.custom ? 2 : 0}
              border={item.custom ? "5px solid rgba(231,231,231,1)" : "0px"}
              color={
                item.custom
                  ? "white"
                  : url === item.route
                  ? "black"
                  : "gray"
              }
              mt={item.custom ? -7 : 1}
            >
              {url === item.route ? (
                <>
                  {item.a_logo}
                  {!item.custom && <IconActive />}
                </>
              ) : (
                <>{item.a_logo}</>
              )}
            </Flex>
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
