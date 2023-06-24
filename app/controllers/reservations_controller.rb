class ReservationsController < ApplicationController
  def create
    reservation = Reservation.new(reservation_params)
    reservation.user_id = session[:user_id] # Set the user_id from the session

    if reservation.save
      render json: { reservation: reservation, user_id: reservation.user_id }, status: :created
    else
      render json: { error: 'Error creating reservation' }, status: :unprocessable_entity
    end
  end

  private

  def reservation_params
    params.permit(:court_id, :date, :start_time, :end_time)
  end
end
