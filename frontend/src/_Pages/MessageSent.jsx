import { UserOutlined, LockOutlined,MailOutlined } from "@ant-design/icons";

import React from 'react'
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

function MessageSent() {
  return (
    <Layout>
    <div className='text-center my-5'>
        <h2 className="mt-5">Message send Successful</h2>
<div>
        <MailOutlined style={{ fontSize: 40, color: 'green' }}/><br/><br/>
        <Link to={`/contact`} className="btn btn-primary"><FaArrowCircleLeft/> Back</Link>
  </div>        
        </div></Layout>
  )
}

export default MessageSent