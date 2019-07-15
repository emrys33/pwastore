import React, { Component } from 'react';
import axios from '../../axios-order';

import './SearchResualt.css';
import AppBlock from '../../components/AppsRow/AppBlock/AppBlock';
import Spinner from '../../components/UI/Spinner/Spinner';

class SearchResualt extends Component {

    state = {
        searchedList: null,
        searchedParams: null,
        loading: true
    }

    componentWillMount () {
        const incomQuery = new URLSearchParams(this.props.location.search);
        const param = incomQuery.get('searchedparams');
        this.setState({searchedParams: param});
    }

    componentDidMount () {
        axios.get('apps/?app_name=' + this.state.searchedParams)
            .then(res => {
                this.setState({searchedList:res.data, loading: false});
        })
    }

    appClickedHandler = (appPk) => {
        this.props.history.push({
            pathname: '/application',
            search: '?appId=' + appPk
        });
    }

    render() {
        let srchList = <Spinner />;
        if (!this.state.loading) {
            srchList = this.state.searchedList.map(param => (
                <AppBlock key={param.pk} clicked={() => this.appClickedHandler(param.pk)}>
                    <img src={require('../../asset/images/icon-'+param.app_name+'.png')} alt="App's Icon" style={{width:'200px'}}/>
                    <p>{param.app_name}</p>
                </AppBlock>));
        }
        return (
            <div className='SearchResualt'>
                {srchList}
            </div>
        )
    }
}

export default SearchResualt;