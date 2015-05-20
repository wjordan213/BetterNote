module Api
  class NotebooksController < ApiController
    before_action :require_notebook_owner!, except: [:index, :create]

    def index
      user = current_user
      @notebooks = current_user.notebooks
      render 'index'
    end

    def show
      @notebook = Notebook.find(params[:id]);
      render 'show'
    end

    def create
      notebook = current_user.notebooks.new(title: params[:title]);
      if notebook.save
        render json: notebook
      else
        render json: notebook.errors.full_messages
      end
    end

    def update
      notebook = Notebook.find(params[:id]);

      if notebook.update({title: params[:title]})
        render json: notebook
      else
        render json: notebook.errors.full_messages
      end
    end

    def destroy
      notebook = Notebook.find(params[:id]);

      notebook.destroy
      render json: 'success'
    end

    # private?

    def current_notebook
      if params[:id]
        Notebook.find(params[:id])
      end
    end

    # def notebook_params
    #   params.require(:notebook).permit(:title);
    # end
  end
end
