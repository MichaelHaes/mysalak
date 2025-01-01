import React, { useEffect, useState } from "react";
import Weather from "../Components/Weather";
import ManajemenHama from "../Components/ManajemenHama";
import DashboardHeader from "../Components/DashboardHeader";
import axios from "axios";
import env from "react-dotenv";

const Dashboard = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [isLoadingProfilePic, setIsLoadingProfilePic] = useState(true);

  const fetchPetaniProfile = async () => {
    try {
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const requestUrl = `${env.API_URL}/get-petani/${user_id}`;

      const response = await axios.get(requestUrl);

      const {
        profile_pic,
        nama,
        is_verified,
        kelompok_tani,
        profile_background,
        no_telp,
      } = response.data;

      localStorage.setItem("profile_pic", JSON.stringify(profile_pic));
      setProfilePic(profile_pic);
      localStorage.setItem("nama", JSON.stringify(nama));
      localStorage.setItem("is_verified", JSON.stringify(is_verified));
      localStorage.setItem("kelompok_tani", JSON.stringify(kelompok_tani));
      localStorage.setItem("profile_background", JSON.stringify(profile_background));
      localStorage.setItem("no_telp", JSON.stringify(no_telp));
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoadingProfilePic(false);
    }
  };

  const fetchProfileAdmin = async () => {
    try {
      const email = JSON.parse(localStorage.getItem("user_id"));
      const requestUrl = `${env.API_URL}/get-admin/${email}`;
      const response = await axios.get(requestUrl);

      const {
        nama,
        no_telp,
        kelompok_tani,
        email: adminEmail,
        role_id,
        profile_pic,
        profile_background,
      } = response.data;

      // Store data in localStorage or state as needed
      localStorage.setItem(
        "profile_pic",
        profile_pic ? JSON.stringify(profile_pic) : null
      );
      setProfilePic(profile_pic);
      localStorage.setItem("nama", JSON.stringify(nama));
      localStorage.setItem("no_telp", JSON.stringify(no_telp));
      localStorage.setItem("kelompok_tani", JSON.stringify(kelompok_tani));
      localStorage.setItem("user_id", JSON.stringify(adminEmail));
      localStorage.setItem("role_id", JSON.stringify(role_id));
      localStorage.setItem(
        "profile_background",
        profile_background ? JSON.stringify(profile_background) : null
      );

    } catch (error) {
      console.error("Error fetching admin profile:", error);
    } finally {
      setIsLoadingProfilePic(false);
    }
  };


  useEffect(() => {
    if (localStorage.getItem("role_id") !== "5") {
      console.log("fetching admin profile");
      fetchProfileAdmin();
    } else {
      fetchPetaniProfile();
    }
  }, []);

  return (
    <div>
      <DashboardHeader profilePic={profilePic} isLoadingProfilePic={isLoadingProfilePic} />
      <Weather />
      <ManajemenHama />
    </div>
  );
};

export default Dashboard;