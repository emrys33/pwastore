import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Signup.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/auth';

class Signup extends Component {
    state = {
        signinForm: {
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
            password1: {
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
    singinHandler = ( event ) => {
        event.preventDefault();
        if (this.state.formIsValid) {
            this.props.onTrySingup(
                this.state.signinForm.username.value,
                this.state.signinForm.email.value,
                this.state.signinForm.password1.value,
                this.state.signinForm.password2.value
            );
            this.props.onTryLogin(
                this.state.signinForm.username.value,
                this.state.signinForm.password1.value
            );
            if (this.props.isAuthenticated) {
                this.props.history.push('/');
            }
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        };

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        };

        return isValid;
    }

    inputChangedHandler = (event, id) => {
        const updatedSigninForm = {
            ...this.state.signinForm
        };
        const updatedFormElement = {
            ...updatedSigninForm[id]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSigninForm[id] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifire in updatedSigninForm) {
            formIsValid = updatedSigninForm[inputIdentifire].valid && formIsValid;
        };
        if (!this.state.signinForm.password1.value === this.state.signinForm.password2.value) {
            formIsValid = false;
        }

        this.setState({signinForm: updatedSigninForm, formIsValid: formIsValid});
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.signinForm) {
            formElementArray.push({
                id: key,
                config: this.state.signinForm[key]
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
            <div className='Signup'>
                <h4>Sign Up</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTrySingup: (user, email, pass1, pass2) => dispatch(actions.authSignup(user, email, pass1, pass2)),
        onTryLogin: (user, pass) => dispatch(actions.authLogin(user, pass)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);