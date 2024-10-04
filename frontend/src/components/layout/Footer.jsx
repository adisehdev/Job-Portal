import React, { useContext } from "react";
import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import {  FaLinkedin,FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Aditya Sehdev.</div>
      <div>
        
        <Link to={"https://github.com/adisehdev"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.linkedin.com/in/aditya-sehdev-a0b55022b/"} target="_blank">
          <FaLinkedin />
        </Link>
        
      </div>
    </footer>
  );
};

export default Footer;