class Api::Store::CartsController < Api::ApplicationController
  def shipping
    options = shipping_params
    items = options[:items].values.map{ |item|
      {quantity: item[:quantity], value: item[:retail_value], variant_id: item[:variant_id]}
    }
    shipping = Printful.get_shipping({items: items, recipient: options[:recipient].to_h})
    return render json: {error: shipping["result"]} if shipping["error"]

    # TODO: Potentially save the shipping and items state
    render json: {records: shipping["result"]}
  end

  private

  def shipping_params
    params.require(:shipping).permit(
      items: {},
      recipient: [
        :address1,
        :address2,
        :city,
        :company,
        :country_code,
        :email,
        :name,
        :phone,
        :state_code,
        :zip
      ]
    )
  end
end
