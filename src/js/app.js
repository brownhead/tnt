var MatchBox = React.createClass({
  loadMatchesFromServer: function() {
    $.ajax({
      url: this.props.get_url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleLike: function(post_data) {
    post_data.user_id = this.props.user_id;
    $.ajax({
      url: this.props.post_url,
      type: 'POST',
      data: post_data,
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
    var new_data = _.reject(this.state.data, function(match) {
      return match.id == post_data.other_id;
    });
    this.setState({data: new_data});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadMatchesFromServer();
    setInterval(this.loadMatchesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div>
        <h1>Matches</h1>
        <MatchList handleLike={this.handleLike} data={this.state.data}/>
      </div>
    );
  }
});

var MatchList = React.createClass({
  handleLike: function(post_data) {
    this.props.handleLike(post_data);
  },
  render: function() {
    var matchNodes = this.props.data.map((match) => {
      return (
        <div>
          <Match name={match.name} email={match.email} />
          <MatchForm other_id={match.id} handleLike={this.props.handleLike} />
          <br/>
        </div>
      );
    });
    return (
      <div>
        {matchNodes}
      </div>
    );
  }
});

var MatchForm = React.createClass({
  handleLike: function(like, e) {
    return this.props.handleLike({other_id: this.props.other_id, like: like});
  },
  render: function() {
    return (
      <div>
        <a href="javascript: void 0" onClick={_.partial(this.handleLike, true)}>
          Like
        </a>
        <br/>
        <a href="javascript: void 0" onClick={_.partial(this.handleLike, false)}>
          Dislike
        </a>
      </div>
    );
  }
});

var Match = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.name}<br/>
        {this.props.email}
      </div>
    );
  }
});

React.render(
  <MatchBox user_id="1" get_url="/api/1/users/prospects" post_url='/api/1/matches/make' pollInterval={2000} />,
  document.getElementById('content')
);
