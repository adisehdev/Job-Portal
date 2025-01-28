// import React, { useEffect, useState, useContext } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Context } from "../../../context/UserContext";

// function Navbar() {
//   const [show, setShow] = useState(false);
//   let { isAuthorized, setIsAuthorized, user } = useContext(Context);
  
//   isAuthorized = isAuthorized || JSON.parse(localStorage.getItem("isAuth"));

//   console.log("isAuth navbar ",isAuthorized)
//   const backend_url = import.meta.env.VITE_BACKEND_URL;

  
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         `${backend_url}/api/users/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       toast.success(response.data.message);
//       setIsAuthorized(false);
      
//       localStorage.setItem("isAuth",JSON.stringify(false))
//       localStorage.setItem("userObj",JSON.stringify(null))
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response.data.message);

//       setIsAuthorized(true);
//     }
//   };

//   return (
//     <>
//       <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
//         <div className="container">
//           <div className="logo">
//             <img src="/jobPortalLogo.png" alt="logo" onClick={()=>navigate("/")}/>
//           </div>

//           <ul className={!show ? "menu" : "show-menu menu"}>
//             <li>
//               <Link to="/" onClick={() => setShow(false)}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/job/allJobs" onClick={() => setShow(false)}>
//                 All Jobs
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/application/myApplications"
//                 onClick={() => setShow(false)}
//               >
//                 {user && user.role === "Employer"
//                   ? "Applicant's Applications"
//                   : "My Applications"}
//               </Link>
//             </li>
//             {user && user.role === "Employer" ? (
//               <>
//                 <li>
//                   <Link to={"/job/postJob"} onClick={() => setShow(false)}>
//                     Post New Job
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={"/job/myJobs"} onClick={() => setShow(false)}>
//                     View your Jobs
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <></>
//             )}
//             <button
//               onClick={() => {
//                 handleLogout();
//               }}
//             >
//               LOGOUT
//             </button>
//           </ul>
//           <div className="hamburger">
//             <GiHamburgerMenu onClick={() => setShow(!show)} />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;



import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "../../../context/UserContext";

function Navbar() {
  const [show, setShow] = useState(false);
  let { isAuthorized, setIsAuthorized, user } = useContext(Context);
  
  isAuthorized = isAuthorized || JSON.parse(localStorage.getItem("isAuth"));

  console.log("isAuth navbar ,user ",isAuthorized,user)
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      
      localStorage.setItem("isAuth",JSON.stringify(false))
      localStorage.setItem("userObj",JSON.stringify(null))
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);

      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className="navbar-show">
        <div className="container">
          <div className="logo">
            <img src="/jobPortalLogo.png" alt="logo" onClick={()=>navigate("/")}/>
          </div>

          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to="/" onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/job/allJobs" onClick={() => setShow(false)}>
                All Jobs
              </Link>
            </li>
            <li>
              {
                user && <Link
                to="/application/myApplications"
                onClick={() => setShow(false)}
              >
                {user && user.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}
              </Link>
              }
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/job/postJob"} onClick={() => setShow(false)}>
                    Post New Job
                  </Link>
                </li>
                <li>
                  <Link to={"/job/myJobs"} onClick={() => setShow(false)}>
                    View your Jobs
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {
              user ? (<button
              onClick={() => {
                handleLogout();
              }}
            >
              LOGOUT
            </button>) : (<button onClick={() => navigate("/login")}>LOGIN</button>)
            }
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

