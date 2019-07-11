import React from 'react';
import './DropToggle.css';

const dropToggle = (props) => (
    <div className='DropToggle' onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default dropToggle;