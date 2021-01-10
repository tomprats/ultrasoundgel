class Admin::SectionsController < Admin::ApplicationController
  def index
    sections = Section.order(name: :desc).all

    render json: {sections: sections_as_json(sections)}
  end

  def show
    section = Section.find(params[:id])

    render json: {section: section_as_json(section)}
  end

  def update
    section = Section.find(params[:id])

    if section.update(section_params)
      render json: {
        message: "Section updated",
        success: true,
        section: section_as_json(section)
      }
    else
      render json: {success: false, message: section.errors.full_messages.join(", ")}
    end
  end

  private

  def section_as_json(section)
    json = section.as_json(
      include: {contents: {methods: [:edit_value], only: [:id, :kind, :name]}},
      only: [:id, :name]
    )

    json["contents"].map do |content|
      content["value"] = content.delete("edit_value")
      content
    end

    json
  end

  def sections_as_json(sections)
    sections.as_json(
      include: {contents: {only: [:name]}},
      only: [:id, :name]
    )
  end

  def section_params
    params.require(:section).permit(contents_attributes: [:id, :value])
  end
end
