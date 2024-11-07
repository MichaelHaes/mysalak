import React, {useEffect} from "react";
import Weather from "../Components/Weather";
import ManajemenHama from "../Components/ManajemenHama";
import DashboardHeader from "../Components/DashboardHeader";
import {requestForToken} from "../firebaseNotification/firebase";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const showToast = (response) =>
    toast(
      <div>
        <p>{response}</p>
      </div>
    );

  useEffect(() => {
    if(!localStorage.getItem('fcmToken')){
      requestForToken();
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("fcmToken");
    localStorage.removeItem("role_id");
    localStorage.removeItem("user_id");
    axios.post(`${env.API_URL}/mysalak/delete-token`, { device_id: localStorage.getItem("device_id") })
      .then((response) => {
        showToast("Logout Success")
        navigate("/")
      })
  }

  return (
    <div>
      <DashboardHeader />
      <Weather />
      <ManajemenHama />
      <button
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
