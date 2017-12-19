class AddTemplateToPages < ActiveRecord::Migration[5.1]
  def up
    add_column :pages, :template, :string

    templates = Page.templates
    Page.find_each do |page|
      page.update(template: page.path.in?(templates) ? page.path : templates.first)
    end

    change_column :pages, :template, :string, null: false
  end

  def down
    remove_column :pages, :template, :string
  end
end
