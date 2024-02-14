
import React from 'react'
import Nav from '../component/Nav'
import { Link } from 'react-router-dom'


function HomePage() {
  return (
    
    <>
    <Nav />
    
    <h2>Pharmacy & Laboratory Inventory Management <br /> System</h2>
   <div className='inventInfo'>
    <p className='text'>This is an Inventory management system for medical professionals.</p>
   <Link className='link'><button className='btn'>More</button></Link> 

   </div>

   <div>

   </div>


   <style jsx='true'>
    
    {`
      
      body{
        background: linear-gradient(to right, #21549E,#107383,#46AB6A);

      }

      h2 {
        font-size: 2rem;
        color: whitesmoke;
        line-height:1.3;
        width:40%;
        padding: 2rem
      }

      .inventInfo {
        padding:0 2rem
      }

      .text{
        font-size: 1.2rem;
        color: whitesmoke;
        width:40%;
        align-text: justify;
        line-heigth: 1;
        opacity:0.7
      }

      .btn {
        padding: 0.5rem 1.7rem;
        border-radius: 1.5rem;
        border:none;
        font-size: 1rem;
        cursor:pointer;
        transition: all 200ms ease-in-out;
        opacity:0.8;
      }

      .btn:hover {
        background-color: whitesmoke;
      }
      
      .link button {
        margin: 1rem !important
      }

     
      
    `}

   </style>
    </>
  )
}

export default HomePage