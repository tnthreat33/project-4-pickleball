class CourtsController < ApplicationController

def index 
    courts = Court.all
    render json: courts
end

def create 
    court = Court.create(court_params)
    render json: court, status: :created
end 

private

def court_params
    params.permit(:name, :address, :price)
end

end
