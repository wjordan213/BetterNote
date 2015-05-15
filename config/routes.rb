Rails.application.routes.draw do
    root to: 'static_pages#root'
    resources :users, only: [:new, :create] do
    end

    resource :session, only: [:new, :create, :destroy]

    namespace :api, defaults: { format: :json } do
      resources :notebooks, except: [:new, :edit]
      resources :notes, except: [:new, :edit]
    end
end
