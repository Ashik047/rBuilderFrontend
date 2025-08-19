import { RiFileEditFill } from "react-icons/ri";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { getResumeEditHistoryAPI, updateHistoryAPI } from "../services/allAPIs";
import { useEffect } from "react";
import Swal from 'sweetalert2'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Edit = ({ resumeId, onUpdate }) => {
    // console.log(resumeId);
    const [resumeDetails, setResumeDetails] = useState({
        personalData: {
            name: "",
            jobTitle: "",
            location: "",
            email: "",
            phoneNumber: "",
            gitHub: "",
            linkedIn: "",
            portfolio: "",
        },
        education: {
            course: "",
            college: "",
            university: "",
            year: "",
        },
        experience: {
            jobRole: "",
            company: "",
            location: "",
            duration: "",
        },
        skills: [],
        summary: ""
    });
    const [inpSkill, setInpSkill] = useState("");
    useEffect(() => {
        getResume();
    }, [resumeId]);

    const getResume = async () => {
        const result = await getResumeEditHistoryAPI(resumeId);
        // console.log(result);
        setResumeDetails(result.data);
    }
    const updateResume = async () => {
        try {
            const result = await updateHistoryAPI(resumeId, resumeDetails);
            // console.log(result);
            if (result.status == 200) {
                Swal.fire({
                    title: "Success",
                    text: "Resume Added Successfully",
                    icon: "success",
                    confirmButtonText: "Back"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error",
                    confirmButtonText: "Back"
                });
            }
            handleClose();
            onUpdate(result.data);
        } catch (err) {
            console.log(err);
        }
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const addNewSkill = (skill) => {
        if (resumeDetails.skills.includes(skill)) {
            alert("Skill already exist");
            setInpSkill("");

        } else {
            setResumeDetails(data => ({ ...data, skills: [...data.skills, skill] }));
            setInpSkill("");
        }
    }
    const handleRemoveNewSkill = (item) => {
        // console.log("hello");
        setResumeDetails({ ...resumeDetails, skills: resumeDetails.skills.filter(event => event !== item) });
    }
    return (
        <>
            <Button variant="text" sx={{ fontSize: "32px", color: "black" }} onClick={handleOpen}><RiFileEditFill /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ textAlign: "center" }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
                        Edit Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <h3 className='mt-4'>Personal Details</h3>
                            <div className='d-flex row mb-4 p-3 '>
                                <TextField id="fullName" label="Full Name" variant="standard" value={resumeDetails?.personalData?.name} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, name: e.target.value } })} />
                                <TextField id="jobTitle" label="Job Title" variant="standard" value={resumeDetails?.personalData?.jobTitle} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, jobTitle: e.target.value } })} />
                                <TextField id="location" label="Location" variant="standard" value={resumeDetails?.personalData?.location} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, location: e.target.value } })} />
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-4'>Contact Details</h3>
                            <div className='d-flex row mb-4 p-3 '>
                                <TextField id="email" label="Email" variant="standard" value={resumeDetails?.personalData?.email} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, email: e.target.value } })} />
                                <TextField id="phone" label="Phone Number" variant="standard" value={resumeDetails?.personalData?.phoneNumber} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, phoneNumber: e.target.value } })} />
                                <TextField id="github" label="Github Profile Link" variant="standard" value={resumeDetails?.personalData?.gitHub} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, gitHub: e.target.value } })} />
                                <TextField id="linkedin" label="Linkedin Profile Link" variant="standard" value={resumeDetails?.personalData?.linkedIn} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, linkedIn: e.target.value } })} />
                                <TextField id="portfolio" label="Portfolio Link" variant="standard" value={resumeDetails?.personalData?.portfolio} onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, portfolio: e.target.value } })} />
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-4'>Educational Details</h3>
                            <div className='d-flex row mb-4 p-3 '>
                                <TextField id="course" label="Course Name" variant="standard" value={resumeDetails?.education?.course} onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, course: e.target.value } })} />
                                <TextField id="college" label="College Name" variant="standard" value={resumeDetails?.education?.college} onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, college: e.target.value } })} />
                                <TextField id="university" label="University" variant="standard" value={resumeDetails?.education?.university} onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, university: e.target.value } })} />
                                <TextField id="passoutYear" label="Year of passout" variant="standard" value={resumeDetails?.education?.year} onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, year: e.target.value } })} />
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-4'>Professional Details</h3>
                            <div className='d-flex row mb-4 p-3 '>
                                <TextField id="job" label="Job or Internship" variant="standard" value={resumeDetails?.experience?.jobRole} onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, jobRole: e.target.value } })} />
                                <TextField id="company" label="Company Name" variant="standard" value={resumeDetails?.experience?.company} onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, company: e.target.value } })} />
                                <TextField id="location" label="Location" variant="standard" value={resumeDetails?.experience?.location} onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, location: e.target.value } })} />
                                <TextField id="duration" label="Duration" variant="standard" value={resumeDetails?.experience?.duration} onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, duration: e.target.value } })} />
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-4'>Skills</h3>
                            <div className='d-flex row p-3  pb-1'>
                                <TextField id="skill" label="Add Skill" variant="standard" onChange={e => setInpSkill(e.target.value)} value={inpSkill} />
                            </div>
                            <Stack direction="row" spacing={2}>
                                <Button onClick={() => addNewSkill(inpSkill)} sx={{ color: "black", fontWeight: "bolder" }} variant="text">Add</Button>
                            </Stack>
                            <h4 className='mt-4 mb-3 text-center'>Selected Skills</h4>
                            <div>
                                {
                                    resumeDetails?.skills?.length > 0 ? resumeDetails?.skills?.map((event) => (
                                        <span key={event} className='btn btn-small fw-medium m-1'>{event} <button onClick={() => handleRemoveNewSkill(event)} className='btn btn-small'>X</button></span>
                                    )) : ""
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-4'>Professional Summary</h3>
                            <div className='d-flex row mb-4 p-3 w-75'>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Write a short summary of yourself"
                                    multiline
                                    rows={4}
                                    // defaultValue="I am a professional Full Stack Developer"
                                    variant="standard" value={resumeDetails?.summary} onChange={e => setResumeDetails({ ...resumeDetails, summary: e.target.value })}
                                />
                            </div>
                        </div>
                    </Typography>
                    <Button sx={{ backgroundColor: "black", fontWeight: "bolder" }} variant="contained" onClick={updateResume}>Update</Button>
                </Box>
            </Modal>
        </>
    )
}

export default Edit