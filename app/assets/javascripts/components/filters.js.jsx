var Filters = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentDidMount() {
    var slider = document.getElementById('slider'),
      setButton = document.getElementById('set-sliders'),
      that = this;

    noUiSlider.create(slider, {
      start: [1505, 2010],
      animate: true,
      animationDuration: 300,
      connect: true,
      step: 5,
      range: {
        'min': 1500,
        'max': 2016
      }
    });

    var marginMin = document.getElementById('slider-margin-value-min'),
      marginMax = document.getElementById('slider-margin-value-max');

    slider.noUiSlider.on('update', function ( values, handle ) {
      if ( handle ) {
        marginMax.innerHTML = Math.round(values[handle]);
      } else {
        marginMin.innerHTML = Math.round(values[handle]);
      }
      that.props.onRangeChange(values);
    });

    setButton.addEventListener('click', function(){
      slider.noUiSlider.set(1505);
    });
  },
  render: function() {
    var that = this;
    return (
      <div className="filter">
        <div className="all" id="set-sliders">RESET</div>
        {this.props.filters.map(function(item, index) {
          return (
            <div key={index} className="">
              <FilterCategory
                filter={item}
                onFilterClick={that.props.onFilterClick}/>
            </div>
          )
        })}
        <div className="slider-container">
          <div className="title">PERIOD</div>
          <div id="slider"></div>
          <div id="slider-margin-value-min" onChange={that.minChange}>800</div>
          <div id="slider-margin-value-max">1600</div>
        </div>
      </div>
    )
  }
});

var FilterCategory = React.createClass({
  render: function() {
    var that = this;
    return (
      <div className="category">
        <div className="title">{this.props.filter.name.toUpperCase()}</div>
        {this.props.filter.subs.map(function(item, index) {
          return (
            <div key={index}>
              <Item item={item} cat={that.props.filter.name} onFilterClick={that.props.onFilterClick}/>
            </div>
          )
        })}
      </div>
    )
  }
});

var Item = React.createClass({
  getInitialState() {
      return {
        is_selected: false
      };
  },
  handleFilterClick: function() {
    if (this.props.item.nb != 0) {
      this.setState({is_selected: !this.state.is_selected});
      var filter = {cat: this.props.cat, filter: this.props.item, isSelected: !this.state.is_selected};
      this.props.onFilterClick(filter);
    }
  },
  render: function() {
    item = classNames({
      "item-u": !this.state.is_selected && this.props.item.nb != 0,
      "item-s": this.state.is_selected && this.props.item.nb != 0,
      "item-e": this.props.item.nb === 0
    });
    return (
      <div className={item} onClick={this.handleFilterClick}>
        {this.props.item.name}
        <span className="number"> ({this.props.item.nb})</span>
      </div>
    )
  }
});
