import React from "react";
import Header from "../Components/Header";
import Weather from "../Components/Weather";
import ManajemenHama from "../Components/ManajemenHama";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Weather />
      <ManajemenHama />
    </div>
  );
};

export default Dashboard;
