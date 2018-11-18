Rails.application.routes.draw do
  root "pages#home", as: :home
  get :home, to: "pages#home"

  resource :session, only: [:new, :create, :destroy]
  resources :posts, only: [:show], param: :uid
  post "posts/:uid/subscribe", to: "posts#subscribe", as: :subscribe_post
  post "posts/:uid/unsubscribe", to: "posts#unsubscribe", as: :unsubscribe_post
  resources :comments, only: [:create, :destroy]
  resource :user, only: [:create, :edit, :update] do
    post :forgot_password, on: :collection
  end

  namespace :admin do
    root "apps#index"

    resources :apps, only: [:index, :update]
    resources :users, only: [:index, :edit, :create, :update, :destroy]
    resources :pages, only: [:index, :edit, :create, :update, :destroy]
    resources :uploads, only: [:index, :create, :destroy], param: :uid
    resources :channels, only: [:index, :edit, :create, :update, :destroy], param: :uid
    resources :episodes, only: [:index, :edit, :create, :update, :destroy], param: :uid
    resources :posts, only: [:index, :edit, :create, :update, :destroy], param: :uid
    resources :articles, only: [:index, :edit, :create, :update, :destroy]
    resources :article_categories, only: [:index, :edit, :create, :update, :destroy]
    post "channels/:uid/publish", to: "channels#publish", as: :channel_publish
    post "episodes/:uid/publish", to: "episodes#publish", as: :episode_publish
    post "posts/:uid/publish", to: "posts#publish", as: :post_publish
    delete "channels/:uid/publish", to: "channels#unpublish", as: :channel_unpublish
    delete "episodes/:uid/publish", to: "episodes#unpublish", as: :episode_unpublish
    delete "posts/:uid/publish", to: "posts#unpublish", as: :post_unpublish
  end

  get "channels/:uid", to: "channels#show", as: :channel
  get "channels/:uid/image", to: "channels#image", as: :channel_image
  get "episodes/:uid", to: "episodes#show", as: :episode
  get "episodes/:uid/audio", to: "episodes#audio", as: :episode_audio
  get "episodes/:uid/image", to: "episodes#image", as: :episode_image
  get :feed, to: "channels#index"

  get ":path", to: "pages#show", as: :page
end
