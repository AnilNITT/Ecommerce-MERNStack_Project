import React from 'react'
import "./HeaderOne.css";
import{Link} from "react-router-dom"
import logo from "../../../images/logo.png";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton } from "@material-ui/core";


const HeaderOne = () => {
    
    window.onload=function()
    {
        
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");

    let clone=links;

    links.forEach(link => {

        link.classList.toggle("fade");

        // link.addEventListener('click', ()=>{
        //     hamburger.classList.toggle("toggle");
        //     navLinks.classList.toggle("open");

        //     clone.forEach(l => {
        //         l.classList.toggle("fade");
        //     })
        // })

    });
    
    //Hamburger Animation
    hamburger.classList.toggle("toggle");

})
}

  return (
    <nav>
        <div className="logo">
            <Link to="/">
                <img src={logo} alt="LogoImage" />
            </Link>
        </div>
        <div className="hamburger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/cart"><ShoppingBasketIcon/></Link></li>
            <li><Link to="/login"><AccountCircleIcon/></Link></li>
            <li><Link to="/search"><SearchIcon/></Link></li>
        </ul>
    </nav>
  );
}

export default HeaderOne;
