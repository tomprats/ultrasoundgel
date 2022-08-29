module CaseConcerns
  extend ActiveSupport::Concern

  def case_as_json(record)
    record.as_json(only: [:id, :public_tags, :published_at, :title, :uid]).merge(
      content: record.current_content,
      comments: comments_as_json(record.comments)
    )
  end

  def cases_as_json(records)
    records.map do |record|
      record.as_json(
        only: [:id, :public_tags, :published_at, :title, :uid]
      ).merge(
        content: record.current_content
      )
    end
  end
end
