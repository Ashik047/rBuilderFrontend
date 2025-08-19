import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { addResumeAPI } from "../services/allAPIs";
import Swal from 'sweetalert2'

const steps = ['Basic Information', 'Contact Details', 'Education Details', 'Work Experience', 'Skills and Certifications', 'Review & Submit'];

const Steps = ({ formData, setFormData, isFinished, setIsFinished }) => {
    // console.log(formData);
    const { personalData, education, experience, skills, summary } = formData;
    const [inputSkill, setInputSkill] = useState("");
    const suggestions = ["React", "Angular", "MongoDB", "NodeJS"];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const skillInput = document.querySelector("#skill");

    const isStepOptional = (step) => {
        return step === null;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const addSkill = (skill) => {
        if (formData.skills.includes(skill)) {
            alert("Skill already exist");
            skillInput.value = "";
            setInputSkill("");

        } else {
            setFormData(data => ({ ...data, skills: [...data.skills, skill] }));
            skillInput.value = "";
            setInputSkill("");
        }
    }
    const handleAddResume = async () => {
        try {
            await addResumeAPI(formData);
            Swal.fire({
                title: "Success",
                text: "Resume Added Successfully",
                icon: "success",
                confirmButtonText: "Back"
            });
            setIsFinished(true);
        } catch (err) {
            console.log(err);
        }
    }
    const handleRemoveSkill = (item) => {
        setFormData({ ...formData, skills: skills.filter(event => event !== item) });
    }

    //step content
    const renderStepContent = (step) => {
        switch (step) {
            case 0: return (
                <div>
                    <h3 className='mt-4'>Personal Details</h3>
                    <div className='d-flex row mb-4 p-3 w-75'>
                        <TextField id="fullName" label="Full Name" variant="standard" value={formData.personalData.name} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, name: e.target.value } })} />
                        <TextField id="jobTitle" label="Job Title" variant="standard" value={formData.personalData.jobTitle} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, jobTitle: e.target.value } })} />
                        <TextField id="location" label="Location" variant="standard" value={formData.personalData.location} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, location: e.target.value } })} />
                    </div>
                </div>
            )
            case 1: return (
                <div>
                    <h3 className='mt-4'>Contact Details</h3>
                    <div className='d-flex row mb-4 p-3 w-75'>
                        <TextField id="email" label="Email" variant="standard" value={formData.personalData.email} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, email: e.target.value } })} />
                        <TextField id="phone" label="Phone Number" variant="standard" value={formData.personalData.phoneNumber} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, phoneNumber: e.target.value } })} />
                        <TextField id="github" label="Github Profile Link" variant="standard" value={formData.personalData.gitHub} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, gitHub: e.target.value } })} />
                        <TextField id="linkedin" label="Linkedin Profile Link" variant="standard" value={formData.personalData.linkedIn} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, linkedIn: e.target.value } })} />
                        <TextField id="portfolio" label="Portfolio Link" variant="standard" value={formData.personalData.portfolio} onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, portfolio: e.target.value } })} />
                    </div>
                </div>
            )
            case 2: return (
                <div>
                    <h3 className='mt-4'>Educational Details</h3>
                    <div className='d-flex row mb-4 p-3 w-75'>
                        <TextField id="course" label="Course Name" variant="standard" value={formData.education.course} onChange={e => setFormData({ ...formData, education: { ...formData.education, course: e.target.value } })} />
                        <TextField id="college" label="College Name" variant="standard" value={formData.education.college} onChange={e => setFormData({ ...formData, education: { ...formData.education, college: e.target.value } })} />
                        <TextField id="university" label="University" variant="standard" value={formData.education.university} onChange={e => setFormData({ ...formData, education: { ...formData.education, university: e.target.value } })} />
                        <TextField id="passoutYear" label="Year of passout" variant="standard" value={formData.education.year} onChange={e => setFormData({ ...formData, education: { ...formData.education, year: e.target.value } })} />
                    </div>
                </div>
            )
            case 3: return (
                <div>
                    <h3 className='mt-4'>Professional Details</h3>
                    <div className='d-flex row mb-4 p-3 w-75'>
                        <TextField id="job" label="Job or Internship" variant="standard" value={formData.experience.jobRole} onChange={e => setFormData({ ...formData, experience: { ...formData.experience, jobRole: e.target.value } })} />
                        <TextField id="company" label="Company Name" variant="standard" value={formData.experience.company} onChange={e => setFormData({ ...formData, experience: { ...formData.experience, company: e.target.value } })} />
                        <TextField id="location" label="Location" variant="standard" value={formData.experience.location} onChange={e => setFormData({ ...formData, experience: { ...formData.experience, location: e.target.value } })} />
                        <TextField id="duration" label="Duration" variant="standard" value={formData.experience.duration} onChange={e => setFormData({ ...formData, experience: { ...formData.experience, duration: e.target.value } })} />
                    </div>
                </div>
            )
            case 4: return (
                <div>
                    <h3 className='mt-4'>Skills</h3>
                    <div className='d-flex row p-3 w-75 pb-1'>

                        <TextField onChange={e => setInputSkill(e.target.value)} id="skill" label="Add Skill" variant="standard" value={inputSkill} />
                    </div>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => addSkill(inputSkill)} sx={{ color: "black", fontWeight: "bolder" }} variant="text">Add</Button>
                    </Stack>
                    <h4 className='mt-4 mb-3'>Suggestions</h4>
                    <Stack direction="row" spacing={2} sx={{ marginBottom: "20px" }}>
                        {
                            suggestions.map((item, index) => (
                                <Button key={index} onClick={() => addSkill(item)} sx={{ color: "black", fontWeight: "bolder" }} size='small' variant="text">{item}</Button>
                            ))
                        }

                    </Stack>
                    <div>
                        <h4 className='mt-4 mb-3'>Added SKills</h4>
                        {
                            skills.length > 0 ? skills.map((event) => (
                                <span key={event} className='btn btn-small fw-medium m-1'>{event} <button onClick={() => handleRemoveSkill(event)} className='btn btn-small'>X</button></span>
                            )) : ""
                        }
                    </div>
                </div>
            )
            case 5: return (
                <div>
                    <h3 className='mt-4'>Professional Summary</h3>
                    <div className='d-flex row mb-4 p-3 w-75'>
                        <TextField
                            id="standard-multiline-static"
                            label="Write a short summary of yourself"
                            multiline
                            rows={4}
                            // defaultValue="I am a professional Full Stack Developer"
                            variant="standard" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })}
                        />
                    </div>
                </div>
            )
            default: return null
        }
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = (
                        //         <Typography variant="caption">Optional</Typography>
                        //     );
                        // }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 5, mb: 1, fontWeight: "bolder" }}>Step {activeStep + 1}</Typography>
                        <Box>
                            {renderStepContent(activeStep)}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            {activeStep === steps.length - 1 ?
                                (<Button onClick={handleAddResume}>Finish</Button>) :
                                (<Button onClick={handleNext}>Next</Button>)}
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    )
}

export default Steps