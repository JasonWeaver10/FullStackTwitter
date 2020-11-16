class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token


  def create
    @user = User.create(user_Params)

    if @user.save
      render json: {
        user: {
          username: @user.username
        }
      }
    else
      render json: {
        success: false
      }
    end
  end
  



  private 

  def user_Params 
    params.require(:email, :password, :username)
  end


end
