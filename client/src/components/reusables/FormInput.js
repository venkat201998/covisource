// import React, { useState } from 'react';

// const FormInput = (props) =>{

//     const { user } = useSelector((state) => ({ ...state }));

//     const handleChange =(e) =>{
//         if(props.onChange){
//             props.onChange(e.target.value);
//         }
//     }

//     return(
//         <div className="form-group my-xl-5 my-3 row">
//             <label htmlFor={props.label} className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">{props.labelName}</label>
//             <div className="col-md-8 col-12 mb-3 mb-md-1">
//                 <input 
//                     id={props.label}
//                     type={props.type} 
//                     required
//                     className="form-control"  
//                     value={props.value}
//                     maxLength={props.label==="pinCode" ? "6": ""}
//                     placeholder={props.placeholder}
//                     // pattern={props.label==="hospitalContact"? "[0-9][10]": ""}
//                     onChange={handleChange}
//                 />
//             </div>
//         </div>
//     )

// }
// export default FormInput;