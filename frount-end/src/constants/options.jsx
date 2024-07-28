import { GiCash } from "react-icons/gi";
import { BsCash } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";

import { FaPlane } from "react-icons/fa";
import { FaGlassCheers } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { GiSailboat } from "react-icons/gi";
export const SelectTravelesList = [
    {
        id:1,
        tittle:'Just Me',
        desc:'A sole treveles in exploration',
        icon:<FaPlane/>,
        people:'1'
    },
    {
        id:2,
        tittle:'A Couple',
        desc:'Two Treveles in tandem',
        icon:<FaGlassCheers />,
        people:'2 People'
    },
    {
        id:3,
        tittle:'Family',
        desc:'A group of fun loving adv',
        icon:<MdHomeWork/>,
        people:'3 to 5 People'
    },
    {
        id:4,
        tittle:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:<GiSailboat/>,
        people:'5 to 10 People'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        tittle:'Cheap',
        desc:'Stay conscious of costs',
        icon:<BsCash/>,
    },
    {
        id:2,
        tittle:'Moderate',
        desc:'Keep cost on the average side',
        icon:<BsCashCoin/>,
    },
    {
        id:3,
        tittle:'Luxury',
        desc:'Dont worry about cost',
        icon:<GiCash/>,
    },

]

export const AI_PROMPT = 'Generate Trevel Plan for Location : {location} , for {totalDays} Days for {traveler} People with a {budget} budget , give me Hotels options list with HotelName , Hotel address , Price , hotel image url , geo coordinates , rating , descriptions and suggest itinerary with placeName , Place Details , Place Image Url , Geo coordinates, ticket Pricing , rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';