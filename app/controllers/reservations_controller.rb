class ReservationsController < ApplicationController
  def create
    reservation = Reservation.new(reservation_params)
    reservation.user_id = session[:user_id] 

    if reservation.save
      render json: reservation, status: :created
    else
      render json: { error: reservation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy 
    reservation = Reservation.find_by(id: params[:id])
    if reservation
      reservation.destroy 
      head :no_content
    else 
      render json: { error: "Reservation not found" }, status: :not_found
    end 
  end

  def update
    reservation = Reservation.find_by(id: params[:id])
    if reservation
      if reservation.update(reservation_params)
        render json: { reservation: reservation, user_id: reservation.user_id }, status: :ok
      else
        render json: { error: reservation.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Reservation not found' }, status: :not_found
    end
  end

  private

  def reservation_params
    params.permit(:court_id, :date, :start_time, :end_time)
  end
end
