import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../context/UserContext";

function ApplicationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  

  let { isAuthorized, user } = useContext(Context);

  if(JSON.stringify(user)==='{}'){
    user = JSON.parse(localStorage.getItem("userObj"))
  }
  
  const navigate = useNavigate();

  //function to handle file input changes
  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address",address)
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${backend_url}/api/applications/postApplication`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigate("/job/allJobs");
    } catch (error) {
      console.log("Error in applying for job in frontend ", error);
      toast.error(error.response.data.message);
    }
  };

  if ((!isAuthorized && !JSON.parse(localStorage.getItem("isAuth"))) || (user && user.role === "Employer")) {
    //only Job Seeker can apply
    navigate("/");
  }

  return (
    <>
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>

          <form onSubmit={handleApplication}>
            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="number"
              value={phone}
              placeholder="Enter Phone"
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              value={address}
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <textarea
              placeholder="CoverLetter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />

            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select Resume
              </label>
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={(e)=>{handleFileChange(e)
                }}
                style={{ width: "100%" }}
              />
            </div>

            <button type="submit">Send Application</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ApplicationForm;
