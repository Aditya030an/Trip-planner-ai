import React, { useInsertionEffect, useState, useEffect } from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  const [placeToVisit, setPlaceToVisit] = useState([]);
  // console.log("place to visit" , trip?.days);
  useEffect(() => {
    setPlaceToVisit(trip?.days);
  }, [trip]);

  console.log("place to visit placeTovisit", placeToVisit);
  return (
    <div className="mt-7">
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {placeToVisit?.length > 0 ? (
          <div >
            {placeToVisit?.map((item, index) => {
              return (
                <div key={index} className="mt-5">
                  <h2 className="font-medium text-lg">Day {item?.day}</h2>
                  <div  className="grid md:grid-cols-2 gap-5">
                  {item?.plan.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <h2 className="font-medium text-sm text-orange-600">{item?.time}</h2>
                        <PlaceCardItem place={item}/>
                        {/* <h2>{item?.placeName}</h2>
                        <h2>{item?.timeTravel}</h2>
                        <h2>{item?.placeDetails}</h2>
                        <h2>{item?.rating}</h2>
                        <h2>{item?.ticketPricing}</h2> */}
                      </div>
                    );
                  })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PlacesToVisit;
