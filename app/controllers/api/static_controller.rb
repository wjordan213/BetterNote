module Api
  class StaticController < ApplicationController
    def search
      @search_results = PgSearch
      .multisearch(params[:query])
    end
  end
end
