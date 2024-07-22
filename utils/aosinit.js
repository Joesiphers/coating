"use client"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from 'react';
export default function Aosinit (){
     useEffect(()=>{
        AOS.init()
    },[])
    return( null    )
}