/*import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function UpdateReservationForm({ courts, setCourts, currentUser }) {
  const { reservationId } = useParams();
  const [courtId, setCourtId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch the reservation details based on reservationId
    const reservation = currentUser.reservations.find(
      (reservation) => reservation.id === Number(reservationId)
    );

    if (reservation) {
      const { court_id, date, start_time, end_time } = reservation;
      setCourtId(court_id);
      setDate(date);
      setStartTime(start_time);
      setEndTime(end_time);
    }
  }, [currentUser.reservations, reservationId]);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedReservation = {
      court_id: courtId,
      date,
      start_time: startTime,
      end_time: endTime,
    };

     Send a request to update the reservation
    fetch(`/reservations/${reservationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReservation),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update reservation');
        }
      })
      .then((updatedReservation) => {
        
        const updatedCourts = courts.map((court) => {
          if (court.id === updatedReservation.court_id) {
            const updatedReservations = court.reservations.map((reservation) => {
              if (reservation.id === updatedReservation.id) {
                return updatedReservation;
              }
              return reservation;
            });
            return {
              ...court,
              reservations: updatedReservations,
            };
          }
          return court;
        });
        setCourts(updatedCourts);

        
        history.push('/reservations');
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
          value={courtId}
          onChange={(e) => setCourtId(e.target.value)}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label htmlFor="end_time">End Time:</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
}

export default UpdateReservationForm;*/
