import React from 'react'
import { Tabs, TabList, Tab, Box } from '@chakra-ui/react'
import { GoHome, GoHomeFill } from "react-icons/go";
import { useNavbar } from '../state';
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoScanCircleSharp } from "react-icons/io5";
import { RiHistoryLine, RiHistoryFill} from "react-icons/ri";
import { MdArticle, MdOutlineArticle } from "react-icons/md";

const Navbar = () => {
  const Navbar = useNavbar()

  const IconActive = () =>{
    return (<Box 
    height={"3.5px"}
    bgColor={"black"} 
    width={"8px"}
    borderRadius={"2px"}
    position={"absolute"}
    bottom={3}
    ></Box>)
  }

  return (
    <Tabs position={'fixed'} bottom={0} width={'100%'} colorScheme='none' variant={"unstyled"}>
      <TabList display={'flex'} justifyContent={'space-between'} paddingX={"5%"} >
        <Tab onClick={Navbar.home}>
          {Navbar.page === "Home" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <GoHomeFill/>
            <IconActive/>
            </Box> : <GoHome fill='grey'/>}
        </Tab>
        <Tab onClick={Navbar.history}>
          {Navbar.page === "History" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <RiHistoryFill/>
              <IconActive/>
            </Box> : <RiHistoryLine fill='grey'/>}</Tab>
        <Tab ><IoScanCircleSharp size={"40px"}/></Tab>
        <Tab onClick={Navbar.article}>
          {Navbar.page === "Article" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <MdArticle/>
              <IconActive/>
            </Box> : <MdOutlineArticle fill='grey'/>}</Tab>
        <Tab onClick={Navbar.profil}>
          {Navbar.page === "Profile" ? 
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <RiAccountCircleFill/>
              <IconActive/>
            </Box>
            : 
            <RiAccountCircleLine fill='grey'/>}
          </Tab>
      </TabList>
    </Tabs>
  )
}

export default Navbar