import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";
const Hotels = ({ trip }) => {
  const [hotels, setHotels] = useState([]);
  console.log("trip inside hotels", trip.hotelOption);
  useEffect(() => {
    setHotels(trip.hotelOption);
  }, [trip]);

  console.log("hotels", hotels);
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendation</h2>
      {hotels?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {hotels?.map((item, index) => {
            return (
             <HotelCardItem item={item}/>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Hotels;
