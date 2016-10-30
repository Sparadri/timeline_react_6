var Main = React.createClass({
  getInitialState() {
      return {
        events: this.props.events,
        currentFilters: []
      };
  },
  componentDidMount() {
      this.computeFilterNb();
  },
  updateChrono: function(element) {

  },
  computeFilterNb: function() {
    var that = this,
      array = this.state.events;

    this.props.filters.forEach(function(filter_over){
      var filter_category = filter_over.name;

      filter_over.subs.forEach(function(filter_elem){
        filter_elem.nb = 0;
        for(var i = array.length - 1; i >= 0; i--) {
          var filter = array[i];
          if (array[i][filter_category] === filter_elem.name) {
            filter_elem.nb += 1;
          } else {
            console.log(filter_category);
          };
        }
      })
    });
  },
  handleFilterClick: function(element) {
    var name = element.filter.name,
      cat  = element.cat,
      isSelected = element.isSelected,
      that = this,
      events = this.state.events;

    console.log(isSelected);

    if (isSelected) {
      this.state.currentFilters.push(name);
      for(var i = this.state.events.length - 1; i >= 0; i--) {
        if(this.props.events[i][cat] != name) {
          events.splice(i, 1);
        }
      }
    } else {
      this.state.currentFilters.slice(name);
      for(var i = this.props.fullEvents.length - 1; i >= 0; i--) {
        if(this.props.fullEvents[i][cat] != name) {
          events.push(this.props.fullEvents[i]);
        }
      }
    }
    this.setState({events: events});
    this.computeFilterNb();
  },
  handleRangeChange: function(values) {
    var min = parseInt(values[0]),
      max = parseInt(values[1]),
      events = this.state.events;

    for(var i = this.props.fullEvents.length - 1; i >= 0; i--) {

      var mina = this.props.fullEvents[i].start_date <= min,
        minb = this.props.fullEvents[i].end_date <= min,
        maxa = this.props.fullEvents[i].end_date >= max;

      if (mina && minb) {
        events.splice(i, 1);
      };
      if (maxa && mina) {
        events.splice(i, 1);
      };

    }
    this.setState({events: events});
    this.computeFilterNb();
  },
  render: function() {
    var that = this;
    return (
      <div>
        <Filters
          filters={this.props.filters}
          current_filters={this.state.current_filters}
          onFilterClick={that.handleFilterClick}
          onRangeChange={that.handleRangeChange}/>
        <Events events={this.state.events}/>
        <Chrono events={this.props.events}/>
      </div>
    )
  }
});
