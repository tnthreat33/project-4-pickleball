Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :courts, only: [:index, :create, :destroy]
  resources :reservations
  resources :users, only: [:create, :show] #do
  #   resources :courts, only: [:index]
  # end 

  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
end
