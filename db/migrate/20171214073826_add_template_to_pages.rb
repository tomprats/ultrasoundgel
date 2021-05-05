class AddTemplateToPages < ActiveRecord::Migration[5.1]
  def up
    add_column :pages, :template, :string

    Page.find_each do |page|
      page.update(template: "default")
    end

    change_column :pages, :template, :string, null: false
  end

  def down
    remove_column :pages, :template, :string
  end
end
