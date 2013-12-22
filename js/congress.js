/**
 * @jsx React.DOM
 */

var apikey = '574712f76976437cb98767c4a2622588';
var lat = '42.96';
var lng = '-108.09';
var params = {apikey: apikey, latitude: lat, longitude: lng};
var locate = 'http://congress.api.sunlightfoundation.com/legislators/locate?' + $.param(params);

var CongressPicker = React.createClass({
  locateLegislators: function() {
    $.ajax({
      url: locate,
      success: function(data) {
        this.setState({data: data.results});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.locateLegislators();
  },
  render: function() {
    return (
    <div className="row">
      <div className="large-12 columns">
        <AddressForm />
        <LegislatorList data={this.state.data} />
      </div>
    </div>
    );
  }
});

var AddressForm = React.createClass({
  handleSubmit: function() {
    var address = this.refs.address.getDOMNode().value.trim();
    console.log('Address', address);
    return false;
  },
  render: function() {
    return (
    <form className="address-form" onSubmit={this.handleSubmit}>
      <fieldset>
        <legend>Find Your Legislator</legend>
        <input
          type="text"
          className="helper"
          placeholder="Enter an address to find your legislators"
          ref="address"
        />
        <small className="helper">Start the search...</small>
      </fieldset>
    </form>
    );
  }
});

var LegislatorList = React.createClass({
  render: function() {
    var legislatorNodes = this.props.data.map(function (legislator) {
      return <Legislator
        key={legislator.bioguide_id}
        firstName={legislator.first_name}
        lastName={legislator.last_name} />
    });
    return (
      <div className="ac-legislator-list">
        <h4>your legislators</h4>
        {legislatorNodes}
      </div>
    );
  }
});

var Legislator = React.createClass({
  render: function() {
    return (
      <div className="ac-legislator">
        <p>{this.props.firstName} {' '} {this.props.lastName}</p>
      </div>
    );
  }
});

var legislators = [
{bioguide_id: "L000571", first_name: "Cynthia", last_name: "Lummis"},
{bioguide_id: "E000285", first_name: "Michael", last_name: "Enzi"},
{bioguide_id: "B001261", first_name: "John", last_name: "Barrasso"}
];

React.renderComponent(
    <CongressPicker />,
    document.getElementById('ac-congress')
);
