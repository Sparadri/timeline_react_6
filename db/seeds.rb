# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
require 'csv'

class Timeline

  def initialize
    @csv_options = { col_sep: ';', force_quotes: true, quote_char: '"', headers: :first_row }
    @filepath    = "#{Rails.root}/db/all.csv"
    Event.destroy_all

    p ">> started"
    parse_csv
    p ">> finished"
  end


  private

  def parse_csv
    CSV.foreach(@filepath, @csv_options) do |row|
      new_element = {
        lv1: row['lv1'].dowcase,
        lv2: row['lv2'].dowcase,
        lv3: row['lv3'].dowcase,
        name: row['name'].dowcase,
        event: row['event'].dowcase,
        region: row["region"].dowcase,
        country: row["country"].dowcase,
        start_date: row["start_date"].to_i,
        end_date: row["end_date"].to_i,
        to_be_included: row["to_be_included"].to_i
      }
      Event.create(new_element) unless new_element[:to_be_included] == 0
    end
  end


end

Timeline.new
