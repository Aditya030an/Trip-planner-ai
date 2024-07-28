import React from 'react'

const Footer = () => {
    const userName = JSON.parse(localStorage.getItem("user")).name;
  return (
    <div className='my-7 '>
        <h2 className='text-center  text-gray-400'>Created by {userName} AI Travel Planner App</h2>
    </div>
  )
}

export default Footer