import React from "react";
import facebookLogo from '../../assets/images/Footer/facebook-logo.png'
import githubLogo from '../../assets/images/Footer/github-logo.png'
import emailIcon from '../../assets/images/Footer/email-icon.png'
import '../../assets/styles/Footer.scss'
export default function Footer(){
    return(
        <footer className='footer--container'>
           <a href="https://www.facebook.com/profile.php?id=100007642659276" target="_blank">
               <img src={facebookLogo} alt='Link to my Facebook'></img>           
           </a>
           <a href="https://github.com/DZhivkovv" target="_blank">
                <img src={githubLogo} alt='Link to my Github'></img>           
            </a>
           <a href = "mailto: dobromirzhivkovv@gmail.com">
                <img src={emailIcon} alt='Send me an Email'></img>
            </a>
        </footer>
    )
}