var Events = React.createClass({
  getInitialState() {
      return {
      };
  },
  render: function() {
    return (
      <div className="card-wrapper">
          {this.props.events.map(function(item, index) {
            return (
              <div className="row">
                <div key={index}>
                  <div className="col-xs-2"></div>
                  <div className="col-xs-8">
                    <ItemCard item={item}/>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
            )
          })}
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
    if (this.props.item.picture != null) {
      var url = this.props.item.picture.split("upload/").join("upload/bo_1px_solid_rgb:8c8bc7,c_fill,h_300,r_1,w_500/");
      return (
        <div className="main-picture">
          <img src={url}/>
        </div>
      )
    }
  },
  returnArtwork: function() {
    return (
      <div className="art-wrapper">
          {this.props.item.artwork.map(function(item, index) {
            return (
              <div key={index}>
                <Artwork artwork={item}/>
              </div>
            )
          })}
      </div>
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
        <div className="card-header">
          {this.firstChars({string: title, tlength: 38})}
          <div className="region">
            {this.props.item.region} | <span className="date"> {this.returnDate()}</span>
          </div>
        </div>
        {this.returnPicture()}
        {this.returnArtwork()}
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

var Artwork = React.createClass({
  getInitialState() {
      return {
        is_selected: true
      };
  },
  returnPicture: function() {
    if (this.props.artwork.picture != null) {
      var url = this.props.artwork.picture.split("upload/").join("upload/bo_1px_solid_rgb:8c8bc7,c_fill,h_100,r_1,w_100/");
      return (
        <img src={url}/>
      )
    }
  },
  render: function() {
    filterItem = classNames({
    });
    return (
      <div className="art-content">
        <div className="art-date">{this.props.artwork.date}</div>
        {this.returnPicture()}
        <div className="art-name">{this.props.artwork.name}</div>
        <div className="art-detail">{this.props.artwork.detail}</div>
      </div>
    )
  }
});

