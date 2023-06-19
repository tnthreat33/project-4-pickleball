class UsersController < ApplicationController

    def create 
        user = User.create!(user_params)
        render json: user 
    end 

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end 

    private

    def user_params 
        params.permit(:name, :email, :address, :password)
    end 

end
