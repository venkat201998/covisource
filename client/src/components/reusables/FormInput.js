import React from 'react';

const FormInput = ({ config, onChange }) => {
    
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
                    <select className="h-100 form-select" id={config.elementConfig.id} aria-label="Default select example" disabled={config.elementConfig.disabled} value={config.value} required onChange={(e) => handleChange(e, e.target.id, e.target.value)}>
                        {config.elementConfig.options && config.elementConfig.options.map((option) => <option key={option.id} value={option.value}>{option.displayValue}</option>)}
                    </select>
                </div>
            </div>
            break;
        case 'textarea': inputElement = 
            <div className="form-group my-xl-5 my-3 row">
                <label htmlFor={config.elementConfig.id} class="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">{config.elementConfig.placeholder}</label>
                <div class="col-md-8 col-12 mb-3 mb-md-1">
                    <textarea className="form-control" id={config.elementConfig.id} value={config.value} required onChange={(e) => handleChange(e, e.target.id, e.target.value)}/>
                </div>
            </div>
            break;
        case 'radio': inputElement = 
            <div class="form-group my-xl-5 my-3 row">
                <label htmlFor={config.elementConfig.id} className={config.elementConfig.labelClassName}>{config.elementConfig.labelTitle}</label>
                <div className={config.elementConfig.parentDivClassName} id={config.elementConfig.id}>
                    {config.elementConfig.radios.map((radio) => 
                        <span key={radio[0].id}>
                            <input type="radio" {...radio[0]} required onChange={(e) => handleChange(e, config.elementConfig.id, e.target.value)}/>
                            <label {...radio[1]}>{radio[0].value}</label>
                        </span>
                    )}
                </div>
            </div>
            break;
        case 'checkbox': inputElement = 
            <div class="form-group my-xl-5 my-3 row">     
                <label htmlFor={config.elementConfig.id} class="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">{config.elementConfig.labelTitle}</label>
                <div className="col-md-8 col-12 mb-3 mb-md-1">
                    <div className="row my-2">
                        { config.elementConfig.list.map((item, i)=>{
                            return(
                                <div key={i} className="col-12 col-md-6 mb-2">
                                    <input className="col-2 m-auto" type="checkbox" id={item} key={item} defaultChecked={config.elementConfig.inputChecked} value={item} onClick={(e) => handleChange(e, config.elementConfig.id, e.target.value)} />
                                    <label htmlFor={item} className="col-10 m-auto text-start">{item}</label>
                                </div>)
                            })}
                    </div>
                </div>
            </div>
        break;
        case 'partition': inputElement = 
            <div className="row border-top border-3 pt-3 fs-4" id={config.id} >
                <div className="col text-center">
                    <h4 style={{color: "gray", borderColor: "gray"}}>{config.title}</h4>
                </div>
            </div>
        
    }

    return(
        <div>
            { inputElement }
        </div>
    )
}

export default FormInput;