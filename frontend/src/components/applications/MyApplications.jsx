import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import Loader from "../Loader/Loader";

function MyApplications() {
  let { isAuthorized, user } = useContext(Context);

  if(JSON.stringify(user)==='{}'){
    user = JSON.parse(localStorage.getItem("userObj"))
  }

  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [loading,setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  

  const navigate = useNavigate();

  const getApplication = async () => {
    try {
      if (user && user.role === "Employer") {
        //fetch application api for employer
        setLoading(true)
        const response = await axios.get(
          `${backend_url}/api/applications/getApplicationsEmployer`,
          {
            withCredentials: true,
          }
        );
        setLoading(false)

        setApplications(response.data.applications);
      } else {
        //fetch application api for user
        setLoading(true)
        const response = await axios.get(
          `${backend_url}/api/applications/getApplicationsJobSeeker`,
          {
            withCredentials: true,
          }
        );
        setLoading(false)
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.log("Error in fetching applications in frontend ", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthorized && !JSON.parse(localStorage.getItem("isAuth"))) {
      navigate("/");
    }

    if (isAuthorized || JSON.parse(localStorage.getItem("isAuth")))getApplication();
  }, [isAuthorized]);

  const deleteApplication = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `${backend_url}/api/applications/deleteApplicationJobSeeker/${id}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false)
      toast.success(response.data.message);
      setApplications((prev) =>
        prev.filter((prevApplication) => prevApplication._id !== id)
      );
    } catch (error) {
      console.log("Error in deleting application in frontend ", error);
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if(loading)return <Loader/>

  return (
    <>
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h1>My Applications {"(Job Seeker)"}</h1>
            {applications.length > 0 ? (
              <>
                {applications.map((application) => {
                  return (
                    <JobSeekerCard
                      application={application}
                      key={application._id}
                      deleteApplication={deleteApplication}
                      openModal={openModal}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {" "}
                <h4>No Applications Found</h4>{" "}
              </>
            )}
          </div>
        ) : (
          <div className="container">
            <h1>Applications From Job Seekers</h1>
            {applications.length <= 0 ? (
              <>
                <h4>No Applications Found</h4>
              </>
            ) : (
              applications.map((application) => {
                return (
                  <EmployerCard
                    application={application}
                    key={application._id}
                    openModal={openModal}
                  />
                );
              })
            )}
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
}

const JobSeekerCard = ({ application, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Job Title:</span> {application.jobDetails.jobTitle}
          </p>

          <p>
            <span>Name:</span> {application.name}
          </p>

          <p>
            <span>Email:</span> {application.email}
          </p>
          <p>
            <span>Phone:</span> {application.phone}
          </p>
          <p>
            <span>Address:</span> {application.address}
          </p>
          <p>
            <span>Cover Letter:</span> {application.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={application.resume.url}
            alt="resume"
            onClick={() => openModal(application.resume.url)}
          />
        </div>

        <div className="btn_area">
          <button onClick={() => deleteApplication(application._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ application, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Job Name:</span> {application.jobDetails.jobTitle}
          </p>
          <p>
            <span>Name:</span> {application.name}
          </p>

          <p>
            <span>Email:</span> {application.email}
          </p>
          <p>
            <span>Phone:</span> {application.phone}
          </p>
          <p>
            <span>Address:</span> {application.address}
          </p>
          <p>
            <span>CoverLetter:</span> {application.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={application.resume.url}
            alt="resume"
            onClick={() => openModal(application.resume.url)}
          />
        </div>
      </div>
    </>
  );
};

export default MyApplications;
