import React, { Component, Fragment } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import './HomeApps.css';
import AppsRow from '../../components/AppsRow/AppsRow';
import * as actionTypes from '../../store/actions/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class HomeApps extends Component {
    constructor (props) {
        super(props);
        this.state = {
            err: '',
            loading: true,
        }
    }

    componentDidMount () {
        axios.get('apps/')
            .then( res => {
                this.props.onAppsSet('newApps', res.data)
                this.setState({loading: false})
            })
            .catch( err => {
                console.log(err)
                this.setState({loading: false, err: 'Network Error!'})
            });
    }


    appClickedHandler = (appPk) => {
        this.props.history.push({
            pathname: '/application',
            search: '?appId=' + appPk
        });
    }

    render () {
        let appsRow = <Spinner />;
        if (!this.state.loading) {
            appsRow = 
                <Fragment>
                    <h4>{this.state.err}</h4>
                    <h4 style={{fontSize: "1.6rem", color:'#335'}}>New Apps</h4>
                    <AppsRow
                        appsCat = 'newApps'
                        clicked={this.appClickedHandler}/>
                </Fragment>
        }
        return (
            <div className="HomeApps">
                {appsRow}
            </div>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAppsSet: (appsCat, apps) => dispatch({type:actionTypes.SET_APPS, appsCat:appsCat, apps: apps}),
    };
};

export default connect( null, mapDispatchToProps )( HomeApps );
