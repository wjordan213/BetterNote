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
      note.user_id = current_user.id

      if note.save
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
      params.require(:note).permit(:notebook_id, :title, :content)
    end
  end
end
