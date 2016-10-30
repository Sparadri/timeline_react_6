class Event < ActiveRecord::Base


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
      events << {
        lv1: event.lv1,
        lv2: event.lv2,
        lv3: event.lv3,
        name: event.name,
        event: event.event,
        region: event.region,
        country: event.country,
        start_date: event.start_date,
        end_date: event.end_date
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
          text: { headline: element.name, text: element.event },
          group: element.lv3,
          background: "color:#E6BC79;"
        }
      else
        events << {
          start_date: { year: element.start_date.to_s },
          text: { headline: element.name, text: element.event },
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
