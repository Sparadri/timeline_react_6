var Events = React.createClass({
  getInitialState() {
      return {
      };
  },
  render: function() {
    return (
      <div className="card-wrapper">
          <div className="row">
          {this.props.events.map(function(item, index) {
            return (
              <div key={index} className="col-xs-12 col-sm-6 col-md-4">
                <ItemCard item={item}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
});

var ItemCard = React.createClass({
  getInitialState() {
      return {
        is_selected: true
      };
  },
  returnDate: function(){
    if (this.props.item.end_date == 0) {
      return (
        <div>{this.props.item.start_date}</div>
      )
    } else {
      return (
        <div>{this.props.item.start_date} - {this.props.item.end_date}</div>
      )
    }
  },
  firstChars: function(element) {
    var tstring = element.string;
    var tlength = element.tlength;

    if (tstring.length > tlength) {
      return (<div className="title">{tstring.substring(0,tlength)}...</div>)
    } else {
      return (<div className="title">{tstring}</div>)
    }
  },
  returnPicture: function() {
    return (
      <img height="100" src="/assets/andré-berthier-(bentham)---prison-circulaire-d’autun-cf45a5bba6eec3d2db6730a47bb1c7f70a589aa8bc4a846cda1fe2e66ac798a7.jpg" alt="André berthier (bentham)   prison circulaire d’autun cf45a5bba6eec3d2db6730a47bb1c7f70a589aa8bc4a846cda1fe2e66ac798a7"/>
    )
  },
  render: function() {
    filterItem = classNames({
      "filter-item": true,
      "blue": this.props.item.lv1 == 'art',
      "red": this.props.item.lv1 == 'science',
      "grey": this.props.item.lv1 == 'politics'
    });
    var title = this.props.item.ind.toUpperCase();
    return (
      <div className="card-event">
        {this.firstChars({string: title, tlength: 38})}
        {this.returnPicture()}
        <div className="content">
          <div className="subtitle">
            {this.props.item.event}
          </div>
          <div className="region-box">
            <div className="region">
              {this.props.item.region}
            </div>
            <div className="date">
              {this.returnDate()}
            </div>
          </div>
        </div>
        <div className="filters">
          <div className={filterItem}>
            {this.props.item.lv1}
          </div>
          <div className={filterItem}>
            {this.props.item.lv2}
          </div>
          <div className={filterItem}>
            {this.props.item.lv3}
          </div>
        </div>
      </div>
    )
  }
});

