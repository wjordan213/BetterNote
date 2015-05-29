class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :logged_in?, :current_user, :auth_token


  def user_params
    params.require(:user).permit(:email, :password)
  end

  def login!(user)
    user.session_token = User.generate_session_token
    session[:session_token] = user.session_token
    user.save!
  end

  def logout!
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def current_user
    user = User.find_by(session_token: session[:session_token])
    return user
  end

  def auth_token
    x = <<-HTML
      <input class="auth_token" type="hidden" name="authenticity_token" value="#{form_authenticity_token}">
    HTML
    x.html_safe
   end
end
