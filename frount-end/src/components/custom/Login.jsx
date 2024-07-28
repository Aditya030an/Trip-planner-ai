import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email, password);
    if (!email || !password) {
      setError(true);
      return false;
    }

    // let result = await fetch("http://localhost:5000/login", {
      let result = await fetch("https://trip-planner-ai-back-end.vercel.app/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log("result in login page", result);
    if (result._id) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      // <Toaster/>
      {
        toast(
          <div className=" text-xl">"Please fill the currect details"</div>
        );
      }
    }
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" p-3 flex items-center justify-center">
      <div className="border rounded-lg p-3 shadow-xl flex flex-col w-3/4">
        <h1 className="font-semibold text-3xl">Login</h1>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-lg">Enter Your Email</p>
            <Input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xl"
            />
            {error && email.length == 0 ? (
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
            {error && password.length == 0 ? (
              <div className="text-base text-red-600 font-light">
                Please enter the password
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-right px-3">
          <Button
            onClick={handleLogin}
            className="hover:shadow-xl active:bg-white active:text-black"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
