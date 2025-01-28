import React from 'react'
import { useEffect,useState,useContext } from 'react'
import { Context } from '../../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios'

function Jobs() {
    let {isAuthorized} = useContext(Context)
    
    
    const [jobs,setJobs] = useState([])
    const [loading,setLoading]  = useState(false)
    const navigate = useNavigate()
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const getAllJobs = async()=>{
        try {
            setLoading(true)
            const response = await axios.get(
                `${backend_url}/api/jobs/allJobs`,
                {
                    withCredentials : true,
                }
            )
            setLoading(false)

            setJobs(response.data.jobs)
        } catch (error) {
            setLoading(false)
            console.log("Error in getting all jobs in frontend ",error)

        }
    }

    // useEffect(()=>{getAllJobs()
    //     if(!isAuthorized && !JSON.parse(localStorage.getItem("isAuth")))navigate("/")
    // },[isAuthorized])

    useEffect(()=>{getAllJobs()
        
    },[])

    if(loading)return <Loader/>

    return (
        <>
            <section className='jobs page'>
                <div className='container'>
                    <h1>All Available Jobs</h1>
                    <div className='banner'>
                        {
                            jobs && jobs.map(
                                (job)=><div className='card' key={job._id}>
                                    <p>{job.title}</p>
                                    <p>{job.category}</p>
                                    <p>{job.contry}</p>
                                    {isAuthorized && <Link to={`/job/${job._id}`}>Job Details</Link>}
                                </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Jobs
