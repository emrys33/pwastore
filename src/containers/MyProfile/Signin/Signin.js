import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Signin.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/auth';

class Signin extends Component {
    state = {
        singinForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }
    singinHandler = ( event ) => {
        event.preventDefault();
        if(this.state.formIsValid){
            this.props.onTryLogin(this.state.singinForm.username.value, this.state.singinForm.password.value);
            this.props.history.push('/');
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        };

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, id) => {
        const updatedSinginForm = {
            ...this.state.singinForm
        };
        const updatedFormElement = {
            ...updatedSinginForm[id]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSinginForm[id] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifire in updatedSinginForm) {
            formIsValid = updatedSinginForm[inputIdentifire].valid && formIsValid;
        };

        this.setState({singinForm: updatedSinginForm, formIsValid: formIsValid});
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.singinForm) {
            formElementArray.push({
                id: key,
                config: this.state.singinForm[key]
            });
        };

        let form = (
            <form onSubmit={this.singinHandler}>
                {formElementArray.map(formElement => (
                    <Input 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        key={formElement.id}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button className="btn btn-primary" type={"submit"} style={{marginTop: '15px'}}>Confirm</button>
            </form>
        );
        return (
            <div className='Signin'>
                <h4>Sign In</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        err: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryLogin: (user, pass) => dispatch(actions.authLogin(user, pass)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);