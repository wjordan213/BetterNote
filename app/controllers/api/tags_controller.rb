module Api
  class TagsController < ApplicationController
    def show
      @tag = Tag.find(params[:id])
      @notes = @tag.notes
    end

    def index
      @tags = current_user.tags
    end

    def create
      title = params[:title];
      tag = current_user.tags.find_by({:title => title });

      tag = current_user.tags.create!(title: title) if !tag
      render json: tag
    end

    def destroy
      tagging = Tagging.where('tag_id = ? AND note_id = ?', params[:id], params[:note_id])[0]
      tagging.destroy
      tag = Tag.find(params[:id])
      tag.destroy if tag.taggings.empty?
      render :json => 'success'
    end
  end
end

# subids= params[:subids]
