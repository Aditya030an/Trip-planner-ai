import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  console.log("User Trip Card Item", trip);
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    const fetchPhoto = async () => {
      const endPoint = "https://api.unsplash.com/search/photos";
      const client_id = "Y0ZKzcR-Ki0DOtI7allUzcjzJX2g3QRt6_vEhElVje4";
      try {
        let query = trip?.formData.location || "";
        query = query.replace(/\s+/g, "+");
        const response = await axios.get(endPoint, {
          params: {
            page: 1,
            query: query,
            client_id: client_id,
          },
        });
        if (response.data.results.length > 0) {
          setPhotoUrl(response.data.results[0].urls.regular);
        } else {
          setPhotoUrl("https://via.placeholder.com/150");
        }
      } catch (error) {
        console.log("Error Fetching photo", error);
        setPhotoUrl("https://via.placeholder.com/150");
      }
    };

    if (trip?.formData.location) {
      fetchPhoto();
    }
  }, [trip?.formData.location]);

  return (
    <Link to={`/view-trip/${trip?.docID}`}>
      <div className="hover:scale-105 transition-all ">
        <img
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s"
          src={
            photoUrl
              ? photoUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s"
          }
          className="object-cover rounded-xl w-[250px] h-[250px]"
        />
        <div className="p-2">
          <h2 className="font-bold text-lg">{trip?.formData.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.formData?.noOfDays} Days Trip with {trip?.formData?.budget}{" "}
            Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
