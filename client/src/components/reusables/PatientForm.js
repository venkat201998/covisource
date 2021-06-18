import React, { Component } from 'react';
import FormInput from '../reusables/FormInput';
import HospitalStates from '../../pages/hospital/Json/HospitalStates.json';
import HospitalCities from '../../pages/hospital/Json/HospitalCities.json';
import Div from './Div';
import Button from './Button'; 

class PatientForm extends Component {
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
                        required: true
                    },
                    value: this.props.data.email
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
                        ]
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
                healthPartition: {
                    elementType: 'partition',
                    id: 'healthPartition',
                    title: 'Health & Medical History'
                },
                weight: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'weight',
                        type: 'text',
                        placeholder: 'Weight',
                        required: true
                    },
                    value: this.props.data.weight
                },
                height: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'height',
                        type: 'text',
                        placeholder: 'Height',
                        required: true
                    },
                    value: this.props.data.height
                },
                medicationStatus: {
                    elementType: 'radio',
                    elementConfig: {
                        radios: [
                            [ {id: 'medicationYes', className: 'col-md-1 col-2', name: 'medication', value: 'Yes'}, {htmlFor: 'medicationYes', className:'col-md-2 col-10'} ],
                            [ {id: 'medicationNo', className: 'col-md-1 col-2', name: 'medication', value: 'No'}, {htmlFor: 'medicationNo', className:'col-md-2 col-10'} ],
                        ],
                        id: 'medicationStatus',
                        labelTitle: 'Are you Currently taking any medication',
                        labelClassName: 'col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6',
                        parentDivClassName: 'col-md-8 col-12 mt-0 mt-xl-3 text-start'
                    },
                    value: this.props.data.medicationStatus
                },
                medicationList: {
                    elementType: 'textarea',
                    elementConfig: {
                        id: 'medicationList',
                        placeholder: 'If yes, please list it here...',
                        required: true
                    },
                    value: this.props.data.medicationList
                },
                medicationAllergies: {
                    elementType: 'radio',
                    elementConfig: {
                        radios: [
                            [ {id: 'allergiesYes', className: 'col-md-1 col-2', name: 'allergies', value: 'Yes'}, {htmlFor: 'allergiesYes', className:'col-md-2 col-10'} ],
                            [ {id: 'allergiesNo', className: 'col-md-1 col-2', name: 'allergies', value: 'No'}, {htmlFor: 'allergiesNo', className:'col-md-2 col-10'} ],
                            [ {id: 'allergiesNotSure', className: 'col-md-1 col-2', name: 'allergies', value: 'Not Sure'}, {htmlFor: 'allergiesNotSure', className:'col-md-3 col-10'} ]
                        ],
                        id: 'medicationAllergies',
                        labelTitle: 'Do you have any allergies',
                        labelClassName: 'col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6',
                        parentDivClassName: 'col-md-8 col-12 mt-0 mt-xl-3 text-start'
                    },
                    value: this.props.data.medicationAllergies
                },
                operationsList: {
                    elementType: 'textarea',
                    elementConfig: {
                        id: 'operationsList',
                        placeholder: 'Please list any operations and dates of each',
                        required: true
                    },
                    value: this.props.data.operationsList
                },
                
                healthIssuesChecked: {
                    elementType: 'checkbox',
                    elementConfig: {
                        list: [ 'Anemia', 'Asthma', 'Arthritis', 'Cancer', 'Diabetes', 'Epilepsy Seizures', 'Gallstones', 'Heart Disease', 'Heart Attack', 'Rheumatic Fever', 'Blood Pressure', 'Digestive Problems', 'Ulcerative Colitis', 'Ulcer Disease','Hepatitis', 'Kidney Disease', 'Liver Disease', 'Sleep Apnea', 'Thyroid Problems', 'Tuberculosis', 'Venereal Disease', 'Emphysema', 'Bleeding Disorders', 'Lung Disease'],
                        inputChecked: false,
                        id: 'healthIssuesChecked',
                        labelTitle: 'Have you ever had (Please check all that applied...)',
                    },
                    value: this.props.data.healthIssuesChecked
                },
                covidPartition: {
                    elementType: 'partition',
                    id: 'covidPartition',
                    title: 'Covid-19 Questionnaire'
                },
                covidSymptomsChecked: {
                    elementType: 'checkbox',
                    elementConfig: {
                        list: [ 'High Fever', 'Cough', 'Difficulty in breathing', 'Pain or pressure in chest', 'Body aches', 'Nasal congestion', 'Runny nose', 'Sore throat', 'Diarrhea', 'Other'],
                        inputChecked: false,
                        id: 'covidSymptomsChecked',
                        labelTitle: 'Please check the symptoms that apply...',
                    },
                    value: this.props.data.covidSymptomsChecked
                },
                bedType: {
                    elementType: 'select',
                    elementConfig: {
                        id: 'bedType',
                        placeholder: 'Available Beds',
                        options: [
                            { value: '', displayValue: 'Select Bed', id: -1},
                            this.props.data.generalBeds > 0 && { value: 'generalBeds', displayValue: 'General Beds: ' + this.props.data.generalBeds, id: 0},
                            this.props.data.icuBeds > 0 && { value: 'icuBeds', displayValue: 'ICU Beds: ' + this.props.data.icuBeds, id: 1},
                            this.props.data.ventilatorBeds > 0 && { value: 'ventilatorBeds', displayValue: 'Ventilator Beds: ' + this.props.data.ventilatorBeds, id: 2},
                            this.props.data.oxygenBeds > 0 && { value: 'oxygenBeds', displayValue: 'Oxygen Beds: ' + this.props.data.oxygenBeds, id: 3},
                        ]
                    },
                    value: this.props.data.bedType
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

    handleReset = (e) => {
        console.log("handle reset");
        this.props.handleReset(e);

        this.setState({form: {
            ...this.state.form,
            firstName:{
                ...this.state.form.firstName,
                value: ""
            },
            lastName:{
                ...this.state.form.lastName,
                value: ""
            },
            dob:{
                ...this.state.form.dob,
                value: ""
            },
            gender:{
                ...this.state.form.gender,
                value: ""
            },
            contact:{
                ...this.state.form.contact,
                value: ""
            },
            email:{
                ...this.state.form.email,
                value: ""
            },
            address:{
                ...this.state.form.address,
                value: ""
            },
            state:{
                ...this.state.form.state,
                value: ""
            },
            city:{
                ...this.state.form.city,
                elementConfig: {
                    ...this.state.form.city.elementConfig,
                    options: [{ value: '', displayValue: 'Select City', id: -1}]
                },
                value: ""
            },
            pinCode:{
                ...this.state.form.pinCode,
                value: ""
            },
            maritalStatus:{
                ...this.state.form.maritalStatus,
                value: ""
            } ,
            eFirstName:{
                ...this.state.form.eFirstName,
                value: ""
            },
            eLastName:{
                ...this.state.form.eLastName,
                value: ""
            },
            relationship:{
                ...this.state.form.relationship,
                value: ""
            },
            eContact:{
                ...this.state.form.eContact,
                value: ""
            },
            weight:{
                ...this.state.form.weight,
                value: ""
            },
            height:{
                ...this.state.form.height,
                value: ""
            },
            medicationStatus:{
                ...this.state.form.medicationStatus,
                value: ""
            },
            medicationList:{
                ...this.state.form.medicationList,
                value: ""
            },
            medicationAllergies:{
                ...this.state.form.medicationAllergies,
                value: ""
            },
            operationsList:{
                ...this.state.form.operationsList,
                value: ""
            },
            bedType:{
                ...this.state.form.bedType,
                value: ""
            }
        }})

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
            case 'weight': {
                this.setState({form: {
                    ...this.state.form,
                    weight:{
                        ...this.state.form.weight,
                        value: value
                    } }});
            };
            break;
            case 'height': {
                this.setState({form: {
                    ...this.state.form,
                    height:{
                        ...this.state.form.height,
                        value: value
                    } }});
            };
            break;
            case 'medicationStatus': {
                this.setState({form: {
                    ...this.state.form,
                    medicationStatus:{
                        ...this.state.form.medicationStatus,
                        value: value
                    } }});
            };
            break;
            case 'medicationList': {
                this.setState({form: {
                    ...this.state.form,
                    medicationList:{
                        ...this.state.form.medicationList,
                        value: value
                    } }});
            };
            break;
            case 'medicationAllergies': {
                this.setState({form: {
                    ...this.state.form,
                    medicationAllergies:{
                        ...this.state.form.medicationAllergies,
                        value: value
                    } }});
            };
            break;
            case 'operationsList': {
                this.setState({form: {
                    ...this.state.form,
                    operationsList:{
                        ...this.state.form.operationsList,
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
                <form className='container-fluid' onSubmit={this.props.handleSubmit} onReset={(e) => this.handleReset(e)}>
                    {formElements && formElements.map((formElement) => <FormInput key={formElement.id} config={formElement.config} onChange={(e, id, value) => this.handleChange(e, id, value)}/>)}
                    <Div>
                        {this.props.buttons.map((button) => <Button key={button.type} type={button.type} className={button.className} name={button.name}/>)}
                    </Div>
                </form>
            </> 
        )
    }
}

export default PatientForm;