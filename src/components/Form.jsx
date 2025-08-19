import React from 'react'
import Steps from './Steps'
import Preview from './Preview'
import { useState } from 'react'

const Form = () => {
    //state lifting
    const [formData, setFormData] = useState({
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
    const [isFinished, setIsFinished] = useState(false);

    return (
        <div className='container-fluid' style={{ paddingTop: "100px", paddingBottom: "100px" }}>
            {
                isFinished ? (<div className="row">
                    <div className="col-12 col-lg-6 offset-lg-3"><Preview formData={formData} setFormData={setFormData} /></div>
                </div>) : (<div className="row">
                    <div className="col-12 col-lg-6"><Steps formData={formData} setFormData={setFormData} isFinished={isFinished} setIsFinished={setIsFinished} /></div>
                    <div className="col-12 col-lg-6"><Preview formData={formData} setFormData={setFormData} /></div>
                </div>)
            }
        </div>
    )
}

export default Form