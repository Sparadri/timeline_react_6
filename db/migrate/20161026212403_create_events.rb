class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :lv1
      t.string :lv2
      t.string :lv3
      t.string :ind
      t.string :event
      t.string :region
      t.string :picture
      t.string :country
      t.integer :start_date
      t.integer :end_date
      t.integer :to_be_included

      t.timestamps null: false
    end
  end
end
