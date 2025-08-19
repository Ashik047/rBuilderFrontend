import React from 'react'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { FaTrashAlt } from "react-icons/fa";
import { deleteResumeHistoryAPI, getResumeHistoryAPI } from '../services/allAPIs';
import { useEffect, useState } from 'react';
import { RiH1 } from 'react-icons/ri';

const History = () => {
    const [history, setHistory] = useState([]);
    const getHistory = async () => {
        const result = await getResumeHistoryAPI();
        setHistory(result.data);
    }
    console.log(history);
    useEffect(() => {
        getHistory();
    }, [])
    const deleteHistory = async (id) => {
        try {
            const result = await deleteResumeHistoryAPI(id);
            console.log(result);
            getHistory();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Typography variant="h3" component="h2" sx={{ fontSize: "24px", fontWeight: "bold", mb: "30px", textAlign: "center", mt: "50px" }}>
                Resume Download History
            </Typography>
            <Stack className='px-2 w-100 d-flex flex-wrap flex-row gap-2 justify-content-center'>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: "15px",
                        '& > :not(style)': {
                            mt: 0,
                            mb: 5,
                            width: 300,
                        },
                    }}
                >
                    {
                        (history?.length > 0) ? (
                            history?.map((item, index) => (
                                <Paper key={index} elevation={2} sx={{ textAlign: "center", px: "10px", py: "20px" }}>
                                    <Button onClick={() => deleteHistory(item.id)} className='d-flex justify-content-end w-100 text-dark p-0 pe-1' ><FaTrashAlt /></Button><br />
                                    <Typography variant="h3" component="h2" sx={{ fontSize: "24px", mt: "0px", fontWeight: "bold", textAlign: "center", width: "100%", mx: "auto", display: "block" }}>
                                        {item.personalData.name}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: "18px", mt: "5px", fontWeight: "bold" }}>
                                        {item.personalData.jobTitle}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                                        {item.personalData.email} | {item.personalData.phoneNumber} | {item.personalData.location}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                                        <Link href={item.personalData.gitHub}>GitHub</Link> |&nbsp;
                                        <Link href={item.personalData.linkedIn}>LinkedIn</Link> |&nbsp;
                                        <Link href={item.personalData.portfolio}>Portfolio</Link>
                                    </Typography>
                                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Summary</Divider>
                                    <Typography sx={{ fontSize: "12px" }}>{item.summary}</Typography>
                                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Education</Divider>
                                    <Typography variant='h2' sx={{ fontSize: "14px", fontWeight: "bold" }}>{item.education.course}</Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                                        {item.education.college} | {item.education.university} | {item.education.year}
                                    </Typography>
                                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Professional Experience</Divider>
                                    <Typography variant='h2' sx={{ fontSize: "14px", fontWeight: "bold" }}>{item.experience.jobRole}</Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                                        {item.experience.company} | {item.experience.location} | {item.experience.duration}
                                    </Typography>
                                    <Divider sx={{ fontWeight: "bold", my: "5px" }}>Skills</Divider>
                                    <Stack direction={"row"} justifyContent={"space-evenly"} flexWrap={"wrap"} gap={"8px"}>
                                        {
                                            item?.skills?.length && item?.skills?.map((event, index) => (
                                                <Button key={index} variant='contained' size='small' sx={{ backgroundColor: "black" }}>{event}</Button>
                                            ))
                                        }
                                    </Stack>

                                </Paper>
                            ))
                        ) : (<h1>No History</h1>)
                    }
                </Box>

            </Stack>
        </div>
    )
}

export default History