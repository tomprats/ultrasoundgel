Rails.application.routes.draw do
  root "pages#home", as: :home

  resource :session, only: [:new, :create, :destroy]

  namespace :admin do
    root "users#index"

    resources :users, only: [:index, :edit, :create, :update, :destroy]
    resources :paintings, only: [:index, :edit, :create, :update, :destroy]
    resources :pages, only: [:index, :edit, :create, :update, :destroy]
    resources :posts, only: [:show, :index, :edit, :create, :update, :destroy]
    resources :episodes, only: [:index, :edit, :create, :update, :destroy]
    resources :channels, only: [:index, :edit, :create, :update, :destroy]
    resources :uploads, only: [:index, :create, :destroy]
  end

  get ":path", to: "pages#show", as: :page
end
