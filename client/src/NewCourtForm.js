import React, { useState } from 'react';
import './NewCourtForm.css';

function NewCourtForm({ addCourt }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name,
      address,
      price,
    };
    fetch('/courts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error creating court');
        }
      })
      .then((court) => {
        setName('');
        setAddress('');
        setPrice('');
        setErrors([]);
        addCourt(court);
      })
      .catch((error) => {
        console.error(error);
        setErrors(['Error creating court']);
      });
  }

  return (
    <div className="form-container">
      <h2>Create New Court</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default NewCourtForm;
