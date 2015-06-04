class SessionsController < ApplicationController
  def new
  end

  def guest
    user = User.find_by(email: "password")
    login! user
    redirect_to '/app/start'
  end

  def create
    user = User.find_by_credentials(*user_params)
    if user
      login! user
      redirect_to '/app/start'
    else
      flash.now[:errors] = ['invalid email or password'];
      render :new;
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  def omniauth
    # do something with the auth_hash
    user = User.find_or_create_by_auth_hash(auth_hash)
    login!(user)
    redirect_to '/app/start'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

end
