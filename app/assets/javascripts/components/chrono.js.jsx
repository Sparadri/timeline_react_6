var Chrono = React.createClass({
  componentWillReceiveProps(nextProps) {
    this.build_hash();
  },
  build_hash: function() {
  },
  buildTimeline: function() {
    var dataObject = {events: this.props.chrono};

    var options = {
       width:'100%',
       height:'1500',
       timenav_position:'top',
       language:'en',
       start_at_end:false,
       scale_factor: 0.75,
       start_at_slide:1,
       initial_zoom:0,
       timenav_height_percentage: 90
    };

    window.timeline = new TL.Timeline('timeline-embed',dataObject,options);
  },
  removeTimeline: function() {
    $(".tl-timeline").remove();
  },
  render: function() {
    return (
      <div id='timeline-embed' style={{height: '100vh', width: '100%'}}></div>
    )
  }
});

