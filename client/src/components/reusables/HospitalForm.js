import { React, Component } from "react";
import FormInput from './FormInput';
import HospitalStates from '../../pages/hospital/Json/HospitalStates.json';
import HospitalCities from '../../pages/hospital/Json/HospitalCities.json';
import Div from "./Div";
import Button from "./Button";
import { withRouter } from 'react-router-dom'

class HospitalForm extends Component{
    constructor(props){
        super(props);

        let options= [{ value: '', displayValue: 'Select State', id: -1}];
        HospitalStates.map((state, i)=> options.push({ value: state, displayValue: state, id: i}));
        
        this.state = {

            form: {
                hospitalName: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'hospitalName',
                        type: 'text',
                        placeholder: 'Hospital Name',
                        required: true,
                    },
                    value: this.props.data.hospitalName
                    
                },
                address: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'address',
                        type: 'text',
                        placeholder: 'Address',
                        required: true,
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
                hospitalContact: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'hospitalContact',
                        type: 'text',
                        placeholder: 'Contact',
                        required: true,
                    },
                    value: this.props.data.contact
                },
                hospitalEmail: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'hospitalEmail',
                        type: 'text',
                        placeholder: 'Email',
                        required: true,
                        disabled: this.props.data.disabled
                    },
                    value: this.props.data.email
                },
                partition: {
                    elementType: 'partition',
                    title: 'Resources (Beds)'
                },
                generalBeds: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'generalBeds',
                        type: 'text',
                        placeholder: 'General Beds',
                        required: true,
                    },
                    value: this.props.data.generalBeds
                },
                icuBeds: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'icuBeds',
                        type: 'text',
                        placeholder: 'ICU Beds',
                        required: true,
                    },
                    value: this.props.data.icuBeds
                },
                ventilatorBeds: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'ventilatorBeds',
                        type: 'text',
                        placeholder: 'Ventilator Beds',
                        required: true,
                    },
                    value: this.props.data.ventilatorBeds
                },
                oxygenBeds: {
                    elementType: 'input',
                    elementConfig: {
                        id: 'oxygenBeds',
                        type: 'text',
                        placeholder: 'Oxygen Beds',
                        required: true,
                    },
                    value: this.props.data.oxygenBeds
                }


            },
            
            
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
        this.props.handleReset(e);
        this.setState({form: {
            ...this.state.form,
            hospitalName:{
                ...this.state.form.hospitalName,
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
            hospitalContact:{
                ...this.state.form.hospitalContact,
                value: ""
            },
            hospitalEmail:{
                ...this.state.form.hospitalEmail,
                value: ""
            },
            generalBeds:{
                ...this.state.form.generalBeds,
                value: ""
            },
            icuBeds:{
                ...this.state.form.icuBeds,
                value: ""
            },
            ventilatorBeds:{
                ...this.state.form.ventilatorBeds,
                value: ""
            },
            oxygenBeds:{
                ...this.state.form.oxygenBeds,
                value: ""
            }
        }})
    }


    handleChange = (e, id, value) => {
        
        this.props.onChange(e, id, value);
        switch(id){
            case 'hospitalName':{
                this.setState({form: {
                    ...this.state.form,
                    hospitalName:{
                        ...this.state.form.hospitalName,
                        value: value
                    } }});
            }; break;
            case 'address':{
                this.setState({form: {
                    ...this.state.form,
                    address:{
                        ...this.state.form.address,
                        value: value
                    } }});
            }; break;
            case "state": {
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
            }; break;
            case "city": {
                this.setState({form: {
                    ...this.state.form,
                    city:{
                        ...this.state.form.city,
                        value: value
                    } }});
            }break;
            case 'pinCode':{
                this.setState({form: {
                    ...this.state.form,
                    pinCode:{
                        ...this.state.form.pinCode,
                        value: value
                    } }});
            }; break;
            case 'hospitalContact':{
                this.setState({form: {
                    ...this.state.form,
                    hospitalContact:{
                        ...this.state.form.hospitalContact,
                        value: value
                    } }});
            }; break;
            case 'hospitalEmail':{
                this.setState({form: {
                    ...this.state.form,
                    hospitalEmail:{
                        ...this.state.form.hospitalEmail,
                        value: value
                    } }});
            }; break;
            case 'generalBeds':{
                this.setState({form: {
                    ...this.state.form,
                    generalBeds:{
                        ...this.state.form.generalBeds,
                        value: value
                    } }});
            }; break;
            case 'icuBeds':{
                this.setState({form: {
                    ...this.state.form,
                    icuBeds:{
                        ...this.state.form.icuBeds,
                        value: value
                    } }});
            }; break;
            case 'ventilatorBeds':{
                this.setState({form: {
                    ...this.state.form,
                    ventilatorBeds:{
                        ...this.state.form.ventilatorBeds,
                        value: value
                    } }});
            }; break;
            case 'oxygenBeds':{
                this.setState({form: {
                    ...this.state.form,
                    oxygenBeds:{
                        ...this.state.form.oxygenBeds,
                        value: value
                    } }});
            }; break;
        }
        

        
    }

    
    render(){

        const formElements = [];
        for(let key in this.state.form){
            formElements.push({
                id: key,
                config: this.state.form[key], 
            })
        }
        
        return(
            <>
                <form className="container-fluid" onSubmit={this.props.handleSubmit} onReset={(e) => this.handleReset(e)}>
                    {formElements && formElements.map((formElement) => <FormInput key={formElement.id} config={formElement.config} onChange={(e, id, value) => this.handleChange(e, id, value)} />)}
                    <Div>
                        {this.props.buttons.map((button) => <Button key={button.type} type={button.type} className={button.className} name={button.name}/>)}
                    </Div>
                </form>
            </> 
        )
    }
}

export default withRouter(HospitalForm);