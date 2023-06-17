class ReservationsController < ApplicationController

    def create 
        reservation = Reservation.create(reservation_params)
        render json: reservation, status: :created
    end 
private
    def reservation_params
        params.permit(:courtId, :userId, :date, :start_time, :end_time)
    end
end 