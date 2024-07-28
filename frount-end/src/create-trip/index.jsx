import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { db } from "@/service/fireBaseConfig";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setDoc, doc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [formData, setFromData] = useState([]);
  const [dilogBox, setDilogBox] = useState(false);
  const VITE_GOOGLE_PLACE_API_KEY = "AIzaSyDYyJu7aMHujHj0fZbGPK7k5z573C3ilmA";

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    if (
      formData?.noOfDays > 5 ||
      formData?.noOfDays <= 0 ||
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      if (
        !formData?.noOfDays ||
        !formData?.location ||
        !formData?.budget ||
        !formData?.traveler
      ) {
        toast("Please enter the detail");
      }

      if (formData?.noOfDays > 5 || formData?.noOfDays <= 0) {
        toast("Pleas enter the trip date between 1 to 5");
      }
      if (formData?.noOfDays < 1) {
        handleInputChange("noOfDays", "1");
        setDate("1");
      }
      if (formData?.noOfDays > 5) {
        handleInputChange("noOfDays", "5");
        setDate("5");
      }
      return;
    }
    console.log(formData);
    setLoading(true);
    setDilogBox(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    // console.log("final prompt" , FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(
      "result after chatsession",
      JSON.parse(result?.response?.text())
    );
    setLoading(false);
    setDilogBox(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    setDilogBox(true);
    const docID = await Date.now().toString();
    const hotelOption = JSON.parse(TripData).hotelOptions;
    const days = JSON.parse(TripData).itinerary;
    const userEmail = JSON.parse(localStorage.getItem("user")).email;
    console.log("email", userEmail);
    console.log("docID", docID);
    console.log("hotelOption", hotelOption);
    console.log("days", days);

    let result = await fetch("https://trip-planner-ai-back-end.vercel.app//tripdata", {
      method: "post",
      body: JSON.stringify({ docID, hotelOption, days, userEmail, formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log("result", result);
    if (result) {
      navigate(`/view-trip/${docID}`);
    }
    setLoading(false);
    setDilogBox(false);
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 m-2">
      <h2 className=" font-bold text-3xl">
        Tell us your travvel perferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, nd our trip planner generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          /> */}
          <Input
            type={"text"}
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputChange("location", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            value={date}
            maxvalue={5}
            minvalue={1}
            onChange={(e) => {
              setDate(e.target.value),
                handleInputChange("noOfDays", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Yore Budget?
            <br />
            The budget is exclusively allocated for activities and dining
            purposes.
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                    formData?.budget == item.tittle && "shadow-md border-black"
                  }`}
                  onClick={(e) => handleInputChange("budget", item.tittle)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.tittle}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on you next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                    formData?.traveler == item.people &&
                    "shadow-md border-black"
                  }`}
                  onClick={(e) => handleInputChange("traveler", item.people)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.tittle}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin w-7 h-7" />
          ) : (
            "Generate trip"
          )}
        </Button>
      </div>
      <Dialog open={dilogBox}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo"  className="my-2 mb-7"/>
              <p className="font-medium text-2xl">
                A wonderful trip for {formData?.traveler} to{" "}
                {formData?.location} for {formData?.noOfDays} days with a{" "}
                {formData?.budget} of moderate. Enjoy sightseeing, local
                cuisine, and comfortable accommodations!`
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
