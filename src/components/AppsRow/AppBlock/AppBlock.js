import React from 'react';

import './AppBlock.css';

const appRow = (props) => (
    <div className="AppBlock" onClick={props.clicked}>
        {props.children}
        {props.appName}</div>
);

export default appRow;