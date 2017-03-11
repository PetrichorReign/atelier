##
# Migration to create content table

class CreateContent < ActiveRecord::Migration[5.0]
  def change
    create_table :content do |t|
      t.string :title, null: false, index: true
      t.string :maturity, null: false
      t.text :box_art_url
      t.integer :release_year, null: false
      t.boolean :is_streaming, default: false

      t.timestamps
    end
  end
end
