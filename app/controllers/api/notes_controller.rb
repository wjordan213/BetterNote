module Api
  class NotesController < ApplicationController
    def show
      @note = Note.find(params[:id]);
      render :show
    end

    def index
      # yikes! TODO: pagination and/or infinite scroll
      @notes = current_user.notes
      render :index
    end

    def create
      note = Note.new(note_params)

      if note.save
        # if tag_params
        #   tag_ids = current_user.tags.new(tag_params)
        #   tag.save_with_tagging(note.id)
        # end
        render json: note
      else
        render json: note.errors.full_messages
      end
    end

    def update
      note = Note.find(params[:id])

      if note.update(note_params)
        render json: note
      else
        render json: note.errors.full_messages
      end
    end

    def destroy
      note = Note.find(params[:id])
      note.destroy

      render json: 'destroyed'
    end

    private

    def note_params
      params.require(:note).permit(:notebook_id, :title, :body)
    end
  end
end
