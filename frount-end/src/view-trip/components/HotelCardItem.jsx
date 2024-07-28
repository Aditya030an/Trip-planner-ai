import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ item }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  console.log("hotel cart Item hotel name", item?.hotelName);
  useEffect(() => {
    const fetchPhotoUrl = async () => {
      const endPoint = "https://api.unsplash.com/search/photos";
      const client_id = "Y0ZKzcR-Ki0DOtI7allUzcjzJX2g3QRt6_vEhElVje4";
      try {
        let query = item?.hotelName || "";
        if (query.includes("at")) {
          query = query.split("at").pop().trim();
        }
        query = query.replace(/\s+/g, "+");
        const response = await axios.get(endPoint, {
          params: {
            page: 1,
            query: query,
            client_id: client_id,
          },
        });
        if (response.data.results.length > 0) {
          console.log("hotel responce url", response.data.results);
          setPhotoUrl(response.data.results[0].urls.regular);
        } else {
          console.log("hotel responce url", response.data.result);
          setPhotoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s");
        }
      } catch (error) {
        console.log("Error Fetching photo:", error);
        setPhotoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s");
      }
    };
    if (item?.hotelName) {
      fetchPhotoUrl();
    }
  }, [item?.hotelName]);
  console.log("hotel name", photoUrl);
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        item?.hotelName +
        "," +
        item?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={
            photoUrl
              ? photoUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpwJHiXNZtY_eBRu7RGl78Vv5nE4aFHatg&s"
          }
          alt={item?.hotelName}
          className="rounded-xl h-[180px] w-full object-cover "
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium ">{item?.hotelName}</h2>
          <h2 className="text-xl text-gray-500 ">📍 {item?.hotelAddress}</h2>
          <h2 className="text-sm ">💰 {item?.price}</h2>
          <h2 className="text-sm ">⭐ {item?.rating}</h2>
        </div>
        <div>
          <Link to={item?.hotelImageUrl}>Hotel Link</Link>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
