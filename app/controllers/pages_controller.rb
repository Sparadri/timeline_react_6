class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @filters = Event.build_categories
    @events = Event.build_hash
    @json = { events: @selected_events }.to_json
    @chrono = Event.build_chrono
  end

  private

end
