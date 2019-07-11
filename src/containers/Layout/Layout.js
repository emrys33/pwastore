import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './Layout.css';
import TopNav from '../../components/Navigation/TopNav/TopNav';
import DropDown from '../../components/Navigation/DropDown/DropDown';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import * as actions from '../../store/actions/auth';

class Layout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showDropDown: false,
        };
    }

    componentDidMount () {
        this.props.onTryAutoSingin();
    }

    dropToggleHandler = () => {
        this.setState((prevState) => {
            return {showDropDown: !prevState.showDropDown}
        });
    }

    backdropClickedHandler = () => {
        this.setState({showDropDown: false});
    }

    render () {
        return (
            <Fragment>
                <TopNav dropToggleClicked={this.dropToggleHandler} searched={this.props.searched} />
                <Backdrop show={this.state.showDropDown} clicked={this.backdropClickedHandler}/>
                <DropDown open={this.state.showDropDown} Authenticated={this.props.isAuthenticated}/>
                <main className="Contents">{this.props.children}</main>
            </Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSingin: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);