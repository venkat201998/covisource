import React, { Component } from 'react';
import FormInput from '../reusables/FormInput';
import HospitalStates from '../../pages/hospital/Json/HospitalStates.json';
import HospitalCities from '../../pages/hospital/Json/HospitalCities.json';
import Div from './Div';
import Button from './Button';
import { withRouter } from 'react-router-dom';

class UserForm extends Component {
    constructor(props){
        super(props);
        console.log(this.props.match.path);

        let options= [{ value: '', displayValue: 'Select State', id: -1}];
        HospitalStates.map((state, i)=> options.push({ value: state, displayValue: state, id: i}));

        this.state = {
            form: {
                firstName: {
                        elementType: 'input',
                        elementConfig: {
                            id: 'firstName',
                            type: 'text',
                            placeholder: 'First Name',
                            required: true
                        },
                        value: this.props.data.firstName
                    },

                lastName: {
                        elementType: 'input',
                        elementConfig: {
                            id: 'lastName',
                            type: 'text',
                            placeholder: 'Last Name',
                            required: true
                        },
                        value: this.props.data.lastName
                },

                dob: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'dob',
                        type: 'date',
                        placeholder: 'Birth Date',
                        required: true
                    },
                    value: this.props.data.dob
                },
                gender: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'gender',
                        placeholder: 'Gender',
                        options: [
                            { value: '', displayValue: 'Select Gender', id: -1},
                            { value: 'male', displayValue: 'Male', id: 0},
                            { value: 'female', displayValue: 'Female', id: 1},
                            { value: 'N/A', displayValue: 'N/A', id: 2}
                        ]
                    },
                    value: this.props.data.gender
                },
                contact: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'contact',
                        type: 'text',
                        placeholder: 'Contact',
                        required: true,
                        pattern: '[0-9]{10}'
                    },
                    value: this.props.data.contact
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'email',
                        type: 'email',
                        placeholder: 'Email',
                        required: true,
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.email
                },
                type: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'type',
                        type: 'text',
                        placeholder: 'Type',
                        required: true,
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.type
                },
                address: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'address',
                        type: 'text',
                        placeholder: 'Address',
                        required: true
                    },
                    value: this.props.data.address
                },
                state: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'state',
                        placeholder: 'State',
                        options,
                    },
                    value: this.props.data.state
                },
                city: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'city',
                        placeholder: 'City',
                        options: [{ value: '', displayValue: 'Select City', id: -1}]
                    },
                    value: this.props.data.city
                },
                pinCode: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'pinCode',
                        type: 'text',
                        placeholder: 'Pincode',
                        required: true,
                        pattern: '[0-9]{6}'
                    },
                    value: this.props.data.pinCode
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    id: 'password',
                    type: 'password',
                    placeholder: 'Password',
                    required: true,
                },
                value: this.props.data.password
            }
        }
    }
    componentDidMount(){
        HospitalCities.map((item)=>{
            if(item.state === this.props.data.state){
                let cities = [];
                item.cities.map((city, i)=> cities.push({ value: city, displayValue: city, id: i}));
                
                this.setState({form: {
                        ...this.state.form,
                        city:{
                            ...this.state.form.city,
                            elementConfig: {
                                ...this.state.form.city.elementConfig,
                                options: cities
                            }
                        } 
                }});
            }
        })
    }

    handleChange = (e, id, value) => {
        this.props.onChange(e, id, value);
        console.log(id, value)
        switch(id){         
            case 'password': {
               this.setState({
                    ...this.state.password,
                    value: value
               })
            };
            break;   
            case 'firstName': {
                this.setState({form: {
                    ...this.state.form,
                    firstName:{
                        ...this.state.form.firstName,
                        value: value
                    } }});
            };
            break;
            case 'lastName': {
                this.setState({form: {
                    ...this.state.form,
                    lastName:{
                        ...this.state.form.lastName,
                        value: value
                    } }});
            };
            break;
            case 'dob': {
                this.setState({form: {
                    ...this.state.form,
                    dob:{
                        ...this.state.form.dob,
                        value: value
                    } }});
            };
            break;
            case 'gender': {
                this.setState({form: {
                    ...this.state.form,
                    gender:{
                        ...this.state.form.gender,
                        value: value
                    } }});
            };
            break;
            case 'contact': {
                this.setState({form: {
                    ...this.state.form,
                    contact:{
                        ...this.state.form.contact,
                        value: value
                    } }});
            };
            break;
            case 'email': {
                this.setState({form: {
                    ...this.state.form,
                    email:{
                        ...this.state.form.email,
                        value: value
                    } }});
            };
            break;
            case 'address': {
                this.setState({form: {
                    ...this.state.form,
                    address:{
                        ...this.state.form.address,
                        value: value
                    } }});
            };
            break;
            case 'state': {
                HospitalCities.map((item)=>{
                    if(item.state === value){
                        let cities = [{ value: '', displayValue: 'Select City', id: -1}];
                        item.cities.map((city, i)=> cities.push({ value: city, displayValue: city, id: i}));
                        this.setState({form: {
                            ...this.state.form,
                            state:{
                                ...this.state.form.state,
                                value: value
                            },
                            city:{
                                ...this.state.form.city,
                                elementConfig: {
                                    ...this.state.form.city.elementConfig,
                                    options: cities
                                },
                            } }});
                    }
                })
            };
            break;
            case 'city': {
                this.setState({form: {
                    ...this.state.form,
                    city:{
                        ...this.state.form.city,
                        value: value
                    } }});
            };
            break;
            case 'pinCode': {
                this.setState({form: {
                    ...this.state.form,
                    pinCode:{
                        ...this.state.form.pinCode,
                        value: value
                    } }});
            };
            break;
        }
        console.log(this.state);
    }
    render(){

        const formElements = [];
        for(let key in this.state.form){
            formElements.push({
                id:key,
                config: this.state.form[key]
            })
        }

        const formPassword = [];
        formPassword.push({
            id: 'password',
            config: this.state.password
        })
        
        return(
            <>
                <form className='container-fluid' onSubmit={this.props.handleSubmit} onReset={this.props.handleReset}>
                    {this.props.match.path==='/registerComplete' ? formPassword && formPassword.map((password) => <FormInput key={password.id} config={password.config} onChange={(e, id, value) => this.handleChange(e, id, value)} />) : null}
                    
                    {formElements && formElements.map((formElement) => <FormInput key={formElement.id} config={formElement.config} onChange={(e, id, value) => this.handleChange(e, id, value)} />)}
                    <Div>
                        {this.props.buttons.map((button) => <Button key={button.type} type={button.type} className={button.className} name={button.name}/>)}
                    </Div>
                </form>
            </> 
        )
    }
}

export default withRouter(UserForm);