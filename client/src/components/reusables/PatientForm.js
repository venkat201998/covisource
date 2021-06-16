import React, { Component } from 'react';
import FormInput from '../reusables/FormInput';

class PatientForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            form: {
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
                    value: ''
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
                    value: ''
                },
                healthIssues: {
                    elementType: 'checkbox',
                    elementConfig: {
                        list: [ "Anemia", "Asthma", "Arthritis", "Cancer", "Diabetes", "Epilepsy Seizures", "Gallstones", "Heart Disease", "Heart Attack", "Rheumatic Fever", "Blood Pressure", "Digestive Problems", "Ulcerative Colitis", "Ulcer Disease","Hepatitis", "Kidney Disease", "Liver Disease", "Sleep Apnea", "Thyroid Problems", "Tuberculosis", "Venereal Disease", "Emphysema", "Bleeding Disorders", "Lung Disease"],
                        inputChecked: false,
                        id: 'healthIssues',
                        labelTitle: 'Have you ever had (Please check all that applied...)',
                    },
                    value: ''
                },
                covidSymptoms: {
                    elementType: 'checkbox',
                    elementConfig: {
                        list: [ "High Fever", "Cough", "Difficulty in breathing", "Pain or pressure in chest", "Body aches", "Nasal congestion", "Runny nose", "Sore throat", "Diarrhea", "Other"],
                        inputChecked: false,
                        id: 'covidSymptoms',
                        labelTitle: 'Please check the symptoms that apply...',
                    },
                    value: ''
                }
            }
        }
    }

    handleChange = (e, id, value) => {
        this.props.onChange(e, id, value);
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