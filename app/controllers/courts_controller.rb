class CourtsController < ApplicationController

def index 
    courts = Court.all
    render json: courts 
end

def create 
    court = Court.create(court_params)
    render json: court, status: :created
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
