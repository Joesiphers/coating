import React from 'react'
import Login from "@/app/login/page"
import Modal from "../../../components/layout/Modal";
export default function Page(){
   // console.log(" (.) login")
    return(
      <Modal > 
        <Login/>
      </Modal>
    )
}