import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("user");
  // console.log("auth", JSON.parse(auth));
  const navigete = useNavigate();

  const logout = () => {
    localStorage.clear("user");
    navigete("/signin");
  };
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
      <img src="/logo.svg" alt="logo" />
      </Link>
      <div>
        {auth ? (
          <div className="flex gap-3">
            <div>
              <Link to={"/create-trip"}>
                <Button variant="outline" className="rounded-full">
                  + Create Trip
                </Button>
              </Link>
            </div>
            <div>
              <Link to={"/my-trip"}>
                <Button variant="outline" className="rounded-full">
                  My Trip
                </Button>
              </Link>
            </div>
            <div>
              <Link to={"/signin"} onClick={logout}>
                <Button>Logout ({JSON.parse(auth).name})</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-7">
            <Link to={"/signin"}>
              <Button>Sign in</Button>
            </Link>
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        )}

        {/* <Button>Sign In</Button> */}
      </div>
    </div>
  );
};

export default Header;
