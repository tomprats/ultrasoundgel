Rails.application.routes.draw do
  require "sidekiq/web"
  require "sidekiq/cron/web"
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    username == Rails.application.credentials.sidekiq[:username] &&
      password == Rails.application.credentials.sidekiq[:password]
  end if Rails.env.production?
  mount Sidekiq::Web, at: "/sidekiq"

  # Named Page Routes
  root "pages#show"
  get "episodes/:uid", to: "pages#show", as: :episode
  get "posts/:uid", to: "pages#show", as: :post

  resource :session, only: [:new, :create, :destroy]
  resources :citations, only: [:index]
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

  namespace :api do
    get :app, to: "application#environment"

    resources :articles, only: [:index]
    resources :episodes, only: [:index, :show], param: :uid

    namespace :admin do
      resources :sections, only: [:index, :show, :update]
    end
  end

  get "channels/:uid/image", to: "channels#image", as: :channel_image
  get "episodes/:uid/audio", to: "episodes#audio", as: :episode_audio
  get "episodes/:uid/image", to: "episodes#image", as: :episode_image
  get :feed, to: "channels#index"

  get "*path",
    to: "pages#show",
    constraints: lambda{ |request| request.path.exclude? "rails/active_storage" }
end
