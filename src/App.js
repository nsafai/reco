
import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import Script from 'react-load-script';

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: '',
      placeObject: '',
    };

  }

  handleScriptLoad = () => {
    const options = {
      types: ['establishment'],
    };

    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Avoid paying for unnecessary data by restricting place fields that are returned
    // this.autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    console.log(addressObject);
    const address = addressObject.address_components;

    if (address) {
      this.setState({
          city: address[0].long_name,
          query: addressObject.formatted_address,
      });
    }
  }

  render() {
    return (
      <>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <SearchBar id="autocomplete" placeholder="" value={this.state.query} onChange={e => this.setState({ query: e })}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </>
    );
  }
}

export default Search;