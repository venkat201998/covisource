import React from 'react';

const Input = ({ config, onChange }) => {
    
    const handleChange = (e, id, value) => {
        onChange(e,id,value);
    }

    let inputElement;

    switch(config.elementType){
        case 'input': inputElement = 
            <div className="form-group my-xl-5 my-3 row">
                <label htmlFor={config.elementConfig.id} className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">{config.elementConfig.placeholder}</label>
                <div className="col-md-8 col-12 mb-3 mb-md-1">
                    <input 
                        {...config.elementConfig}
                        className="form-control"  
                        value={config.value}
                        onChange={(e) => handleChange(e, e.target.id, e.target.value)}
                    />
                </div>
            </div>
            break;
        case 'select': inputElement = 
            <div className="form-group my-xl-5 my-3 row">
                <label htmlFor={config.elementConfig.id} className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">{config.elementConfig.placeholder}</label>
                <div className="col-md-8 col-12 mb-3 mb-md-1">
                    <select className="h-100 form-select" id={config.elementConfig.id} aria-label="Default select example" value={config.value} required onChange={(e) => handleChange(e, e.target.id, e.target.value)}>
                        {config.elementConfig.options && config.elementConfig.options.map((option) => <option key={option.id} value={option.value}>{option.displayValue}</option>)}
                    </select>
                </div>
            </div>
            break;
        case 'partition': inputElement = 
            <div className="row border-top border-3 pt-3 fs-4" >
                <div className="col text-center">
                    <h4 style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</h4>
                </div>
            </div>
        
    }

    return(
        <div>
            { inputElement }
        </div>
    )
}

export default Input;