import React from "react";
import { Tabs, TabList, Tab, Box, Flex } from "@chakra-ui/react";
import { GoHomeFill } from "react-icons/go";
import { usePage } from "../state";
import { IoBug, IoScan } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
  const Page = usePage();

  const navItems = [
    {
      name: "Home",
      a_logo: <GoHomeFill size={"auto"} />,
    },
    {
      name: "Sebaran Hama",
      a_logo: <FaMapMarkedAlt size={"auto"} />,
    },
    {
      name: "Camera",
      a_logo: <IoScan size={"auto"} />,
      custom: true,
    },
    {
      name: "Prediksi Hama",
      a_logo: <IoBug size={"auto"} />,
    },
    {
      name: "Prediksi Cuaca",
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
              Page.setPage(item.name);
            }}
            w={
              item.custom
                ? { base: "25%", md: "22%" }
                : { base: "15.5%", md: "14%" }
            }
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
                  : Page.page === item.name
                  ? "black"
                  : "gray"
              }
              mt={item.custom ? -7 : 1}
            >
              {Page.page === item.name ? (
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
