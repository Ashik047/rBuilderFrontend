import React from 'react'
import "./Landing.css"
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div>
            <section id="bg1">
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='inner col-4 text-center innerBox py-5 border rounded text-light px-2'>
                        <h3 className='mb-3 fw-bolder'>Designed to get hired</h3>
                        <h4>Your skills, your story, your next job - all in one</h4>
                        {/* routing is done using Link */}
                        <Link to={"/resumeGenerator"}>
                            <Button variant="contained" className='mt-3' sx={{ backgroundColor: "rgb(53,4,99)" }}>Make Your Resume</Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section id='tools'>
                <h3 className='text-center mt-5 mb-3 fw-bolder'>Tools</h3>
                <div className='d-flex px-3 align-items center gap-2 px-2'>
                    <div className='col-6 text-center mt-5'>

                        <h4>Resume</h4>
                        <p>Create unlimited new resumes and easily edit them afterwards.</p>
                        <h4>Cover Letter</h4>
                        <p>Easily write professional cover letters.</p>
                        <h4>Jobs</h4>
                        <p>Automatically receive new and relevant job postings.</p>
                        <h4>Applications</h4>
                        <p>Effortlessly manage and track your job applications in an organized manner.</p>
                    </div>
                    <div className="col-6">
                        <img src="https://cdn-images.zety.com/images/zety/landings/builder/resume-builder-jumbotron-image@3x.png" alt="img" className='mx-auto d-block' height={"400px"} />
                    </div>
                </div>
            </section>
            <section id="bg2">
            </section>
            <section>
                <h3 className='text-center mt-5 mb-3 fw-bolder'>Testimonials</h3>
                <div className='d-flex px-3 align-items center gap-2 px-2'>
                    <div className='col-6 text-center mt-5'>

                        <h4>Trusted by professionals worldwide</h4>
                        <p>At LiveCareer, we don't just help you create résumés — we help you land the job. Whether you're a seasoned professional or just starting out, our tools are designed to get results.</p>

                        <p>In fact, users who used LiveCareer reported getting hired an average of 48 days faster.</p>

                        <p>Join thousands of job-seekers who’ve fast-tracked their careers with a résumé that truly stands out.</p>

                    </div>
                    <div className="col-6">
                        <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-27772,resizemode-75,msid-119174091/magazines/panache/techie-shares-tricks-to-crack-top-it-company-interviews-even-google-agrees.jpg" alt="img" className='mx-auto d-block my-5' height={"300px"} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing