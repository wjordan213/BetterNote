class SessionsController < ApplicationController
  def new
  end

  def guest
    user = User.find_by(email: "password")
    login! user
    redirect_to root_url
  end

  def create
    user = User.find_by_credentials(*user_params)
    if user
      login! user
      redirect_to root_url
    else
      flash.now[:errors] = ['invalid email or password'];
      render :new;
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
