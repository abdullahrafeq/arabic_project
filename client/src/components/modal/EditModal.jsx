import { useState, useEffect } from "react";
import "./style.css";

const EditModal = ({ isOpen, onClose, scholar, onSave }) => {
    
    // Initialize form state with scholar's data
    const [formData, setFormData] = useState({
        name: scholar ? scholar?.name : "",
        arabic_name: scholar ? scholar?.arabic_name : "",
        birth_year: scholar ? scholar?.birth_year : "",
        death_year: scholar ? scholar?.death_year : "",
    });
    
    // Update state on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Pass updated data back on save
    const handleSubmit = () => {
        onSave(formData);
    };
    
    useEffect(() => {
      if (scholar) {
        setFormData({
          name: scholar?.name,
          arabic_name: scholar?.arabic_name,
          birth_year: scholar?.birth_year,
          death_year: scholar?.death_year,
        });
      }
    }, [scholar]);

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
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

export default EditModal;
