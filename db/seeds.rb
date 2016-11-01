# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
require 'csv'

class Eventa

  def initialize
    @csv_options = { col_sep: ',', force_quotes: true, quote_char: '"', headers: :first_row }
    @filepath    = "#{Rails.root}/db/all.csv"

    p ">> started"
    parse_csv
    p ">> finished"
  end

  private

  def parse_csv
    CSV.foreach(@filepath, @csv_options) do |row|
      lv1 = row['lv1'].downcase if row['lv1']
      lv2 = row['lv2'].downcase if row['lv2']
      lv3 = row['lv3'].downcase if row['lv3']
      ind = row['ind'].downcase if row['ind']
      event = row['event'].downcase if row['event']
      region = row["region"].downcase if row["region"]
      country = row["country"].downcase if row["country"]
      new_element = {
        lv1: lv1,
        lv2: lv2,
        lv3: lv3,
        ind: ind,
        event: event,
        region: region,
        country: country,
        start_date: row["start_date"].to_i,
        end_date: row["end_date"].to_i,
        to_be_included: row["to_be_included"].to_i
      }
      Event.create(new_element) unless new_element[:to_be_included] == 0
    end
  end


end

class Worka

  def initialize
    @csv_options = { col_sep: ',', force_quotes: true, quote_char: '"', headers: :first_row }
    @filepath    = "#{Rails.root}/db/oeuvre.csv"

    p ">> started"
    parse_csv
    p ">> finished"
  end

  private

  def parse_csv

    events = []
    Event.all.each do |event|
      events << event.ind
    end

    CSV.foreach(@filepath, @csv_options) do |row|
      name = row['name'].downcase if row['name']
      ind = Event.find_by_ind(row['ind'].downcase) if row['ind']
      detail = row['detail'].downcase if row['detail']
      picture = "#{row['picture'].downcase}.jpg" if row['picture']
      date = row['date'].to_i
      new_element = {
        name: name,
        date: date,
        detail: detail,
        picture: picture
      }

      if ind && date != 0 && name
        artw = Artwork.new(new_element)
        artw.ind_id = ind.id
        artw.save
        p artw
      end
    end
  end


end

Event.destroy_all
Eventa.new
Worka.new
