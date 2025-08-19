import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='bg text-center text-light p-5'>
            <br /><br />
            <h4>Contact Us</h4>
            <h6 className='mt-3'><MdOutlineEmail className='fs-4' />&nbsp;resumebuilder@gmail.com</h6>
            <h6 className='mt-1'><MdOutlinePhoneAndroid className='fs-4' />&nbsp;9998889990</h6>
            <br />
            <h5>Connect With Us</h5>
            <div className='d-flex justify-content-center mt-3'>
                <FaFacebook className='me-3 fs-4' />
                <FaInstagramSquare className='me-3 fs-4' />
                <FaLinkedin className='me-3 fs-4' />
            </div>
            <br />
            <p className='mt-3'>Designed & built with ❤️ using React</p>
        </div>
    )
}

export default Footer