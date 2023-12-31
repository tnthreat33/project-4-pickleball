import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewCourtForm.css';

function NewCourtForm({ addCourt }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
 

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
          response.json().then((data) => {
            setError(data.error);
          });
          return null; // Return null to indicate the court addition failed
        }
      })
      .then((court) => {
        if (court) {
          setName('');
          setAddress('');
          setPrice('');
          addCourt(court);
          navigate('/courts');
        }
      })
      .catch((error) => {
        console.error(error);
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
              
          {error && (
            <div className="error-container">
              {Object.values(error).map((errorMessage, index) => (
                <p key={index} className="error-message">{errorMessage}</p>
              ))}
            </div>
          )}


          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default NewCourtForm;
