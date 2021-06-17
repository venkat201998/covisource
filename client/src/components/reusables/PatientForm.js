import React, { Component } from 'react';
import FormInput from '../reusables/FormInput';
import HospitalStates from '../../pages/hospital/Json/HospitalStates.json';
import HospitalCities from '../../pages/hospital/Json/HospitalCities.json';

class PatientForm extends Component {
    constructor(props){
        super(props);

        console.log(this.props);
        let options= [{ value: '', displayValue: 'Select State', id: -1}];
        HospitalStates.map((state, i)=> options.push({ value: state, displayValue: state, id: i}));

        this.state = {
            form: {
                // patientName: [
                //     {
                //         elementType: 'input',
                //         elementConfig: {
                //             id: 'patientName',
                //             type: 'text',
                //             placeholder: 'Patient Name',
                //             required: true
                //         },
                //         value: ''
                //     },
                //     {
                //         elementType: 'input',
                //         elementConfig: {
                //             id: 'patientName',
                //             type: 'text',
                //             placeholder: 'Patient Name',
                //             required: true
                //         },
                //         value: ''
                //     }
                // ],
                patientBirthDate: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'patientBirthDate',
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
                            { value: 'Male', displayValue: 'Male', id: 0},
                            { value: 'Female', displayValue: 'Female', id: 1},
                            { value: 'N/A', displayValue: 'N/A', id: 2}
                        ]
                    },
                    value: this.props.data.gender
                },
                contactNumber: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'contactNumber',
                        type: 'text',
                        placeholder: 'Contact Number',
                        required: true,
                        pattern: "[0-9]{10}"
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
                streetAddress: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'streetAddress',
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
                eContactNumber: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'eContactNumber',
                        type: 'text',
                        placeholder: 'Contact Number',
                        required: true,
                        pattern: "[0-9]{10}"
                    },
                    value: this.props.data.eContact
                },
                healthPartition: {
                    elementType: 'partition',
                    id: 'healthPartition',
                    title: "Health & Medical History"
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
                medication: {
                    elementType: 'radio',
                    elementConfig: {
                        radios: [
                            [ {id: 'medicationYes', className: 'col-md-1 col-2', name: 'medication', value: 'Yes'}, {htmlFor: 'medicationYes', className:'col-md-2 col-10'} ],
                            [ {id: 'medicationNo', className: 'col-md-1 col-2', name: 'medication', value: 'No'}, {htmlFor: 'medicationNo', className:'col-md-2 col-10'} ],
                        ],
                        id: 'medication',
                        labelTitle: 'Are you Currently taking any medication',
                        labelClassName: 'col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6',
                        parentDivClassName: 'col-md-8 col-12 mt-0 mt-xl-3 text-start'
                    },
                    value: this.props.data.medicationStatus
                },
                medicationTextArea: {
                    elementType: 'textarea',
                    elementConfig: {
                        id: 'medicationTextArea',
                        placeholder: 'If yes, please list it here...',
                        required: true
                    },
                    value: this.props.data.medicationList
                },
                allergies: {
                    elementType: 'radio',
                    elementConfig: {
                        radios: [
                            [ {id: 'allergiesYes', className: 'col-md-1 col-2', name: 'allergies', value: 'Yes'}, {htmlFor: 'allergiesYes', className:'col-md-2 col-10'} ],
                            [ {id: 'allergiesNo', className: 'col-md-1 col-2', name: 'allergies', value: 'No'}, {htmlFor: 'allergiesNo', className:'col-md-2 col-10'} ],
                            [ {id: 'allergiesNotSure', className: 'col-md-1 col-2', name: 'allergies', value: 'Not Sure'}, {htmlFor: 'allergiesNotSure', className:'col-md-3 col-10'} ]
                        ],
                        id: 'allergies',
                        labelTitle: 'Do you have any allergies',
                        labelClassName: 'col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6',
                        parentDivClassName: 'col-md-8 col-12 mt-0 mt-xl-3 text-start'
                    },
                    value: this.props.data.medicationAllergies
                },
                operationsTextArea: {
                    elementType: 'textarea',
                    elementConfig: {
                        id: 'operationsTextArea',
                        placeholder: 'Please list any operations and dates of each',
                        required: true
                    },
                    value: this.props.data.operationsList
                },
                
                healthIssues: {
                    elementType: 'checkbox',
                    elementConfig: {
                        list: [ "Anemia", "Asthma", "Arthritis", "Cancer", "Diabetes", "Epilepsy Seizures", "Gallstones", "Heart Disease", "Heart Attack", "Rheumatic Fever", "Blood Pressure", "Digestive Problems", "Ulcerative Colitis", "Ulcer Disease","Hepatitis", "Kidney Disease", "Liver Disease", "Sleep Apnea", "Thyroid Problems", "Tuberculosis", "Venereal Disease", "Emphysema", "Bleeding Disorders", "Lung Disease"],
                        inputChecked: false,
                        id: 'healthIssues',
                        labelTitle: 'Have you ever had (Please check all that applied...)',
                    },
                    value: this.props.data.healthIssuesChecked
                },
                covidPartition: {
                    elementType: 'partition',
                    id: 'covidPartition',
                    title: "Covid-19 Questionnaire"
                },
                covidSymptoms: {
                    elementType: 'checkbox',
                    elementConfig: {
                        list: [ "High Fever", "Cough", "Difficulty in breathing", "Pain or pressure in chest", "Body aches", "Nasal congestion", "Runny nose", "Sore throat", "Diarrhea", "Other"],
                        inputChecked: false,
                        id: 'covidSymptoms',
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
                },
            }
        }
    }

    componentDidMount(){
        HospitalCities.map((item)=>{
            if(item.state === this.props.data){
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
        if(id === "state"){
            HospitalCities.map((item)=>{
                if(item.state === value){
                    let cities = [{ value: '', displayValue: 'Select City', id: -1}];
                    item.cities.map((city, i)=> cities.push({ value: city, displayValue: city, id: i}));
                    this.setState({form: {
                        ...this.state.form,
                        city:{
                            ...this.state.form.city,
                            elementConfig: {
                                ...this.state.form.city.elementConfig,
                                options: cities
                            }
                        } }});
                }
            })
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
                <form className="container-fluid" onSubmit={this.props.handleSubmit} onReset={this.props.handleReset}>
                    {formElements && formElements.map((formElement) => <FormInput key={formElement.id} config={formElement.config} onChange={(e, id, value) => this.handleChange(e, id, value)} />)}
                </form>
            </> 
        )
    }
}

export default PatientForm;