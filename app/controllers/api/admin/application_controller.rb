class Api::Admin::ApplicationController < Api::ApplicationController
  before_action :authenticate_admin
end
