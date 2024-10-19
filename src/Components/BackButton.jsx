import { IoIosArrowBack } from "react-icons/io";
import { Box } from "@chakra-ui/react";
import Colors from "../Color/Color";
import { useNavigate } from "react-router-dom";

const BackButton = ({ navigateTo }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else {
      navigate(-1)
    }
  };

  return (
    <Box
      h="30px" w="30px" display="flex" justifyContent="center" alignItems="center" bgColor={Colors.Dark_Green} rounded="full" mb={"8%"}
      _hover={{ cursor: "pointer" }}
      onClick={handleGoBack}
    >
      <IoIosArrowBack color={Colors.Soft_Green} size="16px" />
    </Box>
  );
};

export default BackButton;
