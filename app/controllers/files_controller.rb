class FilesController < ApplicationController
  def show
    redirect_to params[:url]
   end
end
