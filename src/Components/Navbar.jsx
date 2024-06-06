import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import { GoHome, GoHomeFill } from "react-icons/go";
import { useNavbar } from '../state';
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoScanCircleSharp } from "react-icons/io5";
import { RiHistoryLine, RiHistoryFill} from "react-icons/ri";

const Navbar = () => {
  const Navbar = useNavbar()

  return (
    <Tabs position={'fixed'} bottom={0} width={'100vw'} colorScheme='none'>
      <TabList display={'flex'} justifyContent={'space-between'} paddingX={"5vw"}>
        <Tab onClick={Navbar.home} bgcolor={"black"}>{Navbar.page == "Home" ? <GoHomeFill/> : <GoHome fill='grey'/>}</Tab>
        <Tab onClick={Navbar.history}>{Navbar.page == "History" ? <RiHistoryFill/> : <RiHistoryLine fill='grey'/>}</Tab>
        <Tab ><IoScanCircleSharp size={"40px"}/></Tab>
        <Tab onClick={Navbar.peta}>{Navbar.page == "Peta" ? <RiAccountCircleFill/> : <RiAccountCircleLine fill='grey'/>}</Tab>
        <Tab onClick={Navbar.profil}>{Navbar.page == "Profile" ? <RiAccountCircleFill/> : <RiAccountCircleLine fill='grey'/>}</Tab>
      </TabList>
    </Tabs>
  )
}

export default Navbar