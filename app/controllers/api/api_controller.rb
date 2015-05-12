module Api
  class ApiController < ApplicationController
    before_action :require_logged_in!

    def require_note_owner!
      redirect_to new_session_url unless current_notebook.is_owner?(current_user)
    end

    def require_logged_in!
      unless logged_in?
        render json: ["You must be logged in to perform that action!"], status: :unauthorized
      end
    end
end
