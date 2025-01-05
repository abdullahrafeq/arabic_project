import { useState, useEffect } from "react";
import "./style.css";

const EditModal = ({ isOpen, onClose, editedElement, onSave, type, modalMode, authors, categories }) => {
    
    // Initialize form state with scholar's data
    const [formData, setFormData] = useState({});
    
    // Update state on input change
    const handleChange = (e) => {
      const { name, value, options } = e.target;
    
      console.log(`Handling change for ${name}:`, value);
    
      if (name === "author") {
        const selectedAuthor = authors.find((author) => author.id === parseInt(value));
        console.log("Selected Author:", selectedAuthor);
        setFormData((prevFormData) => ({
          ...prevFormData,
          author: value, // Update with selected object or empty
        }))
      } else if (name === "category") {
        // Get selected category IDs
        console.log(formData?.categories)
        const selectedCategoryIds = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => parseInt(option.value, 10)) // Extract IDs as integers

        setFormData((prevFormData) => ({
          ...prevFormData,
          categories: selectedCategoryIds, // Store IDs in the array
        }))
      } else if (name === "specialized_science") {
        // Get selected category IDs
        console.log(formData?.specialized_scieces)
        const selectedScienceIds = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => parseInt(option.value, 10)) // Extract IDs as integers

        setFormData((prevFormData) => ({
          ...prevFormData,
          specialized_sciences: selectedScienceIds, // Store IDs in the array
        }))
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }))
      }
    }

    useEffect(() => {
      console.log("Authors in EditModal:", authors);
    }, [authors]);

    useEffect(() => {
      console.log("formData:", formData);
    }, [formData]);

    useEffect(() => {
      if (modalMode === "edit" && editedElement) {
        console.log("in edit")
        if (type === "scholar") {
          setFormData({
            name: editedElement?.name,
            arabic_name: editedElement?.arabic_name,
            birth_year: editedElement?.birth_year,
            death_year: editedElement?.death_year,
            is_on_home_page: editedElement?.is_on_home_page ? "true" : "false",
            specialized_sciences: editedElement?.specialized_sciences,
            description: editedElement?.description
          })
        } else if (type === "book") {
          setFormData({
            name: editedElement?.name,
            arabic_name: editedElement?.arabic_name,
            author: editedElement?.author,
            categories: editedElement?.categories,
            is_on_home_page: editedElement?.is_on_home_page ? "true" : "false",
            description: editedElement?.description
          })
        } else if (type === "quote") {
          console.log(editedElement)
          setFormData({
            quote: editedElement?.quote,
            arabic_quote: editedElement?.arabic_quote,
            author: editedElement?.author,
            is_on_home_page: editedElement?.is_on_home_page ? "true" : "false",
          })
        }
      } else if (modalMode === "add") {
        if (type === "scholar") {
          setFormData({
            name: "",
            arabic_name: "",
            birth_year: "",
            death_year: "",
            is_on_home_page: "false",
            specialized_sciences: "",
            description: ""
          })
        } else if (type === "book") {
          setFormData({
            name: "",
            arabic_name: "",
            author: "",
            categories: [],
            is_on_home_page: "false",
            description: ""
          })
        } else if (type === "quote") {
          setFormData({
            quote: "",
            arabic_quote: "",
            author: "",
            is_on_home_page: "false",
          })
        }
      }
    }, [editedElement, type, modalMode]);

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">        
        {type === "scholar" ? (
          <ScholarModal 
            formData={formData} 
            handleChange={handleChange} 
            modalMode={modalMode}
            categories={categories}
            scholarName={editedElement?.name}
            specialized_sciences={editedElement?.specialized_sciences}
          />
        ) : type === "book" ? (
          <BookModal 
            formData={formData} 
            handleChange={handleChange}
            modalMode={modalMode}
            authors={authors}
            categories={categories}
            bookName={editedElement?.name}
          />
        ) : type === "quote" ? (
          <QuoteModal 
            formData={formData} 
            handleChange={handleChange}
            modalMode={modalMode}
            authors={authors}
            quoteName={editedElement?.quote}
          />
        ) : (
          <></>
        )}
        <div className="modal-footer">
          <button className="btn btn-save" onClick={() => onSave(formData)}>
            {modalMode === "delete" ? <>Yes</> : <>Save</>}
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ScholarModal = ({ formData, handleChange, modalMode, categories, scholarName, specialized_sciences }) => {

  if (modalMode === "delete") {
    return (
      <>
        <h2>
          Delete scholar
        </h2>
        <p>Are you sure you want to delete the scholar: <b>{scholarName}</b>?</p>
      </>
    )
  }

  return (
    <>
      <h2 className="modal-header">{modalMode === "add" ? <>Add</> : <>Edit</>} Scholar</h2>
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
        <div className="form-group">
          <label htmlFor="specialized_science">Specialized Sciences</label>
          <select
            id="specialized_science"
            name="specialized_science"
            onChange={handleChange} // Allow changes
            value={formData.specialized_sciences || []}
            multiple
          >
            <option value="">Select science</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange} // Allow changes
            value={formData.description}
            rows={5}
          >
          </textarea>
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

const BookModal = ({ formData, handleChange, modalMode, authors, categories, bookName }) => {

  if (modalMode === "delete") {
    return (
      <>
        <h2>
          Delete book
        </h2>
        <p>Are you sure you want to delete the book: <b>{bookName}</b>?</p>
      </>
    )
  }

  return (
    <>
      <h2 className="modal-header">{modalMode === "add" ? <>Add</> : <>Edit</>} Book</h2>
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
          <label htmlFor="author">Author</label>
          <select
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          >
            <option value="select">
              Select author
            </option>
            {authors?.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={handleChange} // Allow changes
            value={formData.categories || []}
            multiple
          >
            <option value="">Select category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange} // Allow changes
            value={formData.description}
            rows={5}
          >
          </textarea>
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


const QuoteModal = ({ formData, handleChange, modalMode, authors, quoteName }) => {

  if (modalMode === "delete") {
    return (
      <>
        <h2>
          Delete quote
        </h2>
        <p>Are you sure you want to delete the quote: <b>{quoteName}</b>?</p>
      </>
    )
  }

  return (
    <>
      <h2 className="modal-header">{modalMode === "add" ? <>Add</> : <>Edit</>} Quote</h2>
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="quote">Quote</label>
          <input
            type="text"
            id="quote"
            name="quote"
            value={formData.quote} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label htmlFor="arabic_quote">Arabic Quote</label>
          <input
            type="text"
            id="arabic_quote"
            name="arabic_quote"
            value={formData.arabic_quote} // Pre-populated value
            onChange={handleChange} // Allow changes
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          >
            <option value="select">
              Select author
            </option>
            {authors?.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
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
