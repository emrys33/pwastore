import React, { Component, Fragment } from 'react';
import axios from '../../axios-order';

import './AppDescription.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class AppDescription extends Component {
    state = {
        appInfo: null,
        appPk: null,
        loading: true,
    }

    componentWillMount () {
        const incomQuery = new URLSearchParams(this.props.location.search);
        const param = incomQuery.get('appId');
        this.setState({appPk: param});
    }

    componentDidMount () {
        axios.get('apps/' + this.state.appPk)
            .then(res => {
                this.setState({appInfo: res.data, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render () {
        let appDes = <Spinner />;
        if (!this.state.loading) {
            appDes = 
                <Fragment>
                    <div className='AppDescription'>
                        <img 
                            src={require('../../asset/images/icon-'+this.state.appInfo.app_name+'.png')}
                            alt="App's Icon"/>
                        <div>
                            <h4>{this.state.appInfo.app_name}</h4>
                        </div>
                        <button className="btn btn-primary IntsallButton" type={"submit"}>Install</button>
                    </div>
                    <hr/>
                    <div className='Overview'>
                        <h4>Overview</h4>
                        <p>{this.state.appInfo.app_description}</p>
                    </div>
                </Fragment>
        };
        return (
            <Fragment>
                {appDes}
            </Fragment>
        );
    };
}


export default ( AppDescription );