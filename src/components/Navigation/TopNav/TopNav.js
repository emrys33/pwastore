import React from 'react';

import './TopNav.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DropToggle from './DropToggle/DropToggle';
import Search from './Search/Search';

const topNav = (props) => (
    <header className="TopNav">
        <nav>
            <NavigationItems />
        </nav>
        <Search searched={props.searched}/>
        <DropToggle clicked={props.dropToggleClicked}/>
    </header>
);

export default topNav;