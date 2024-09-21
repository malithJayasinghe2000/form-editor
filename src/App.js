import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import AddFieldPopup from './Components/AddFieldPopup';
import HomeScreen from './Components/HomeScreen';
import './App.css';

function App() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState('center');
  const [title, setTitle] = useState('Welcome to Form editor');
  const [description, setDescription] = useState('You can create your own form');
  const [showForm, setShowForm] = useState(false); // State to track form display

  useEffect(() => {
    const initialHomeScreen = { id: 'home', title, description, image, position };
    setFields([initialHomeScreen]);
    setSelectedField(initialHomeScreen);
  }, []);

  const handleAddField = () => {
    setIsPopupOpen(true);
  };

  const handleSelectField = (field) => {
    setSelectedField(field);
    setEditingField(null);
  };

  const handleOpenSettings = () => {
    if (selectedField) {
      setEditingField(selectedField);
    }
  };

  const handleAddNewField = (newField) => {
    setFields((prevFields) => [...prevFields, newField]);
    setSelectedField(newField);
    setIsPopupOpen(false);
  };

  const handleChangeTitle = (newTitle) => {
    if (editingField) {
      const updatedField = { ...editingField, title: newTitle };
      setEditingField(updatedField);
      updateFields(updatedField);
    }
  };

  const handleChangeDescription = (newDescription) => {
    if (editingField) {
      const updatedField = { ...editingField, description: newDescription };
      setEditingField(updatedField);
      updateFields(updatedField);
    }
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedField = { ...editingField, image: reader.result };
        setEditingField(updatedField);
        updateFields(updatedField);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePosition = (newPosition) => {
    if (editingField) {
      const updatedField = { ...editingField, position: newPosition };
      setEditingField(updatedField);
      updateFields(updatedField);
    }
  };

  const updateFields = (updatedField) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === updatedField.id ? updatedField : field))
    );
    setSelectedField(updatedField); // Reflect real-time changes on the right
  };

  // Handle dropdown options
  const handleAddDropdownOption = (option) => {
    if (editingField && editingField.type === 'dropdown') {
      const updatedField = {
        ...editingField,
        options: [...(editingField.options || []), option],
      };
      setEditingField(updatedField);
      updateFields(updatedField);
    }
  };

  const handleEditDropdownOption = (index, newOption) => {
    if (editingField && editingField.type === 'dropdown') {
      const updatedField = {
        ...editingField,
        options: editingField.options.map((opt, i) => (i === index ? newOption : opt)),
      };
      setEditingField(updatedField);
      updateFields(updatedField);
    }
  };

  const handleDeleteDropdownOption = (index) => {
    if (editingField && editingField.type === 'dropdown') {
      const updatedField = {
        ...editingField,
        options: editingField.options.filter((_, i) => i !== index),
      };
      setEditingField(updatedField);
      updateFields(updatedField);
    }
  };

  const handleDeleteField = (fieldId) => {
    setFields((prevFields) => prevFields.filter(field => field.id !== fieldId));
    setSelectedField(null); // Clear selected field if deleted
  };

  const handleSaveAndPublish = () => {
    setShowForm(true); // Display the form
  };

  return (
    <div className="app-container">
      <Sidebar 
        fields={fields} 
        onAddField={handleAddField} 
        onSelectField={handleSelectField} 
        onOpenSettings={handleOpenSettings}
        editingField={editingField}
        onChangeTitle={handleChangeTitle}
        onChangeDescription={handleChangeDescription}
        onChangeImage={handleChangeImage}
        onChangePosition={handleChangePosition}
        onAddDropdownOption={handleAddDropdownOption}
        onEditDropdownOption={handleEditDropdownOption}
        onDeleteDropdownOption={handleDeleteDropdownOption}
        onDeleteField={handleDeleteField}
        onSaveAndPublish={handleSaveAndPublish} // Pass the new function to Sidebar
      />
      <div className="preview">
  {showForm ? (
    fields.map((field) => (
      <div key={field.id} className="field-container">
        <div className="content">
          <h2>{field.title}</h2>
          <p>{field.description}</p>
        </div>
        {field.image && (
          <img
            src={field.image}
            alt="Field"
            className={`field-image ${field.position}`}
          />
        )}
        <div className="form-fields">
          {field.type === 'email' && (
            <input type="email" className="form-input" placeholder="Enter your email" />
          )}
          {field.type === 'shortText' && (
            <input type="text" className="form-input" placeholder="Enter text" />
          )}
          {field.type === 'dropdown' && field.options && (
            <select className="form-select">
              {field.options.map((opt, index) => (
                <option key={index} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    ))
  ) : selectedField ? (
    selectedField.id === 'home' ? (
      <HomeScreen
        title={selectedField.title}
        description={selectedField.description}
        image={selectedField.image}
        position={selectedField.position}
      />
    ) : (
      <div className="field-container">
        <div className="content">
          <h2>{selectedField.title}</h2>
          <p>{selectedField.description}</p>
        </div>
        {selectedField.image && (
          <img
            src={selectedField.image}
            alt="Field"
            className={`field-image ${selectedField.position}`}
          />
        )}
        <div className="form-fields">
          {selectedField.type === 'email' && (
            <input type="email" className="form-input" placeholder="Enter your email" />
          )}
          {selectedField.type === 'shortText' && (
            <input type="text" className="form-input" placeholder="Enter text" />
          )}
          {selectedField.type === 'dropdown' && selectedField.options && (
            <select className="form-select">
              {selectedField.options.map((opt, index) => (
                <option key={index} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    )
  ) : (
    <div>Select a section to preview</div>
  )}
</div>


      {isPopupOpen && (
        <AddFieldPopup onAddNewField={handleAddNewField} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}

export default App;
