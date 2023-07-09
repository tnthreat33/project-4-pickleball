class CourtsController < ApplicationController
    skip_before_action :authorized, only: :index
    
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
