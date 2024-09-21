import React, { useState } from 'react';
import '../css/AddFieldPopup.css'; // Import your new styles

const AddFieldPopup = ({ onAddNewField, onClose }) => {
  const [fieldType, setFieldType] = useState('email');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = options.map((option, i) => (i === index ? value : option));
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
    const newField = {
      id: `${fieldType}-${Date.now()}`,
      title,
      description,
      type: fieldType,
      options: fieldType === 'dropdown' ? options : undefined,
    };
    onAddNewField(newField);
    onClose();
  };

  return (
    <div className="popup">
      <h3>Add New Field</h3>
      <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
        <option value="email">Email Field</option>
        {/* <option value="shortText">Short Text Field</option> */}
        <option value="dropdown">Dropdown Field</option>
        {/* <option value="phone">Phone Field</option> */}
      </select>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {fieldType === 'dropdown' && (
        <div className="options-container">
          <h4>Options</h4>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <button onClick={() => handleRemoveOption(index)}>Remove</button>
            </div>
          ))}
          <button className="add-option-btn" onClick={handleAddOption}>Add Option</button>
        </div>
      )}
      <button className="submit-btn" onClick={handleSubmit}>Add Field</button>
      <button className="cancel-btn" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddFieldPopup;
