import React, { Fragment } from 'react';

import './About.css';

const about = () => (
    <Fragment>
        <div className='About'>
            <h4>Progressive Web Apps</h4>
            <p>Progressive web applications 
                (PWAs) are a type of mobile app delivered through the web, 
                built using common web technologies including HTML, CSS and JavaScript. 
                They are intended to work on any platform that uses a standards-compliant browser. 
                Functionality includes working offline, push notifications, 
                and device hardware access, 
                enabling creating user experiences similar to native applications on mobile devices. 
                Since they are a type of webpage or website known as a web application, 
                there is no requirement for developers or users 
                to install the web apps via digital distribution systems like Apple App Store or Google Play.
            </p>
        </div>
        <footer style={{fontSize: '0.8rem', marginLeft: '20px'}}>Created by Parsa Azadeh</footer>
    </Fragment>
)

export default about;