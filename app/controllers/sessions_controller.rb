class SessionsController < ApplicationController
  def new
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
end
