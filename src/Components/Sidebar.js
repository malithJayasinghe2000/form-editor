import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCog, faSave, faArrowAltCircleLeft, faArrowAltCircleRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import '../css/Sidebar.css';

const Sidebar = ({
    fields,
    onAddField,
    onSelectField,
    onOpenSettings,
    editingField,
    onChangeTitle,
    onChangeDescription,
    onChangeImage,
    onChangePosition,
    onAddDropdownOption,
    onEditDropdownOption,
    onDeleteDropdownOption,
    onDeleteField,
    onSaveAndPublish,
}) => {
    const [newOption, setNewOption] = useState('');

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Form Builder</h2>
            <button onClick={onAddField} className="add-field-btn">
                <FontAwesomeIcon icon={faPlus} /> Add Field
            </button>

            <div className="fields-list">
    {fields.map(field => (
        <div
            key={field.id}
            className={`field-item ${editingField && editingField.id === field.id ? 'active' : ''}`} // Add 'active' class if the field is selected
            onClick={() => onSelectField(field)}
        >
            <span>{field.title}</span>
            {field.id !== 'home' && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteField(field.id);
                    }}
                    className="delete-btn"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            )}
        </div>
    ))}
</div>


            <button onClick={onOpenSettings} className="settings-btn">
                <FontAwesomeIcon icon={faCog} /> Settings
            </button>

            {editingField && (
                <div className="edit-section">
                    <h3>Edit Field</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingField.title}
                        onChange={(e) => onChangeTitle(e.target.value)}
                        className="form-input"
                    />
                    <textarea
                        placeholder="Description"
                        value={editingField.description}
                        onChange={(e) => onChangeDescription(e.target.value)}
                        className="form-textarea"
                    />

                    {editingField.type === 'dropdown' && (
                        <div className="dropdown-options">
                            <h4>Dropdown Options</h4>
                            <input
                                type="text"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                placeholder="New Option"
                                className="form-input"
                            />
                            <button
                                onClick={() => {
                                    onAddDropdownOption(newOption);
                                    setNewOption('');
                                }}
                                className="add-option-btn"
                            >
                                Add Option
                            </button>
                            <ul>
                                {editingField.options && editingField.options.map((option, index) => (
                                    <li key={index} className="dropdown-option-item">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => onEditDropdownOption(index, e.target.value)}
                                            className="form-input"
                                        />
                                        <button onClick={() => onDeleteDropdownOption(index)} className="delete-option-btn">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {editingField.id === 'home' && (
                        <>
                            <input type="file" onChange={onChangeImage} className="file-input" />
                            {editingField.image && (
                                <div className="image-preview">
                                    <img src={editingField.image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                                </div>
                            )}
                            <div className="image-align-buttons">
                                <button onClick={() => onChangePosition('left')}>
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                                </button>
                                <button onClick={() => onChangePosition('center')}>
                                    <FontAwesomeIcon icon={faAlignCenter} />
                                </button>
                                <button onClick={() => onChangePosition('right')}>
                                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            <button onClick={onSaveAndPublish} className="save-publish-btn">
                <FontAwesomeIcon icon={faSave} /> Save and Publish
            </button>
        </div>
    );
};

export default Sidebar;
