import React, { useState } from 'react';
import './XModal.css';

const XModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required.";
    }

    if (!formData.email.includes('@')) {
      validationErrors.email = "Invalid email. Please check your email address.";
    }

    if (!formData.phone || formData.phone.length !== 10 || isNaN(formData.phone)) {
      validationErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
    }

    const dob = new Date(formData.dob);
    if (!formData.dob || dob > new Date()) {
      validationErrors.dob = "Invalid date of birth. Please select a valid past date.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      setShowModal(false);
      setFormData({ username: '', email: '', dob: '', phone: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
  };

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>

              <div>
                <label>Email Address:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div>
                <label>Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>

              <div>
                <label>Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
