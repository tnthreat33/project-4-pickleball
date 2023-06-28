import React, { useState, useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';

function UpdateReservationForm({ courts, currentUser,  handleUpdateReservation }) {
  const { reservationId } = useParams();
 const navigate = useNavigate();


 const selectedReservation = currentUser.reservations.find(
  (reservation) => reservation.id === Number(reservationId)
);

  const [reservation, setReservation] = useState(selectedReservation);


  function handleInputChange(event) {
    const { name, value } = event.target;
    setReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  }
  

  function handleSubmit(event) {
    event.preventDefault();
  
    fetch(`/reservations/${reservationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update reservation');
        }
      })
      .then((updatedReservation) => {
        handleUpdateReservation(updatedReservation)
        navigate('/reservations');
      })
      .catch((error) => {
        console.log('Reservation update error:', error);
      });
  }
  

  return (
    <div>
      <h2>Update Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="court_id">Court:</label>
        <select
          id="court_id"
          name="court_id"
          value={reservation.court_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a court</option>
          {courts.map((court) => (
            <option key={court.id} value={court.id}>
              {court.name}
            </option>
          ))}
        </select>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={reservation.date}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={reservation.start_time}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="end_time">End Time:</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={reservation.end_time}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
}

export default UpdateReservationForm;
