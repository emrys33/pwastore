import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import HomeApps from './containers/HomeApps/HomeApps';
import AppDescription from './containers/AppDescription/AppDescription';
import SignIn from './containers/Auth/Signin/Signin';
import Signup from './containers/Auth/Signup/Signup';
import SearchResualt from './containers/SearchResualt/SearchResualt';
import MyProfile from './containers/MyProfile/MyProfile';
import About from './components/About/About';

class App extends Component {

  searchHandler = (srcWord) => {
    this.props.history.replace({
      pathname: '/searchresualt',
      search: '?searchedparams=' + srcWord
    });
  }

  render () {
    return (
      <Layout searched={this.searchHandler}>
        <Switch>
          <Route path='/about' component={About}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/myprofile' component={MyProfile}/>
          <Route path='/application' component={AppDescription}/>
          <Route path='/searchresualt' component={SearchResualt}/>
          <Route path='/' component={HomeApps}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
