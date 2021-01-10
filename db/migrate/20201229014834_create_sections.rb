class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.string :name, index: {unique: true}, null: false

      t.timestamps
    end

    create_table :contents do |t|
      t.belongs_to :section, index: true, null: false
      t.string :name, index: true, null: false
      t.string :kind, null: false
      t.json :data, default: {}, null: false

      t.timestamps
    end

    reversible do |dir|
      dir.up do
        Section.create!(name: "Contact", contents_attributes: [
          {kind: "String", name: "Email", value: "mike@ultrasoundgel.org"}
        ])
        Section.create!(name: "General", contents_attributes: [
          {
            kind: "HTML",
            name: "Announcements",
            value: "<div class=\"trix-content\"><div></div></div>"
          },
          {kind: "String", name: "Google Analytics Code", value: "UA-53529962-7"},
          {
            kind: "String",
             name: "Public Tags",
             value: "Cardiac, Thoracic, Abdominal, Genitourinary, Musculoskeletal, OB/GYN, Ocular, Procedures, Critical Care, Vascular, Trauma, Multi-organ, Infectious Disease, Special Edition, Technology, Research, Pediatrics, Blocks, Novel, TEE, Cardiac Arrest, Update, Airway, Game Changer, Protocols, Gen Surg, Risk Stratification, Large/Multi-center, Global Health"
          },
          {
            kind: "HTML",
            name: "Resources",
            value: "<div class=\"trix-content\"><div></div></div>"
          }
        ])
        Section.create!(name: "Navbar", contents_attributes: [
          {kind: "File", name: "Logo"}
        ])
        Section.create!(name: "Sharing", contents_attributes: [
          {kind: "String", name: "Description", value: "The Ultrasound GEL Podcast"},
          {kind: "File", name: "Image"},
          {kind: "String", name: "Title", value: "Ultrasound GEL"}
        ])
        Section.create!(name: "Social", contents_attributes: [
          {kind: "String", name: "Facebook", value: "UltrasoundGEL"},
          {kind: "String", name: "Instagram", value: ""},
          {kind: "String", name: "Twitter", value: "PratsEM"}
        ])
      end

      dir.down do
        ActionText::RichText.where(record_type: :Content).delete_all
      end
    end
  end
end
