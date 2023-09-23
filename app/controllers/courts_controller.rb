class CourtsController < ApplicationController
    skip_before_action :authorized, only: [:index, :court_reservations]

    def court_reservations
        number_of_courts = params[:n].to_i
        courts = Court.all.select {|c| c.reservations.count >= number_of_courts  }
        render json: courts
    end 
#Model.all.select { |m| m.field == value }
    #param of a number
    #finding all the courts that have that many or reservations
    #return courts that fit that criteria 
    
def index 
    courts = Court.all
    render json: courts 
end

def create 
    court = Court.create(court_params)
    if court.valid?
    render json: court, status: :created
    else
        render json: {error: court.errors.full_messages}, status: :unprocessable_entity
    end
end 

def destroy 
    court = Court.find_by(id: params[:id])
    if court 
        court.destroy 
        head :no_content
    else 
        render json: {error: "Court not found"}, status: :not_found
    end 
end

private

def court_params
    params.permit(:name, :address, :price)
end

end
