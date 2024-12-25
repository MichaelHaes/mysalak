import {
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { SlOptions } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminCard = ({ admin }) => {
  const navigate = useNavigate();

  const deleteAdmin = async () => {
    console.log('deleted');
  }

  return (
    <Flex
      className="admin-card"
      justifyContent={"start"}
      ps={3}
      gap={5}
      bg={"white"}
      w={"100%"}
      h={"7.8vh"}
      borderRadius={"xl"}
      alignItems={"center"}
      pos={"relative"}
    >
      <Image
        className="admin-organization"
        width={"4vh"}
        h={"4vh"}
        objectFit={"contain"}
        src={
          admin.role_id === 1
            ? "/assets/organization_logo/umn.png"
            : admin.role_id === 2
            ? "/assets/organization_logo/ugm.png"
            : admin.role_id === 3
            ? "/assets/logo/logomysalak.png"
            : "/assets/logo/logomysalak.png"
        }
        alt={`${admin.role_id}`}
      />
      <Flex direction={"column"} gap={.5}>
        <Text className="admin-nama" fontSize={"1.5vh"} fontWeight={"bold"}>
          {admin.nama}
        </Text>
        <Text className="admin-email" fontSize={"1vh"}>
          {admin.email}
        </Text>
      </Flex>

      <Menu>
        <MenuButton
          as={Flex}
          variant={"unstyled"}
          background={"#f5f5f5"}
          w={"fit-content"}
          h={"fit-content"}
          borderRadius={"xl"}
          px={2}
          pos={"absolute"}
          right={3}
          top={3}
        >
          <SlOptions size={"1.2vh"} />
        </MenuButton>
        <MenuList bg={"#f2f2f2"} px={.5} py={.5} borderRadius={"md"} minW={'9vh'} fontSize={'1.1vh'}>
          <MenuItem bg={"white"} mb={1} py={1} borderRadius={"3px"} px={2} gap={1} onClick={() => {navigate(`/admin/manajemen-admin/${admin.id}/edit`)}}>
            <FiEdit /> Edit
          </MenuItem>
          <MenuItem bg={"white"} color={"#c14848"} py={1} borderRadius={"3px"} px={2} gap={1} onClick={() => {deleteAdmin()}}>
            <MdDelete /> Delete
          </MenuItem>
        </MenuList>
      </Menu>

      {/* <Button
        variant={"unstyled"}
        onClick={() => {
          setShowMenu(true);
        }}
      >
        <SlOptions />
      </Button>

      <Box>

      </Box> */}
    </Flex>
  );
};

export default AdminCard;
