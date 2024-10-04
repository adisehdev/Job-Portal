import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const { isAuthorized, setIsAuthorized,setUser} = useContext(Context);

  useEffect(()=>{
    if (isAuthorized) {
      console.log("setting localStorage in login : ",JSON.stringify(isAuthorized))
      
      navigate("/")
    }
  },[isAuthorized])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backend_url}/api/users/login`,
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      localStorage.setItem("isAuth",JSON.stringify(true))
      setUser({email,role})
      localStorage.setItem("userObj",JSON.stringify({email,role}))
      navigate("/")
    } catch (error) {
      console.log("error in login frontend ",error)
      toast.error(error.response.data.message);
    }
  };

  

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/jobPortalLogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type={"email"}
                  value={email}
                  placeholder="abc@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type={"password"}
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
}

export default Login;
