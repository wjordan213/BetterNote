module Api
  class ApiController < ApplicationController
    before_action :require_logged_in!

    def require_notebook_owner!
      unless current_notebook.is_owner?(current_user)
        render json: ["that isn't your notebook!"]
      end
    end

    def require_logged_in!
      unless logged_in?
        render json: ["You must be logged in to perform that action!"], status: :unauthorized
      end
    end
  end
end
