import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

const ViewTrip = () => {
  const params = useParams();
  const [trip, setTrip] = useState([]);
  const [days, setDays] = useState([]);
  const [hotelOption, setHotelOption] = useState([]);
  const tripID = params.id;
  // console.log("params", params);
  const navigate = useNavigate();
  const getTripData = async () => {
    // let result = await fetch(`https://trip-planner-ai-back-end.vercel.app/view-trip/${tripID}`);
    let result = await fetch(`http://localhost:5000/view-trip/${tripID}`);
    result = await result.json();
    if (result.result) {
      navigate("/create-trip");
    } else {
      setTrip(result);
      setDays(result.days);
      setHotelOption(result.hotelOption);
      console.log("result inside view trip", result);
    }
  };

  useEffect(() => {
    getTripData();
  }, [tripID]);

  // console.log("trip data", tripData);
  // console.log("days", days);
  // console.log("hotelOption", hotelOption);
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* information section */}
      <InfoSection trip={trip} />
      {/* resommended section */}
      <Hotels trip={trip} />
      {/* Daily plan */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
