import React, { useState } from 'react';

function NewReservationForm({addCourt, courts}){
    const [court, setCourt] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setErrors] = useState([])

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      court,
      date,
      startTime,
      endTime
    };
    fetch('/reservations', {
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
      .then((reservation) => {
        setCourt('');
        setDate('');
        setStartTime('');
        setEndTime('');
        addCourt(reservation);
        
      } )
      .catch((error) => {
        console.error(error);
        setErrors(['Error creating court']);
      });
      console.log(courts)
  }

return (
    <>
      <h1>Reservations</h1>
  
      <form onSubmit={handleSubmit}>
        <label htmlFor="courtId">Court:</label>
        <select
          id="courtId"
          name="courtId"
          value={court}
          onChange={(e) => setCourt(e.target.value)}
          required
        >
          <option value="">Select a court</option>
          {/* Render the available courts as options */}
          {courts.map((court) => (
            <option key={court.id} value={court.id}>{court.name}</option>
          ))}
        </select>
  
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
  
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
  
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
  
        <button type="submit">Create Reservation</button>
      </form>
  
      {/* Existing table code */}
      {/* ... */}
    </>
  );
          }

          export default NewReservationForm;