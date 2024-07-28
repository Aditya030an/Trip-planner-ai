import { Button } from "@/components/ui/button";
import axios from "axios";
// import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  // console.log("trip inside infosection", trip);
  // console.log("trip inside infosection form data", trip.formData);
  const [photoUrl, setPhotoUrl] = useState("");

  // const GetPlacePhoto =async ()=>{
  //   const data ={
  //     textQuery:trip?.formData?.location
  //   }
  //   const result = await GetPlaceDetails(data).then(resp=>{
  //     console.log(resp.data);
  //   })
  // }
  // useEffect(()=>{
  //   trip&&GetPlacePhoto();
  // } , [trip]);
  // https://api.unsplash.com/search/photos?page=1&query=Bharat&client_id=Y0ZKzcR-Ki0DOtI7allUzcjzJX2g3QRt6_vEhElVje4
  


  useEffect(() => {
    const fetchPhoto = async () => {
      const endpoint = "https://api.unsplash.com/search/photos";
      const client_id = "Y0ZKzcR-Ki0DOtI7allUzcjzJX2g3QRt6_vEhElVje4";
      try {
        let query = trip?.formData?.location || "";
        if (query.includes("at")) {
          query = query.split("at").pop().trim();
        }
        query = query.replace(/\s+/g, "+"); // Replace spaces with "+"
        const response = await axios.get(endpoint, {
          params: {
            page: 1,
            query: query,
            client_id: client_id,
          },
        });
        if (response.data.results.length > 0) {
          console.log("Info Section " , response.data.results);
          setPhotoUrl(response.data.results[0].urls.regular);
        } else {
          // Fallback image if no results are found
          console.log("Info Section else" , response.data.results);
          setPhotoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s");
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        // Fallback image in case of error
        setPhotoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s");
      }
    };

    if (trip?.formData?.location) {
      fetchPhoto();
    }
  }, [trip?.formData?.location]);

  return (
    <div className="">
      <img
        src={photoUrl ? photoUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s"}
        alt="trip-image"
        className="w-full h-[340px] object-cover rounded-lg"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.formData?.location}</h2>
          <div className="flex gap-5 ">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.formData?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.formData?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Traveler: {trip?.formData?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}
export default InfoSection;
