module Api
  class StaticController < ApplicationController
    def search
      @search_results = PgSearch
      .multisearch(params[:query]).joins("LEFT OUTER JOIN notes ON notes.id = pg_search_documents.searchable_id").joins("LEFT OUTER JOIN users ON users.id = notes.user_id").where("users.id = ?", current_user.id)
    end
  end
end
