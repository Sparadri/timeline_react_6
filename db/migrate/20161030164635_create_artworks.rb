class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
      t.string :name
      t.references :ind
      t.integer :date
      t.string :detail
      t.string :movement
      t.string :genre
      t.string :picture

      t.timestamps null: false
    end
  end
end
