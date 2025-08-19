import React from 'react'
import { FaFileDownload } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

const ResumeGenerator = () => {
    return (
        <div>
            <div className='p-5 d-flex flex-column align-items-center'>
                <h3 className='text-center mb-3 fw-bolder'>Create a job-winning Resume in minutes</h3>
                <div className='d-flex px-3 align-items center gap-2 px-2 justify-content-evenly w-100'>
                    <div className='col-4 border shadow p-2 text-center mt-5 rounded-3'>
                        <FaFileDownload className='mt-5 mb-3 fs-2 text-primary' />
                        <h4>Add your information</h4>
                        <p>Add pre-written examples to each section.</p>
                        <h5 className='mb-5'>Step 1</h5>
                    </div>
                    <div className='col-4 border shadow p-2 text-center mt-5 rounded-3'>
                        <FaFileAlt className='mt-5 mb-3 fs-2 text-success' />
                        <h4>Add your information</h4>
                        <p>Add pre-written examples to each section.</p>
                        <h5 className='mb-5'>Step 1</h5>
                    </div>
                </div>
                <Link to={"/form"}>
                    <Button variant="contained" className='mt-5' sx={{ backgroundColor: "rgb(53,4,99)" }}>Make Your Resume</Button>
                </Link>
            </div>
        </div>
    )
}

export default ResumeGenerator