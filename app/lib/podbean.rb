class Podbean
  class << self
    def episodes(limit: 100, offset: 0)
      get("/episodes", limit: limit, offset: offset)
    end

    def sync(offset: 0)
      batch = episodes(offset: offset)
      batch["episodes"].each do |episode|
        Episode.find_by(title: episode["title"])&.update(podbean_id: episode["id"])
      end

      sync(offset: batch["limit"] + batch["offset"]) if batch["has_more"]
    end

    private

    def access_token
      auth["access_token"]
    end

    def auth
      puts "Reading auth from the cache"
      return refresh_token unless auth = Rails.cache.read("podbean-auth")
      puts "Verifying auth expiration"
      return refresh_token if auth["expires_at"] >= DateTime.now
      puts "Using existing auth"

      auth
    end

    def base_url
      "https://api.podbean.com/v1"
    end

    def get(path, attempts: 0, **params)
      params[:access_token] ||= access_token
      http_response = http.get("#{base_url}#{path}", params: params)
      return JSON.parse(http_response) if attempts > 0 || http_response.code != 400

      params[:access_token] = refresh_token["access_token"]
      get(path, params, attempts: attempts + 1)
    end

    def http
      HTTP[content_type: "application/json"]
    end

    def refresh_token
      username = Rails.application.credentials.dig(:podbean, :public_key)
      password = Rails.application.credentials.dig(:podbean, :secret_key)
      http_response = http.basic_auth(user: username, pass: password)
        .post("#{base_url}/oauth/token", json: {grant_type: :client_credentials})
      response = JSON.parse(http_response)
      expires_in = response["expires_in"] - 1.minute
      response["expires_at"] = DateTime.now + expires_in

      Rails.cache.write("podbean-auth", response, expires_in: expires_in)

      response
    end
  end
end
