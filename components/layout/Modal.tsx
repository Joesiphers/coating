"use client"
export default function Modal (props){
    console.log("MOdal called", props.info,props)
    return (<>
        <div>infor : {props.info }</div>
        <p>Modal</p>
        {props.children}
        </>
    )
}