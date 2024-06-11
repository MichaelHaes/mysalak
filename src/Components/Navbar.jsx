import React from "react";
import { Tabs, TabList, Tab, Box } from "@chakra-ui/react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { usePage } from "../state";
import {
  RiAccountCircleLine,
  RiAccountCircleFill,
  RiHistoryLine,
  RiHistoryFill,
} from "react-icons/ri";
import { IoScanCircleSharp } from "react-icons/io5";
import { MdArticle, MdOutlineArticle } from "react-icons/md";

const Navbar = () => {
  const pageControl = usePage();

  const IconActive = () => (
    <Box
      height={"3.5px"}
      bgColor={"black"}
      width={"8px"}
      borderRadius={"2px"}
      position={"absolute"}
      bottom={3}
    />
  );

  return (
    <Tabs position={'fixed'} bottom={0} width={'480px'} colorScheme='none' variant={"unstyled"}>
      <TabList display={'flex'} justifyContent={'space-between'} paddingX={"5%"} >
        <Tab onClick={Navbar.home}>
          {Navbar.page === "Home" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <GoHomeFill/>
            <IconActive/>
            </Box> : <GoHome fill='grey'/>}
        </Tab>
        <Tab onClick={Navbar.cuaca}>
          {Navbar.page === "Prediksi Cuaca" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <RiHistoryFill/>
              <IconActive/>
            </Box> : <RiHistoryLine fill='grey'/>}</Tab>
        <Tab ><IoScanCircleSharp size={"40px"}/></Tab>
        <Tab onClick={Navbar.hama}>
          {Navbar.page === "Prediksi Hama" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <MdArticle/>
              <IconActive/>
            </Box> : <MdOutlineArticle fill='grey'/>}</Tab>
        <Tab onClick={Navbar.informasi}>
          {Navbar.page === "Informasi Hama" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <RiAccountCircleFill/>
              <IconActive/>
    <Tabs position={"fixed"} bottom={0} width={"100%"} variant={"unstyled"}>
      <TabList
        display={"flex"}
        justifyContent={"space-between"}
        paddingX={"5%"}
      >
        <Tab onClick={() => pageControl.setPage("Home")}>
          {pageControl.page === "Home" ? (
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
        <Tab onClick={() => pageControl.setPage("History")}>
          {pageControl.page === "History" ? (
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
        <Tab onClick={() => pageControl.setPage("Camera")}>
          <IoScanCircleSharp size={"40px"} />
        </Tab>
        <Tab onClick={() => pageControl.setPage("Artikel")}>
          {pageControl.page === "Artikel" ? (
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
        <Tab onClick={() => pageControl.setPage("Profil")}>
          {pageControl.page === "Profil" ? (
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
