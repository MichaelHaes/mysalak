import React from "react";
import Weather from "../Components/Weather";
import ManajemenHama from "../Components/ManajemenHama";
import DashboardHeader from "../Components/DashboardHeader";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <Weather />
      <ManajemenHama />
    </div>
  );
};

export default Dashboard;
