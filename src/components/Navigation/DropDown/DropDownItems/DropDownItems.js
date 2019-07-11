import React from 'react';
import { NavLink } from 'react-router-dom';

import './DropDownItems.css';

const dropDownItems = (props) => (
    <ul className='DropDownItems'>
        <li onClick={props.clicked}>
            <NavLink 
                to={{pathname: props.link}}
                exact={props.exact}>{props.children}
            </NavLink></li>
    </ul>
);

export default dropDownItems;