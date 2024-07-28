import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorMsg = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });
  return <div>Unvalid url</div>;
};

export default ErrorMsg;
