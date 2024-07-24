import React from 'react'
import Login from "../../admin/login/page"
import Modal from "../../../components/layout/Modal";
export default function Page(){
    console.log("intercept (.) login")
    return(
      <Modal > 
        <p>  "login" </p>
        <Login/>
       </Modal>
    )
}