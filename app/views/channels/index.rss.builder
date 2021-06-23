xml.instruct! :xml, version: "1.0"
xml.rss "xmlns:itunes" => "http://www.itunes.com/dtds/podcast-1.0.dtd", version: "2.0" do
  xml.channel do
    xml.title @channel.title
    xml.link @channel.link
    xml.language "en-us"
    xml.copyright "#{DateTime.now.year} #{@channel.title}"
    xml.itunes :subtitle, @channel.subtitle
    xml.itunes :author, @channel.author
    xml.itunes :summary, @channel.summary
    xml.description @channel.current_description_text
    xml.itunes :owner do
      xml.itunes :name, @channel.owner_name
      xml.itunes :email, @channel.owner_email
    end
    xml.itunes :image, href: channel_image_url(@channel.uid, format: @channel.image_extension)
    xml.itunes :category, text: "Science & Medicine" do
      @channel.category_list.each do |category|
        xml.itunes :category, text: category
      end
    end
    xml.itunes :explicit, @channel.explicit ? "yes" : "no"
    @channel.episodes.ascending.published.each do |episode|
      xml.item do
        xml.title episode.title
        xml.description episode.current_description_text
        xml.content :encoded do
          xml.cdata!(episode.current_description_html)
        end
        xml.itunes :author, episode.author
        xml.itunes :subtitle, episode.subtitle
        xml.itunes :image, href: episode_image_url(episode.uid, format: episode.image_extension)
        xml.enclosure(
          url: episode_audio_url(episode.uid, format: episode.audio_extension),
          length: episode.audio_size,
          type: episode.audio_type
        )
        xml.guid episode_url(episode)
        xml.pubDate episode.published_at.to_s(:rfc822)
        xml.itunes :duration, episode.audio_duration
      end
    end
  end
end
