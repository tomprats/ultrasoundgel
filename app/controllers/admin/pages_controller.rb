class Admin::PagesController < AdminController
  def index
    @page = Page.new
    @pages = Page.all
  end

  def edit
    @page = Page.find(params[:id])
    @pages = Page.all
    render :index
  end

  def create
    @page = Page.new(page_params)
    if @page.save
      redirect_to({ action: :index }, success: "#{@page.name} created")
    else
      @pages = Page.all
      render :index, warning: @page.errors.full_messages.join(", ")
    end
  end

  def update
    @page = Page.find(params[:id])
    if @page.update(page_params)
      redirect_to({ action: :index }, success: "#{@page.name} updated")
    else
      @pages = Page.all
      render :index, warning: @page.errors.full_messages.join(", ")
    end
  end

  def destroy
    @page = Page.find(params[:id])
    @page.destroy
    redirect_to({ action: :index }, danger: "#{@page.name} deleted")
  end

  private
  def page_params
    params.require(:page).permit(
      :active,
      :rank, :path,
      :name, :text
    )
  end
end
