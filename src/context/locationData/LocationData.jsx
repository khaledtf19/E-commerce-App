import React, { Component, createContext } from "react";

export const LocationContext = createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
    };
  }

  render() {
    const setLocation = (value) => {
      this.setState({ location: value });
    };

    return (
      <LocationContext.Provider
        value={{ location: this.state.location, setLocation }}
      >
        {this.props.children}
      </LocationContext.Provider>
    );
  }
}
