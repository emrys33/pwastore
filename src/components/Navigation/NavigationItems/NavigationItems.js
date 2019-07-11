import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link='/' exact>Home</NavigationItem>
        <NavigationItem link='/about'>About</NavigationItem>
    </ul>
);

export default navigationItems;