Rails.application.routes.draw do
    root to: 'static_pages#home'

    get '/app/start', to: 'static_pages#root'
    get "/auth/:provider/callback", to: "sessions#omniauth"

    resources :users, only: [:new, :create] do
    end

    resource :session, only: [:new, :create, :destroy]

    get '/session/new/guest', to: 'sessions#guest'

    namespace :api, defaults: { format: :json } do
      get "search", to: 'static#search'
      resources :notebooks, except: [:new, :edit]
      resources :notes, except: [:new, :edit]
      resources :tags, only: [:destroy, :show, :index, :create]
    end
end
