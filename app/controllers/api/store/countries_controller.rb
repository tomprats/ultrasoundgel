class Api::Store::CountriesController < Api::ApplicationController
  def index
    render json: {records: records_as_json}
  end

  private

  def records_as_json
    Rails.cache.fetch("store-countries", expires_in: 1.hour) do
      Printful.get_countries
        .sort_by{ |country| [country["code"] == "US" ? 0 : 1, country["name"]] }
    end
  end
end
