import React, {useEffect} from "react";
import Weather from "../Components/Weather";
import ManajemenHama from "../Components/ManajemenHama";
import DashboardHeader from "../Components/DashboardHeader";
import {requestForToken} from "../firebaseNotification/firebase";

const Dashboard = () => {

  useEffect(() => {
    requestForToken();
  }, []);

  return (
    <div>
      <DashboardHeader />
      <Weather />
      <ManajemenHama />
    </div>
  );
};

export default Dashboard;
