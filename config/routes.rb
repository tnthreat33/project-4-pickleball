Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  

  resources :courts, only: [:index, :create, :destroy]
  resources :reservations
  resources :users, only: [:create, :show] 

  
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get "/expensive", to: "courts#expensive"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

