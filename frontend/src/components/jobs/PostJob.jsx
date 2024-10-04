import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/UserContext";
import Loader from "../Loader/Loader";

function PostJob() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [loading,setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  let { isAuthorized, user } = useContext(Context);

  if(JSON.stringify(user)==='{}'){
    user = JSON.parse(localStorage.getItem("userObj"))
  }
  

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${backend_url}/api/jobs/postJob`,
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false)

      toast.success(response.data.message);
      navigate("/job/allJobs")
    } catch (error) {
      setLoading(false)
      console.log("Error in posting job in frontend ", error);
      toast.error(error.response.data.message);
    }
  };

  const navigate = useNavigate();

  
  
  useEffect(()=>{
    console.log("inside post job ",isAuthorized,JSON.parse(localStorage.getItem("isAuth")),user && user.role)
    if ((!isAuthorized && !JSON.parse(localStorage.getItem("isAuth")))) {
      
      navigate("/login");
    }

    if((user && user.role!=="Employer") || !user){
      navigate("/login")
    }

    
  },[isAuthorized])

  if(loading)return <Loader/>
  

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>Post New Job</h3>

          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>

            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />

            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>

              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    value={fixedSalary}
                    placeholder="Enter Fixed Salary"
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      value={salaryFrom}
                      placeholder="Salary From"
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />

                    <input
                      type="number"
                      value={salaryTo}
                      placeholder="Salary To"
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />

            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostJob;
