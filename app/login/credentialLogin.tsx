"use client";
import { useForm } from "react-hook-form";

export default function CredentialLogin() {
  const { register, handleSubmit, watch, formState } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }; 
  return (
    <>
      <div> login please la </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("email", { required: true, minLength: 3 })}
          className="my-2 mx-auto border-solid border border-indigo-600 rounded block"
        />{" "}
        <label htmlFor="userName">userName</label>
        <input
          type="text"
          {...register("userName", { minLength: 2, maxLength: 12 })}
          className="my-2 mx-auto border-solid border border-indigo-600 rounded block"
        />
        <input type="submit" />
      </form>
    </>
  );
}