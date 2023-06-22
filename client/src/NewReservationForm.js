import React, { useState } from 'react';

function NewReservationForm({ courts, onCreateReservation }) {
  const [court_id, setCourt] = useState('');
  const [date, setDate] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [error, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      court_id,
      date,
      start_time,
      end_time
    };
      fetch('/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((r) => {
          if (r.ok){
            r.json().then((newReservation) => {
          onCreateReservation(newReservation);
          setCourt('');
          setDate('');
          setStartTime('');
          setEndTime('');
          setErrors([]);
            }); } else {
              r.json().then((err) => setErrors(err.errors));
            }
          }
        );
      }

  return (
    <>
      <h1>Reservations</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="court_id">Court:</label>
        <select
          id="court_id"
          name="court_id"
          value={court_id}
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

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={start_time}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label htmlFor="end_time">End Time:</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={end_time}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit">Create Reservation</button>
      </form>
    </>
  );
}

export default NewReservationForm;