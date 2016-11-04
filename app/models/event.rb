class Event < ActiveRecord::Base
  has_many :artworks, dependent: :destroy

  def self.build_categories
    lv1, lv2, lv3, country, region = [], [], [], [], []
    Event.all.each do |event|
      lv1 << event.lv1
      lv2 << event.lv2
      lv3 << event.lv3
      region << event.region
      country << event.country
    end
    [{name: "lv1", subs: lv1.uniq.map {|cat| {name: cat, nb:0 }}},
     {name: "lv2", subs: lv2.uniq.map {|cat| {name: cat, nb:0 }}},
     {name: "region", subs: region.uniq.map {|cat| {name: cat, nb:0 }}}]
  end

  def self.build_hash
    events = []
    Event.all.each do |event|
      if event.lv3 == "painting movement"
        artworks = Artwork.all.select { |artwork| artwork.movement == event.ind }
      else
        artworks = Artwork.all.select { |artwork| artwork.ind_id == event.id }
      end

      if artworks
        art_array = []
        artworks.sort { |x , y| x.date <=> y.date }.each do |artwork|
          art_array << { picture: artwork.picture,
                          name: artwork.name,
                          date: artwork.date,
                          detail: artwork.detail }
        end
      else
          art_array << { picture: 0,
                      name: event.event,
                      date: 0,
                      detail: 0 }
      end
      events << {
        lv1: event.lv1,
        lv2: event.lv2,
        lv3: event.lv3,
        ind: event.ind,
        artwork: art_array,
        region: event.region,
        country: event.country,
        start_date: event.start_date,
        end_date: event.end_date,
      }
    end
    events
  end

  def self.build_chrono
    events = []
    Event.all.each do |element|
      if element.end_date != 0
        events << {
          start_date: { year: element.start_date.to_s },
          end_date: { year: element.end_date.to_s },
          text: { headline: element.ind, text: element.event },
          group: element.lv3,
          background: "color:#E6BC79;"
        }
      else
        events << {
          start_date: { year: element.start_date.to_s },
          text: { headline: element.ind, text: element.event },
          group: element.lv3,
          background: "color:#3C3AB2;"
        }
      end
    end
    events
  end

  scope :date_range, -> (date) {
    where("start_date in (#{date-50} , #{date+50}) OR end_date in (#{date-50} , #{date+50})")
  }
end
