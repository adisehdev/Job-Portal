import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../../context/UserContext";
import {Navigate,useNavigate } from "react-router-dom";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import Cookies from "js-cookie"

const Home = () => {

  
  const { isAuthorized } = useContext(Context);

  

  
  
  const navigate = useNavigate()
  // useEffect(()=>{
    
  //   if(!isAuthorized && !JSON.parse(localStorage.getItem("isAuth"))){
  //     navigate("/login")
  //   }
  // },[isAuthorized])
  
  return (
    <>
      <section className="homePage page">
        <Hero />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;