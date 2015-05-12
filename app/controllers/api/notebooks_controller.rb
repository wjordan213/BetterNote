module Api
  class NotebooksController < ApiController
    before_action :require_notebook!, except: :index
    
    def index
    end

    def show
    end

    def edit
    end

    def destroy
    end

    # private?

    def current_notebook
      if params[:id]
        return Notebook.find(:id)
      end
    end
  end
end
