import React from "react";
import InputField from "./InputField";

export default function Form({ template, onSubmit, children }) {
  //Generates input fields based on the template defined in the parent component
  const inputFields = template.map(({ label, type, placeholder, name, value, onChange, minLength, required }) => (    
    <InputField
      key={name}
      label={label}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      minLength = {minLength}
      required={required}
    />
  ));

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {inputFields}
        <button>
        {children}
        </button>
      </form>
    </div>
  );
}
