import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const checkUser =async (key)=>{
    // let result = await fetch(`https://trip-planner-ai-back-end.vercel.app/register/${key}`);
    let result = await fetch(`http://localhost:5000/register/${key}`);
    result = await result.json();
    if(result.length > 0){
      return true;
    }
    else{
      return false;
    }

  }

  const collectData = async () => {
    // console.log("data" , name , email , password);
    if (!name || !email || !password) {
      setError(true);
      return false;
    }

    const checker = await checkUser(email);
    if(checker){
      toast("This email id is already exist");
      return false;
    }
    // let result = await fetch("https://trip-planner-ai-back-end.vercel.app/register", {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log("result", result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" p-3 flex items-center justify-center">
      <div className="border rounded-lg p-3 shadow-xl flex flex-col w-3/4">
        <h1 className="font-semibold text-3xl">Registration</h1>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-lg">Enter Your Name</p>
            <Input
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl"
            />
            {error ? (
              <div className="text-base text-red-600 font-light">
                Please enter the name
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-lg">Enter Your Email</p>
            <Input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xl"
            />
            {error ? (
              <div className="text-base text-red-600 font-light">
                Please enter the email
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-lg">Enter Your Password</p>
            <div className=" relative">
              <Input
                type={showPassword ? "text" : "password"}
                // type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-xl"
              />
              <div className="absolute flex right-0 top-0  justify-end h-full flex-1">
                <button className=" px-4" onClick={handlerShowPassword}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            {error ? (
              <div className="text-base text-red-600 font-light">
                Please enter the password
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-right px-3">
          <Button
            onClick={collectData}
            className="hover:shadow-xl active:bg-white active:text-black"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
