import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../../context/UserContext";
import { Link, useParams, useNavigate } from "react-router-dom";

function JobDetails() {
  
  const { id } = useParams();
  const [job, setJob] = useState({});
  let { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  if(JSON.stringify(user)==='{}'){
    user = JSON.parse(localStorage.getItem("userObj"))
  }

  

  const getSingleJob = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/jobs/${id}`, {
        withCredentials: true,
      });

      setJob(data.job);
    } catch (error) {
      console.log("Error in fetching single job by job id frontend ", error);
      navigate("/notFound");
    }
  };

  useEffect(() => {
    
    if (!isAuthorized && !JSON.parse(localStorage.getItem("isAuth"))) {
      navigate("/login");
    }

    if(isAuthorized || JSON.parse(localStorage.getItem("isAuth")))getSingleJob()


  }, [isAuthorized]);

  

  return (
    <>
      <section className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title : <span>{job.title}</span>
            </p>
            <p>
              Category : <span>{job.category}</span>
            </p>
            <p>
              Contry : <span>{job.contry}</span>
            </p>
            <p>
              City : <span>{job.city}</span>
            </p>
            <p>
              Location : <span>{job.location}</span>
            </p>
            <p>
              Description : <span>{job.description}</span>
            </p>
            <p>
              Posted On : <span>{job.postedOn}</span>
            </p>
            <p>
              Salary:{" "}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            {user && user.role === "Employer" ? (
              <></>
            ) : (
              <Link to={`/application/${job._id}`}>Apply Now</Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default JobDetails;
