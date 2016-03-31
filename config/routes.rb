Rails.application.routes.draw do
  root "pages#home", as: :home
  get :home, to: "pages#home"

  resource :session, only: [:new, :create, :destroy]

  namespace :admin do
    root "apps#index"

    resources :apps, only: [:index, :update]
    resources :users, only: [:index, :edit, :create, :update, :destroy]
    resources :pages, only: [:index, :edit, :create, :update, :destroy]
    resources :uploads, only: [:index, :create, :destroy]
    resources :channels, only: [:index, :edit, :create, :update, :destroy], param: :uid
    resources :episodes, only: [:index, :edit, :create, :update, :destroy], param: :uid
    resources :posts, only: [:index, :edit, :create, :update, :destroy], param: :uid
    post "channels/:uid/publish", to: "channels#publish", as: :channel_publish
    post "episodes/:uid/publish", to: "episodes#publish", as: :episode_publish
    post "posts/:uid/publish", to: "posts#publish", as: :post_publish
  end

  get "channels/:uid", to: "channels#show", as: :channel
  get "channels/:uid/image", to: "channels#image", as: :channel_image
  get "episodes/:uid", to: "episodes#show", as: :episode
  get "episodes/:uid/audio", to: "episodes#audio", as: :episode_audio
  get "episodes/:uid/image", to: "episodes#image", as: :episode_image
  get "posts/:uid", to: "posts#show", as: :post

  get ":path", to: "pages#show", as: :page
end
