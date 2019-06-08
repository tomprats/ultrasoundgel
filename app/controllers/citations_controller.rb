class CitationsController < ApplicationController
  def index
    @episodes = Episode.ascending.published
  end
end
