import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

import './attributions.scss'

export default function Attributions(){
    return(
        <div className="attributions-container">
            <Navbar
                paths={['Home', 'Library']} //Each element in this prop represents a link in the navbar for this particular page.
            ></Navbar>
            <h1>Attributions</h1>
                <a href="https://pngtree.com/freepng/hand-drawn-girl-reading-book-elements_4050570.html?sol=downref&id=bef" target="_blank">   
                Reading clipart PNG Designed By 千图网</a> <br/>

                <a href="https://www.flaticon.com/free-icons/education" title="education icons" target="_blank">Education icons created by Freepik - Flaticon</a><br/>
                
                <p>
                    Photo by <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Annie Spratt</a> on <a href="https://unsplash.com/photos/gl7joOaABlI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
                </p>

                <p>
                    Photo by <a href="https://unsplash.com/@trnavskauni?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Trnava University</a> on <a href="https://unsplash.com/photos/BEEyeib-am8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
                </p>

                <div className="attribution-social-media-icons">
                    <a href="https://www.flaticon.com/free-icons/facebook" title="facebook icons" target="_blank">Facebook icons created by Freepik - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/github" title="github icons" target="_blank">Github icons created by Dave Gandy - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons" target="_blank">Linkedin icons created by riajulislam - Flaticon</a>            
                </div>

            <Footer/>
        </div>
    )
}