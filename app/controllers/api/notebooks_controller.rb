module Api
  class NotebooksController < ApiController
    before_action :require_notebook_owner!, except: :index

    def index
      user = current_user
      @notebooks = current_user.notebooks
      render 'index'
    end

    def show
      @notebook = Notebook.find(params[:id]);
      render 'show'
    end

    def edit
    end

    def destroy
    end

    # private?

    def current_notebook
      if params[:id]
        Notebook.find(params[:id])
      end
    end
  end
end
