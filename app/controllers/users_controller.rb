class UsersController < ApplicationController
    skip_before_action :authorized, only: :create


    def create 
        user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id
          render json: user
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      

    def show
        current_user = User.find(session[:user_id])
       if current_user
        render json: current_user
      else
        render json: {errors: {login: "Invalid Email or Password"}}, status: :unauthorized
    end
    end 

    private

    def user_params 
        params.permit(:name, :email, :address, :password)
      end
      

end
