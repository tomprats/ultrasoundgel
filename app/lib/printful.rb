class Printful
  class << self
    def get_full_products
      get_products.map.with_index do |product, index|
        product = get_product(product["id"])
        product["sync_product"].merge(
          "description" => get_description(product),
          "variants" => product["sync_variants"]
        )
      end
    end

    def get_description(product)
      product_id = product["sync_variants"].first["product"]["product_id"]

      get_details(product_id)["description"]
    rescue => e
      Rails.logger.error(e)

      nil
    end

    def get_countries
      data = get("/countries")
      data["result"]
    end

    def get_details(id)
      product = get("/products/#{id}")
      product["result"]["product"]
    end

    def get_product(id)
      product = get("/store/products/#{id}")
      product["result"]
    end

    def get_products(limit: 100, offset: 0)
      products = get("/store/products", params: {limit: limit, offset: offset})
      # products["paging"] => {"total"=>5, "offset"=>0, "limit"=>20}
      products["result"]
    end

    def get_shipping(params)
      post("/shipping/rates", params: params)
    end

    private

    def access_token
      Rails.application.credentials.dig(:printful, :key)
    end

    def base_url
      "https://api.printful.com"
    end

    def get(path, attempts: 0, params: {})
      http_response = HTTP.auth("Bearer #{access_token}").get("#{base_url}#{path}", params: params)
      return JSON.parse(http_response) if attempts > 0 || http_response.code == 200

      get(path, attempts: attempts + 1, params: params)
    end

    def post(path, params: {})
      http_response = HTTP.auth("Bearer #{access_token}").post("#{base_url}#{path}", json: params)
      response = JSON.parse(http_response)

      Rails.logger.error(
        <<~LOG
          POST #{path}
            params: #{params.inspect},
            status: #{http_response.code},
            response: #{response.inspect}
        LOG
      ) unless http_response.status.success?

      response
    end
  end
end
