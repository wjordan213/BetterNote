module Api
  class NotebooksController < ApiController
    before_action :require_notebook!, except: :index

    def index
      user = current_user
      puts 'hello worrsldfka'
      @notebooks = current_user.notebooks
      render 'index', notebooks: @notebooks
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
        Notebook.find(:id)
      end
    end
  end
end
