import React, { Component, createContext } from "react";

export const LocationContext = createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      selectedCategory: "",
    };
  }

  render() {
    const setLocation = (value) => {
      this.setState({ location: value });
    };

    const setSelectedCategory = (value) => {
      this.setState({ selectedCategory: value });
    };

    return (
      <LocationContext.Provider
        value={{
          location: this.state.location,
          setLocation,
          selectedCategory: this.state.selectedCategory,
          setSelectedCategory,
        }}
      >
        {this.props.children}
      </LocationContext.Provider>
    );
  }
}
