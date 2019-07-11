import React from 'react';
import { connect } from 'react-redux';

import './AppsRow.css';
import AppBlock from './AppBlock/AppBlock';

const appRows = (props) => {
    return (
        <div className="AppsRow" id="style-1">
            {props.mainApps[props.appsCat].map(appInfo => {
                return (
                    <AppBlock 
                        clicked={() => props.clicked(appInfo.pk)}
                        key = {appInfo.pk}>
                            <img src={require('../../asset/images/icon-'+appInfo.app_name+'.png')} alt="App's Icon" style={{width:'200px'}}/>
                            <p>{appInfo.app_name}</p>
                    </AppBlock>
                )
            })}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mainApps: state.mainInfo.mainApps
    };
};

export default connect( mapStateToProps )( appRows );