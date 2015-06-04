module Api
  class StaticController < ApplicationController
    def search
      @search_results = PgSearch
      .multisearch(params[:query]).where(:user_id => current_user.id)
    end
  end
end
