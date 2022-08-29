class Api::Preview::ApplicationController < Api::ApplicationController
  before_action :authenticate_admin
end
