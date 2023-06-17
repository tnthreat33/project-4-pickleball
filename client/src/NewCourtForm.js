import React, { useState } from 'react';


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
    <div>
      <h2>Create New Court</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewCourtForm;
