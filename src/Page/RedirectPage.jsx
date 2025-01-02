import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../custom-swal.css";
import { useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";

const RedirectPage = ({ message = "Anda tidak memiliki akses!" }) => {
  const navigate = useNavigate();

  const popup = () => {
    withReactContent(Swal).fire({
      title: message,
      html: "Mengembalikan...<b></b>",
      timer: 2000,
      timerProgressBar: true,
      icon: "error",
      showConfirmButton: false,
      didOpen: () => {
        // Swal.showLoading();
      },
      willClose: () => {
        navigate("/");
      },
    });
  };

  useEffect(() => {
    popup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Image
        src="/assets/login_image.png"
        objectFit="cover"
        w="100%"
        h="100%"
        filter='brightness(0.5)'
      />
    </div>
  );
};

export default RedirectPage;
