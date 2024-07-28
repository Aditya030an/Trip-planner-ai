import React, { useEffect, useState } from "react";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrip = () => {
  const [usertrip, setUserTrip] = useState([]);
  const email = JSON.parse(localStorage.getItem("user")).email;
  const prevTrip = async () => {
    let result = await fetch(`https://trip-planner-ai-back-end.vercel.app/my-trip/${email}`);
    result = await result.json();
    console.log("my trip", result);
    setUserTrip(result);
  };
  console.log("trip", usertrip);
  useEffect(() => {
    prevTrip();
  }, []);

  return (
    <div className="sm:px-10 md:px-32 lg:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl my-6">My Trip</h2>
      <div className="grid grid-cols-2 mt-2 md:grid-cols-3 gap-5">
        {usertrip?.length>0 ? usertrip.map((trip, index) => {
          return <UserTripCardItem trip={trip} key={index} />;
        }):[1 , 2 ,3,4 ,5 , 6].map((item, index)=>{
            return(
                <div className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">
                    </div>
            )
        })}
      </div>
    </div>
  );
};

export default MyTrip;
