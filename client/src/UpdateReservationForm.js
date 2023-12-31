import React, {useContext, useState} from 'react';
import { UserContext} from "./Context/user";
import { useParams, useNavigate } from 'react-router-dom';

function UpdateReservationForm({ courts, handleUpdateReservation }) {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { currentUser} = useContext(UserContext);
  const [error, setErrors] = useState([]);

  const selectedReservation = currentUser.reservations.find(
    (reservation) => reservation.id === Number(reservationId)
  ) || {};

  const startTime = selectedReservation.start_time ? selectedReservation.start_time.slice(11, 16) : '';
  const endTime = selectedReservation.end_time ? selectedReservation.end_time.slice(11, 16) : '';

  const [reservation, setReservation] = useState({
    ...selectedReservation,
    start_time: startTime,
    end_time: endTime,
  });

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
          response.json().then((err) => {setErrors(err.error)})
        }
      })
      .then((updatedReservation) => {
        handleUpdateReservation(updatedReservation);
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
          value={reservation.date || ''}
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

        {error && (
            <div className="error-container">
              {Object.values(error).map((errorMessage, index) => (
                <p key={index} className="error-message">{errorMessage}</p>
              ))}
            </div>
          )}

        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
}

export default UpdateReservationForm;
