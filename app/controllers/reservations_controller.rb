class ReservationsController < ApplicationController
    def create
      reservation = Reservation.new(reservation_params)
  
      if reservation.save
        render json: reservation, status: :created
      else
        render json: { error: 'Error creating reservation' }, status: :unprocessable_entity
      end
    end
  
    private
  
    def reservation_params
        params.permit(:court_id, :date, :start_time, :end_time)
      end
      
      
      
  end
  