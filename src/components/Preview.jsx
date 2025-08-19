import React from 'react'
import { FaFileDownload } from "react-icons/fa";
import { RiFileHistoryFill } from "react-icons/ri";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Edit from './Edit';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { addResumeHistoryAPI } from '../services/allAPIs';
import { useState } from 'react';
import { useEffect } from 'react';


const Preview = ({ formData, setFormData }) => {
    const { personalData, education, experience, skills, summary } = formData;
    const [resumeId, setResumeId] = useState("");
    const [downloadStatus, setDownloadStatus] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const onUpdate = (data) => {
        setUpdateData(data);
    }
    useEffect(() => {
        updateData && setFormData(updateData);
    }, [updateData]);

    const downloadPDF = async () => {
        const result = document.querySelector("#result");
        const canvas = await html2canvas(result, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resume.pdf");
        try {
            const result = await addResumeHistoryAPI(formData);
            setResumeId(result.data.id);
            setDownloadStatus(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {
                downloadStatus ? (
                    <div className='fs-3 float-end me-3'>
                        <Edit resumeId={resumeId} onUpdate={onUpdate} />
                        <Button onClick={downloadPDF} variant="text" sx={{ fontSize: "32px", color: "black" }}><FaFileDownload /></Button>
                        <Link href="./history"><Button variant="text" sx={{ fontSize: "32px", color: "black" }}><RiFileHistoryFill /></Button></Link>
                    </div>
                ) : (
                    <div className='fs-3 float-end me-3'>
                        <Button onClick={downloadPDF} variant="text" sx={{ fontSize: "32px", color: "black" }}><FaFileDownload /></Button>
                    </div>
                )
            }
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        mt: 12,
                        ml: 30,
                        width: 1500,
                    },
                }}
            >
                <Paper elevation={2} sx={{ textAlign: "center", px: "10px", py: "30px" }} id="result" >

                    <Typography variant="h3" component="h2" sx={{ fontSize: "24px", mt: "0px", fontWeight: "bold" }}>
                        {formData.personalData.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "18px", mt: "5px", fontWeight: "bold" }}>
                        {formData.personalData.jobTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                        {formData.personalData.email} | {formData.personalData.phoneNumber} | {formData.personalData.location}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                        <Link href={formData.personalData.gitHub} target="_blank" >Github</Link> |&nbsp;
                        <Link href={formData.personalData.linkedIn} target="_blank" >Linkedin</Link> |&nbsp;
                        <Link href={formData.personalData.portfolio} target="_blank" >Portfolio</Link>
                    </Typography>
                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Summary</Divider>
                    <Typography sx={{ fontSize: "12px" }}>{formData.summary}</Typography>
                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Education</Divider>
                    <Typography variant='h2' sx={{ fontSize: "14px", fontWeight: "bold" }}>{formData.education.course}</Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                        {formData.education.college} | {formData.education.university} | {formData.education.year}
                    </Typography>
                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Professional Experience</Divider>
                    <Typography variant='h2' sx={{ fontSize: "14px", fontWeight: "bold" }}>{formData.experience.jobRole}</Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                        {formData.experience.company} | {formData.experience.location} | {formData.experience.duration}
                    </Typography>
                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Skills</Divider>
                    <Stack direction={"row"} justifyContent={"center"} flexWrap={"wrap"}>
                        {skills.map(event => (
                            <span className='btn btn-small fw-medium'>{event} </span>
                        ))}
                    </Stack>

                </Paper>
            </Box>
        </div>
    )
}

export default Preview