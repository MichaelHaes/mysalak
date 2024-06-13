import React from "react";
import { Tabs, TabList, Tab, Box } from "@chakra-ui/react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { usePage } from "../state";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoScanCircleSharp } from "react-icons/io5";
import { RiHistoryLine, RiHistoryFill } from "react-icons/ri";
import { MdArticle, MdOutlineArticle } from "react-icons/md";

const Navbar = () => {
  const Page = usePage();

  const IconActive = () => {
    return (
      <Box
        height={"3.5px"}
        bgColor={"black"}
        width={"8px"}
        borderRadius={"2px"}
        position={"absolute"}
        bottom={3}
      ></Box>
    );
  };

  return (
    <Tabs position={"fixed"} zIndex={10} bg={"white"} bottom={0} width={"100%"} variant={"unstyled"}>
      <TabList
        display={"flex"}
        justifyContent={"space-between"}
        paddingX={"5%"}
      >
        <Tab onClick={Page.home}>
          {Page.page === "Home" ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <GoHomeFill />
              <IconActive />
            </Box>
          ) : (
            <GoHome fill="grey" />
          )}
        </Tab>
        <Tab 
        // onClick={Page.cuaca}
        onClick={() => {Page.setPage("Sebaran Hama")}}
        >
          {Page.page === "Sebaran Hama" ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <RiHistoryFill />
              <IconActive />
            </Box>
          ) : (
            <RiHistoryLine fill="grey" />
          )}
        </Tab>
        <Tab onClick={() => Page.setPage("Camera")}>
          <IoScanCircleSharp size={"40px"} />
        </Tab>
        <Tab onClick={Page.hama}>
          {Page.page === "Prediksi Hama" ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <MdArticle />
              <IconActive />
            </Box>
          ) : (
            <MdOutlineArticle fill="grey" />
          )}
        </Tab>
        <Tab onClick={() => {Page.setPage("Profil")}}>
          {Page.page === "Profil" ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <RiAccountCircleFill />
              <IconActive />
            </Box>
          ) : (
            <RiAccountCircleLine fill="grey" />
          )}
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default Navbar;
