class CourtsController < ApplicationController
    skip_before_action :authorized, only: [:index, :find_price]
   #create action in courts controller
#Look at the prices and find the prices that have a cost g greater than the number. 
#If that turns up any courts render back an array of all the reservations for those courts. 
#after we find the courts with matching prices then look for reservations where the court id matches 
#else If no courts are found , render a json message that says that says so including the the number that was included in the search. 

    def find_price
        selected_price = params[:price].to_i
        all_courts = Court.where("price <= ?", selected_price)
        if all_courts.length >=1 
            pricey_reservations = all_courts.flat_map(&:reservations)
            render json: pricey_reservations
        else 
            render json: "sorry courts cost more than $ #{selected_price}"
        end 
    end 
    
    def index
        if params[:user_id]
          # User-specific courts
          user = User.find(params[:user_id])
          courts = user.courts
        else
          # All courts
          courts = Court.all
        end
    
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
