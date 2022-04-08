class Podbean
  class << self
    def create_episode(params)
      post("/episodes", params: params)
    end

    def episodes(limit: 100, offset: 0)
      get("/episodes", params: {limit: limit, offset: offset})
    end

    def podcasts
      get("/podcasts")
    end

    def sync(offset: 0)
      batch = episodes(offset: offset)
      batch["episodes"].each do |podbean_episode|
        episode = Episode.find_by(title: podbean_episode["title"])
        episode.update(podbean_id: podbean_episode["id"]) unless episode&.podbean_id
      end

      sync(offset: batch["limit"] + batch["offset"]) if batch["has_more"]
    end

    # NOTE: Doesn't work because update episode requires more data
    def sync_numbers(offset: 0)
      episodes = Episode.published.ascending
        .where.not(number: nil)
        .where.not(podbean_id: nil)
        .offset(offset)

      episodes.find_each.with_index do |episode, index|
        response = Podbean.update_episode(
          episode.podbean_id,
          {episode_number: episode.number}
        )
        puts "#{index}, #{response["error_description"]}, #{episode.id}"
      end
    end

    def update_episode(id, params)
      post("/episodes/#{id}", params: params)
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

    def get(path, attempts: 0, params: {})
      params[:access_token] ||= access_token
      http_response = HTTP.get("#{base_url}#{path}", params: params)
      return JSON.parse(http_response) if attempts > 0 || http_response.code != 400

      params[:access_token] = refresh_token["access_token"]
      get(path, attempts: attempts + 1, params: params)
    end

    def post(path, attempts: 0, params: {})
      params[:access_token] ||= access_token
      http_response = HTTP.post("#{base_url}#{path}", form: params)
      return JSON.parse(http_response) if attempts > 0 || http_response.code != 400

      params[:access_token] = refresh_token["access_token"]
      post(path, attempts: attempts + 1, params: params)
    end

    def refresh_token
      username = Rails.application.credentials.dig(:podbean, :public_key)
      password = Rails.application.credentials.dig(:podbean, :secret_key)
      http_response = HTTP.basic_auth(user: username, pass: password)
        .post("#{base_url}/oauth/token", json: {grant_type: :client_credentials})
      response = JSON.parse(http_response)
      expires_in = response["expires_in"] - 1.minute
      response["expires_at"] = DateTime.now + expires_in

      Rails.cache.write("podbean-auth", response, expires_in: expires_in)

      response
    end
  end
end
