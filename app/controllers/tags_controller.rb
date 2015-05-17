class TagsController < ApplicationController
  def show
    tag = Tag.find(params[:id])
    @notes = tag.notes

    render 'notes/index'
  end

  def index
    @tags = current_user.tags
  end

  def destroy
    tagging = Tagging.where('tag_id = ? AND note_id = ?', params[:id], params[:note_id])[0]
    tagging.destroy
    tag = Tag.find(params[:id])
    tag.destroy if tag.taggings.empty?
    render :json => 'success'
  end
end
