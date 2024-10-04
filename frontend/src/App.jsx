import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Context } from "../context/UserContext";
import ContextProvider from "../context/UserContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Jobs from "./components/jobs/Jobs";
import JobDetails from "./components/jobs/JobDetails";
import PostJob from "./components/jobs/PostJob";
import MyJobs from "./components/jobs/MyJobs";
import ApplicationForm from "./components/applications/ApplicationForm";
import MyApplications from "./components/applications/MyApplications";
import NotFound from "./components/notFound/NotFound";
import { Toaster } from "react-hot-toast";
import { useContext,useEffect } from "react";
import axios from "axios";

const App = () => {
  
  let { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
 
  const fetchUser = async function()  {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/getUser`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };
  

  useEffect(() => {
    
    
    console.log("inside app ",JSON.stringify(localStorage.getItem("isAuth")))
    if(JSON.parse(localStorage.getItem("isAuth")))fetchUser();
    
  }, [isAuthorized]);

  return (
    <>
      
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job/allJobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/application/:id" element={<ApplicationForm />} />
            <Route
              path="/application/myApplications"
              element={<MyApplications />}
            />
            <Route path="/job/postJob" element={<PostJob />} />
            <Route path="/job/myJobs" element={<MyJobs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      
    </>
  );
};

export default App;
