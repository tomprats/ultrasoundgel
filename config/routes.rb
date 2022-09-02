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
  get "cases/:uid", to: "pages#show", as: :case
  get "episodes/:uid", to: "pages#show", as: :episode
  get "posts/:uid", to: "pages#show", as: :post
  get "profile", to: "pages#show", as: :profile

  # Required Routes
  get "channels/:uid/image", to: "channels#image", as: :channel_image
  get "episodes/:uid/audio", to: "episodes#audio", as: :episode_audio
  get "episodes/:uid/image", to: "episodes#image", as: :episode_image
  get :feed, to: "channels#index"
  get "file/redirect", to: "files#show"

  namespace :api do
    get :app, to: "application#environment"

    resources :articles, only: [:index]
    resources :cases, only: [:index, :show], param: :uid
    resources :comments, only: [:create, :destroy]
    resources :episodes, only: [:index, :show], param: :uid
    resources :posts, only: [:show], param: :uid
    post "posts/:uid/subscribe", to: "posts#subscribe"
    post "posts/:uid/unsubscribe", to: "posts#unsubscribe"
    resource :profile, only: [:create, :update]
    resource :session, only: [:create, :destroy] do
      post :forgot_password, on: :collection
    end

    namespace :admin do
      resources :article_categories, only: [:index, :create, :show, :update, :destroy]
      resources :articles, only: [:index, :create, :show, :update, :destroy]
      resources :cases, only: [:index, :create, :show, :update, :destroy], param: :uid
      post "cases/:uid/publish", to: "cases#publish"
      delete "cases/:uid/publish", to: "cases#unpublish"
      resources :channels, only: [:index, :create, :show, :update, :destroy], param: :uid
      post "channels/:uid/publish", to: "channels#publish"
      delete "channels/:uid/publish", to: "channels#unpublish"
      resources :episodes, only: [:index, :create, :show, :update, :destroy], param: :uid
      post "episodes/:uid/publish", to: "episodes#publish"
      delete "episodes/:uid/publish", to: "episodes#unpublish"
      resources :pages, only: [:index, :create, :show, :update, :destroy]
      resources :posts, only: [:index, :create, :show, :update, :destroy], param: :uid
      post "posts/:uid/publish", to: "posts#publish"
      delete "posts/:uid/publish", to: "posts#unpublish"
      resources :sections, only: [:index, :show, :update]
      resources :stats, only: [:index]
      resources :uploads, only: [:index]
      resources :users, only: [:index, :show, :update, :destroy]
    end

    namespace :preview do
      resources :cases, only: [:index, :show], param: :uid
      resources :episodes, only: [:index, :show], param: :uid
      resources :posts, only: [:index, :show], param: :uid
    end
  end

  get "*path",
    to: "pages#show",
    constraints: lambda{ |request| request.path.exclude? "rails/active_storage" }
end
