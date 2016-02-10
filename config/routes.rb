Rails.application.routes.draw do
  root "pages#home", as: :home

  resource :session, only: [:new, :create, :destroy]

  namespace :admin do
    root "users#index"

    resources :users, only: [:index, :edit, :create, :update, :destroy]
    resources :pages, only: [:index, :edit, :create, :update, :destroy]
    resources :uploads, only: [:index, :create, :destroy]
    resources :channels, only: [:index, :edit, :create, :update, :destroy]
    resources :episodes, only: [:index, :edit, :create, :update, :destroy]
    resources :posts, only: [:show, :index, :edit, :create, :update, :destroy]
    post "channels/:id/publish", to: "channels#publish", as: :channel_publish
    post "episodes/:id/publish", to: "episodes#publish", as: :episode_publish
    post "posts/:id/publish", to: "posts#publish", as: :post_publish
  end

  get ":path", to: "pages#show", as: :page
end
