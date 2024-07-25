import Login from "@/app/admin/login/page";

export default function Page(){
    return(
        < > <Login/></>
    )
}

/**    <br/><br/><br/>
    <Link href={{
        pathname:"./",
        query:{modal:true,message:"Please login",content:"login"}
      }}>
      <button>loginModal</button></Link>
       
    <Link href={"/login?modal=true"} className="m-4">
    <button>login Intercept Modal</button></Link>
      
    
    <Link href="./admin/login">login</Link>

    <Link href={"/login?modal=true"} className="m-4">
      <button>login Intercept Modal</button></Link>

      */