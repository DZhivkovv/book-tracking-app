import React from "react";

export default function InputField({ value, label, name, placeholder, type, minLength, onChange, required }){
    //This component represents a form input field.
    return(
        <div className="form-group">
            {label && <label htmlFor="input-field">{label}</label>}
            <input
            type={type}
            value={value}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            minLength={minLength || null}
            />
        </div>
    );
}