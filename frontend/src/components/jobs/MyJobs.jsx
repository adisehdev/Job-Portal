import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";


function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [loading,setLoading] = useState(false)
  let { isAuthorized, user } = useContext(Context);
  if(JSON.stringify(user)==='{}'){
    user = JSON.parse(localStorage.getItem("userObj"))
  }
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  
  const getMyJobs = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${backend_url}/api/jobs/myJobs`,
        {
          withCredentials: true,
        }
      );
      setLoading(false)

      setMyJobs(response.data.myJobs);
    } catch (error) {
      setLoading(false)
      console.log("Error in getting myJobs (Employer) in frontend", error);
      toast.error(error.response.data.message);
      setMyJobs([]);
    }
  };

  useEffect(() => {
    if ((!isAuthorized && !JSON.parse(localStorage.getItem("isAuth"))) ) navigate("/");
    if ((isAuthorized || JSON.parse(localStorage.getItem("isAuth"))) )getMyJobs()
    if((!user) || (user && user.role!=="Employer"))navigate("/login")
  }, [isAuthorized]);

  

  const handleEnableEdit = (jobId) => {
    //allowing to edit job with id jobId
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    //diabling to edit job
    setEditingMode(null);
  };

  //function to update job
  const handleUpdateJob = async (jobId) => {
    try {
      const updatedJob = myJobs.find((job) => job._id === jobId);
      setLoading(true)
      const response = await axios.put(
        `${backend_url}/api/jobs/updateJob/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      setLoading(false)
      toast.success(response.data.message);
      setEditingMode(null);
    } catch (error) {
      setLoading(false)
      console.log("Error in editing Job in frontend ", error);
      toast.error(error.response.data.message);
    }
  };

  //function to delete job
  const handleDeleteJob = async (jobId) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `${backend_url}/api/jobs/deleteJob/${jobId}`,
        { withCredentials: true }
      );
      setLoading(false)

      setMyJobs((prev) => prev.filter((prevJob) => prevJob._id !== jobId));
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message);
    }
  };

  //template fn to handle changes in inputs
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  if(loading)return <Loader/>

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Jobs Posted By You</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((job) => (
                  <div className="card" key={job._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title : </span>
                          <input
                            type="text"
                            disabled={!editingMode ? true : false}
                            value={job.title}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          {" "}
                          <span>Country : </span>
                          <input
                            type="text"
                            disabled={!editingMode ? true : false}
                            value={job.country}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          <span>City : </span>
                          <input
                            type="text"
                            disabled={!editingMode ? true : false}
                            value={job.city}
                            onChange={(e) =>
                              handleInputChange(job._id, "city", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <span>Category:</span>
                          <select
                            value={job.category}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              !editingMode? true : false
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>

                        <div>
                          <span>
                            Salary:{" "}
                            {job.fixedSalary ? (
                              <input
                                type="number"
                                disabled={!editingMode ? true : false}
                                value={job.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    job._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={!editingMode ? true : false}
                                  value={job.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      job._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />

                                <input
                                  type="number"
                                  disabled={!editingMode ? true : false}
                                  value={job.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      job._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>

                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={job.expired}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>

                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={job.description}
                            disabled={!editingMode ? true : false}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          <span>Location:</span>{" "}
                          <textarea
                            rows={5}
                            value={job.location}
                            disabled={!editingMode ? true : false}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === job._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(job._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>

                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEnableEdit(job._id)}
                              className="edit_btn"
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyJobs;
