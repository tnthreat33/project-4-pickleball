class ReservationsController < ApplicationController
  before_action :find_reservation, only: [:destroy, :update]

  def index
    reservations = Reservation.all
    render json: reservations
  end 

  
  def create
    reservation = Reservation.new(reservation_params)
    reservation.user_id = @current_user.id

    if reservation.save
      render json: reservation, status: :created
    else
      render json: { error: reservation.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def destroy 
    if @reservation
      if @reservation.user_id == @current_user.id
        @reservation.destroy 
        head :no_content
      else 
        render json: { error: "Unauthorized: Cannot delete reservation" }, status: :unauthorized
      end 
    else 
      render json: { error: "Reservation not found" }, status: :not_found
    end 
  end

  def update
    if @reservation
      if @reservation.user_id == @current_user.id
        @reservation.update(reservation_params)
        render json: @reservation, status: :accepted
      else
        render json: { error: "Unauthorized: Cannot update reservation" }, status: :unauthorized
      end
    else
      render json: { error: "Reservation not found" }, status: :not_found
    end
  end

  private

  def reservation_params
    params.permit(:court_id, :date, :start_time, :end_time)
  end

  def find_reservation
    @reservation = Reservation.find_by(id: params[:id])
  end
end
