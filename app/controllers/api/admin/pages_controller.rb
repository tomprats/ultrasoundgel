class Api::Admin::PagesController < Api::Admin::ApplicationController
  def index
    pages = Page.by_rank.all

    render json: {pages: pages_as_json(pages)}
  end

  def create
    page = Page.new(page_params)

    if page.save
      render json: {message: "#{page.name} created", success: true}
    else
      render json: {message: page.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    page = Page.find(params[:id])

    render json: {page: page_as_json(page)}
  end

  def update
    page = Page.find(params[:id])

    if page.update(page_params)
      render json: {message: "#{page.name} updated", success: true}
    else
      render json: {message: page.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    page = Page.find(params[:id])

    if page.destroy
      render json: {message: "#{page.name} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  private

  def page_as_json(page)
    page.as_json(only: [
      :active,
      :id,
      :name,
      :path,
      :rank,
      :template
    ]).merge(content: page.content_edit_value)
  end

  def page_params
    params.require(:page).permit(
      :active,
      :content,
      :name,
      :path,
      :rank,
      :template
    )
  end

  def pages_as_json(pages)
    pages.as_json(only: [
      :active,
      :created_at,
      :id,
      :name,
      :path,
      :rank,
      :template
    ])
  end
end
