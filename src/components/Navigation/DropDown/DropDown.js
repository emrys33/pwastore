import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './DropDown.css';
import DropDownItems from './DropDownItems/DropDownItems';
import * as actions from '../../../store/actions/auth';

const dropDown = (props) => {
    const classes = ["DropDown"];
    if (props.open) {
        classes.push("Open")
    } else {
        classes.push("Close")
    }
    return (
        <Fragment>
            <div className={classes.join(' ')}>
                <nav>
                    {props.isAuthenticated ? 
                        <Fragment>
                            <DropDownItems link='/myprofile'>My Profile</DropDownItems>
                            <DropDownItems link='/' clicked={props.onLogout}>Log Out</DropDownItems>
                        </Fragment>
                        :
                        <Fragment>
                            <DropDownItems link='/signin'>Sign In</DropDownItems>    
                            <DropDownItems link='/signup'>Sign Up</DropDownItems>
                        </Fragment>
                    }
                </nav>
            </div>
        </Fragment>
    );    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(dropDown);