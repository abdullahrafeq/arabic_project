import { useState, useEffect } from "react";
import "./style.css";

const EditModal = ({ isOpen, onClose, editedElement, onSave, type }) => {
    
    // Initialize form state with scholar's data
    const [formData, setFormData] = useState({});
    
    // Update state on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Pass updated data back on save
    const handleSubmit = () => {
        onSave(formData);
    };
    
    useEffect(() => {
      if (editedElement) {
        if (type === "scholar") {
          setFormData({
            name: editedElement?.name,
            arabic_name: editedElement?.arabic_name,
            birth_year: editedElement?.birth_year,
            death_year: editedElement?.death_year,
          })
        } else if (type === "book") {
          setFormData({
            name: editedElement?.name,
            arabic_name: editedElement?.arabic_name,
            is_on_home_page: editedElement?.is_on_home_page ? "true" : "false",
          })
        }
      }
    }, [editedElement, type]);

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">        
        {type === "scholar" ? (
          <ScholarModal 
            formData={formData} 
            handleChange={handleChange} 
          />
        ) : type === "book" ? (
          <BookModal 
            formData={formData} 
            handleChange={handleChange} 
          />
        ) : (
          <></>
        )}
        <div className="modal-footer">
          <button className="btn btn-save" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ScholarModal = ({ formData, handleChange }) => {
  return (
    <>
      <h2 className="modal-header">Edit Scholar</h2>
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Arabic Name</label>
          <input
            type="text"
            id="name"
            name="arabic_name"
            value={formData.arabic_name} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label htmlFor="birth_year">Birth Year</label>
          <input
            type="number"
            id="birth_year"
            name="birth_year"
            value={formData.birth_year} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label htmlFor="death_year">Death Year</label>
          <input
            type="number"
            id="death_year"
            name="death_year"
            value={formData.death_year} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
      </div>
    </>
  );
}

const BookModal = ({ formData, handleChange }) => {
  return (
    <>
      <h2 className="modal-header">Edit Book</h2>
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label htmlFor="arabic_name">Arabic Name</label>
          <input
            type="text"
            id="arabic_name"
            name="arabic_name"
            value={formData.arabic_name} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label>Is on home page</label>
          <div className="radio-buttons-container">
            <label>
              <input
                type="radio"
                name="is_on_home_page"
                value="true"
                checked={formData.is_on_home_page === "true"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="is_on_home_page"
                value="false"
                checked={formData.is_on_home_page === "false"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
