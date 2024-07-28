import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  // console.log("place card item" ,place);
  // const key = place?.placeName.tojoin("+");
  // const endpoint = "https://api.unsplash.com/search/photos?page=1&query=";
  // const client_id = "&client_id=Y0ZKzcR-Ki0DOtI7allUzcjzJX2g3QRt6_vEhElVje4"
  // console.log("photo url" ,endpoint+place?.placeName+client_id);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      const endpoint = "https://api.unsplash.com/search/photos";
      const client_id = "Y0ZKzcR-Ki0DOtI7allUzcjzJX2g3QRt6_vEhElVje4";
      try {
        const query = place?.placeName.replace(/\s+/g, "+"); // Replace spaces with "+"
        const response = await axios.get(endpoint, {
          params: {
            page: 1,
            query: query,
            client_id: client_id,
          },
        });
        if (response.data.results.length > 0) {
          setPhotoUrl(response.data.results[0].urls.regular);
        } else {
          // Fallback image if no results are found
          setPhotoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s");
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        // Fallback image in case of error
        setPhotoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s");
      }
    };

    if (place?.placeName) {
      fetchPhoto();
    }
  }, [place?.placeName]);
  return (
    <Link to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place?.placeName 
      }
      target="_blank">
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s"
        src={photoUrl ? photoUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s"}
        className="w-[130px] h-[130px] object-cover rounded-xl"
        />
      <div>
        <h2 className="font-bold text-lg">{place?.placeName}</h2>
        <p className="text-sm text-gray-500">{place?.placeDetails}</p>
        <h2 className="mt-2">🕙 {place?.timeTravel}</h2>
      </div>
    </div>
        </Link>
  );
};

export default PlaceCardItem;
