import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Auth.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/auth';

class Auth extends Component {
    state = {
        authForm: {
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
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
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
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    inputChangedHandler = (event, elName) => {
        const updatedForm = {
            ...this.state.authForm,
            [elName]: {
                ...this.state.authForm[elName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[elName].validation),
                touched: true
            }
        };
        this.setState({authForm: updatedForm});
        
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
    
    singinHandler = ( event ) => {
        event.preventDefault();
        if(this.state.formIsValid){
            this.props.onTryLogin(this.state.authForm.username.value, this.state.authForm.password.value);
            this.props.history.push('/');
        }
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
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
                <h4>Sign Up</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);