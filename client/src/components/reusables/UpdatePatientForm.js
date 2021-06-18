import React, { Component } from 'react';
import FormInput from '../reusables/FormInput';
import HospitalStates from '../../pages/hospital/Json/HospitalStates.json';
import HospitalCities from '../../pages/hospital/Json/HospitalCities.json';
import Div from './Div';
import Button from './Button'; 

class UpdatePatientForm extends Component {
    constructor(props){
        super(props);
        
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
                            required: true,
                            disabled: this.props.data.disabled
                        },
                        value: this.props.data.firstName
                        
                    },

                lastName: {
                        elementType: 'input',
                        elementConfig: {
                            id: 'lastName',
                            type: 'text',
                            placeholder: 'Last Name',
                            required: true,
                            disabled: this.props.data.disabled
                        },
                        value: this.props.data.lastName
                },
                dob: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'dob',
                        type: 'date',
                        placeholder: 'Birth Date',
                        required: true,
                        disabled: this.props.data.disabled
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
                        ],
                        disabled: this.props.data.disabled
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
                        disabled: this.props.data.disabled,
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
                address: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'address',
                        type: 'text',
                        placeholder: 'Address',
                        required: true,
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.address
                },
                state: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'state',
                        placeholder: 'State',
                        options,
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.state
                },
                city: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'city',
                        placeholder: 'City',
                        options: [{ value: '', displayValue: 'Select City', id: -1}],
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.city
                },
                pinCode: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'pinCode',
                        type: 'text',
                        placeholder: 'Pincode',
                        pattern: '[0-9]{6}',
                        required: true,
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.pinCode
                },
                maritalStatus: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'maritalStatus',
                        placeholder: 'Marital Status',
                        options: [
                            { value: '', displayValue: 'Select Status', id: -1},
                            { value: 'Single', displayValue: 'Single', id: 0},
                            { value: 'Married', displayValue: 'Married', id: 1},
                            { value: 'Divorced', displayValue: 'Divorced', id: 2},
                            { value: 'Legally separated', displayValue: 'Legally separated', id: 3},
                            { value: 'Widowed', displayValue: 'Widowed', id: 4}
                        ],
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.maritalStatus
                },
                emergencyPartition: {
                    elementType: 'partition',
                    id: 'emergencyPartition',
                    title: 'Emergency Details'
                },
                eFirstName: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'eFirstName',
                        type: 'text',
                        placeholder: 'First Name',
                        required: true
                    },
                    value: this.props.data.eFirstName
                },

                eLastName: {
                        elementType: 'input',
                        elementConfig: {
                            id: 'eLastName',
                            type: 'text',
                            placeholder: 'Last Name',
                            required: true
                        },
                        value: this.props.data.eLastName
                },
                
                relationship: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'relationship',
                        type: 'text',
                        placeholder: 'Relationship',
                        required: true
                    },
                    value: this.props.data.relationship
                },
                eContact: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'eContact',
                        type: 'text',
                        placeholder: 'Contact',
                        required: true,
                        pattern: '[0-9]{10}'
                    },
                    value: this.props.data.eContact
                },
                patientStatusPartition: {
                    elementType: 'partition',
                    id: 'patientStatusPartition',
                    title: 'Patient Status'
                },
                
                bedType: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'bedType',
                        placeholder: 'Bed Type',
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.bedType
                },
                patientStatus: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'patientStatus',
                        placeholder: 'Update Status',
                        options: this.props.data.patientStatus==='Admitted' ?[
                                { value: '', displayValue: 'Select Status', id: -1},
                                { value: 'Discharged', displayValue: 'Discharged', id: 0}, 
                                { value: 'Deceased', displayValue: 'Deceased', id: 1}
                            ] : [
                                { value: '', displayValue: 'Select Status', id: -1},
                                { value: 'Admitted', displayValue: 'Admit', id: 2}
                            ]
                    },
                    value: this.props.data.status
                },
                comments: {
                    elementType: 'textarea',
                    elementConfig: {
                        id: 'comments',
                        placeholder: 'Message',
                        required: true
                    },
                    value: this.props.data.comments
                }
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
        
        switch(id){            
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
            case 'maritalStatus': {
                this.setState({form: {
                    ...this.state.form,
                    maritalStatus:{
                        ...this.state.form.maritalStatus,
                        value: value
                    } }});
            };
            break;
            case 'eFirstName': {
                this.setState({form: {
                    ...this.state.form,
                    eFirstName:{
                        ...this.state.form.eFirstName,
                        value: value
                    } }});
            };
            break;
            case 'eLastName': {
                this.setState({form: {
                    ...this.state.form,
                    eLastName:{
                        ...this.state.form.eLastName,
                        value: value
                    } }});
            };
            break;
            case 'relationship': {
                this.setState({form: {
                    ...this.state.form,
                    relationship:{
                        ...this.state.form.relationship,
                        value: value
                    } }});
            };
            break;
            case 'eContact': {
                this.setState({form: {
                    ...this.state.form,
                    eContact:{
                        ...this.state.form.eContact,
                        value: value
                    } }});
            };
            break;
            case 'bedType': {
                this.setState({form: {
                    ...this.state.form,
                    bedType:{
                        ...this.state.form.bedType,
                        value: value
                    }
                }})
            };
            break;
            case 'patientStatus': {
                this.setState({form: {
                    ...this.state.form,
                    patientStatus:{
                        ...this.state.form.patientStatus,
                        value: value
                    } }});
            };
            break;
            case 'comments': {
                this.setState({form: {
                    ...this.state.form,
                    comments:{
                        ...this.state.form.comments,
                        value: value
                    } }});
            };
            break;
        
        }
    }


    render(){

        const formElements = [];
        for(let key in this.state.form){
            formElements.push({
                id:key,
                config: this.state.form[key]
            })
        }

        return(
            <>
                <form className='container-fluid' onSubmit={this.props.handleSubmit} onReset={this.props.handleReset}>
                    {formElements && formElements.map((formElement) => <FormInput key={formElement.id} config={formElement.config} onChange={(e, id, value) => this.handleChange(e, id, value)} />)}
                    <Div>
                        {this.props.buttons.map((button) => <Button key={button.type} type={button.type} className={button.className} name={button.name}/>)}
                    </Div>
                </form>
            </> 
        )
    }
}

export default UpdatePatientForm;