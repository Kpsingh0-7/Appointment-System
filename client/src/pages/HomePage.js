import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data
  const getDoctorsData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center text-primary">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => (
          <DoctorList key={doctor._id} doctor={doctor} />
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
