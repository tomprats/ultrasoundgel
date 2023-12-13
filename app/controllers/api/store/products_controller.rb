class Api::Store::ProductsController < Api::ApplicationController
  def index
    render json: {records: products_as_json}
  end

  private

  def products_as_json
    Rails.cache.fetch("store-products", expires_in: 1.hour) do
      Printful.get_full_products
    end
  end
end
